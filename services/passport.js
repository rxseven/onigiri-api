// Module dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/User');

// Sign-in (Local strategy)
passport.use(
  // Authenticate user with a username and password
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        // Find the user specified in a given email
        const user = await User.findOne(
          { email },
          {
            creationDate: 0,
            disabled: 0,
            gender: 0,
            language: 0,
            provider: 0,
            role: 0,
            verified: 0,
            __v: 0
          }
        );

        // If the user doesn't exist, return false
        if (!user) {
          return done(null, false);
        }

        // Verify the password
        const isMatch = await user.comparePassword(password);

        // If the password is invalid, return false
        if (!isMatch) {
          return done(null, false);
        }

        // If the password is valid, return the user instance
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
