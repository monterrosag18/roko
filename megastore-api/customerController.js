const db = require('./db-mysql');

// traer todos los clientes
const getAll = async (req, res) => {
    try {
        const [clientes] = await db.query('SELECT * FROM Customers ORDER BY id');
        res.json(clientes);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};

// buscar un cliente por id
const getById = async (req, res) => {
    try {
        const [clientes] = await db.query('SELECT * FROM Customers WHERE id = ?', [req.params.id]);
        if (clientes.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(clientes[0]);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al buscar el cliente' });
    }
};

// crear un cliente nuevo
const create = async (req, res) => {
    try {
        const { full_name, email, address, phone } = req.body;
        const [result] = await db.query(
            'INSERT INTO Customers (full_name, email, address, phone) VALUES (?, ?, ?, ?)',
            [full_name, email, address || null, phone || null]
        );
        res.status(201).json({ id: result.insertId, full_name, email, address, phone });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

// actualizar un cliente
const update = async (req, res) => {
    try {
        const { full_name, email, address, phone } = req.body;
        const [result] = await db.query(
            'UPDATE Customers SET full_name=?, email=?, address=?, phone=? WHERE id=?',
            [full_name, email, address || null, phone || null, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente actualizado' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// eliminar un cliente
const remove = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Customers WHERE id=?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

module.exports = { getAll, getById, create, update, remove };
