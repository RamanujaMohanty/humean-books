const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Resolve the path to your database file
const dbPath = path.resolve(__dirname, '../../data/humean_books.sqlite');

let db;

function connectDb() {
    return new Promise((resolve, reject) => {
        // Open the database connection
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error connecting to database:', err.message);
                reject(err);
            } else {
                console.log('Connected to the SQLite database.');
                // Create tables if they don't exist
                db.serialize(() => {
                    // Books Table
                    db.run(`
                        CREATE TABLE IF NOT EXISTS books (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            title TEXT NOT NULL,
                            author TEXT NOT NULL,
                            year_of_release INTEGER NOT NULL,
                            price REAL NOT NULL,
                            description TEXT,
                            image_url TEXT,
                            is_recent_addition INTEGER DEFAULT 0 -- 1 for true, 0 for false for banner ads
                        )
                    `, (err) => {
                        if (err) console.error("Error creating books table:", err.message);
                        else console.log("Books table ensured.");
                    });

                    // Users Table (for sign-in and order history)
                    db.run(`
                        CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username TEXT UNIQUE NOT NULL,
                            email TEXT UNIQUE NOT NULL,
                            password TEXT NOT NULL -- In a real app, hash this password!
                        )
                    `, (err) => {
                        if (err) console.error("Error creating users table:", err.message);
                        else console.log("Users table ensured.");
                    });

                    // Orders Table
                    db.run(`
                        CREATE TABLE IF NOT EXISTS orders (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            user_id INTEGER NOT NULL,
                            order_date TEXT NOT NULL, -- Stored as YYYY-MM-DD HH:MM:SS
                            total_amount REAL NOT NULL,
                            FOREIGN KEY (user_id) REFERENCES users(id)
                        )
                    `, (err) => {
                        if (err) console.error("Error creating orders table:", err.message);
                        else console.log("Orders table ensured.");
                    });

                    // Order_Items Table (for books within an order)
                    db.run(`
                        CREATE TABLE IF NOT EXISTS order_items (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            order_id INTEGER NOT NULL,
                            book_id INTEGER NOT NULL,
                            quantity INTEGER NOT NULL,
                            price_at_purchase REAL NOT NULL,
                            FOREIGN KEY (order_id) REFERENCES orders(id),
                            FOREIGN KEY (book_id) REFERENCES books(id)
                        )
                    `, (err) => {
                        if (err) console.error("Error creating order_items table:", err.message);
                        else console.log("Order_Items table ensured.");
                    });

                    // Optional: Insert some dummy data for testing
                    // db.run(`INSERT OR IGNORE INTO books (title, author, year_of_release, price, is_recent_addition) VALUES ('Moby Dick', 'Herman Melville', 1851, 1200.00, 1)`);
                    // db.run(`INSERT OR IGNORE INTO books (title, author, year_of_release, price, is_recent_addition) VALUES ('Pride and Prejudice', 'Jane Austen', 1813, 850.50, 0)`);
                    // db.run(`INSERT OR IGNORE INTO books (title, author, year_of_release, price, is_recent_addition) VALUES ('1984', 'George Orwell', 1949, 300.75, 1)`);
                });
                resolve(db);
            }
        });
    });
}

function getDb() {
    if (!db) {
        throw new Error('Database not connected. Call connectDb() first.');
    }
    return db;
}

module.exports = {
    connectDb,
    getDb
};
