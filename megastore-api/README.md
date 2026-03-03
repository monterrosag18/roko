# MegaStore API

A simple REST API + frontend for managing a store's products, categories, suppliers and customers.

Built with **Node.js**, **Express** and **MySQL**.

## What's inside

- Full CRUD for **Products**, **Categories**, **Suppliers** and **Customers**
- A dark-themed dashboard (single HTML file, no frameworks) to browse and manage all the data
- SQL scripts ready to set up and populate the database from an Excel dataset

## Database setup

1. Make sure MySQL is running
2. Create the database:
   ```sql
   CREATE DATABASE db_megastore_exam;
   ```
3. Import the schema + data:
   ```bash
   mysql -u root -p db_megastore_exam < ../dump-db_megastore_exam-202603021946.sql
   ```
   Or if you prefer just the inserts on a fresh schema:
   ```bash
   mysql -u root -p < ../insert-data.sql
   ```
4. Update the credentials in `db-mysql.js` if yours are different

## Run it

```bash
cd megastore-api
npm install
node index.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

| Method | Route | What it does |
|--------|-------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:id` | Get one category |
| POST | `/api/categories` | Create a category |
| PUT | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |
| GET | `/api/suppliers` | List all suppliers |
| GET | `/api/suppliers/:id` | Get one supplier |
| POST | `/api/suppliers` | Create a supplier |
| PUT | `/api/suppliers/:id` | Update a supplier |
| DELETE | `/api/suppliers/:id` | Delete a supplier |
| GET | `/api/customers` | List all customers |
| GET | `/api/customers/:id` | Get one customer |
| POST | `/api/customers` | Create a customer |
| PUT | `/api/customers/:id` | Update a customer |
| DELETE | `/api/customers/:id` | Delete a customer |

## Project structure

```
megastore-api/
├── public/
│   └── index.html          # Frontend dashboard
├── index.js                # Entry point + Express setup
├── db-mysql.js             # MySQL connection pool
├── productController.js    # Product CRUD logic
├── productRoutes.js        # Product routes
├── categoryController.js   # Category CRUD logic
├── categoryRoutes.js       # Category routes
├── supplierController.js   # Supplier CRUD logic
├── supplierRoutes.js       # Supplier routes
├── customerController.js   # Customer CRUD logic
├── customerRoutes.js       # Customer routes
└── package.json
```

## Tech stack

- Node.js
- Express 5
- MySQL 8 (via mysql2)
- Vanilla HTML/CSS/JS (frontend)
