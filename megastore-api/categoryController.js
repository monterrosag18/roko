const db = require('./db-mysql');

exports.getAllCategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Categories ORDER BY id');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM Categories WHERE id = ?', [id]);

        if (rows.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'El campo name es obligatorio' });
        }

        const [result] = await db.query('INSERT INTO Categories (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe una categoría con ese nombre' });
        }
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'El campo name es obligatorio' });
        }

        const [existing] = await db.query('SELECT * FROM Categories WHERE id = ?', [id]);
        if (existing.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });

        await db.query('UPDATE Categories SET name = ? WHERE id = ?', [name, id]);
        res.json({ id: parseInt(id), name });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe una categoría con ese nombre' });
        }
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM Categories WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });

        await db.query('DELETE FROM Categories WHERE id = ?', [id]);
        res.json({ message: 'Categoría eliminada exitosamente', deleted: rows[0] });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({ error: 'No se puede eliminar: hay productos asociados a esta categoría' });
        }
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};
