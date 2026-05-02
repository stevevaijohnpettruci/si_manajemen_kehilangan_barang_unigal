import { Router } from 'express';
import {
  handleGetNotifications,
  handleCreateNotification,
} from '../controller/notificationController.js';

const router = Router();

router.get('/notifications', handleGetNotifications);
router.post('/notifications', handleCreateNotification);

export default router;
