
async function migrateRecord(rowDelExcel) {
    

    
    let [customer] = await mysql.query('SELECT id FROM Customers WHERE email = ?', [rowDelExcel.customer_email]);
    
    let cliente_id; // Aquí guardaré el ID final
    
    if (customer.length === 0) {
        
        const result = await mysql.query(
            'INSERT INTO Customers (full_name, email, address, phone) VALUES (?, ?, ?, ?)', 
            [rowDelExcel.customer_name, rowDelExcel.customer_email, rowDelExcel.customer_address, rowDelExcel.customer_phone]
        );
        cliente_id = result.insertId; // Guardo el ID nuevo generado
    } else {
        
        cliente_id = customer[0].id;
    }


    const productoComprado = {
        product_sku: rowDelExcel.product_sku,
        product_name: rowDelExcel.product_name,
        quantity: parseInt(rowDelExcel.quantity),
        total_line_value: parseFloat(rowDelExcel.total_line_value)
    };

    await mongo.collection('orders').updateOne(
        { transaction_id: rowDelExcel.transaction_id }, 
        { 
            $setOnInsert: { date: new Date(rowDelExcel.date), customer_ref_id: cliente_id },
            $push: { items: productoComprado }
        },
        { upsert: true }
    );
}