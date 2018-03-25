// Module dependencies
const passport = require('passport');
require('../services/passport');

// Authentication middleware
module.exports = {
  requireAuth: passport.authenticate('local', { session: false })
};
