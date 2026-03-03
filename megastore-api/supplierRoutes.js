const express = require('express');
const router = express.Router();
const ctrl = require('./supplierController');

router.get('/', ctrl.getAllSuppliers);
router.get('/:id', ctrl.getSupplierById);
router.post('/', ctrl.createSupplier);
router.put('/:id', ctrl.updateSupplier);
router.delete('/:id', ctrl.deleteSupplier);

module.exports = router;
