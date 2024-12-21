const db = require('../db');

const Expense = {
    create: (amount, description, category, userId, callback) => {
        const query = 'INSERT INTO expenses (amount, description, category, user_id) VALUES (?, ?, ?, ?)';
        db.query(query, [amount, description, category, userId], (err, result) => {
            if (err) return callback(err);
            const updateQuery = 'UPDATE userlogin SET total_expenses = total_expenses + ? WHERE id = ?';
            db.query(updateQuery, [amount, userId], callback);
        });
    },
    getAllByUserId: (userId, callback) => {
        const query = 'SELECT * FROM expenses WHERE user_id = ?';
        db.query(query, [userId], callback);
    },
    delete: (id, callback) => {
        const getAmountQuery = 'SELECT amount, user_id FROM expenses WHERE id = ?';
        db.query(getAmountQuery, [id], (err, results) => {
            if (err) return callback(err);
            const amount = results[0].amount;
            const userId = results[0].user_id;
            const deleteQuery = 'DELETE FROM expenses WHERE id = ?';
            db.query(deleteQuery, [id], (err, result) => {
                if (err) return callback(err);
                const updateQuery = 'UPDATE userlogin SET total_expenses = total_expenses - ? WHERE id = ?';
                db.query(updateQuery, [amount, userId], callback);
            });
        });
    }
};

module.exports = Expense;