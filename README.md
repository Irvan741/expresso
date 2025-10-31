# Expresso

**Expresso** – Laravel-style MVC starter kit for Node.js, built with Express and Sequelize.

---

## Short Description

Expresso – the fast lane for Node.js REST APIs. A Laravel-inspired MVC starter with Express & Sequelize, ready-made generators, structured responses, and seamless DB setup. Build APIs smarter, faster, and cleaner from day one.

---

## Installation

1. Clone the repository:
```
git clone <repo-url>
cd <project-folder>
```

2. Install dependencies:
```
npm install
```

3. Create `.env` file in the root directory:
```
DB_HOST=localhost
DB_NAME=your_db
DB_NAME_TEST=your_test_db
DB_USER=root
DB_PASS=secret
PORT=3000
```

4. Start development server:
```
npm run dev
```

---

## Features

- Laravel-style MVC architecture (Controllers, Services, Models, Routes)
- Generator scripts for migrations, models, controllers, services, and routes
- Sequelize ORM with MySQL support
- Consistent API response format with `status`, `statusCode`, `message`, and `data`
- Migration and seeder management (`db:migrate`, `db:seed`, `db:fresh`)
- Modern ES module support (`import/export`)
- Rapid module creation workflow

---

## Project Structure

```
src/
├── config/
│   ├── database.js
│   └── sequelize/
│       └── sequelizeConfig.cjs
├── controllers/
├── models/
├── routes/
├── services/
├── seeders/
├── utils/
│   ├── makeMigration.js
│   └── makeModule.js
└── server.js
migrations/
.env
package.json
```

---

## Generator Commands

**Migration & Model:**
```
npm run make:migration <ModuleName> -m
```
Creates migration + model.

**Controller + Service + Route:**
```
npm run make:module <ModuleName>
```
Creates controller, service, and route for a module.

**Database Commands:**
```
npm run db:migrate   # Run migrations
npm run db:seed      # Run seeders
npm run db:fresh     # Drop all tables + migrate + seed
```

**Server:**
```
npm run dev          # Start dev server with nodemon
```

---

## API Response Format

- Success response:
```
{
  status: "success",
  statusCode: 200,
  message: "Descriptive message",
  data: {...} // optional
}
```

- Error response:
```
{
  status: "error",
  statusCode: 400,
  message: "Error message",
  data: null
}
```

---

## Example Usage

**Register routes in `server.js`:**
```
import express from 'express';
import projectRoutes from './routes/project.route.js';

const app = express();
app.use(express.json());
app.use('/api/projects', projectRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
```

**Create a new module:**
```
npm run make:migration Project -m
npm run make:module Project
```
This will create the migration, model, controller, service, and route for `Project`.

---

## Dependencies

- express
- sequelize
- mysql2
- dotenv
- nodemon (dev)

---

## Why Expresso?

Expresso is designed for developers who want the **speed and organization of Laravel** while working in Node.js. It reduces boilerplate, standardizes responses, and provides a rapid workflow for REST API development. Perfect for small to medium projects, rapid prototyping, or learning MVC patterns in Node.js.

