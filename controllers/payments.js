// Module dependencies
const config = require('config');
const stripe = require('stripe')(config.stripe.key.secret);

const User = require('../models/User');

// Payments controller
module.exports = {
  // Checkout
  checkout: async (req, res, next) => {
    // Configuration
    const credits = 5;

    // Charge a credit card via Stripe Checkout
    await stripe.charges.create({
      amount: credits * 100,
      currency: 'usd',
      description: '$5.00 for 5 survey credits',
      source: req.body.id
    });

    // Update (increment) user's credits and checkout date
    req.user.credits.balance += credits;
    req.user.credits.lastCheckout = Date.now();
    await User.findByIdAndUpdate(req.user.id, {
      credits: req.user.credits
    });

    // Return a response
    res.status(200).json({
      balance: req.user.credits.balance,
      lastCheckout: req.user.credits.lastCheckout
    });
  }
};
