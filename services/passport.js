// Module dependencies
const config = require('config');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const authHelper = require('../helpers/auth');
const User = require('../models/User');

// Protected resource (JWT strategy)
passport.use(
  // Authenticate user with a JSON Web Token.
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.token.secret
    },
    async (payload, done) => {
      try {
        // Find the user specified in a given token
        const user = await User.findById(payload.sub);

        // If the user doesn't exist, return false
        if (!user) {
          return done(null, false);
        }

        // If the user exists, return the user instance
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
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
