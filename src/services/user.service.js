import * as Models from '../models/index.js';
import bcrypt from 'bcrypt';

// ======= CRUD Services =======
export const getAllUsers = async () => {
  return await Models.User.findAll({
    attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
  });
};

export const getUserById = async (id) => {
  return await Models.User.findByPk(id, {
    attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
  });
};

export const createUser = async (data) => {
  const { name, email, password } = data;

  // Check email uniqueness
  const existing = await Models.User.findOne({ where: { email } });
  if (existing) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);

  return await Models.User.create({
    name,
    email,
    password: hashedPassword,
  });
};

export const updateUser = async (id, data) => {
  const user = await Models.User.findByPk(id);
  if (!user) throw new Error('User not found');

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await user.update(data);
};

export const deleteUser = async (id) => {
  const user = await Models.User.findByPk(id);
  if (!user) throw new Error('User not found');
  return await user.destroy();
};
