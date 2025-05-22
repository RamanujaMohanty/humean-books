const { getDb } = require('../config/database');

const Book = {
    getAll: (filters, sort, callback) => {
        const db = getDb();
        let sql = `SELECT * FROM books WHERE 1=1`;
        const params = [];

        // Apply filters
        if (filters.search) {
            sql += ` AND (title LIKE ? OR author LIKE ?)`;
            params.push(`%${filters.search}%`, `%${filters.search}%`);
        }
        if (filters.minPrice) {
            sql += ` AND price >= ?`;
            params.push(filters.minPrice);
        }
        if (filters.maxPrice) {
            sql += ` AND price <= ?`;
            params.push(filters.maxPrice);
        }
        if (filters.author) {
            sql += ` AND author LIKE ?`;
            params.push(`%${filters.author}%`);
        }
        if (filters.year) {
            sql += ` AND year_of_release = ?`;
            params.push(filters.year);
        }

        // Apply sorting
        switch (sort) {
            case 'title_asc': sql += ` ORDER BY title ASC`; break;
            case 'title_desc': sql += ` ORDER BY title DESC`; break;
            case 'author_asc': sql += ` ORDER BY author ASC`; break;
            case 'author_desc': sql += ` ORDER BY author DESC`; break;
            case 'price_asc': sql += ` ORDER BY price ASC`; break;
            case 'price_desc': sql += ` ORDER BY price DESC`; break;
            case 'year_asc': sql += ` ORDER BY year_of_release ASC`; break;
            case 'year_desc': sql += ` ORDER BY year_of_release DESC`; break;
            default: sql += ` ORDER BY title ASC`; // Default sort
        }

        db.all(sql, params, callback);
    },

    getById: (id, callback) => {
        const db = getDb();
        db.get(`SELECT * FROM books WHERE id = ?`, [id], callback);
    },

    getRecentAdditions: (limit, callback) => {
        const db = getDb();
        db.all(`SELECT * FROM books WHERE is_recent_addition = 1 ORDER BY id DESC LIMIT ?`, [limit], callback);
    },

    addBook: (bookData, callback) => {
        const db = getDb();
        const { title, author, year_of_release, price, description, image_url, is_recent_addition } = bookData;
        db.run(`INSERT INTO books (title, author, year_of_release, price, description, image_url, is_recent_addition) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, author, year_of_release, price, description, image_url, is_recent_addition || 0],
            function(err) { // Use function() to access this.lastID
                callback(err, this ? this.lastID : null);
            }
        );
    }
    // You can add update, delete methods here as well
};

module.exports = Book;
