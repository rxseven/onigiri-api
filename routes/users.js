// Module dependencies
const router = require('express-promise-router')();

const usersController = require('../controllers/users');
const { requireAuth, requireJWT } = require('../middleware/auth');
const { schemas, validators } = require('../middleware/routes');

// Get user info
router.route('/').get(requireJWT, usersController.getUser);

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

// Get user profile
router.route('/profile').get(requireJWT, usersController.getProfile);

// Module exports
module.exports = router;
