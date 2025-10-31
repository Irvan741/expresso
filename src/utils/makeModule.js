import fs from 'fs';
import path from 'path';

// ======= Ambil argumen =======
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Please provide module name (PascalCase), e.g. User or Project');
  process.exit(1);
}

const name = args[0]; // e.g. "User"
const lowerName = name.toLowerCase(); // user
const plural = lowerName.endsWith('s') ? lowerName : lowerName + 's';

// ======= Direktori =======
const controllerDir = path.resolve('src/controllers');
const serviceDir = path.resolve('src/services');
const routeDir = path.resolve('src/routes');

// Pastikan folder ada
[controllerDir, serviceDir, routeDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ======= Controller Template =======
const controllerPath = path.join(controllerDir, `${lowerName}.controller.js`);
if (!fs.existsSync(controllerPath)) {
  const controllerTemplate = `import * as ${lowerName}Service from '../services/${lowerName}.service.js';

// ✅ Response helper
const response = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
    statusCode,
    message,
    data,
  });
};

export const getAll${name}s = async (req, res) => {
  try {
    const data = await ${lowerName}Service.getAll();
    response(res, 200, 'Fetched all ${plural} successfully', data);
  } catch (error) {
    response(res, 500, error.message);
  }
};

export const get${name}ById = async (req, res) => {
  try {
    const data = await ${lowerName}Service.getById(req.params.id);
    if (!data) return response(res, 404, '${name} not found');
    response(res, 200, 'Fetched ${name} successfully', data);
  } catch (error) {
    response(res, 500, error.message);
  }
};

export const create${name} = async (req, res) => {
  try {
    const data = await ${lowerName}Service.create(req.body);
    response(res, 201, '${name} created successfully', data);
  } catch (error) {
    response(res, 400, error.message);
  }
};

export const update${name} = async (req, res) => {
  try {
    const data = await ${lowerName}Service.update(req.params.id, req.body);
    response(res, 200, '${name} updated successfully', data);
  } catch (error) {
    response(res, 400, error.message);
  }
};

export const delete${name} = async (req, res) => {
  try {
    await ${lowerName}Service.remove(req.params.id);
    response(res, 200, '${name} deleted successfully');
  } catch (error) {
    response(res, 400, error.message);
  }
};
`;
  fs.writeFileSync(controllerPath, controllerTemplate);
  console.log(`Controller created: src/controllers/${lowerName}.controller.js`);
}

// ======= Service Template =======
const servicePath = path.join(serviceDir, `${lowerName}.service.js`);
if (!fs.existsSync(servicePath)) {
  const serviceTemplate = `import { ${name} } from '../models/${name}.js';

export const getAll = async () => {
  return await ${name}.findAll();
};

export const getById = async (id) => {
  return await ${name}.findByPk(id);
};

export const create = async (data) => {
  return await ${name}.create(data);
};

export const update = async (id, data) => {
  const record = await ${name}.findByPk(id);
  if (!record) throw new Error('${name} not found');
  return await record.update(data);
};

export const remove = async (id) => {
  const record = await ${name}.findByPk(id);
  if (!record) throw new Error('${name} not found');
  return await record.destroy();
};
`;
  fs.writeFileSync(servicePath, serviceTemplate);
  console.log(`Service created: src/services/${lowerName}.service.js`);
}

// ======= Route Template =======
const routePath = path.join(routeDir, `${lowerName}.route.js`);
if (!fs.existsSync(routePath)) {
  const routeTemplate = `import express from 'express';
import * as ${lowerName}Controller from '../controllers/${lowerName}.controller.js';

const router = express.Router();

router.get('/', ${lowerName}Controller.getAll${name}s);
router.get('/:id', ${lowerName}Controller.get${name}ById);
router.post('/', ${lowerName}Controller.create${name});
router.put('/:id', ${lowerName}Controller.update${name});
router.delete('/:id', ${lowerName}Controller.delete${name});

export default router;
`;
  fs.writeFileSync(routePath, routeTemplate);
  console.log(`Route created: src/routes/${lowerName}.routes.js`);
}

console.log(`Module "${name}" created successfully with status-based responses!`);
