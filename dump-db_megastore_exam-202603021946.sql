-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: db_megastore_exam
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Accessories'),(2,'Electronics'),(3,'Home'),(4,'Kitchen'),(5,'Stationery');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES 
(1,'Juan Perez','juan.perez@mail.com','Calle 123 #45-67 Bogota','3001234567'),
(2,'Maria Rodriguez','maria.rod@gmail.com','Cra 80 #10-20 Medellin','3109876543'),
(3,'Carlos Gomez','carlos.g@hotmail.com','Av Siempre Viva 123 Cali','3205551234'),
(4,'Ana Torres','ana.torres@outlook.com','Diag 50 #20-10 Barranquilla','3004445566'),
(5,'Pedro Martinez','pedro.martinez@yahoo.com','Calle 100 #15-20 Bogota','3151112233'),
(6,'Luisa Fernandez','luisa.fer@gmail.com','Tv 4 #5-12 Bucaramanga','3169998877'),
(7,'Jorge Ramirez','jorge.r@empresa.com','Cra 7 #72-10 Bogota','3112223344'),
(8,'Sofia Vergara','sofia.v@cine.com','Calle 10 #10-10 Cartagena','3007776655'),
(9,'Miguel Angel','miguel.angel@art.com','Av El Poblado 45 Medellin','3123334455'),
(10,'Elena Nito','elena.nito@broma.com','Calle Falsa 123 Pereira','3185550000'),
(11,'Laura Pausini','laura.p@musica.com','Via Roma 1 Italia (Bogota)','3001112222'),
(12,'Andres Cepeda','andres.c@musica.com','Calle 85 #11-20 Bogota','3105558888'),
(13,'Camila Cabello','camila.c@havana.com','Calle 50 #50-50 Miami (Medellin)','3009990000');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int NOT NULL,
  `supplier_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`),
  KEY `category_id` (`category_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`),
  CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `Suppliers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES 
(1,'LPT-HP-001','Laptop HP Pavilion 15',3500000.00,2,1),
(2,'MSE-LOG-001','Mouse Logitech G203',120000.00,1,2),
(3,'USB-KIN-64','USB Kingston 64GB',45000.00,1,2),
(4,'CHR-ERG-005','Silla Ergonomica Office',450000.00,3,3),
(5,'MON-SAM-24','Monitor Samsung 24',600000.00,2,1),
(6,'KBD-MEC-002','Teclado Mecanico Redragon',250000.00,1,4),
(7,'DSK-STD-100','Escritorio Estandar Blanco',320000.00,3,3),
(8,'LMP-LED-001','Lampara LED Escritorio',80000.00,3,5),
(9,'HDP-SNY-005','Audifonos Sony WH-1000',1200000.00,1,6),
(10,'TAB-APP-009','iPad Air 64GB',2800000.00,2,1),
(11,'CS-TAB-009','Funda iPad Air',90000.00,1,2),
(12,'MON-LG-27','Monitor LG 27 UltraGear',1100000.00,2,1),
(13,'CBL-HDMI-003','Cable HDMI 2.0 3m',35000.00,1,7),
(14,'SF-LIV-002','Sofa Cama Gris',1500000.00,3,3),
(15,'PRT-EPS-004','Impresora Epson EcoTank',950000.00,2,8),
(16,'PPR-RSM-500','Resma Papel Carta 500',25000.00,5,9),
(17,'SPK-JBL-005','Parlante JBL Flip 6',550000.00,2,6),
(18,'CFT-OST-001','Cafetera Oster 12 Tazas',180000.00,4,10),
(19,'BTR-IMU-002','Batidora Inmersion',120000.00,4,10),
(20,'MIC-SHR-058','Microfono Shure SM58',450000.00,2,6),
(21,'MKR-SHR-012','Marcadores Sharpie x12',35000.00,5,9);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Suppliers`
--

DROP TABLE IF EXISTS `Suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Suppliers`
--

LOCK TABLES `Suppliers` WRITE;
/*!40000 ALTER TABLE `Suppliers` DISABLE KEYS */;
INSERT INTO `Suppliers` VALUES 
(1,'TechDistro SAS','ventas@techdistro.com'),
(2,'Accesorios Total','contacto@accesoriostotal.com'),
(3,'MueblesYa','info@mueblesya.com'),
(4,'GamerZone','sales@gamerzone.co'),
(5,'IluminaTodo','ventas@iluminatodo.co'),
(6,'SoundWave Ltd','contact@soundwave.com'),
(7,'Cables & Conectores','info@cablesconectores.com'),
(8,'Oficina Digital','sales@oficinadigital.com'),
(9,'Papeleria Mundial','pedidos@papeleriamundial.com'),
(10,'ElectroHogar','ventas@electrohogar.com');
/*!40000 ALTER TABLE `Suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_megastore_exam'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-02 19:46:31
