require('dotenv').config(); // MUST be at the very top to load environment variables

const express = require('express');
const path = require('path');
const { connectDb } = require('./config/database'); // Import the connectDb function

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse URL-encoded data (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Configure Express to use EJS as the view engine for HTML files
app.set('views', path.join(__dirname, '../views'));
app.engine('html', require('ejs').renderFile); // Use EJS to render .html files
app.set('view engine', 'html'); // Tell Express to use 'html' as the view engine

// --- Routes ---
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

// Use the routes
app.use('/', indexRoutes); // For homepage and potentially other general routes
app.use('/books', bookRoutes); // Routes for catalog, searching, etc.
app.use('/auth', authRoutes); // Routes for sign-in/out
app.use('/orders', orderRoutes); // Routes for checkout and order history

// --- Start Server and Connect to Database ---
async function startServer() {
    try {
        await connectDb(); // Connect to the database
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
            console.log('Press Ctrl+C to stop');
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1); // Exit process if database connection fails
    }
}

startServer();
