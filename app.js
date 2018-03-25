// Module dependencies
const express = require('express');

// Create Express server
const app = express();

// Bind and listen for connections on the specified host and port
app.listen(process.env.PORT || 5000);
