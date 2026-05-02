import { Pool } from 'pg';

class UserRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async findUserByEmail(email) {
    const result = await this.pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email],
    );
    return result.rows[0] || null;
  }

  async createUser({ id, first_name, last_name, full_name, email, password, student_id_number, address, phone_number, faculty, study_program }) {
    const result = await this.pool.query(
      'INSERT INTO users(id, first_name, last_name, full_name, email, password, student_id_number, address, phone_number, faculty, study_program) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
      [id, first_name, last_name, full_name, email, password, student_id_number, address, phone_number, faculty, study_program],
    );
    return result.rows[0].id;
  }
}

export default new UserRepositories();
