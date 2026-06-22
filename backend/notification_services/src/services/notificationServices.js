import { nanoid } from 'nanoid';
import NotificationRepositories from '../repositories/notificationRepositories.js';
import rpcRequest from '../../../shared/messaging/rpcClient.js';
import InvariantError from '../../../shared/exceptions/invariant-error.js';
import NotFoundError from '../../../shared/exceptions/not-found-error.js';

export const createNotification = async (payload) => {
  const { exists } = await rpcRequest('user.verify', {
    id: payload.user_id,
    userId: payload.user_id,
  });
  if (!exists) throw new InvariantError('User tidak ditemukan');

  const id = `notif-${nanoid(16)}`;
  return NotificationRepositories.createNewNotification({ ...payload, id });
};

export const getNotificationsByUserId = async (userId, limit, offset) => {
  const notifications = await NotificationRepositories.findNotificationsByUserId(
    userId,
    limit,
    offset,
  );
  return notifications;
};

export const getNotificationById = async (id) => {
  const notification = await NotificationRepositories.findNotificationById(id);
  if (!notification) throw new NotFoundError('Notifikasi tidak ditemukan');
  return notification;
};

export const getUnreadNotificationCount = async (userId) => {
  const count = await NotificationRepositories.getUnreadCountByUserId(userId);
  return count;
};

export const markNotificationAsRead = async (id, userId) => {
  const notification = await NotificationRepositories.findNotificationById(id);
  if (!notification) throw new NotFoundError('Notifikasi tidak ditemukan');
  if (notification.user_id !== userId) {
    throw new InvariantError('Anda tidak berhak mengakses notifikasi ini');
  }

  return NotificationRepositories.markAsRead(id, userId);
};

export const markAllNotificationsAsRead = async (userId) => {
  await NotificationRepositories.markAllAsRead(userId);
};

export const deleteNotification = async (id, userId) => {
  const notification = await NotificationRepositories.findNotificationById(id);
  if (!notification) throw new NotFoundError('Notifikasi tidak ditemukan');
  if (notification.user_id !== userId) {
    throw new InvariantError('Anda tidak berhak menghapus notifikasi ini');
  }

  return NotificationRepositories.deleteNotification(id, userId);
};