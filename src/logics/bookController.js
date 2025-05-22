const Book = require('../models/book');

const bookController = {
    // Render the homepage with recent additions
    getHomepage: (req, res) => {
        Book.getRecentAdditions(6, (err, recentBooks) => { // Get up to 6 recent books
            if (err) {
                console.error("Error fetching recent books:", err.message);
                return res.status(500).send("Error loading homepage.");
            }
            res.render('index.html', { recentBooks: recentBooks });
        });
    },

    // Render the catalog page with search and sort functionality
    getCatalogPage: (req, res) => {
        const filters = {
            search: req.query.search,
            minPrice: parseFloat(req.query.minPrice),
            maxPrice: parseFloat(req.query.maxPrice),
            author: req.query.author,
            year: parseInt(req.query.year)
        };
        const sort = req.query.sort || 'title_asc'; // Default sort

        Book.getAll(filters, sort, (err, books) => {
            if (err) {
                console.error("Error fetching books for catalog:", err.message);
                return res.status(500).send("Error loading catalog.");
            }
            res.render('catalog.html', { books: books, query: req.query }); // Pass books and current query for form fields
        });
    },

    // Get details for a single book (if you implement this later)
    getSingleBookPage: (req, res) => {
        const bookId = req.params.id;
        Book.getById(bookId, (err, book) => {
            if (err) {
                console.error("Error fetching single book:", err.message);
                return res.status(500).send("Error loading book details.");
            }
            if (!book) {
                return res.status(404).send("Book not found.");
            }
            // You would typically have a 'book_details.html' template for this
            res.send(`<h1>${book.title}</h1><p>${book.description}</p>`); // Simple placeholder
        });
    }
};

module.exports = bookController;
