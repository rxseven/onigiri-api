// Module dependencies
const Survey = require('../models/Survey');

// Surveys controller
module.exports = {
  // Create new survey and send out emails
  createSurvey: async (req, res, next) => {
    // Variables
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

    try {
      // Save survey instance to the database
      await survey.save();
    } catch (error) {
      res.status(422).json({ error: { message: error } });
    }
  }
};
