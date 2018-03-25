// Module dependencies
const { isEmpty } = require('lodash');

const credentials = require('../config/credentials');
const Survey = require('../models/Survey');
const User = require('../models/User');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../templates/emails/surveys');

// Surveys controller
module.exports = {
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
    if (isEmpty(queryInput)) {
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
    const doorwayURI = credentials.doorway.URI;
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

  // Update survey
  updateSurvey: async (req, res, next) => {
    // Variables
    const surveyId = req.value.params.surveyId;

    // Update the existing survey
    const result = await Survey.findByIdAndUpdate(surveyId, req.body);

    // Return a response
    res.status(200).json(req.body);
  }
};
