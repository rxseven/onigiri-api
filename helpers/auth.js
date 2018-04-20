// Module dependencies
const crypto = require('crypto');

const stringHelper = require('../helpers/string');
const signToken = require('../helpers/token');
const User = require('../models/User');

// Constants
const AUTH = require('../constants/auth');

// Get Gravatar
const getGravatar = (email, size = 192) => {
  // Variables
  const gravatarURI = 'https://gravatar.com/avatar';

  // If the email is not provided, return a default
  if (!email) {
    return `${gravatarURI}/?s=${size}&d=mm`;
  }

  // Otherwise, encrypt the email
  const md5 = crypto
    .createHash('md5')
    .digest('hex')
    .update(email);

  // Return user's photo
  return `${gravatarURI}/${md5}?s=${size}`;
};

// Create user account
const createUser = async (profile, strategy) => {
  // Variables
  let photo;
  let userModel;
  const {
    emails,
    name: { familyName: lastName, givenName: firstName },
    provider
  } = profile;
  const email = emails[0].value;

  // Get profile photo
  switch (provider) {
    case AUTH.provider.facebook.name:
      photo = profile.photos[0].value;
      break;
    default:
      photo = getGravatar(profile.email, 200);
  }

  // Define default values
  const userDefault = { email, firstName, lastName, photo, provider };

  // Local strategy
  if (strategy === AUTH.strategy.local) {
    userModel = {
      ...userDefault,
      password: profile.password
    };
  }

  // OAuth
  if (strategy === AUTH.strategy.oauth) {
    userModel = {
      ...userDefault,
      oauthId: profile.id
    };
  }

  // Create user instance
  const user = new User(userModel);

  // Insert a record
  await user.save();

  // Return new user instance
  return user;
};

// Create session response
const createSession = user => {
  // Variables
  const { email, firstName, id, lastName, photo } = user;

  // Generate a token
  const token = signToken(user);

  // Return a response object
  return {
    token,
    user: {
      email,
      id,
      name: {
        firstName,
        lastName
      },
      photo: {
        url: photo
      }
    }
  };
};

// Create authentication response
const createResponse = (req, res, next) => {
  // Variables
  const { data, status } = req.user;

  // Unauthorized or forbidden, return error response
  if (status == 401 || status === 403) {
    return res.status(status).json({ error: { message: data } });
  }

  // Return a success response
  return res.status(status).json(createSession(data));
};

// Sign-in
const signIn = {
  // JWT strategy
  jwt: async (payload, done) => {
    try {
      // Find the user specified in a given token
      const user = await User.findById(payload.sub);

      // If the user doesn't exist, return false
      if (!user) {
        return done(null, false);
      }

      // Otherwise, return the user instance
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },

  // Local strategy
  local: async (email, password, done) => {
    try {
      // Find the user specified in a given email
      const user = await User.findOne(
        {
          email,
          provider: 'local'
        },
        {
          creationDate: 0,
          disabled: 0,
          gender: 0,
          language: 0,
          role: 0,
          verified: 0,
          __v: 0
        }
      );

      // If the user doesn't exist, return error message
      if (!user) {
        return done(null, {
          data: 'You have entered incorrect email',
          status: 401
        });
      }

      // Verify password
      const isMatch = await user.comparePassword(password);

      // If the password is invalid, return error message
      if (!isMatch) {
        return done(null, {
          data: 'You have entered incorrect password',
          status: 401
        });
      }

      // Otherwise, return the user instance
      return done(null, {
        data: user,
        status: 200
      });
    } catch (error) {
      done(error, false);
    }
  },

  // OAuth
  oauth: async (accessToken, refreshToken, profile, done) => {
    try {
      // Variables
      const { emails, id: oauthId } = profile;
      const email = emails[0].value;

      // Find OAuth profile ID in a collection
      const existingUser = await User.findOne({ oauthId });

      // If the user exists, return the user instance
      if (existingUser) {
        return done(null, {
          data: existingUser,
          status: 200
        });
      }

      // Then check the existing email
      const existingEmail = await User.findOne({ email });

      // Check if there is a user with the same given email
      if (existingEmail) {
        // Return error response
        return done(null, verifyUser(existingEmail));
      }

      // Otherwise, create user instance
      const user = await createUser(profile, AUTH.strategy.oauth);

      // Return new user instance
      return done(null, {
        data: user,
        status: 201
      });
    } catch (error) {
      return done(error, false);
    }
  }
};

// Verify existing user
const verifyUser = user => {
  // Variables
  const { provider } = user;
  const service = stringHelper.capitalizeFirstLetter(provider);
  const messageHeader = 'This email is already in use';
  let messageBody = ', please try with email and password instead.';

  // Prepare an appropriate message
  if (provider !== AUTH.provider.local.name) {
    messageBody = ` with ${service} account, please try with your ${service} ID instead.`;
  }

  // Return error response
  return {
    data: messageHeader + messageBody,
    status: 403
  };
};

// Module exports
module.exports = {
  createResponse,
  createUser,
  signIn,
  verifyUser
};
