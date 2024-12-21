const db = require('../db');

const Expense = {
    create: (amount, description, category, userId, callback) => {
        const query = 'INSERT INTO expenses (amount, description, category, user_id) VALUES (?, ?, ?, ?)';
        db.query(query, [amount, description, category, userId], callback);
    },
    getTotalExpensesByUserId: (userId, callback) => {
        const query = 'SELECT SUM(amount) as totalExpenses FROM expenses WHERE user_id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0].totalExpenses || 0);
        });
    },
    getAllByUserId: (userId, callback) => {
        const query = 'SELECT * FROM expenses WHERE user_id = ?';
        db.query(query, [userId], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM expenses WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Expense;