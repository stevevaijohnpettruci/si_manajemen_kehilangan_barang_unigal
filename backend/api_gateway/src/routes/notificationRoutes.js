import { Router } from 'express';
import {
  handleGetNotifications,
  handleCreateNotification,
} from '../controller/notificationController.js';

const router = Router();

router.get('/api/v1/notifications', handleGetNotifications);
router.post('/api/v1/notifications', handleCreateNotification);

export default router;
