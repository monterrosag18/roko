const express = require('express');
const path = require('path');

const app = express();
app.use(express.json()); // Permite recibir datos en formato JSON
app.use(express.static(path.join(__dirname, 'public'))); // Servir frontend

// Importamos todas las rutas
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const supplierRoutes = require('./supplierRoutes');
const customerRoutes = require('./customerRoutes');

// Registramos las rutas
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/customers', customerRoutes);

// Iniciamos todo
async function startServer() {
    
    const port = 3000;
    app.listen(port, () => {
        console.log(`¡MegaStore API corriendo en http://localhost:${port}!`);
        console.log('Endpoints disponibles:');
        console.log('  GET/POST          /api/products');
        console.log('  GET/PUT/DELETE     /api/products/:id');
        console.log('  GET/POST          /api/categories');
        console.log('  GET/PUT/DELETE     /api/categories/:id');
        console.log('  GET/POST          /api/suppliers');
        console.log('  GET/PUT/DELETE     /api/suppliers/:id');
        console.log('  GET/POST          /api/customers');
        console.log('  GET/PUT/DELETE     /api/customers/:id');
    });
}

startServer();