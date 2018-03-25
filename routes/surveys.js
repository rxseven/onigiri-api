// Module dependencies
const router = require('express-promise-router')();

const surveysController = require('../controllers/surveys');
const { requireJWT } = require('../middleware/auth');
const { requireCredits } = require('../middleware/credits');
const { schemas, validators } = require('../middleware/routes');

// Get surveys
router.route('/').get(requireJWT, surveysController.getSurveys);

// Create survey
router
  .route('/')
  .post(
    requireJWT,
    requireCredits,
    validators.body(schemas.createSurvey),
    surveysController.createSurvey
  );

// Get survey
router
  .route('/:surveyId')
  .get(
    requireJWT,
    validators.param(schemas.id, 'surveyId'),
    surveysController.getSurvey
  );

// Get recipients
router
  .route('/:surveyId/recipients')
  .get(
    requireJWT,
    validators.param(schemas.id, 'surveyId'),
    surveysController.getRecipients
  );

// Replace and update survey
router
  .route('/:surveyId/update')
  .patch(
    requireJWT,
    validators.param(schemas.id, 'surveyId'),
    surveysController.updateSurvey
  );

// Module exports
module.exports = router;
