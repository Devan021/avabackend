const express = require('express');
const db = require('../config/db');
const { check , validationResult } = require('express-validator');
const auth = require('../middlewares/auth');

const router = express.Router();

// Middleware to verify the token 

router.use(auth);

// Get services 
router.get('/services' , async (req, res) => {
    // Fetch available services

});

router.post('/order', [
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('room_no', 'Room no is required').not().isEmpty(),
    check('service_type','Service type is required').isIn(['laundry','cleaning']),
    check('items','Items are required').not().isEmpty(),
    check('amount','Amount is required').isFloat(),
],    async (req, res ) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const { hostel , room_no , service_type, items , amount } = req.body;
        const user_id = req.usr.id;
    

    try {
        await db.query('INSERT INTO orders (user_id , hostel ,room_no , service_type , items , amount ) VALUES(?,?,?,?,?,?)',
                      [user_id, hostel, room_no, service_type, items , amount]);
        res.status(201).json({ msg: 'Order created Sucessfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');

    }

});

module.exports = router;
