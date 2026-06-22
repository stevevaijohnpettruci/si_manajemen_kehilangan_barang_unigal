import { Router } from 'express';
import {
  handleGetNotificationsByUserId,
  handleGetUnreadCount,
  handleGetNotificationById,
  handleMarkAsRead,
  handleMarkAllAsRead,
  handleDeleteNotification,
} from '../controller/notificationController.js';
import { validate } from '../../../shared/middleware/validate.js';
import { notificationPayloadSchema } from '../validator/schema.js';

const router = Router();

// GET: Ambil daftar notifikasi (user_id dari params URL, pagination otomatis di controller)
router.get(
  '/api/v1/notifications/user/:user_id', 
  handleGetNotificationsByUserId
);

// GET: Ambil jumlah belum dibaca (user_id dari params URL)
router.get(
  '/api/v1/notifications/user/:user_id/unread-count', 
  handleGetUnreadCount
);

// PUT: Tandai semua dibaca (user_id dikirim di dalam body request)
router.put(
  '/api/v1/notifications/read-all',
  validate(notificationPayloadSchema),
  handleMarkAllAsRead
);

// GET: Ambil spesifik 1 notifikasi berdasarkan ID
router.get(
  '/api/v1/notifications/:id', 
  handleGetNotificationById
);

// PUT: Tandai 1 notifikasi dibaca (user_id dikirim di dalam body request)
router.put(
  '/api/v1/notifications/:id/read',
  validate(notificationPayloadSchema),
  handleMarkAsRead
);

// DELETE: Hapus 1 notifikasi (user_id dikirim di dalam query string: ?user_id=...)
router.delete(
  '/api/v1/notifications/:id', 
  handleDeleteNotification
);

export default router;