const Order = require('../models/order');
const Book = require('../models/book'); // Might need this to get book prices for cart

// In a real application, you'd likely manage the cart in a session or a separate database table.
// For simplicity here, we'll assume a dummy cart or pass items directly.
let dummyCart = []; // Temporary in-memory cart for demonstration

const orderController = {
    // Render the checkout page
    getCheckoutPage: (req, res) => {
        // In a real app, load cart items from session/DB
        // For demo: Let's pretend user added some items to cart
        // Fetch real book data for dummy cart items
        Book.getById(1, (err, book1) => {
            Book.getById(2, (err, book2) => {
                if(book1) dummyCart.push({ book_id: book1.id, title: book1.title, price: book1.price, quantity: 1 });
                if(book2) dummyCart.push({ book_id: book2.id, title: book2.title, price: book2.price, quantity: 2 });

                const totalAmount = dummyCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                res.render('checkout.html', { cartItems: dummyCart, totalAmount: totalAmount });
            });
        });
    },

    // Handle placing an order
    placeOrder: (req, res) => {
        // In a real app, userId would come from session
        const userId = 1; // Dummy user ID for now

        // Get actual cart items and calculate total (from session/DB)
        const cartItemsForOrder = dummyCart.map(item => ({
            book_id: item.book_id,
            quantity: item.quantity,
            price_at_purchase: item.price // Store price at time of purchase
        }));
        const totalAmount = cartItemsForOrder.reduce((sum, item) => sum + (item.price_at_purchase * item.quantity), 0);

        if (cartItemsForOrder.length === 0) {
            return res.redirect('/books/catalog'); // Redirect if cart is empty
        }

        Order.createOrder(userId, totalAmount, cartItemsForOrder, (err, orderId) => {
            if (err) {
                console.error("Error placing order:", err.message);
                return res.status(500).send("Failed to place order.");
            }
            console.log(`Order placed with ID: ${orderId}`);
            dummyCart = []; // Clear dummy cart after order
            res.redirect('/orders/history'); // Redirect to order history
        });
    },

    // Render order history page for a user
    getOrderHistoryPage: (req, res) => {
        // In a real app, userId would come from session
        const userId = 1; // Dummy user ID for now

        Order.getOrdersByUserId(userId, (err, orders) => {
            if (err) {
                console.error("Error fetching order history:", err.message);
                return res.status(500).send("Error loading order history.");
            }
            res.render('orderhistory.html', { orders: orders });
        });
    }
};

module.exports = orderController;
