import { Pool } from 'pg';
import bcrypt from 'bcrypt';

class AuthenticationRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addRefreshToken(token, userId) {
    const countResult = await this.pool.query(
      'SELECT COUNT(*) FROM authentications WHERE "userId" = $1',
      [userId],
    );
    if (parseInt(countResult.rows[0].count) >= 5) {
      await this.pool.query(
        'DELETE FROM authentications WHERE "userId" = $1 AND "createdAt" = (SELECT MIN("createdAt") FROM authentications WHERE "userId" = $1)',
        [userId],
      );
    }
    await this.pool.query(
      'INSERT INTO authentications ("refreshToken", "userId") VALUES($1, $2)',
      [token, userId],
    );
  }

  async verifyUserCredential(identity_number, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE identity_number = $1',
      values: [identity_number],
    };

    const result = await this.pool.query(query);
    if (result.rows.length === 0) {
      return null;
    }

    const { id, password: hashedPassword } = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return null;
    }
    return id;
  }

  async deleteRefreshToken(token) {
    await this.pool.query(
      'DELETE FROM authentications WHERE "refreshToken" = $1',
      [token],
    );
  }

  async deleteAllRefreshTokenByUserId(userId) {
    await this.pool.query('DELETE FROM authentications WHERE "userId" = $1', [
      userId,
    ]);
  }

  async verifyRefreshToken(token) {
    const result = await this.pool.query(
      'SELECT "refreshToken", "userId" FROM authentications WHERE "refreshToken" = $1',
      [token],
    );
    if (!result.rows.length) return false;
    return result.rows[0];
  }
}

export default new AuthenticationRepositories();
