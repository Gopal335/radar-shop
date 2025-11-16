const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// owner & user registration/login
router.post('/register', auth.registerOwner);
router.post('/register-user', auth.registerUser);
router.post('/login', auth.loginOwner);
router.post('/login-user', auth.loginUser);

module.exports = router;