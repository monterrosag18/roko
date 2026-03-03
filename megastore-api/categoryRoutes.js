const express = require('express');
const router = express.Router();
const categoryController = require('./categoryController');

// CRUD completo de Categories
router.get('/', categoryController.getAllCategories);        // GET /api/categories
router.get('/:id', categoryController.getCategoryById);      // GET /api/categories/:id
router.post('/', categoryController.createCategory);         // POST /api/categories
router.put('/:id', categoryController.updateCategory);       // PUT /api/categories/:id
router.delete('/:id', categoryController.deleteCategory);    // DELETE /api/categories/:id

module.exports = router;
