import {
  getUsers,
  getUserById,
  createUser,
  login,
  refreshToken,
  logout,
} from '../services/userServices.js';
import response from '../../../shared/utils/response.js';

export const handleGetUsers = async (req, res, next) => {
  try {
    const data = await getUsers();
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleGetUserById = async (req, res, next) => {
  try {
    const data = await getUserById(req.params.id);
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleCreateUser = async (req, res, next) => {
  try {
    const response = await createUser(req.body);
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export const handleLogin = async (req, res, next) => {
  try {
    const response = await login(req.body);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const handleRefreshToken = async (req, res, next) => {
  try {
    const response = await refreshToken(req.body);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const handleLogout = async (req, res, next) => {
  try {
    const response = await logout(req.body);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
