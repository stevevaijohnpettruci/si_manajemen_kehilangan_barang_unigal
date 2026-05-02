import httpClient from '../../utils/httpClient.js';
import { NOTIFICATION_SERVICE_URL } from '../../config/env.js';

export const getNotifications = async (userId) => {
  const { data } = await httpClient.get(
    `${NOTIFICATION_SERVICE_URL}/api/v1/notifications?userId=${userId}`,
  );
  return data;
};

export const createNotification = async (payload) => {
  const { data } = await httpClient.post(
    `${NOTIFICATION_SERVICE_URL}/api/v1/notifications`,
    payload,
  );
  return data;
};
