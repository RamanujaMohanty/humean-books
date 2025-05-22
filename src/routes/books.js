const express = require('express');
const router = express.Router();
const bookController = require('../logics/bookController');

// Catalog page with search and sort
router.get('/catalog', bookController.getCatalogPage);

// Route for single book details (optional, if you implement a separate page)
router.get('/:id', bookController.getSingleBookPage); // e.g., /books/123

module.exports = router;
