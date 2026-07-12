import { Pool } from 'pg';

class NotificationRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createNewNotification({ id, user_id, report_id, title, message }) {
    const result = await this._pool.query(
      `INSERT INTO notifications(id, user_id, report_id, title, message)
       VALUES($1, $2, $3, $4, $5) RETURNING id`,
      [id, user_id, report_id, title, message],
    );
    return result.rows[0];
  }

  async findNotificationsByUserId(userId, limit, offset) {
    const result = await this._pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC, id DESC LIMIT $2 OFFSET $3',
      [userId, limit, offset],
    );

    // 2. Hitung total data untuk keperluan pagination
    const countResult = await this._pool.query(
      'SELECT COUNT(*) FROM notifications WHERE user_id = $1',
      [userId],
    );
    const totalData = parseInt(countResult.rows[0].count, 10);

    return {
      data: result.rows,
      meta: {
        totalData,
        totalPages: Math.ceil(totalData / limit),
      },
    };
  }

  async findNotificationById(id) {
    const result = await this._pool.query(
      'SELECT * FROM notifications WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  }

  // Fungsi untuk mendapatkan jumlah notifikasi yang belum dibaca (badge merah di UI)
  async getUnreadCountByUserId(userId) {
    const result = await this._pool.query(
      'SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND is_read = false',
      [userId],
    );
    return parseInt(result.rows[0].count, 10);
  }

  async markAsRead(id, userId) {
    const result = await this._pool.query(
      `UPDATE notifications SET is_read = true
       WHERE id = $1 AND user_id = $2 RETURNING id`,
      [id, userId],
    );
    return result.rows[0];
  }
  async markAllAsRead(userId) {
    await this._pool.query(
      'UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false',
      [userId],
    );
  }

  async deleteNotification(id, userId) {
    await this._pool.query(
      'DELETE FROM notifications WHERE id = $1 AND user_id = $2',
      [id, userId],
    );
  }
}

export default new NotificationRepositories();
