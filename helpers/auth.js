// Module dependencies
const crypto = require('crypto');

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
