import httpClient from '../utils/httpClient.js';
import { NOTIFICATION_SERVICE_URL } from '../config/env.js';

// GET: Ambil daftar notifikasi dengan pagination
export const getNotifications = async (userId, page = 1, limit = 10) => {
  const { data } = await httpClient.get(
    `${NOTIFICATION_SERVICE_URL}/api/v1/notifications/user/${userId}?page=${page}&limit=${limit}`,
  );
  return data.data; 
};

// GET: Ambil jumlah notifikasi yang belum dibaca
export const getUnreadCount = async (userId) => {
  const { data } = await httpClient.get(
    `${NOTIFICATION_SERVICE_URL}/api/v1/notifications/user/${userId}/unread-count`,
  );
  return data.data;
};

// GET: Ambil detail spesifik 1 notifikasi
export const getNotificationById = async (id) => {
  const { data } = await httpClient.get(
    `${NOTIFICATION_SERVICE_URL}/api/v1/notifications/${id}`,
  );
  return data.data;
};

// PUT: Tandai 1 notifikasi sudah dibaca (user_id dikirim via body)
export const markNotificationAsRead = async (id, userId) => {
  const { data } = await httpClient.put(
    `${NOTIFICATION_SERVICE_URL}/api/v1/notifications/${id}/read`,
    { user_id: userId },
  );
  return data;
};

// PUT: Tandai semua notifikasi sudah dibaca (user_id dikirim via body)
export const markAllAsRead = async (userId) => {
  const { data } = await httpClient.put(
    `${NOTIFICATION_SERVICE_URL}/api/v1/notifications/read-all`,
    { user_id: userId },
  );
  return data;
};

// DELETE: Hapus notifikasi (user_id dikirim via query parameters)
export const deleteNotification = async (id, userId) => {
  const { data } = await httpClient.delete(
    `${NOTIFICATION_SERVICE_URL}/api/v1/notifications/${id}`,
    { params: { user_id: userId } },
  );
  return data;
};