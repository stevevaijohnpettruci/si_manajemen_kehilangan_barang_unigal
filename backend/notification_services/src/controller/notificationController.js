import {
  getNotificationsByUserId,
  getNotificationById,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '../services/notificationServices.js';
import response from '../../../shared/utils/response.js';

export const handleGetNotificationsByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    // KUNCI PERBAIKAN: Hitung offset untuk PostgreSQL
    const offset = (page - 1) * limit;

    // Berikan parameter sesuai urutan signature di Service: (userId, limit, offset)
    const result = await getNotificationsByUserId(user_id, limit, offset);
    response(res, 200, 'success', result);
  } catch (err) {
    next(err);
  }
};

export const handleGetUnreadCount = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const count = await getUnreadNotificationCount(user_id);
    response(res, 200, 'success', { unread_count: count });
  } catch (err) {
    next(err);
  }
};

export const handleGetNotificationById = async (req, res, next) => {
  try {
    const data = await getNotificationById(req.params.id);
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleMarkAsRead = async (req, res, next) => {
  try {
    // Mengambil user_id dari body/validated payload untuk otorisasi update
    const payload = req.validated || req.body;

    const data = await markNotificationAsRead(req.params.id, payload.user_id);
    response(res, 200, 'Notifikasi berhasil ditandai sudah dibaca', data);
  } catch (err) {
    next(err);
  }
};

export const handleMarkAllAsRead = async (req, res, next) => {
  try {
    const payload = req.validated || req.body;

    await markAllNotificationsAsRead(payload.user_id);
    response(res, 200, 'Semua notifikasi berhasil ditandai sudah dibaca', null);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteNotification = async (req, res, next) => {
  try {
    // Mengambil user_id dari query params sesuai pola handleDeleteClaim
    const { user_id } = req.query;

    await deleteNotification(req.params.id, user_id);
    response(res, 200, 'Notifikasi berhasil dihapus', null);
  } catch (err) {
    next(err);
  }
};
