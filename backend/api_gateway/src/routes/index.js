import { Router } from 'express';
import userRoutes from './userRoutes.js';
import reportRoutes from './reportRoutes.js';
import claimRoutes from './claimRoutes.js';
import notificationRoutes from './notificationRoutes.js';

const router = Router();

router.use(userRoutes);
router.use(reportRoutes);
router.use(claimRoutes);
router.use(notificationRoutes);

export default router;
