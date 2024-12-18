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
};

module.exports = User;
