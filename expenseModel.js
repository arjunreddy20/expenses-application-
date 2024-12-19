const db = require('../db');

const Expense = {
    create: (userId, amount, description, category, callback) => {
        const query = 'INSERT INTO expenses (user_id, amount, description, category) VALUES (?, ?, ?, ?)';
        db.query(query, [userId, amount, description, category], callback);
    },
    getAllByUserId: (userId, callback) => {
        const query = 'SELECT * FROM expenses WHERE user_id = ?';
        db.query(query, [userId], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM expenses WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Expense;