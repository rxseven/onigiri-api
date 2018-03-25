// Module dependencies
const express = require('express');
const logger = require('morgan');

// Create Express server
const app = express();

// Logger
app.use(logger('dev'));

// Catch 404 errors and forward to an error handler
app.use((req, res, next) => {
  const err = new Error('Endpoint not found');
  err.status = 404;
  next(err);
});

// Bind and listen for connections on the specified host and port
app.listen(process.env.PORT || 5000);
