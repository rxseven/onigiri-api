// Module dependencies
const config = require('config');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const authHelper = require('../helpers/auth');

// Protected resource with JWT strategy
passport.use(
  // Authenticate user with a JSON Web Token
  new JwtStrategy(
    // Configuration options to control how the token is extracted
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.token.secret
    },

    // Verify callback
    (...arguments) => authHelper.signIn.jwt(...arguments)
  )
);

// Sign-in with Local strategy
passport.use(
  // Authenticate user with a username and password
  new LocalStrategy(
    // Configuration options
    {
      usernameField: 'email'
    },

    // Verify callback
    (...arguments) => authHelper.signIn.local(...arguments)
  )
);
