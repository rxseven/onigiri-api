// Module dependencies
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = require('./Recipient');

// Survey schema
const surveySchema = new Schema({
  archived: {
    default: false,
    type: Boolean
  },
  body: String,
  completed: {
    default: false,
    type: Boolean
  },
  dateSent: Date,
  from: String,
  landing: String,
  lastResponded: Date,
  locked: false,
  no: {
    default: 0,
    type: Number
  },
  recipients: [recipientSchema],
  sender: String,
  subject: String,
  title: String,
  yes: {
    default: 0,
    type: Number
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
});

// Create Survey model
const Survey = mongoose.model('survey', surveySchema);

// Module exports
module.exports = Survey;
