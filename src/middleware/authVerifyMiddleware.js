const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided.' });
    }

    jwt.verify(token, authConfig.jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }

        req.user = user;  // Attach the decoded user to the request object
        next();  // Allow the request to proceed to the next handler
    });
};

module.exports = authenticateToken;
