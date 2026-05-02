import { Router } from 'express';
import userRoutes from './userRoutes.js';
import reportRoutes from './reportRoutes.js';
import claimRoutes from './claimRoutes.js';
import notificationRoutes from './notificationRoutes.js';

const router = Router();

router.use('/api/v1', userRoutes);
router.use('/api/v1', reportRoutes);
router.use('/api/v1', claimRoutes);
router.use('/api/v1', notificationRoutes);

export default router;
