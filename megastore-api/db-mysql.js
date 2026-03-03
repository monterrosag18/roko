const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_megastore_exam'
});

pool.getConnection()
    .then(conn => {
        console.log('Conectado a MySQL');
        conn.release();
    })
    .catch(err => console.log('MySQL no disponible:', err.code || err.message));

module.exports = pool;