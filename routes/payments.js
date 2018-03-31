// Module dependencies
const router = require('express-promise-router')();

const paymentsController = require('../controllers/payments');
const { requireJWT } = require('../middleware/auth');

// Checkout
router.route('/checkout').post(requireJWT, paymentsController.checkout);

// Module exports
module.exports = router;
