// Module dependencies
const credentials = require('../config/credentials');
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
  }
};
