const db = require('./db-mysql');

// traer todas las categorias
const getAll = async (req, res) => {
    try {
        const [categorias] = await db.query('SELECT * FROM Categories ORDER BY id');
        res.json(categorias);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al obtener categorias' });
    }
};

// buscar una categoria por id
const getById = async (req, res) => {
    try {
        const [categorias] = await db.query('SELECT * FROM Categories WHERE id = ?', [req.params.id]);
        if (categorias.length === 0) {
            return res.status(404).json({ error: 'Categoria no encontrada' });
        }
        res.json(categorias[0]);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al buscar la categoria' });
    }
};

// crear una categoria nueva
const create = async (req, res) => {
    try {
        const { name } = req.body;
        const [result] = await db.query('INSERT INTO Categories (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al crear la categoria' });
    }
};

// actualizar una categoria
const update = async (req, res) => {
    try {
        const { name } = req.body;
        const [result] = await db.query('UPDATE Categories SET name=? WHERE id=?', [name, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoria no encontrada' });
        }
        res.json({ message: 'Categoria actualizada' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al actualizar la categoria' });
    }
};

// eliminar una categoria
const remove = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Categories WHERE id=?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoria no encontrada' });
        }
        res.json({ message: 'Categoria eliminada' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Error al eliminar la categoria' });
    }
};

module.exports = { getAll, getById, create, update, remove };
