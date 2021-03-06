// Module dependencies
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const express = require('express');
const boolParser = require('express-query-boolean');
const mongoose = require('mongoose');
const logger = require('morgan');

const paymentsRoute = require('./routes/payments');
const surveysRoute = require('./routes/surveys');
const usersRoute = require('./routes/users');

// Create Express server
const app = express();

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDB.URI);
mongoose.connection.on('error', err => {
  console.error(err);
});

// Logger
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(logger('dev'));
}

// Body parsing
app.use(bodyParser.json());

// Query string parsing
app.use(boolParser());

// CORS
app.use(cors());

// Routes
app.use('/payments', paymentsRoute);
app.use('/surveys', surveysRoute);
app.use('/users', usersRoute);

// Catch 404 errors and forward to an error handler
app.use((req, res, next) => {
  const err = new Error('Endpoint not found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // Envorioment conditions
  const error = process.env.NODE_ENV === 'development' ? err : {};
  const status = err.status || 500;

  // Respond to a client
  res.status(status).json({
    error: { message: error.message }
  });

  // Respond to a developer
  console.error(err);
});

// Bind and listen for connections on the specified host and port
app.listen(process.env.PORT || 5000);

// Module exports
module.exports = app;
