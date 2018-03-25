// Module dependencies
const JWT = require('jsonwebtoken');
const credentials = require('../config/credentials');

// Sign JWT
const signToken = user =>
  JWT.sign(
    {
      exp: new Date().setDate(new Date().getDate() + 1),
      iat: new Date().getTime(),
      iss: 'rxseven.com',
      sub: user.id
    },
    credentials.token.secret
  );

// Module exports
module.exports = signToken;
