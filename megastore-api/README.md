# MegaStore API

This is my project for the M4 exam. It's a REST API for managing a store with products, categories, suppliers and customers.

## Tech I used

- Node.js + Express
- MySQL (mysql2)
- MongoDB (mongodb)
- HTML, CSS and vanilla JavaScript for the frontend

## How to run it

1. Create the database in MySQL:
   ```sql
   CREATE DATABASE db_megastore_exam;
   ```

2. Import the SQL dump (tables + data):
   ```bash
   mysql -u root -p db_megastore_exam < dump-db_megastore_exam-202603021946.sql
   ```

3. Or use the migration script that reads the CSV and loads MySQL + MongoDB:
   ```bash
   cd megastore-api
   npm install
   npm run migrate
   ```

4. Update the password in `db-mysql.js` if needed

5. Start the server:
   ```bash
   node index.js
   ```

6. Open http://localhost:3000

## API Routes

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get one product |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| GET | /api/categories | Get all categories |
| GET | /api/categories/:id | Get one category |
| POST | /api/categories | Create category |
| PUT | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |
| GET | /api/suppliers | Get all suppliers |
| GET | /api/suppliers/:id | Get one supplier |
| POST | /api/suppliers | Create supplier |
| PUT | /api/suppliers/:id | Update supplier |
| DELETE | /api/suppliers/:id | Delete supplier |
| GET | /api/customers | Get all customers |
| GET | /api/customers/:id | Get one customer |
| POST | /api/customers | Create customer |
| PUT | /api/customers/:id | Update customer |
| DELETE | /api/customers/:id | Delete customer |

## Files

```
data.csv                  - datos del CSV original
megastore-api/
  index.js              - server + routes
  db-mysql.js           - database connection
  migrate.js            - reads CSV → inserts into MySQL + MongoDB
  productController.js  - product CRUD
  categoryController.js - category CRUD
  supplierController.js - supplier CRUD
  customerController.js - customer CRUD
  public/index.html     - frontend
```
