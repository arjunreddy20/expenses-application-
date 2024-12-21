const db = require('../db');

const User = {
    create: (name, email, password, callback) => {
        const query = 'INSERT INTO userlogin (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, password], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM userlogin WHERE email = ?';
        db.query(query, [email], callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM userlogin WHERE id = ?';
        db.query(query, [id], callback);
    },
    updatePremiumStatus: (userId, isPremiumUser, callback) => {
        const query = 'UPDATE userlogin SET isPremiumUser = ? WHERE id = ?';
        db.query(query, [isPremiumUser, userId], callback);
    },
    getAllUsers: (callback) => {
        const query = 'SELECT id, name, email, total_expenses FROM userlogin';
        db.query(query, callback);
    }
};

module.exports = User;