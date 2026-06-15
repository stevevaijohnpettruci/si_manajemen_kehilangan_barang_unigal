import TokenManager from '../../../shared/security/tokenManager.js';
import { InvariantError } from '../../../shared/exceptions/index.js';
import authenticationRepositories from '../repositories/authenticationRepositories.js';
import userRepositories from '../repositories/userRepositories.js';
import AuthenticationError from '../../../shared/exceptions/authentication-error.js';

export const login = async ({ identity_number, password }) => {
  const userId = await authenticationRepositories.verifyUserCredential(
    identity_number,
    password,
  );
  const user =
    await userRepositories.getUserProfileByIdentityNumber(identity_number);

  if (!user) throw new AuthenticationError('User tidak ditemukan');
  if (!userId)
    throw new AuthenticationError('Identity number atau password salah');

  const accessToken = TokenManager.generateAccessToken({ id: userId });
  const refreshToken = TokenManager.generateRefreshToken({ id: userId });

  await authenticationRepositories.addRefreshToken(refreshToken, userId);
  return { accessToken, refreshToken, user: user };
};

export const refresh = async ({ refreshToken }) => {
  const exists =
    await authenticationRepositories.verifyRefreshToken(refreshToken);
  if (!exists) throw new InvariantError('Refresh token tidak valid');

  const { id } = TokenManager.verifyRefreshToken(refreshToken);

  await authenticationRepositories.deleteRefreshToken(refreshToken);
  const newRefreshToken = TokenManager.generateRefreshToken({ id });
  await authenticationRepositories.addRefreshToken(newRefreshToken, id);

  const accessToken = TokenManager.generateAccessToken({ id });
  return { accessToken, refreshToken: newRefreshToken };
};

export const logout = async ({ refreshToken }) => {
  const exists =
    await authenticationRepositories.verifyRefreshToken(refreshToken);
  if (!exists) throw new InvariantError('Refresh token tidak valid');

  await authenticationRepositories.deleteRefreshToken(refreshToken);
};

export const logoutAll = async ({ refreshToken }) => {
  const exists =
    await authenticationRepositories.verifyRefreshToken(refreshToken);
  if (!exists) throw new InvariantError('Refresh token tidak valid');

  await authenticationRepositories.deleteAllRefreshTokenByUserId(exists.userId);
};
