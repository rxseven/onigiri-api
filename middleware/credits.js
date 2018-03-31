// Credits middleware
module.exports = {
  requireCredits: (req, res, next) => {
    // Verify credits
    if (req.user.credits.balance < 1) {
      return res.status(403).send({ error: { message: 'Not enough credits' } });
    }

    // Call the next middleware
    next();
  }
};
