// Module dependencies
const router = require('express-promise-router')();

const usersController = require('../controllers/users');
const { schemas, validators } = require('../middleware/routes');

// Sign-up
router
  .route('/signup')
  .post(validators.body(schemas.signUp), usersController.signUp);

// Module exports
module.exports = router;
