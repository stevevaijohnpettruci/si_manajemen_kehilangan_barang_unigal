import BASE_URL from '../api-config';
import axios from 'axios';

// GET /api/v1/claims - Mengambil semua data klaim
function getClaims(token) {
  return axios.get(`${BASE_URL}/claims`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// GET /api/v1/claims/:id - Mengambil detail klaim spesifik
function getClaimById(id, token) {
  return axios.get(`${BASE_URL}/claims/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// POST /api/v1/claims - Membuat klaim baru atas suatu barang
function createClaim(claimData, token) {
  return axios.post(`${BASE_URL}/claims`, claimData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// PUT /api/v1/claims/:id - Memperbarui status/data klaim
function updateClaim(id, claimData, token) {
  return axios.put(`${BASE_URL}/claims/${id}`, claimData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export {
  getClaims,
  getClaimById,
  createClaim,
  updateClaim,
};