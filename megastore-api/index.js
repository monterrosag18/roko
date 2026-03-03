const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const supplierRoutes = require('./supplierRoutes');
const customerRoutes = require('./customerRoutes');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/customers', customerRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`MegaStore API running on http://localhost:${port}`);
});