import fs from 'fs';
import path from 'path';

// ======= Direktori =======
const controllerDir = path.resolve('src/controllers');
const serviceDir = path.resolve('src/services');
const routeDir = path.resolve('src/routes');

[controllerDir, serviceDir, routeDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ======= Controller =======
const controllerPath = path.join(controllerDir, 'auth.controller.js');
if (!fs.existsSync(controllerPath)) {
  const controllerTemplate = `import * as authService from '../services/auth.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ✅ Response helper
const response = (res, statusCode, message, data = null) => {
  const isArray = Array.isArray(data);
  res.status(statusCode).json({
    status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
    statusCode,
    message,
    ...(isArray ? { datas: data } : { data }),
  });
};

export const register = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    response(res, 201, 'User registered successfully', data);
  } catch (error) {
    response(res, 400, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    response(res, 200, 'Login successful', { token });
  } catch (error) {
    response(res, 400, error.message);
  }
};
`;
  fs.writeFileSync(controllerPath, controllerTemplate);
  console.log('Controller created: src/controllers/auth.controller.js');
}

// ======= Service =======
const servicePath = path.join(serviceDir, 'auth.service.js');
if (!fs.existsSync(servicePath)) {
  const serviceTemplate = `import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

export const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email already registered');

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  return { id: user.id, name: user.name, email: user.email };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  return token;
};
`;
  fs.writeFileSync(servicePath, serviceTemplate);
  console.log('Service created: src/services/auth.service.js');
}

// ======= Route =======
const routePath = path.join(routeDir, 'auth.route.js');
if (!fs.existsSync(routePath)) {
  const routeTemplate = `import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
`;
  fs.writeFileSync(routePath, routeTemplate);
  console.log('Route created: src/routes/auth.route.js');
}

console.log('Auth module created successfully!');
