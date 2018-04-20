// Module dependencies
const authHelper = require('../helpers/auth');
const signToken = require('../helpers/token');
const Survey = require('../models/Survey');
const User = require('../models/User');

// Constants
const AUTH = require('../constants/auth');

// Helper function to generate sign-up and sign-in response
const authResponse = user => {
  // Variables
  const { email, firstName, id, lastName } = user;

  // Generate a token
  const token = signToken(user);

  // Get user avatar
  const avatar = user.avatar(200);

  // Create a response object
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
        url: avatar
      }
    }
  };
};

// Users controller
module.exports = {
  // Sign-up
  signUp: async (req, res, next) => {
    // Variables
    const { email, password, firstName, lastName } = req.value.body;

    // Find email address in a collection
    const existingUser = await User.findOne({ email });

    // Check if the user is already exist
    if (existingUser) {
      // Prepare a response
      req.user = authHelper.verifyUser(existingUser);

      // Return error response
      return authHelper.createResponse(req, res, next);
    }

    // Otherwise, create new user account
    // Prepare user object
    const profile = {
      emails: [{ value: email }],
      name: {
        givenName: firstName,
        familyName: lastName
      },
      password,
      provider: AUTH.provider.local.name
    };

    // Create new user account
    const user = await authHelper.createUser(profile, AUTH.strategy.local);

    // Prepare a response
    req.user = {
      data: user,
      status: 201
    };

    // Return a success response
    return authHelper.createResponse(req, res, next);
  },

  // Sign-in
  signIn: async (...arguments) => {
    authHelper.createResponse(...arguments);
  },

  // Sign-out
  signOut: (req, res, next) => {
    // Sign out the current user
    req.logout();

    // Return a response
    res.send({ authenticated: false });
  },

  // Get user info
  getUser: async (req, res, next) => {
    // Variables
    const { email, firstName, id, lastName, photo } = req.user;

    // Create a response object
    const response = {
      email,
      name: {
        firstName,
        lastName
      },
      id,
      photo: { url: photo }
    };

    // Return a response
    res.status(200).json(response);
  },

  // Get user profile
  getProfile: async (req, res, next) => {
    // Get user instance from the request object
    const user = req.user;

    // Get user avatar
    const avatar = user.avatar(200);

    // Create a response object
    const response = {
      creationDate: user.creationDate,
      email: user.email,
      gender: user.gender,
      id: user._id,
      language: user.language,
      name: {
        firstName: user.firstName,
        lastName: user.lastName
      },
      photo: { url: avatar },
      provider: user.provider,
      role: user.role,
      verified: user.verified
    };

    // Return a response
    res.status(200).json(response);
  },

  // Get credits
  getCredits: async (req, res, next) => {
    // Get credits property from the current user instance
    const { balance, lastCheckout } = req.user.credits;

    // Return a response
    res.status(200).json({ balance, lastCheckout });
  },

  // / Delete user account
  deleteUser: async (req, res, next) => {
    // Get user instance from the request object
    const user = req.user;

    // Remove the user
    await user.remove();

    // Remove user's surveys
    await Survey.remove({ user });

    // Return response
    res.status(200).json({ success: true });
  }
};
