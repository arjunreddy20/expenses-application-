const db = require('../db');

const Order = {
    create: (orderId, userId, callback) => {
        const query = 'INSERT INTO orders (orderId, userId) VALUES (?, ?)';
        db.query(query, [orderId, userId], callback);
    },
    updateStatus: (orderId, status, paymentId, callback) => {
        const query = 'UPDATE orders SET status = ?, paymentId = ? WHERE orderId = ?';
        db.query(query, [status, paymentId, orderId], callback);
    },
    findByOrderId: (orderId, callback) => {
        const query = 'SELECT * FROM orders WHERE orderId = ?';
        db.query(query, [orderId], callback);
    },
};

module.exports = Order;