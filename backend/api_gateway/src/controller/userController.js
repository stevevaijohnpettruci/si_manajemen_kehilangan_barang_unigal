import { getUsers, getUserById, createUser, loginUser } from '../services/userServices.js';
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
    const data = await createUser(req.body);
    response(res, 201, 'user created', data);
  } catch (err) {
    next(err);
  }
};

export const handleLoginUser = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);
    response(res, 200, 'login success', data);
  } catch (err) {
    next(err);
  }
};
