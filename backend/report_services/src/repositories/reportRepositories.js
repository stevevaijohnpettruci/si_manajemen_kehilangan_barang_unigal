import { Pool } from 'pg';

class ReportRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createNewReport({
    id,
    user_id,
    user_fullname,
    item_name,
    description,
    category,
    image_url,
    location_lost,
    date_lost,
    status,
    contact_phone,
  }) {
    const result = await this._pool.query(
      `INSERT INTO reports(id, user_id, user_fullname,item_name, description, category, image_url, location_lost, date_lost, status, contact_phone)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [
        id,
        user_id,
        user_fullname,
        item_name,
        description,
        category,
        image_url,
        location_lost,
        date_lost,
        status,
        contact_phone,
      ],
    );
    return result.rows[0];
  }

  // UPDATE: Ditambahkan limit, offset, dan perhitungan total data
  async findAllReports(limit, offset) {
    const result = await this._pool.query(
      'SELECT * FROM reports ORDER BY created_at DESC, id DESC LIMIT $1 OFFSET $2',
      [limit, offset],
    );

    const countResult = await this._pool.query('SELECT COUNT(*) FROM reports');
    const totalData = parseInt(countResult.rows[0].count, 10);

    return {
      data: result.rows,
      meta: {
        totalData,
        totalPages: Math.ceil(totalData / limit),
      },
    };
  }

  async findReportById(id) {
    const result = await this._pool.query(
      'SELECT * FROM reports WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  }

  async updateReport(
    id,
    {
      item_name,
      description,
      category,
      image_url,
      location_lost,
      date_lost,
      status,
      contact_phone,
    },
  ) {
    const result = await this._pool.query(
      `UPDATE reports SET item_name=$1, description=$2, category=$3, image_url=$4,
       location_lost=$5, date_lost=$6, status=$7, contact_phone=$8, updated_at=NOW()
       WHERE id=$9 RETURNING id`,
      [
        item_name,
        description,
        category,
        image_url,
        location_lost,
        date_lost,
        status,
        contact_phone,
        id,
      ],
    );
    return result.rows[0];
  }

  async deleteReport(id) {
    await this._pool.query('DELETE FROM reports WHERE id = $1', [id]);
  }

  // UPDATE: Ditambahkan limit, offset, dan perhitungan total data khusus filter tanggal
  async findReportsByDate(startDate, endDate, limit, offset) {
    const result = await this._pool.query(
      // PERHATIKAN BARIS INI: Tambahkan ", id DESC" setelah "created_at DESC"
      'SELECT * FROM reports WHERE created_at >= $1 AND created_at <= $2 ORDER BY created_at DESC, id DESC LIMIT $3 OFFSET $4',
      [startDate, endDate, limit, offset],
    );

    const countResult = await this._pool.query(
      'SELECT COUNT(*) FROM reports WHERE created_at >= $1 AND created_at <= $2',
      [startDate, endDate],
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
}

export default new ReportRepositories();
