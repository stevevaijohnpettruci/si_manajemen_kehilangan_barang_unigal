import {
  getNotifications,
  getUnreadCount,
  getNotificationById,
  markNotificationAsRead,
  markAllAsRead,
  deleteNotification,
} from '../services/notificationServices.js';
import response from '../../../shared/utils/response.js';

export const handleGetNotifications = async (req, res, next) => {
  try {
    const { userId, page, limit } = req.query;
    
    // Teruskan userId beserta query pagination ke service gateway
    const data = await getNotifications(userId, page || 1, limit || 10);
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleGetUnreadCount = async (req, res, next) => {
  try {
    const { userId } = req.query; // Ambil userId dari query parameters
    
    const data = await getUnreadCount(userId);
    response(res, 200, 'success', data);
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
    const { id } = req.params;
    // Ambil user_id dari body yang dikirim oleh fungsi frontend
    const { user_id } = req.body; 
    
    const data = await markNotificationAsRead(id, user_id);
    response(res, 200, 'Notifikasi berhasil ditandai sudah dibaca', data);
  } catch (err) {
    next(err);
  }
};

export const handleMarkAllAsRead = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    
    const data = await markAllAsRead(user_id);
    response(res, 200, 'Semua notifikasi berhasil ditandai sudah dibaca', data);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Sesuai dengan konfigurasi Axios, delete menerima parameter di req.query
    const { user_id } = req.query; 
    
    const data = await deleteNotification(id, user_id);
    response(res, 200, 'Notifikasi berhasil dihapus', data);
  } catch (err) {
    next(err);
  }
};