const express = require('express');
const path = require('path');

const app = express();

// para que express entienda json
app.use(express.json());

// sirvo la carpeta public donde esta el frontend
app.use(express.static(path.join(__dirname, 'public')));

// rutas de la api
app.use('/api/products', require('./productRoutes'));
app.use('/api/categories', require('./categoryRoutes'));
app.use('/api/suppliers', require('./supplierRoutes'));
app.use('/api/customers', require('./customerRoutes'));

// inicio el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});