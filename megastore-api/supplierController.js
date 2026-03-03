const db = require('./db-mysql');

exports.getAllSuppliers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Suppliers ORDER BY id');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener proveedores' });
    }
};

exports.getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM Suppliers WHERE id = ?', [id]);

        if (rows.length === 0) return res.status(404).json({ error: 'Proveedor no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el proveedor' });
    }
};

exports.createSupplier = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Los campos name y email son obligatorios' });
        }

        const [result] = await db.query('INSERT INTO Suppliers (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un proveedor con ese email' });
        }
        res.status(500).json({ error: 'Error al crear el proveedor' });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Los campos name y email son obligatorios' });
        }

        const [existing] = await db.query('SELECT * FROM Suppliers WHERE id = ?', [id]);
        if (existing.length === 0) return res.status(404).json({ error: 'Proveedor no encontrado' });

        await db.query('UPDATE Suppliers SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        res.json({ id: parseInt(id), name, email });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un proveedor con ese email' });
        }
        res.status(500).json({ error: 'Error al actualizar el proveedor' });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM Suppliers WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Proveedor no encontrado' });

        await db.query('DELETE FROM Suppliers WHERE id = ?', [id]);
        res.json({ message: 'Proveedor eliminado exitosamente', deleted: rows[0] });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({ error: 'No se puede eliminar: hay productos asociados a este proveedor' });
        }
        res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
};
