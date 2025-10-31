import fs from 'fs';
import path from 'path';

// ======= Ambil argumen =======
// process.argv biasa kadang tidak menangkap flag ketika dijalankan via npm run
// Gunakan process.env.npm_config_argv
let args = [];
if (process.env.npm_config_argv) {
  // Parse JSON yang dikirim npm
  const npmArgv = JSON.parse(process.env.npm_config_argv);
  args = npmArgv.original.slice(1); // original[0] = 'run', original[1] = 'make:migration'
} else {
  args = process.argv.slice(2);
}

if (args.length === 0) {
  console.error('Please provide migration/model name (PascalCase)');
  process.exit(1);
}

const name = args[0]; // e.g. "Project"
const createModel = args.includes('-m'); // boolean jika -m ada

// ======= Direktori =======
const migrationsDir = path.resolve('migrations');
const modelsDir = path.resolve('src/models');

// Pastikan folder migrations ada
if (!fs.existsSync(migrationsDir)) fs.mkdirSync(migrationsDir, { recursive: true });

// ======= 1. Buat migration file Laravel style =======
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
const tableName = name.toLowerCase() + 's'; // plural
let migrationFileName = `${timestamp}-create-${tableName}-table.js`; // awalnya .js
const migrationFilePath = path.join(migrationsDir, migrationFileName);

// Migration skeleton
const migrationSkeleton = `'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('${tableName}', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('${tableName}');
  }
};
`;

fs.writeFileSync(migrationFilePath, migrationSkeleton);
console.log(`Migration created: migrations/${migrationFileName}`);

// ======= 2. Auto rename ke .cjs =======
try {
  const oldPath = migrationFilePath;
  const newPath = path.join(migrationsDir, migrationFileName.replace('.js', '.cjs'));
  fs.renameSync(oldPath, newPath);
  migrationFileName = path.basename(newPath);
  console.log(`Migration renamed to .cjs: ${migrationFileName}`);
} catch (err) {
  console.error('Error renaming migration file:', err.message);
}

// ======= 3. Buat model jika -m flag ada =======
if (createModel) {
  if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });

  const modelFileName = `${name.charAt(0).toUpperCase() + name.slice(1)}.js`;
  const modelFilePath = path.join(modelsDir, modelFileName);

  if (!fs.existsSync(modelFilePath)) {
    const modelTemplate = `import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const ${name} = sequelize.define('${name}', {
  // define your columns here
}, {});

export default ${name};
`;
    fs.writeFileSync(modelFilePath, modelTemplate);
    console.log(`Model created: src/models/${modelFileName}`);
  } else {
    console.log(`Model ${modelFileName} already exists`);
  }
}
