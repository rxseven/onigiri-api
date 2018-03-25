// Module dependencies
const router = require('express-promise-router')();

const usersController = require('../controllers/users');
const { requireAuth } = require('../middleware/auth');
const { schemas, validators } = require('../middleware/routes');

// Sign-up
router
  .route('/signup')
  .post(validators.body(schemas.signUp), usersController.signUp);

// Sign-in
router
  .route('/signin')
  .post(validators.body(schemas.signIn), requireAuth, usersController.signIn);

// Sign-out
router.route('/signout').get(usersController.signOut);

// Module exports
module.exports = router;
