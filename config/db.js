const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host:'localhost',
    user: 'dev',
    database: 'amrita_seva',
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0 
});

// Test the connection 
async function testConnection() {

    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database as id' + connection.threadId);
        connection.release();
    } catch (err)  {

    console.log('Error connecting to the database: ' +  err.stack);
}
}

testConnection();

module.exports = pool;