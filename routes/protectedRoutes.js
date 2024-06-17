
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// Protected route example
router.get('/dashboard', auth, (req, res) => {
    res.send('Welcome to the dashboard!');
});

module.exports = router;
