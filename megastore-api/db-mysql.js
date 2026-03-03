const mysql = require('mysql2/promise');

// conexion a mysql
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Riwi2025**',
    database: 'db_megastore_exam'
});

// verifico que conecte bien
pool.getConnection()
    .then(() => console.log('Conectado a MySQL correctamente'))
    .catch(err => console.log('Error conectando a MySQL:', err));

module.exports = pool;