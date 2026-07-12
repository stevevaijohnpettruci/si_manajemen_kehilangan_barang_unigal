import BASE_URL from './api-config';
import axios from 'axios';

function login(identity_number, password) {
  return axios.post(`${BASE_URL}/authentications`, {
    identity_number, 
    password,
  });
}

function refreshToken(token) {
  return axios.put(`${BASE_URL}/authentications`, {
    refreshToken: token,
  });
}

function logout(token) {
  return axios.delete(`${BASE_URL}/authentications`, {
    data: { refreshToken: token }, 
  });
}

function getUsers() {
  return axios.get(`${BASE_URL}/users`);
}

function getUserById(id) {
  return axios.get(`${BASE_URL}/users/${id}`);
}

export {
  login,
  refreshToken,
  logout,
  getUsers,
  getUserById,
};