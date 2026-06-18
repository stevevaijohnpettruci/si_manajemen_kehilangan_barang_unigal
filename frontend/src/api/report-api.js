import BASE_URL from './api-config';
import axios from 'axios';

// GET /api/v1/reports - Mengambil semua laporan
// GET /api/v1/reports
function getReports(token, filter = '', page = 1, limit = 10) {
  return axios.get(`${BASE_URL}/reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(filter && { filter }),
      page: page,
      limit: limit,
    },
  });
}
// GET /api/v1/reports/:id - Mengambil detail laporan spesifik
function getReportById(id, token) {
  return axios.get(`${BASE_URL}/reports/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// POST /api/v1/reports - Membuat laporan baru
function createReport(reportData, token) {
  return axios.post(`${BASE_URL}/reports`, reportData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Opsional: Jika reportData berupa FormData (karena ada upload gambar),
      // Axios biasanya akan otomatis menyesuaikan Content-Type menjadi multipart/form-data,
      // tapi kamu bisa mendeklarasikannya secara eksplisit jika backend membutuhkannya:
      // 'Content-Type': 'multipart/form-data'
    },
  });
}

function getReportByUserId(userId, token, filter = '', page = 1, limit = 10) {
  return axios.get(`${BASE_URL}/reports/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      filter: filter, // Tambahkan ini
      page: page,
      limit: limit,
    },
  });
}

// PUT /api/v1/reports/:id - Memperbarui laporan (misal edit deskripsi atau ubah status)
function updateReport(id, reportData, token) {
  return axios.put(`${BASE_URL}/reports/${id}`, reportData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// DELETE /api/v1/reports/:id - Menghapus laporan
function deleteReport(id, token) {
  return axios.delete(`${BASE_URL}/reports/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getReports, getReportById, getReportByUserId, createReport, updateReport, deleteReport };
