const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(password, rows[0].password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        req.session.user = {
            id: rows[0].id,
            username: rows[0].username,
            role: rows[0].role
        };

        if (rows[0].role === 'admin') {
            res.redirect('/admin-dashboard');
        } else {
            res.redirect('/student-dashboard');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;