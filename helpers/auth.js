// Module dependencies
const crypto = require('crypto');

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

  // Create user instance
  const user = new User(userModel);

  // Insert a record
  await user.save();

  // Return new user instance
  return user;
};

// Module exports
module.exports = {
  createUser
};
