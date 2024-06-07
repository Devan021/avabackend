const express = require('express');
const db = require('../config/db');
const auth = require('../middlewares/auth');

const router = express.Router();

// Middleware to verify token and check admin role 
router.use(auth, (req, res , next ) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({msg: 'Access denied'});

    }

    next();
});


// Get all orders 
router.get('orders', async (req, res )=> {
    try { 
        const [orders] = await db.query('SELECT * FROM orders');
        res.json(orders);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;