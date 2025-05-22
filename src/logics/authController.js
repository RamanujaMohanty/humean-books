const User = require('../models/user');
const bcrypt = require('bcrypt'); // Used for password hashing

const authController = {
    getSignInPage: (req, res) => {
        res.render('signin.html', { message: null }); // Render sign-in page
    },

    // Handle user sign-in
    signIn: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (err, user) => {
            if (err) {
                console.error("Error during sign-in:", err.message);
                return res.render('signin.html', { message: 'An error occurred. Please try again.' });
            }
            if (!user) {
                return res.render('signin.html', { message: 'Invalid username or password.' });
            }

            // In a real app: Compare hashed password
            // bcrypt.compare(password, user.password, (err, result) => {
            //     if (err || !result) {
            //         return res.render('signin.html', { message: 'Invalid username or password.' });
            //     }
            //     // Success: User is authenticated.
            //     // Implement session management here (e.g., store user ID in session)
            //     req.session.userId = user.id; // Requires 'express-session' middleware
            //     res.redirect('/orders/history'); // Redirect to a protected page
            // });

            // For now, very basic plain text password check (temporary for initial setup)
            if (user.password === password) {
                // IMPORTANT: This is highly insecure. Replace with bcrypt.compare()
                console.log(`User ${user.username} signed in (insecurely).`);
                // In a real app, you'd set a session here.
                // req.session.userId = user.id; // You'd need 'express-session'
                res.redirect('/'); // Redirect to homepage or dashboard after sign-in
            } else {
                return res.render('signin.html', { message: 'Invalid username or password.' });
            }
        });
    },

    // Handle user registration
    register: (req, res) => {
        const { username, email, password } = req.body;

        User.findByUsername(username, (err, existingUser) => {
            if (err) {
                console.error("Error during registration (username check):", err.message);
                return res.render('signin.html', { message: 'Registration failed. Please try again.' });
            }
            if (existingUser) {
                return res.render('signin.html', { message: 'Username already taken.' });
            }

            User.findByEmail(email, (err, existingEmail) => {
                if (err) {
                    console.error("Error during registration (email check):", err.message);
                    return res.render('signin.html', { message: 'Registration failed. Please try again.' });
                }
                if (existingEmail) {
                    return res.render('signin.html', { message: 'Email already registered.' });
                }

                // Hash password BEFORE saving to DB
                // const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt rounds
                // User.create({ username, email, password: hashedPassword }, (err, userId) => {

                // For now, very basic plain text password storage (temporary for initial setup)
                User.create({ username, email, password: password }, (err, userId) => { // Remember to hash password!
                    if (err) {
                        console.error("Error during registration:", err.message);
                        return res.render('signin.html', { message: 'Registration failed.' });
                    }
                    console.log(`User registered with ID: ${userId}`);
                    res.render('signin.html', { message: 'Registration successful! Please sign in.' });
                });
            });
        });
    },

    // Placeholder for sign out logic
    signOut: (req, res) => {
        // Implement session destruction here
        // req.session.destroy(() => {
        //     res.redirect('/');
        // });
        res.redirect('/'); // For now, just redirect
    }
};

module.exports = authController;
