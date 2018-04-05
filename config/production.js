module.exports = {
  doorway: {
    URI: process.env.DOORWAY_URI,
    tracking: process.env.DOORWAY_TRACKING
  },
  mongoDB: {
    URI: process.env.MONGODB_URI
  },
  sendgrid: {
    key: process.env.SENDGRID_KEY
  },
  stripe: {
    key: {
      publishable: process.env.STRIPE_PUBLISHABLE_KEY,
      secret: process.env.STRIPE_SECRET_KEY
    }
  },
  token: {
    secret: process.env.TOKEN_SECRET
  }
};