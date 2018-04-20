// Module dependencies
const router = require('express-promise-router')();

const usersController = require('../controllers/users');
const {
  requireAuth,
  requireAuthFacebook,
  requireAuthGoogle,
  requireJWT
} = require('../middleware/auth');
const { schemas, validators } = require('../middleware/routes');

// Get user info
router.route('/').get(requireJWT, usersController.getUser);

// Delete user account
router.route('/').delete(requireJWT, usersController.deleteUser);

// Sign-in with Facebook
router
  .route('/oauth/facebook')
  .post(requireAuthFacebook, usersController.oauthFacebook);

// Sign-in with Google
router
  .route('/oauth/google')
  .post(requireAuthGoogle, usersController.oauthGoogle);

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

// Get credits
router.route('/credits').get(requireJWT, usersController.getCredits);

// Module exports
module.exports = router;
