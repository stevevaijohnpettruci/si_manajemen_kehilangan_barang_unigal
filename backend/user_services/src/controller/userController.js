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
