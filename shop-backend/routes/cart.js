const express = require('express');
const router = express.Router();
const cart = require('../controllers/cartController');

router.post('/add-to-cart', cart.addToCart);
router.get('/get-cart/:userName', cart.getCart);
router.delete('/remove-from-cart', cart.removeFromCart);

module.exports = router;