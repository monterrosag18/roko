const express = require('express');
const router = express.Router();
const supplierController = require('./supplierController');

// CRUD completo de Suppliers
router.get('/', supplierController.getAllSuppliers);        // GET /api/suppliers
router.get('/:id', supplierController.getSupplierById);     // GET /api/suppliers/:id
router.post('/', supplierController.createSupplier);        // POST /api/suppliers
router.put('/:id', supplierController.updateSupplier);      // PUT /api/suppliers/:id
router.delete('/:id', supplierController.deleteSupplier);   // DELETE /api/suppliers/:id

module.exports = router;
