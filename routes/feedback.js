const express  = require('express');
const router = express.Router();
const db = require('../config/db');

//Route to submit feedback 

router.post('/submit-feedback', (req, res)  => {
     const { name: roll_no, email,subject,message } = req.body;

     if(!roll_no || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required'});
     }

     const query = 'INSERT INTO FEEDBACK (roll_no , email , subject , message ) VALUES (?,?,?,?)';
     db.query(query , [roll_no , email , subject , message], (error, results) => {
        if(error) {
            console.error('Error submitting feedback:', error );
            return res.status(500).json({ error: 'Failed to submit feedback'});

        }

        res.status(200).json({message: 'Feedback submitted successfully'});

     } );
});

module.exports = router;