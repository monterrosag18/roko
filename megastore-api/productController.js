const db = require('./db-mysql');

// GET /api/products - Obtener todos los productos (con JOIN a Categories y Suppliers)
exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.id, p.sku, p.name, p.price, 
                   p.category_id, c.name AS category_name,
                   p.supplier_id, s.name AS supplier_name
            FROM Products p
            JOIN Categories c ON p.category_id = c.id
            JOIN Suppliers s ON p.supplier_id = s.id
            ORDER BY p.id
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// GET /api/products/:id - Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(`
            SELECT p.id, p.sku, p.name, p.price, 
                   p.category_id, c.name AS category_name,
                   p.supplier_id, s.name AS supplier_name
            FROM Products p
            JOIN Categories c ON p.category_id = c.id
            JOIN Suppliers s ON p.supplier_id = s.id
            WHERE p.id = ?
        `, [id]);

        if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// POST /api/products - Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { sku, name, price, category_id, supplier_id } = req.body;

        if (!sku || !name || !price || !category_id || !supplier_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios: sku, name, price, category_id, supplier_id' });
        }

        const [result] = await db.query(
            'INSERT INTO Products (sku, name, price, category_id, supplier_id) VALUES (?, ?, ?, ?, ?)',
            [sku, name, price, category_id, supplier_id]
        );

        res.status(201).json({ id: result.insertId, sku, name, price, category_id, supplier_id });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un producto con ese SKU' });
        }
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// PUT /api/products/:id - Actualizar un producto existente
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { sku, name, price, category_id, supplier_id } = req.body;

        if (!sku || !name || !price || !category_id || !supplier_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios: sku, name, price, category_id, supplier_id' });
        }

        const [existing] = await db.query('SELECT * FROM Products WHERE id = ?', [id]);
        if (existing.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });

        await db.query(
            'UPDATE Products SET sku = ?, name = ?, price = ?, category_id = ?, supplier_id = ? WHERE id = ?',
            [sku, name, price, category_id, supplier_id, id]
        );

        res.json({ id: parseInt(id), sku, name, price, category_id, supplier_id });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un producto con ese SKU' });
        }
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// DELETE /api/products/:id - Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query('SELECT * FROM Products WHERE id = ?', [id]);

        if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });

        const productData = rows[0];
        console.log("LOG - Eliminando Producto:", productData);

        await db.query('DELETE FROM Products WHERE id = ?', [id]);

        res.json({ message: 'Producto eliminado exitosamente', deleted: productData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};