const { getDb } = require('../config/database');

const Order = {
    createOrder: (userId, totalAmount, cartItems, callback) => {
        const db = getDb();
        db.serialize(() => {
            db.run('BEGIN TRANSACTION;'); // Start a transaction for atomicity

            db.run(
                `INSERT INTO orders (user_id, order_date, total_amount) VALUES (?, ?, ?)`,
                [userId, new Date().toISOString(), totalAmount],
                function(err) {
                    if (err) {
                        db.run('ROLLBACK;');
                        return callback(err);
                    }
                    const orderId = this.lastID;

                    const stmt = db.prepare(`INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)`);
                    let hasError = false;
                    cartItems.forEach(item => {
                        stmt.run([orderId, item.book_id, item.quantity, item.price_at_purchase], (err) => {
                            if (err) {
                                console.error("Error inserting order item:", err.message);
                                hasError = true;
                            }
                        });
                    });
                    stmt.finalize((err) => {
                        if (hasError || err) {
                            db.run('ROLLBACK;');
                            return callback(err || new Error("Error inserting one or more order items."));
                        }
                        db.run('COMMIT;', (commitErr) => {
                            callback(commitErr, orderId);
                        });
                    });
                }
            );
        });
    },

    getOrdersByUserId: (userId, callback) => {
        const db = getDb();
        const ordersSql = `SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC`;
        const itemsSql = `SELECT oi.*, b.title, b.author FROM order_items oi JOIN books b ON oi.book_id = b.id WHERE oi.order_id = ?`;

        db.all(ordersSql, [userId], (err, orders) => {
            if (err) return callback(err);

            if (orders.length === 0) {
                return callback(null, []); // No orders found
            }

            let completed = 0;
            orders.forEach(order => {
                db.all(itemsSql, [order.id], (err, items) => {
                    if (err) {
                        // Handle error but continue to try to get other orders
                        console.error(`Error fetching items for order ${order.id}:`, err.message);
                    }
                    order.items = items || []; // Attach items to the order object
                    completed++;
                    if (completed === orders.length) {
                        callback(null, orders);
                    }
                });
            });
        });
    }
};

module.exports = Order;
