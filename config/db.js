const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host:'localhost',
    user: 'your-database-password',
    database: 'your database-name',
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0 
});

module.exports = pool;