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

// Module exports
module.exports = router;
