import { login, refresh, logout, logoutAll } from '../services/authenticationServices.js';
import response from '../../../shared/utils/response.js';
import InvariantError from '../../../shared/exceptions/invariant-error.js';

export const handleLogin = async (req, res, next) => {
  try {
    const data = await login(req.validated);
    response(res, 200, 'Authentication berhasil', data);
  } catch (err) {
    next(err);
  }
};

export const handleRefreshToken = async (req, res, next) => {
  try {
    const data = await refresh(req.validated);
    response(res, 200, 'Access token berhasil diperbarui', data);
  } catch (err) {
    next(err);
  }
};

export const handleLogout = async (req, res, next) => {
  try {
    await logout(req.validated);
    response(res, 200, 'Logout berhasil', null);
  } catch (err) {
    next(err);
  }
};

export const handleLogoutAll = async (req, res, next) => {
  try {
    await logoutAll(req.validated);
    response(res, 200, 'Logout semua device berhasil', null);
  } catch (err) {
    next(err);
  }
};
