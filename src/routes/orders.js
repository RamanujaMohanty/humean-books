const express = require('express');
const router = express.Router();
const orderController = require('../logics/orderController');

// Checkout page
router.get('/checkout', orderController.getCheckoutPage);

// Handle placing an order
router.post('/checkout', orderController.placeOrder);

// Order history page
router.get('/history', orderController.getOrderHistoryPage);

module.exports = router;
