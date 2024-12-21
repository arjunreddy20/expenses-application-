const jwt = require('jsonwebtoken');
require('dotenv').config();

const userAuthentication = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.userId = decoded.userId;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = userAuthentication;