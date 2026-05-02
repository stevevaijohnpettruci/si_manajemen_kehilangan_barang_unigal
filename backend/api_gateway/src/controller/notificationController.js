import { getNotifications, createNotification } from '../services/notificationServices.js';
import response from '../../../shared/utils/response.js';

export const handleGetNotifications = async (req, res, next) => {
  try {
    const data = await getNotifications(req.query.userId);
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleCreateNotification = async (req, res, next) => {
  try {
    const data = await createNotification(req.body);
    response(res, 201, 'notification sent', data);
  } catch (err) {
    next(err);
  }
};
