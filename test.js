const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin123',
    database: 'amrita_seva',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function insertUser(username, plainPassword, email, role) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', 
        [username, hashedPassword, email, role]);
    connection.release();
}

async function insertInitialUsers() {
    await insertUser('Ashwin', '123456789', 'amscu3csc21014@am.students.amrita.edu', 'student');
    await insertUser('Abhiram', '123456789', 'amscu3csc21003@am.students.amrita.edu', 'student');
    await insertUser('Rajaguru', '123456789', 'amscu3csc21046@am.students.amrita.edu', 'student');
    console.log('Initial users inserted successfully');
}

insertInitialUsers().catch(err => console.error('Error inserting users:', err));
