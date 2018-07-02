// Module dependencies
const config = require('config');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

const Survey = require('../models/Survey');
const User = require('../models/User');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../templates/emails/surveys');

// Surveys controller
module.exports = {
  // Create new survey and send out emails
  createSurvey: async (req, res, next) => {
    // Variables
    const charge = 1;
    const {
      body,
      from,
      landing,
      recipients,
      sender,
      subject,
      title
    } = req.value.body;

    // Transform email list to an appropriate format
    const recipientsArray = recipients
      .split(',')
      .map(email => ({ email: email.trim() }));

    // Create new survey instance
    const survey = new Survey({
      body,
      dateSent: Date.now(),
      from,
      landing,
      recipients: recipientsArray,
      sender,
      subject,
      title,
      user: req.user.id
    });

    // Prepare email template
    const doorwayURI = config.doorway.URI;
    const template = surveyTemplate(survey, doorwayURI);

    // Setup mailer
    const mailer = new Mailer(survey, template);

    try {
      // Send an email
      await mailer.send();

      // Save survey instance to the database
      await survey.save();

      // Deduct user's credits
      req.user.credits.balance -= charge;
      await User.findByIdAndUpdate(req.user.id, {
        'credits.balance': req.user.credits.balance
      });

      // Send a response
      res.status(201).json({
        credits: { balance: req.user.credits.balance },
        id: survey.id
      });
    } catch (error) {
      res.status(422).json({ error: { message: error } });
    }
  },

  // Delete survey
  deleteSurvey: async (req, res, next) => {
    // Variables
    const surveyId = req.value.params.surveyId;

    // Get a survey
    const survey = await Survey.findById(surveyId);

    // If the survey doesn't exist, return an error message
    if (!survey) {
      return res.status(404).json({ error: { message: 'Not found' } });
    }

    // Delete particular survey by the given ID
    await Survey.findByIdAndRemove(surveyId);

    // Return a response
    res.status(200).json({ id: surveyId });
  },

  // Get landing page URI
  getLanding: async (req, res, next) => {
    // Select particular survey by the given ID
    const survey = await Survey.findById(req.value.params.surveyId).select({
      landing: true,
      _id: false
    });

    // If survey exists
    if (survey) {
      // Prepare a response
      const response = { URI: config.campaign.landing };

      if (survey.landing) {
        response.URI = survey.landing;
      }

      // Return a response
      return res.status(200).json(response);
    }

    // Otherwise, return error message
    res.status(404).json({
      error: {
        message: 'This survey is already expired, thank you for your feedback!'
      }
    });
  },

  // Get recipients
  getRecipients: async (req, res, next) => {
    // Select specific survey and populate recipient list
    const recipients = await Survey.findById(req.params.surveyId)
      .select({ recipients: true })
      .populate('recipients');

    // Return a response
    if (recipients) {
      res.status(200).json(recipients);
    } else {
      res.status(404).json({ error: { message: 'Not found' } });
    }
  },

  // Get survey
  getSurvey: async (req, res, next) => {
    // Select particular survey by the given ID
    const survey = await Survey.findById(req.value.params.surveyId).select({
      recipients: false,
      user: false,
      __v: false
    });

    // Return a response
    if (survey) {
      res.status(200).json(survey);
    } else {
      res.status(404).json({ error: { message: 'Not found' } });
    }
  },

  // Get surveys
  getSurveys: async (req, res, next) => {
    // Create query object
    const queryInput = { ...req.query };

    // Remove properties for pagination
    delete queryInput.page;
    delete queryInput.limit;

    // If the request query is empty, set default properties
    if (_.isEmpty(queryInput)) {
      (queryInput.archived = false), (queryInput.completed = false);
    }

    // Combine query properties
    const query = {
      user: req.user.id,
      ...queryInput
    };

    // Declare default limit's value
    if (
      !req.query.limit ||
      isNaN(parseFloat(req.query.limit)) ||
      parseFloat(req.query.limit) < 1
    ) {
      req.query.limit = 2;
    }

    // Declare default page's value
    if (
      !req.query.page ||
      isNaN(parseFloat(req.query.page)) ||
      parseFloat(req.query.page) < 1
    ) {
      req.query.page = 1;
    }

    // Create object for pagination query
    const options = {
      select: 'dateSent id locked no subject title yes',
      sort: { dateSent: 'desc' },
      limit: parseFloat(req.query.limit),
      page: parseFloat(req.query.page)
    };

    // Get a list of surveys
    const result = await Survey.paginate(query, options);

    // Create additional pagination meta data
    const nextPage = result.page === result.pages ? false : result.page + 1;
    const prevPage = result.page === 1 ? false : result.page - 1;

    // Create a response object
    const response = {
      data: result.docs,
      meta: {
        query: {
          limit: result.limit,
          page: result.page
        },
        paging: {
          next: nextPage,
          previous: prevPage
        },
        summary: {
          pages: result.pages,
          total: result.total
        }
      }
    };

    // Return a response
    res.status(200).json(response);
  },

  // Update survey
  updateSurvey: async (req, res, next) => {
    // Variables
    const surveyId = req.value.params.surveyId;

    // Update the existing survey
    await Survey.findByIdAndUpdate(surveyId, req.body);

    // Return a response
    res.status(200).json(req.body);
  },

  // Webhooks - receive click events from SendGrid web service
  webhooks: async (req, res, next) => {
    // Define destination path and pattern for parsing
    const path = new Path(`${config.doorway.tracking}/:surveyId/:choice`);

    // Create a wrapper instance that wraps request body with explicit
    // method chain sequences enabled.
    _.chain(req.body)
      // Iterate over request body, run sequence checks and return a new array
      // with the results of such sequences.
      .map(({ email, url }) => {
        // Get the path portion of the URL
        // Extract survey ID and choice from the given path name
        const match = path.test(new URL(url).pathname);

        // Return filterd object
        if (match) {
          return {
            choice: match.choice,
            email,
            surveyId: match.surveyId
          };
        }
      })

      // Remove falsey values (undefined)
      .compact()

      // Uniqueness check, remove duplicated elements
      .uniqBy('email', 'surveyId')

      // Iterate over elements of events and run a query for each element
      .each(({ choice, email, surveyId }) => {
        Survey.count({ _id: surveyId }, (err, count) => {
          // Check existing survey before updating
          if (count !== 0) {
            // Otherwise, update survey with responses from SendGrid
            Survey.updateOne(
              // Find the exact survey record in a collection
              {
                _id: surveyId,
                recipients: {
                  $elemMatch: {
                    email: email,
                    responded: false
                  }
                }
              },

              // Update the record with new values
              {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: Date.now()
              }
            ).exec();
          }
        });
      })

      // Unwrap the final result
      .value();

    // Return a response
    res.send({});
  }
};
