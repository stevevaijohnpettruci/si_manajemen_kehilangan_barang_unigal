import { Pool } from 'pg';

class ClaimRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createNewClaim({
    id,
    report_id,
    role,
    location,
    phone_number,
    description,
    image_url,
    message,
    status,
  }) {
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const result = await this._pool.query(
      `INSERT INTO claims(id, report_id, role, location, phone_number, description, image_url, message, status, created_at, updated_at)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [
        id,
        report_id,
        role,
        location,
        phone_number,
        description,
        image_url,
        message,
        status,
        createdAt,
        updatedAt,
      ],
    );
    return result.rows[0];
  }

  async findClaimByUserId(user_id) {
    const result = await this._pool.query(
      'SELECT * FROM claims WHERE user_id = $1',
      [user_id],
    );
    return result.rows;
  }

  async updateClaim(
    id,
    user_id,
    {
      report_id,
      role,
      location,
      phone_number,
      description,
      image_url,
      message,
      status,
    },
  ) {
    const updatedAt = new Date().toISOString();
    const result = await this._pool.query(
      `UPDATE claims SET report_id=$1, role=$2, location=$3, phone_number=$4, description=$5, image_url=$6, message=$7, status=$8, updated_at=$9
             WHERE id=$10 AND user_id=$11 RETURNING id`,
      [
        report_id,
        role,
        location,
        phone_number,
        description,
        image_url,
        message,
        status,
        updatedAt,
        id,
        user_id,
      ],
    );
    return result.rows[0];
  }

  async deleteClaim(id, user_id) {
    await this._pool.query(
      'DELETE FROM claims WHERE id = $1 AND user_id = $2',
      [id, user_id],
    );
  }
}

export default new ClaimRepositories();
