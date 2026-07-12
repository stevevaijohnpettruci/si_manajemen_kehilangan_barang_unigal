import { Router } from 'express';
import {
  handleGetNotifications,
  handleGetUnreadCount,
  handleGetNotificationById,
  handleMarkAsRead,
  handleMarkAllAsRead,
  handleDeleteNotification,
} from '../controller/notificationController.js';

const router = Router();

// Endpoint yang diakses Frontend -> Controller Gateway -> Service Gateway
router.get('/api/v1/notifications', handleGetNotifications);
router.get('/api/v1/notifications/unread-count', handleGetUnreadCount);

// Pastikan endpoint spesifik (seperti read-all) berada di atas /:id
router.put('/api/v1/notifications/read-all', handleMarkAllAsRead);

router.get('/api/v1/notifications/:id', handleGetNotificationById);
router.put('/api/v1/notifications/:id/read', handleMarkAsRead);
router.delete('/api/v1/notifications/:id', handleDeleteNotification);

export default router;