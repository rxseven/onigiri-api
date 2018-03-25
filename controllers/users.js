// Module dependencies
const signToken = require('../helpers/token');
const Survey = require('../models/Survey');
const User = require('../models/User');

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

    // Check if there is a user with the same email
    if (existingUser) {
      // Return error
      return res
        .status(403)
        .json({ error: { message: 'Email is already in use' } });
    }

    // Create a new user instance
    const user = new User({
      creationDate: Date.now(),
      email,
      firstName,
      lastName,
      password
    });

    // Insert a new record
    await user.save();

    // Return a response
    res.status(201).json(authResponse(user));
  },

  // Sign-in
  signIn: async (req, res, next) => {
    // Return a response
    res.status(200).json(authResponse(req.user));
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
    const { email, firstName, id, lastName } = req.user;

    // Get user avatar
    const avatar = req.user.avatar(200);

    // Create a response object
    const response = {
      email,
      name: {
        firstName,
        lastName
      },
      id,
      photo: { url: avatar }
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