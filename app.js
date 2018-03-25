// Module dependencies
const express = require('express');
const logger = require('morgan');

// Create Express server
const app = express();

// Logger
app.use(logger('dev'));

// Bind and listen for connections on the specified host and port
app.listen(process.env.PORT || 5000);
