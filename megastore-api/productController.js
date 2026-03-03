const db = require('./db-mysql');

// traer todos los productos con su categoria y proveedor
const getAll = async (req, res) => {
    try {
        const [productos] = await db.query(
            `SELECT p.*, c.name AS category_name, s.name AS supplier_name
             FROM Products p
             JOIN Categories c ON p.category_id = c.id
             JOIN Suppliers s ON p.supplier_id = s.id
             ORDER BY p.id`
        );
        res.json(productos);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// buscar un producto por su id
const getById = async (req, res) => {
    try {
        const [productos] = await db.query(
            `SELECT p.*, c.name AS category_name, s.name AS supplier_name
             FROM Products p
             JOIN Categories c ON p.category_id = c.id
             JOIN Suppliers s ON p.supplier_id = s.id
             WHERE p.id = ?`,
            [req.params.id]
        );
        if (productos.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(productos[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al buscar el producto' });
    }
};

// crear un producto nuevo
const create = async (req, res) => {
    try {
        const { sku, name, price, category_id, supplier_id } = req.body;
        const [result] = await db.query(
            'INSERT INTO Products (sku, name, price, category_id, supplier_id) VALUES (?, ?, ?, ?, ?)',
            [sku, name, price, category_id, supplier_id]
        );
        res.status(201).json({ id: result.insertId, sku, name, price, category_id, supplier_id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// actualizar un producto existente
const update = async (req, res) => {
    try {
        const { sku, name, price, category_id, supplier_id } = req.body;
        const [result] = await db.query(
            'UPDATE Products SET sku=?, name=?, price=?, category_id=?, supplier_id=? WHERE id=?',
            [sku, name, price, category_id, supplier_id, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// eliminar un producto
const remove = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Products WHERE id=?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = { getAll, getById, create, update, remove };