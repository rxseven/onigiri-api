// Module dependencies
const config = require('config');
const JWT = require('jsonwebtoken');

// Sign JWT
const signToken = user =>
  JWT.sign(
    {
      exp: new Date().setDate(new Date().getDate() + 1),
      iat: new Date().getTime(),
      iss: 'rxseven.com',
      sub: user.id
    },
    config.token.secret
  );

// Module exports
module.exports = signToken;
