import { Router } from 'express';
import { handleCreateUser } from '../controller/userController.js';
import { validate } from '../../../shared/middleware/validate.js';
import { createUserSchema } from '../validator/schema.js';

const router = Router();

router.post('/api/v1/users', validate(createUserSchema), handleCreateUser);

export default router;
