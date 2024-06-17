const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin', 
    password: 'admin123', 
    database: 'amrita_seva'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.execute(query, [username, hashedPassword], (err, results) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.execute(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Error fetching user' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    });
});

module.exports = router;
