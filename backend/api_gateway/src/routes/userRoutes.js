import { Router } from 'express';
import { handleGetUsers, handleGetUserById, handleCreateUser, handleLogin, handleRefreshToken, handleLogout } from '../controller/userController.js';
import auth from '../../../shared/middleware/auth.js';

const router = Router();

router.post('/api/v1/users', handleCreateUser);
router.post('/api/v1/authentications', handleLogin);
router.put('/api/v1/authentications', handleRefreshToken);
router.delete('/api/v1/authentications', handleLogout);
router.get('/api/v1/users', auth, handleGetUsers);
router.get('/api/v1/users/:id', auth, handleGetUserById);

export default router;
