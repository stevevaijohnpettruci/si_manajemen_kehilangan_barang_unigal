import { Pool } from 'pg';

class ReportRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createNewReport({ id, user_id, item_name, description, category, image_url, location_lost, date_lost, status, contact_phone }) {
    const result = await this._pool.query(
      `INSERT INTO reports(id, user_id, item_name, description, category, image_url, location_lost, date_lost, status, contact_phone)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [id, user_id, item_name, description, category, image_url, location_lost, date_lost, status, contact_phone]
    );
    return result.rows[0];
  }

  async findAllReports() {
    const result = await this._pool.query('SELECT * FROM reports ORDER BY created_at DESC');
    return result.rows;
  }

  async findReportById(id) {
    const result = await this._pool.query('SELECT * FROM reports WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async updateReport(id, { item_name, description, category, image_url, location_lost, date_lost, status, contact_phone }) {
    const result = await this._pool.query(
      `UPDATE reports SET item_name=$1, description=$2, category=$3, image_url=$4,
       location_lost=$5, date_lost=$6, status=$7, contact_phone=$8, updated_at=NOW()
       WHERE id=$9 RETURNING id`,
      [item_name, description, category, image_url, location_lost, date_lost, status, contact_phone, id]
    );
    return result.rows[0];
  }

  async deleteReport(id) {
    await this._pool.query('DELETE FROM reports WHERE id = $1', [id]);
  }
}

export default new ReportRepositories();
