// Module dependencies
const signToken = require('../helpers/token');

// Helper function to generate sign-up and sign-in response
const authResponse = user => {
  // Destructure object properties
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
module.exports = {};
