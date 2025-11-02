# 🚀 Expresso — Express with a Taste of Laravel

Expresso is a lightweight Express.js starter kit designed to bring Laravel-style structure, commands, and conventions into the Node.js ecosystem.  
It focuses on **developer speed**, **clean code architecture**, and **consistency** across controllers, services, routes, and database migrations.

---

## 📦 Features

- 🔹 **Laravel-inspired CLI commands**
  - Generate migrations and models automatically.
  - Create full modules (controller + service + route) with one command.
- 🔹 **Sequelize ORM** integration for database access.
- 🔹 **Automatic response structure** (`data` or `datas` based on result type).
- 🔹 **Organized project structure**
  - `src/controllers`
  - `src/services`
  - `src/routes`
  - `src/models`
- 🔹 **Development server with Nodemon**
- 🔹 **Database migration and seeding utilities**

---

## 🧱 Project Structure

```
.
├── migrations/                 # Sequelize migration files (.cjs)
├── src/
│   ├── config/                 # Database configuration
│   ├── controllers/            # Controller layer (auto-generated)
│   ├── services/               # Business logic layer
│   ├── routes/                 # Route definitions
│   ├── models/                 # Sequelize models
│   └── utils/                  # Custom utility scripts (CLI)
├── package.json
└── README.md
```

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/expresso.git

# 2. Navigate into the project
cd expresso

# 3. Install dependencies
npm install

# 4. Set up your environment
cp .env.example .env
```

---

## 🧩 Available Commands

| Command | Description |
|----------|--------------|
| `npm run dev` | Run the server in development mode (using nodemon) |
| `npm start` | Run the server in production mode |
| `npm run db:migrate` | Run all database migrations |
| `npm run db:rollback` | Roll back all migrations |
| `npm run db:seed` | Run all seeders |
| `npm run db:fresh` | Rollback, migrate, and seed from scratch |
| `npm run make:migration <Name> [-m]` | Create a new migration (and model if `-m` flag is used) |
| `npm run make:module <Name>` | Generate a new CRUD module (Controller + Service + Route) |

---

## 🧰 Examples

### Create a Migration

```bash
npm run make:migration Project -m
```

➡️ Creates:
- `migrations/20251102123456-create-projects-table.cjs`
- `src/models/Project.js`

---

### Create a Module

```bash
npm run make:module User
```

➡️ Creates:
- `src/controllers/user.controller.js`
- `src/services/user.service.js`
- `src/routes/user.route.js`

---

## 🧠 Response Structure

All responses follow a consistent format:

### Success (Single Data)
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Fetched user successfully",
  "data": {
    "id": 1,
    "name": "John Doe"
  }
}
```

### Success (Multiple Data)
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Fetched all users successfully",
  "datas": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Smith" }
  ]
}
```

### Error
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "User not found"
}
```

---

## 🗄️ Tech Stack

- **Express.js** — Web framework
- **Sequelize** — ORM for MySQL
- **Nodemon** — Auto-restart for development
- **dotenv** — Environment configuration
- **bcrypt** — Password hashing
- **CORS** — Cross-origin middleware

---

## 🧑‍💻 Author

**Irvan Syapar**  
Creator of **Expresso**, bringing the power of Laravel conventions to Express.js.  
Feel free to contribute or fork the project!

---

## 🪪 License

This project is licensed under the **ISC License**.  
You’re free to use, modify, and distribute it with proper attribution.

---

> ☕ “Brew your Express apps the Laravel way — with Expresso.”
