import { createUser } from '../services/userServices.js';
import response from '../../../shared/utils/response.js';

export const handleCreateUser = async (req, res, next) => {
  try {
    const userId = await createUser(req.validated);
    response(res, 201, 'User berhasil ditambahkan', { id: userId });
  } catch (err) {
    next(err);
  }
};

export const handleGetUser = async (req, res, next) => {
  try {
    const user = await handleGetUserById(req.params.id);
    response(res, 200, 'User berhasil didapatkan', user);
  } catch (err) {
    next(err);
  }
};
