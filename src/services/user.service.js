import * as Models from '../models/index.js';
import bcrypt from 'bcrypt';

export const createUser = async (data) => {
  const { name, email, password } = data;

  const existing = await Models.User.findOne({ where: { email } });
  if (existing) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  return await Models.User.create({ name, email, password: hashedPassword });
};

export const getAllUsers = async () => {
  return await Models.User.findAll({ attributes: ['id', 'name', 'email'] });
};