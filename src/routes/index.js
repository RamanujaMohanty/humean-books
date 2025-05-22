const express = require('express');
const router = express.Router();
const bookController = require('../logics/bookController');

// Homepage route
router.get('/', bookController.getHomepage);

module.exports = router;
