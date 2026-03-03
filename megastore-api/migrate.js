const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const { MongoClient } = require('mongodb');

// leo el csv y lo convierto a array de objetos
function readCSV(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');

    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const obj = {};
        headers.forEach((h, index) => {
            obj[h.trim()] = values[index] ? values[index].trim() : '';
        });
        rows.push(obj);
    }
    return rows;
}

async function migrate() {
    // conecto a mysql
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_megastore_exam'
    });
    console.log('Conectado a MySQL');

    // conecto a mongo
    const mongo = new MongoClient('mongodb://localhost:27017');
    await mongo.connect();
    const mongodb = mongo.db('db_megastore_exam');
    console.log('Conectado a MongoDB');

    // leo el csv
    const csvPath = path.join(__dirname, '..', 'data.csv');
    const rows = readCSV(csvPath);
    console.log('Filas leidas del CSV:', rows.length);

    // primero saco los datos unicos para las tablas de mysql
    const categorias = [...new Set(rows.map(r => r.product_category))];
    const proveedores = [...new Set(rows.map(r => r.supplier_name + '|' + r.supplier_email))];
    const clientes = [...new Set(rows.map(r => r.customer_name + '|' + r.customer_email + '|' + r.customer_address + '|' + r.customer_phone))];
    const productos = [...new Set(rows.map(r => r.product_sku))];

    // inserto categorias
    const catMap = {};
    for (const name of categorias) {
        const [exist] = await db.query('SELECT id FROM Categories WHERE name = ?', [name]);
        if (exist.length > 0) {
            catMap[name] = exist[0].id;
        } else {
            const [result] = await db.query('INSERT INTO Categories (name) VALUES (?)', [name]);
            catMap[name] = result.insertId;
        }
    }
    console.log('Categorias:', Object.keys(catMap).length);

    // inserto proveedores
    const supMap = {};
    for (const entry of proveedores) {
        const [name, email] = entry.split('|');
        const [exist] = await db.query('SELECT id FROM Suppliers WHERE email = ?', [email]);
        if (exist.length > 0) {
            supMap[name] = exist[0].id;
        } else {
            const [result] = await db.query('INSERT INTO Suppliers (name, email) VALUES (?, ?)', [name, email]);
            supMap[name] = result.insertId;
        }
    }
    console.log('Proveedores:', Object.keys(supMap).length);

    // inserto clientes
    const custMap = {};
    for (const entry of clientes) {
        const [full_name, email, address, phone] = entry.split('|');
        const [exist] = await db.query('SELECT id FROM Customers WHERE email = ?', [email]);
        if (exist.length > 0) {
            custMap[email] = exist[0].id;
        } else {
            const [result] = await db.query(
                'INSERT INTO Customers (full_name, email, address, phone) VALUES (?, ?, ?, ?)',
                [full_name, email, address, phone]
            );
            custMap[email] = result.insertId;
        }
    }
    console.log('Clientes:', Object.keys(custMap).length);

    // inserto productos
    const prodSet = new Set();
    for (const row of rows) {
        if (prodSet.has(row.product_sku)) continue;
        prodSet.add(row.product_sku);

        const [exist] = await db.query('SELECT id FROM Products WHERE sku = ?', [row.product_sku]);
        if (exist.length === 0) {
            await db.query(
                'INSERT INTO Products (sku, name, price, category_id, supplier_id) VALUES (?, ?, ?, ?, ?)',
                [row.product_sku, row.product_name, parseFloat(row.unit_price), catMap[row.product_category], supMap[row.supplier_name]]
            );
        }
    }
    console.log('Productos:', prodSet.size);

    // ahora las ordenes van a mongodb
    // agrupo las filas por transaction_id
    const ordersMap = {};
    for (const row of rows) {
        if (!ordersMap[row.transaction_id]) {
            ordersMap[row.transaction_id] = {
                transaction_id: row.transaction_id,
                date: new Date(row.date),
                customer_ref_id: custMap[row.customer_email],
                currency: 'COP',
                items: []
            };
        }
        ordersMap[row.transaction_id].items.push({
            product_sku: row.product_sku,
            product_name: row.product_name,
            unit_price: parseFloat(row.unit_price),
            quantity: parseInt(row.quantity),
            total_line_value: parseFloat(row.total_line_value)
        });
    }

    // calculo el total de cada orden y las inserto en mongo
    const ordersCollection = mongodb.collection('orders');
    let orderCount = 0;
    for (const txn in ordersMap) {
        const order = ordersMap[txn];
        order.total_order_value = order.items.reduce((sum, item) => sum + item.total_line_value, 0);

        // solo inserto si no existe
        const exists = await ordersCollection.findOne({ transaction_id: order.transaction_id });
        if (!exists) {
            await ordersCollection.insertOne(order);
            orderCount++;
        }
    }
    console.log('Ordenes insertadas en MongoDB:', orderCount);

    // cierro conexiones
    await db.end();
    await mongo.close();
    console.log('Migracion completada');
}

migrate().catch(err => {
    console.log('Error en la migracion:', err.message);
    process.exit(1);
});
