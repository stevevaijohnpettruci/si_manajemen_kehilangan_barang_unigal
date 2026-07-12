import { Router } from 'express';
import { handleCreateUser } from '../controller/userController.js';
import { handleLogin, handleRefreshToken, handleLogout, handleLogoutAll } from '../controller/authenticationController.js';
import { validate } from '../../../shared/middleware/validate.js';
import { createUserSchema, loginSchema, refreshTokenSchema } from '../validator/schema.js';

const router = Router();

router.post('/api/v1/users', validate(createUserSchema), handleCreateUser);
router.post('/api/v1/authentications', validate(loginSchema), handleLogin);
router.put('/api/v1/authentications', validate(refreshTokenSchema), handleRefreshToken);
router.delete('/api/v1/authentications', validate(refreshTokenSchema), handleLogout);
router.delete('/api/v1/authentications/all', validate(refreshTokenSchema), handleLogoutAll);

export default router;
