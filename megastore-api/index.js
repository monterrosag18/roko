const express = require('express');
const path = require('path');
const products = require('./productController');
const categories = require('./categoryController');
const suppliers = require('./supplierController');
const customers = require('./customerController');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// productos
app.get('/api/products', products.getAll);
app.get('/api/products/:id', products.getById);
app.post('/api/products', products.create);
app.put('/api/products/:id', products.update);
app.delete('/api/products/:id', products.remove);

// categorias
app.get('/api/categories', categories.getAll);
app.get('/api/categories/:id', categories.getById);
app.post('/api/categories', categories.create);
app.put('/api/categories/:id', categories.update);
app.delete('/api/categories/:id', categories.remove);

// proveedores
app.get('/api/suppliers', suppliers.getAll);
app.get('/api/suppliers/:id', suppliers.getById);
app.post('/api/suppliers', suppliers.create);
app.put('/api/suppliers/:id', suppliers.update);
app.delete('/api/suppliers/:id', suppliers.remove);

// clientes
app.get('/api/customers', customers.getAll);
app.get('/api/customers/:id', customers.getById);
app.post('/api/customers', customers.create);
app.put('/api/customers/:id', customers.update);
app.delete('/api/customers/:id', customers.remove);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));