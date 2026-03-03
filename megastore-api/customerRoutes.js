const express = require('express');
const router = express.Router();
const ctrl = require('./customerController');

router.get('/', ctrl.getAllCustomers);
router.get('/:id', ctrl.getCustomerById);
router.post('/', ctrl.createCustomer);
router.put('/:id', ctrl.updateCustomer);
router.delete('/:id', ctrl.deleteCustomer);

module.exports = router;
