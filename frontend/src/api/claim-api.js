import BASE_URL from './api-config';
import axios from 'axios';

// GET /api/v1/claims/user/:user_id - Mengambil riwayat klaim milik user yang sedang login
function getClaimByUserId(userId, token, page = 1, limit = 10) {
  return axios.get(`${BASE_URL}/claims/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      limit: limit,
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

// POST /api/v1/claims - Membuat klaim baru (Menggunakan FormData karena ada upload gambar)
function createClaim(claimData, token) {
  return axios.post(`${BASE_URL}/claims`, claimData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Axios akan otomatis mengenali Content-Type multipart/form-data jika dikirim berupa FormData
    },
  });
}

// PUT /api/v1/claims/:id - Memperbarui status klaim (pending -> accepted/rejected)
function updateClaimStatus(id, claimData, token) {
  return axios.put(`${BASE_URL}/claims/${id}`, claimData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getIncomingClaims(userId, token, page = 1, limit = 10) {
  return axios.get(`${BASE_URL}/claims/incoming/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      limit: limit,
    },
  });
}

// DELETE /api/v1/claims/:id - Membatalkan atau menghapus pengajuan klaim
function deleteClaim(id, userId, token) {
  return axios.delete(`${BASE_URL}/claims/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      user_id: userId, // Backend butuh user_id untuk memvalidasi kepemilikan klaim
    },
  });
}

export {
  getClaimByUserId,
  getClaimById,
  createClaim,
  updateClaimStatus,
  deleteClaim,
  getIncomingClaims,
};
