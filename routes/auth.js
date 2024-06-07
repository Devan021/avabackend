const express = require('express');
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check , validationResult } = require('express-validator');
const db = require('../config/db');

const router = express.Router();



// Register Route 

router.post('/register' , [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('Role', 'Role is required').isIn(['student', 'admin']),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username , password , role } = req.body;


    try {
        let user = await db.query('SELECT * FROM users WHERE username = ?' , [username]);
        if(user.length > 0 ) {
            return res.status(400).json({msg: 'User already exists'});
        }

        const salt = await bcyrpt.genSalt(10);
        const hashedPassword = await bcyrpt.hash(password, salt);

        await db.query('INSERT INTO users (username , password , role ) VALUES (?,?,?)', [username , hashedPassword, role]);

        res.status(201).json({ msg: 'User registered succesfully'});

    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server erorr');
    }
});


 // Login Route 

 router.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { username, password } = req.body;
  
    try {
      let user = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (user.length === 0) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const payload = {
        user: {
          id: user[0].id,
          role: user[0].role
        }
      };
  
      jwt.sign(payload, 'your-jwt-secret', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  module.exports = router;
