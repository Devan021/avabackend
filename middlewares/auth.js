const pool = require('../config/db');

const auth = async (req, res, next) => {
    // Check if the user is authenticated
    if (req.session && req.session.isAuthenticated) {
        next(); // Allow the request to proceed
    } else {
        res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
};

module.exports = auth;
