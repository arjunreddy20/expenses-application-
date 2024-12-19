const jwt = require('jsonwebtoken');

const userAuthentication = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, 'private_key');
        req.userId = decoded.userId;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = userAuthentication;