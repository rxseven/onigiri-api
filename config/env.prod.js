module.exports = {
  mongoDB: {
    URI: process.env.MONGODB_URI
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
