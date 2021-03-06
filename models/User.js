// Module dependencies
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// User schema
const userSchema = new Schema({
  creationDate: {
    default: Date.now(),
    required: true,
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
    trim: true,
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
  oauthId: {
    type: String
  },
  password: {
    required: false,
    type: String
  },
  photo: {
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

// Password hash middleware
userSchema.pre('save', async function(next) {
  try {
    if (this.password) {
      // Generate a sult
      const salt = await bcrypt.genSalt(10);

      // Hash a password
      const hash = await bcrypt.hash(this.password, salt);

      // Overwrite a password with hash
      this.password = hash;
    }

    // Call the next middleware
    next();
  } catch (error) {
    // Return an error
    next(error);
  }
});

// Helper method to validate user's password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Compare passwords and return a comparison result
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create User model
const User = mongoose.model('user', userSchema);

// Module exports
module.exports = User;
