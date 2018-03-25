// Module dependencies
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Recipient schema
const recipientSchema = new Schema({
  email: String,
  responded: {
    default: false,
    type: Boolean
  }
});

// Module exports
module.exports = recipientSchema;
