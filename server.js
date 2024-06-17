const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./config/db'); // Ensure this path is correct
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const feedbackRoutes = require('./routes/feedback');


app.use(express.static(path.join(__dirname, '../frontend/components')));


app.use('/api/auth', authRoutes);
app.use('/api',protectedRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});