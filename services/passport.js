// Module dependencies
const config = require('config');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const LocalStrategy = require('passport-local');

const authHelper = require('../helpers/auth');

// OAuth - Facebook Token strategy
passport.use(
  new FacebookTokenStrategy(
    // Configuration options
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret
    },

    // Verify callback
    (...args) => authHelper.signIn.oauth(...args)
  )
);

// OAuth - Google Token strategy
passport.use(
  new GoogleTokenStrategy(
    // Configuration options
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret
    },

    // Verify callback
    (...args) => authHelper.signIn.oauth(...args)
  )
);

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
    (...args) => authHelper.signIn.jwt(...args)
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
    (...args) => authHelper.signIn.local(...args)
  )
);
