import BASE_URL from './api-config';
import axios from 'axios';

export const getNotifications = async (userId, token, page = 1, limit = 10) => {
  return axios.get(`${BASE_URL}/notifications`, {
    params: { userId, page, limit },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const markAllAsRead = async (userId, token) => {
  return axios.put(
    `${BASE_URL}/notifications/read-all`,
    { user_id: userId },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

// [BARU] Fungsi untuk tandai dibaca
export const markNotificationAsRead = async (notifId, userId, token) => {
  return axios.put(
    `${BASE_URL}/notifications/${notifId}/read`,
    { user_id: userId }, // Sesuai dengan validator schema kita
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

// [BARU] Fungsi untuk hapus
export const deleteNotification = async (notifId, userId, token) => {
  return axios.delete(`${BASE_URL}/notifications/${notifId}`, {
    params: { user_id: userId }, // Sesuai dengan controller kita (req.query)
    headers: { Authorization: `Bearer ${token}` },
  });
};
