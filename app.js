// Module dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const boolParser = require('express-query-boolean');
const logger = require('morgan');

// Create Express server
const app = express();

// Logger
app.use(logger('dev'));

// Body parsing
app.use(bodyParser.json());

// Query string parsing
app.use(boolParser());

// CORS
app.use(cors());

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
