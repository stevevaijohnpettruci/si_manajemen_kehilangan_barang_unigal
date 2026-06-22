import { Pool } from 'pg';

class UserRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async findUserById(id) {
    const result = await this.pool.query(
    'SELECT id, email, full_name FROM users WHERE id = $1',  // ← tambah email, full_name
    [id],
  );
    return result.rows[0] || null;
  }

  async findUserByEmail(email) {
    const result = await this.pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email],
    );
    return result.rows[0] || null;
  }

  // Tambahan fungsi untuk mengecek duplikasi nomor identitas
  async findUserByIdentityNumber(identityNumber) {
    const result = await this.pool.query(
      'SELECT id FROM users WHERE identity_number = $1',
      [identityNumber],
    );
    return result.rows[0] || null;
  }

  // Penyesuaian query: tambah 'role' dan ganti 'student_id_number' ke 'identity_number'
  async createUser({
    id,
    first_name,
    last_name,
    role,
    full_name,
    email,
    password,
    identity_number,
    address,
    phone_number,
    faculty,
    study_program,
  }) {
    const result = await this.pool.query(
      'INSERT INTO users(id, first_name, last_name, role, full_name, email, password, identity_number, address, phone_number, faculty, study_program) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
      [
        id,
        first_name,
        last_name,
        role,
        full_name,
        email,
        password,
        identity_number,
        address,
        phone_number,
        faculty,
        study_program,
      ],
    );
    return result.rows[0].id;
  }

  async getUserProfileByIdentityNumber(identityNumber) {
    const result = await this.pool.query(
      `SELECT 
      full_name,
      role
    FROM users
    WHERE identity_number = $1`,
      [identityNumber],
    );

    return result.rows[0];
  }
}

export default new UserRepositories();
