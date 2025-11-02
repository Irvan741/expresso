1. Start the Server (Dev Mode)
    run: npm run dev
    
2. Start the Server (Production)
    run: npm start

3. Generate Migration / Model
    run: npm run make:migration Project
        it will have result like:
            migrations/20251102184500-create-projects-table.cjs
    run: npm run make:migration Project -m
        it will have result like:
            migrations/20251102184500-create-projects-table.cjs
            src/models/Project.js

4. Generate Full Module (Controller + Service + Route)
    run: npm run make:module User
        it will creates:
        src/controllers/user.controller.js
        src/services/user.service.js
        src/routes/user.route.js

5. Run All Migrations
    run: npm run db:migrate
        it will:
        Applies all migrations to your connected database.

6. Rollback All Migrations
    run: npm run db:rollback
        it will:
        Reverts all applied migrations.

7. Fresh Migration (Full Reset)
    run: npm run db:fresh
        it will:
        drop all tables → recreate → seed data.

8. Run Seeders
    run: npm run db:seed
        it will:
        Inserts predefined data from /seeders.


Cheatsheet Summary

| Command                            | Description                           |
| ---------------------------------- | ------------------------------------- |
| `npm run dev`                      | Run app in dev mode (auto restart)    |
| `npm start`                        | Run app in production                 |
| `npm run make:migration <Name>`    | Create new migration                  |
| `npm run make:migration <Name> -m` | Create migration + model              |
| `npm run make:module <Name>`       | Generate controller + service + route |
| `npm run db:migrate`               | Apply all migrations                  |
| `npm run db:rollback`              | Rollback all migrations               |
| `npm run db:seed`                  | Seed the database                     |
| `npm run db:fresh`                 | Reset DB (rollback → migrate → seed)  |
