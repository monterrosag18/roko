-- Datos para db_megastore_exam
-- Sacados del Excel: PM-prueba-desempeno-data_m4

USE db_megastore_exam;

-- categorias (en orden alfabetico para que los IDs coincidan con el dump)
-- 1=Accessories, 2=Electronics, 3=Home, 4=Kitchen, 5=Stationery
INSERT INTO Categories (name) VALUES
('Accessories'),
('Electronics'),
('Home'),
('Kitchen'),
('Stationery');

-- proveedores
INSERT INTO Suppliers (name, email) VALUES
('TechDistro SAS', 'ventas@techdistro.com'),
('Accesorios Total', 'contacto@accesoriostotal.com'),
('MueblesYa', 'info@mueblesya.com'),
('GamerZone', 'sales@gamerzone.co'),
('IluminaTodo', 'ventas@iluminatodo.co'),
('SoundWave Ltd', 'contact@soundwave.com'),
('Cables & Conectores', 'info@cablesconectores.com'),
('Oficina Digital', 'sales@oficinadigital.com'),
('Papeleria Mundial', 'pedidos@papeleriamundial.com'),
('ElectroHogar', 'ventas@electrohogar.com');

-- clientes
INSERT INTO Customers (full_name, email, address, phone) VALUES
('Juan Perez', 'juan.perez@mail.com', 'Calle 123 #45-67 Bogota', '3001234567'),
('Maria Rodriguez', 'maria.rod@gmail.com', 'Cra 80 #10-20 Medellin', '3109876543'),
('Carlos Gomez', 'carlos.g@hotmail.com', 'Av Siempre Viva 123 Cali', '3205551234'),
('Ana Torres', 'ana.torres@outlook.com', 'Diag 50 #20-10 Barranquilla', '3004445566'),
('Pedro Martinez', 'pedro.martinez@yahoo.com', 'Calle 100 #15-20 Bogota', '3151112233'),
('Luisa Fernandez', 'luisa.fer@gmail.com', 'Tv 4 #5-12 Bucaramanga', '3169998877'),
('Jorge Ramirez', 'jorge.r@empresa.com', 'Cra 7 #72-10 Bogota', '3112223344'),
('Sofia Vergara', 'sofia.v@cine.com', 'Calle 10 #10-10 Cartagena', '3007776655'),
('Miguel Angel', 'miguel.angel@art.com', 'Av El Poblado 45 Medellin', '3123334455'),
('Elena Nito', 'elena.nito@broma.com', 'Calle Falsa 123 Pereira', '3185550000'),
('Laura Pausini', 'laura.p@musica.com', 'Via Roma 1 Italia (Bogota)', '3001112222'),
('Andres Cepeda', 'andres.c@musica.com', 'Calle 85 #11-20 Bogota', '3105558888'),
('Camila Cabello', 'camila.c@havana.com', 'Calle 50 #50-50 Miami (Medellin)', '3009990000');

-- productos
-- category_id: 1=Accessories, 2=Electronics, 3=Home, 4=Kitchen, 5=Stationery
-- supplier_id: 1=TechDistro, 2=Accesorios Total, 3=MueblesYa, 4=GamerZone,
--              5=IluminaTodo, 6=SoundWave, 7=Cables&Conectores, 8=Oficina Digital,
--              9=Papeleria Mundial, 10=ElectroHogar
INSERT INTO Products (sku, name, price, category_id, supplier_id) VALUES
('LPT-HP-001', 'Laptop HP Pavilion 15', 3500000.00, 2, 1),
('MSE-LOG-001', 'Mouse Logitech G203', 120000.00, 1, 2),
('USB-KIN-64', 'USB Kingston 64GB', 45000.00, 1, 2),
('CHR-ERG-005', 'Silla Ergonomica Office', 450000.00, 3, 3),
('MON-SAM-24', 'Monitor Samsung 24', 600000.00, 2, 1),
('KBD-MEC-002', 'Teclado Mecanico Redragon', 250000.00, 1, 4),
('DSK-STD-100', 'Escritorio Estandar Blanco', 320000.00, 3, 3),
('LMP-LED-001', 'Lampara LED Escritorio', 80000.00, 3, 5),
('HDP-SNY-005', 'Audifonos Sony WH-1000', 1200000.00, 1, 6),
('TAB-APP-009', 'iPad Air 64GB', 2800000.00, 2, 1),
('CS-TAB-009', 'Funda iPad Air', 90000.00, 1, 2),
('MON-LG-27', 'Monitor LG 27 UltraGear', 1100000.00, 2, 1),
('CBL-HDMI-003', 'Cable HDMI 2.0 3m', 35000.00, 1, 7),
('SF-LIV-002', 'Sofa Cama Gris', 1500000.00, 3, 3),
('PRT-EPS-004', 'Impresora Epson EcoTank', 950000.00, 2, 8),
('PPR-RSM-500', 'Resma Papel Carta 500', 25000.00, 5, 9),
('SPK-JBL-005', 'Parlante JBL Flip 6', 550000.00, 2, 6),
('CFT-OST-001', 'Cafetera Oster 12 Tazas', 180000.00, 4, 10),
('BTR-IMU-002', 'Batidora Inmersion', 120000.00, 4, 10),
('MIC-SHR-058', 'Microfono Shure SM58', 450000.00, 2, 6),
('MKR-SHR-012', 'Marcadores Sharpie x12', 35000.00, 5, 9);
