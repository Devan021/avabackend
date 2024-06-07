const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;


//Middle ware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session ({
        secret: 'your secret key',
        resave: false, 
        saveUninitialized: true,
}));

// Routes

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');

app.use('/api/auth',authRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT , () => {
    console.log("Server is running on port ${PORT}");

});






