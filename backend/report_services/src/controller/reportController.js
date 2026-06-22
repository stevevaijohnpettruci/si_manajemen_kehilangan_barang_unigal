import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
  getReportByUserId,
  updateReportStatus,
} from '../services/reportServices.js';
import response from '../../../shared/utils/response.js';

export const handleCreateReport = async (req, res, next) => {
  try {
    // req.validated ini isinya adalah JSON yang dikirim oleh API Gateway
    // (Sudah mengandung item_name, description, user_id, dan image_url)
    const payload = req.validated;

    // LANGSUNG SIMPAN! Tidak perlu panggil req.file atau req.user.id lagi di sini
    const data = await createReport(payload);

    response(res, 201, 'Report berhasil dibuat', data);
  } catch (err) {
    next(err);
  }
};

export const handleGetReports = async (req, res, next) => {
  try {
    // Pastikan req.query dan req.pagination sudah dikirim oleh API Gateway
    const { filter } = req.query || {};
    const { limit, offset } = req.pagination || { limit: 10, offset: 0 };

    const result = await getReports(filter, limit, offset);

    response(res, 200, 'success', result);
  } catch (err) {
    next(err);
  }
};

export const handleGetReportById = async (req, res, next) => {
  try {
    const data = await getReportById(req.params.id);
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleGetReportByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    // 1. Tangkap filter dari Frontend
    const { filter } = req.query || {};

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    // 2. Oper 'filter' ke Service
    const result = await getReportByUserId(user_id, filter, limit, offset);

    response(res, 200, 'success', result);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateReport = async (req, res, next) => {
  try {
    const payload = req.validated;

    // SAMA SEPERTI CREATE, LANGSUNG UPDATE!
    const data = await updateReport(req.params.id, payload);
    response(res, 200, 'Report berhasil diupdate', data);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteReport = async (req, res, next) => {
  try {
    await deleteReport(req.params.id);
    response(res, 200, 'Report berhasil dihapus', null);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateReportStatus = async (req, res, next) => {
  try {
    const { status } = req.validated;

    const data = await updateReportStatus(req.params.id, status);
    response(res, 200, 'Status report berhasil diupdate', data);
  } catch (err) {
    next(err);
  }
};
