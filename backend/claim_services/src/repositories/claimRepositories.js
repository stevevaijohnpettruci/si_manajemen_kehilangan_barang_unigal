import { Pool } from 'pg';

class ClaimRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createNewClaim({
    id,
    report_id,
    user_id,
    claim_type,
    reporter_name,
    reporter_role,
    location,
    contact_phone,
    description,
    image_url,
    message,
    status = 'pending',
    report_owner_id, // [BARU] Tambahkan ini
  }) {
    const result = await this._pool.query(
      `INSERT INTO claims(id, report_id, user_id, claim_type, reporter_name, reporter_role, location, contact_phone, description, image_url, message, status, report_owner_id)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
      [
        id,
        report_id,
        user_id,
        claim_type,
        reporter_name,
        reporter_role,
        location,
        contact_phone,
        description,
        image_url,
        message,
        status,
        report_owner_id, // [BARU] Masukkan ke query
      ],
    );
    return result.rows[0];
  }

  async findAllClaims(limit, offset) {
    const result = await this._pool.query(
      'SELECT * FROM claims ORDER BY created_at DESC, id DESC LIMIT $1 OFFSET $2',
      [limit, offset],
    );

    const countResult = await this._pool.query('SELECT COUNT(*) FROM claims');
    const totalData = parseInt(countResult.rows[0].count, 10);

    return {
      data: result.rows,
      meta: {
        totalData,
        totalPages: Math.ceil(totalData / limit),
      },
    };
  }

  async findClaimByUserId(user_id, limit, offset) {
    const result = await this._pool.query(
      'SELECT * FROM claims WHERE user_id = $1 ORDER BY created_at DESC, id DESC LIMIT $2 OFFSET $3',
      [user_id, limit, offset],
    );

    const countResult = await this._pool.query(
      'SELECT COUNT(*) FROM claims WHERE user_id = $1',
      [user_id],
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

  // [BARU] Fungsi untuk mengambil data Pengajuan Masuk (Inbox)
  async findIncomingClaims(report_owner_id, limit, offset) {
    const result = await this._pool.query(
      'SELECT * FROM claims WHERE report_owner_id = $1 ORDER BY created_at DESC, id DESC LIMIT $2 OFFSET $3',
      [report_owner_id, limit, offset],
    );

    const countResult = await this._pool.query(
      'SELECT COUNT(*) FROM claims WHERE report_owner_id = $1',
      [report_owner_id],
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

  async findClaimById(id) {
    const result = await this._pool.query(
      'SELECT * FROM claims WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  }

  async updateClaimStatus(id, status) {
    const result = await this._pool.query(
      `UPDATE claims SET status=$1, updated_at=NOW()
       WHERE id=$2 RETURNING id`,
      [status, id],
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
