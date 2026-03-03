const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'Riwi2025**', 
    database: 'db_megastore_exam'
});


pool.getConnection()
    .then(() => console.log('¡felicidades al fin de tanto sufrimiento :V!'))
    .catch(err => console.error('Error conectando a MySQL:', err));

module.exports = pool;