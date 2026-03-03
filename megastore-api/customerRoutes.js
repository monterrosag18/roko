const express = require('express');
const router = express.Router();
const customerController = require('./customerController');

// CRUD completo de Customers
router.get('/', customerController.getAllCustomers);        // GET /api/customers
router.get('/:id', customerController.getCustomerById);     // GET /api/customers/:id
router.post('/', customerController.createCustomer);        // POST /api/customers
router.put('/:id', customerController.updateCustomer);      // PUT /api/customers/:id
router.delete('/:id', customerController.deleteCustomer);   // DELETE /api/customers/:id

module.exports = router;
