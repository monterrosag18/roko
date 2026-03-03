const db = require('./db-mysql');

// traer todos los proveedores
const getAll = async (req, res) => {
    try {
        const [proveedores] = await db.query('SELECT * FROM Suppliers ORDER BY id');
        res.json(proveedores);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al obtener proveedores' });
    }
};

// buscar un proveedor por id
const getById = async (req, res) => {
    try {
        const [proveedores] = await db.query('SELECT * FROM Suppliers WHERE id = ?', [req.params.id]);
        if (proveedores.length === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json(proveedores[0]);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al buscar el proveedor' });
    }
};

// crear un proveedor nuevo
const create = async (req, res) => {
    try {
        const { name, email } = req.body;
        const [result] = await db.query('INSERT INTO Suppliers (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al crear el proveedor' });
    }
};

// actualizar un proveedor
const update = async (req, res) => {
    try {
        const { name, email } = req.body;
        const [result] = await db.query('UPDATE Suppliers SET name=?, email=? WHERE id=?', [name, email, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor actualizado' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al actualizar el proveedor' });
    }
};

// eliminar un proveedor
const remove = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Suppliers WHERE id=?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor eliminado' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
};

module.exports = { getAll, getById, create, update, remove };
