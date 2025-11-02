import * as userService from '../services/user.service.js';

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

// ======= CRUD Controllers =======
export const getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();
    response(res, 200, 'Fetched all users successfully', data);
  } catch (error) {
    response(res, 500, error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const data = await userService.getUserById(req.params.id);
    if (!data) return response(res, 404, 'User not found');
    response(res, 200, 'Fetched user successfully', data);
  } catch (error) {
    response(res, 500, error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);
    response(res, 201, 'User created successfully', data);
  } catch (error) {
    response(res, 400, error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(req.params.id, req.body);
    response(res, 200, 'User updated successfully', data);
  } catch (error) {
    response(res, 400, error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    response(res, 200, 'User deleted successfully');
  } catch (error) {
    response(res, 400, error.message);
  }
};
