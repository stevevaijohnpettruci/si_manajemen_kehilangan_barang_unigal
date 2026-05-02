import { Router } from 'express';
import {
  handleGetUsers,
  handleGetUserById,
  handleCreateUser,
  handleLoginUser,
} from '../controller/userController.js';

const router = Router();

router.get('/users', handleGetUsers);
router.get('/users/:id', handleGetUserById);
router.post('/users', handleCreateUser);
router.post('/users/login', handleLoginUser);

export default router;
