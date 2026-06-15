import httpClient from '../utils/httpClient.js';
import { USER_SERVICE_URL } from '../config/env.js';

export const getUsers = async () => {
  const { data } = await httpClient.get(`${USER_SERVICE_URL}/api/v1/users`);
  return data;
};

export const getUserById = async (id) => {
  const { data } = await httpClient.get(`${USER_SERVICE_URL}/api/v1/users/${id}`);
  return data;
};

export const createUser = async (payload) => {
  const { data } = await httpClient.post(`${USER_SERVICE_URL}/api/v1/users`, payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await httpClient.post(`${USER_SERVICE_URL}/api/v1/authentications`, payload);
  return data;
};

export const refreshToken = async (payload) => {
  const { data } = await httpClient.put(`${USER_SERVICE_URL}/api/v1/authentications`, payload);
  return data;
};

export const logout = async (payload) => {
  const { data } = await httpClient.delete(`${USER_SERVICE_URL}/api/v1/authentications`, { data: payload });
  return data;
};
