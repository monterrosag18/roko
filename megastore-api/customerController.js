const db = require('./db-mysql');

// GET /api/customers - Obtener todos los clientes
exports.getAllCustomers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Customers ORDER BY id');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};

// GET /api/customers/:id - Obtener un cliente por ID
exports.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM Customers WHERE id = ?', [id]);

        if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// POST /api/customers - Crear un nuevo cliente
exports.createCustomer = async (req, res) => {
    try {
        const { full_name, email, address, phone } = req.body;

        if (!full_name || !email) {
            return res.status(400).json({ error: 'Los campos full_name y email son obligatorios' });
        }

        const [result] = await db.query(
            'INSERT INTO Customers (full_name, email, address, phone) VALUES (?, ?, ?, ?)',
            [full_name, email, address || null, phone || null]
        );

        res.status(201).json({ id: result.insertId, full_name, email, address, phone });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un cliente con ese email' });
        }
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

// PUT /api/customers/:id - Actualizar un cliente
exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, address, phone } = req.body;

        if (!full_name || !email) {
            return res.status(400).json({ error: 'Los campos full_name y email son obligatorios' });
        }

        const [existing] = await db.query('SELECT * FROM Customers WHERE id = ?', [id]);
        if (existing.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });

        await db.query(
            'UPDATE Customers SET full_name = ?, email = ?, address = ?, phone = ? WHERE id = ?',
            [full_name, email, address || null, phone || null, id]
        );

        res.json({ id: parseInt(id), full_name, email, address, phone });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un cliente con ese email' });
        }
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// DELETE /api/customers/:id - Eliminar un cliente
exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query('SELECT * FROM Customers WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });

        await db.query('DELETE FROM Customers WHERE id = ?', [id]);
        res.json({ message: 'Cliente eliminado exitosamente', deleted: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};
