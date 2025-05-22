const express = require('express');
const router = express.Router();
const authController = require('../logics/authController');

// Show sign-in/registration form
router.get('/signin', authController.getSignInPage);

// Handle sign-in form submission
router.post('/signin', authController.signIn);

// Handle registration form submission
router.post('/register', authController.register);

// Handle sign out (GET for simplicity, but POST is better practice)
router.get('/signout', authController.signOut);

module.exports = router;
