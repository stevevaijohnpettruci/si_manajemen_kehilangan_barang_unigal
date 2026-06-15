import BASE_URL from '../api-config';
import axios from 'axios';

// GET /api/v1/notifications
function getNotifications(token) {
  return axios.get(`${BASE_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getNotifications };
