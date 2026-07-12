import { createContext, useState, useEffect, useCallback } from 'react';

import {
  login as loginAPI,
  logout as logoutAPI,
  refreshToken,
} from '@/api/user-api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (token) {
      setIsAuthenticated(true);

      if (userData) {
        setUser(JSON.parse(userData));
      }
    }

    setLoading(false);
  }, []);

  // Login
  const handleLogin = useCallback(async (identity_number, password) => {
    try {
      const response = await loginAPI(identity_number, password);

      const data = response.data.data || response.data;

      // Sesuaikan dengan response backend
      const accessToken = data.accessToken || data.token;

      const refresh = data.refreshToken;

      const userData = data.user || null;

      localStorage.setItem('accessToken', accessToken);

      if (refresh) {
        localStorage.setItem('refreshToken', refresh);
      }

      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
      }

      setIsAuthenticated(true);

      return response;
    } catch (error) {
      console.error('Login gagal:', error);
      throw error;
    }
  }, []);

  // Logout
  const handleLogout = useCallback(async () => {
    try {
      const token = localStorage.getItem('refreshToken');

      if (token) {
        await logoutAPI(token);
      }
    } catch (error) {
      console.error('Logout API gagal:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Refresh token (opsional)
  const handleRefreshToken = useCallback(async () => {
    try {
      const token = localStorage.getItem('refreshToken');

      if (!token) return null;

      const response = await refreshToken(token);

      const data = response.data.data || response.data;

      localStorage.setItem('accessToken', data.accessToken);

      return data.accessToken;
    } catch (error) {
      handleLogout();
      return null;
    }
  }, [handleLogout]);

  const value = {
    user,
    loading,
    isAuthenticated,

    login: handleLogin,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
