const { getDb } = require('../config/database');
const bcrypt = require('bcrypt'); // We'll install this later for password hashing

const User = {
    findByUsername: (username, callback) => {
        const db = getDb();
        db.get(`SELECT * FROM users WHERE username = ?`, [username], callback);
    },

    findByEmail: (email, callback) => {
        const db = getDb();
        db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
    },

    create: (userData, callback) => {
        const db = getDb();
        // In a real app, hash the password BEFORE storing
        // For now, storing plain text, but we'll come back to this.
        const { username, email, password } = userData;
        db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [username, email, password], // Remember to hash password here!
            function(err) {
                callback(err, this ? this.lastID : null);
            }
        );
    }
};

module.exports = User;
