// Module dependencies
const mongoose = require('mongoose');
const { Schema } = mongoose;

// User schema
const userSchema = new Schema({
  creationDate: {
    type: Date
  },
  credits: {
    balance: {
      default: 0,
      type: Number
    },
    lastCheckout: {
      type: Date
    }
  },
  disabled: {
    default: false,
    required: true,
    type: Boolean
  },
  email: {
    lowercase: true,
    required: true,
    type: String,
    unique: true
  },
  firstName: {
    required: true,
    type: String
  },
  gender: {
    default: 'undefined',
    required: false,
    type: String
  },
  language: {
    default: 'en_US',
    required: false,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  provider: {
    default: 'local',
    required: true,
    type: String
  },
  role: {
    default: 'user',
    required: true,
    type: String
  },
  verified: {
    default: false,
    required: true,
    type: Boolean
  }
});

// Create User model
const User = mongoose.model('user', userSchema);

// Module exports
module.exports = User;
