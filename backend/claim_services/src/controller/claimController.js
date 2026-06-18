import {
  createClaim,
  getClaims,
  getClaimById,
  updateClaimStatus,
  deleteClaim,
  getClaimByUserId,
  getIncomingClaims, // [BARU] Import fungsi
} from '../services/claimServices.js';
import response from '../../../shared/utils/response.js';

export const handleCreateClaim = async (req, res, next) => {
  try {
    const payload = req.validated;
    const data = await createClaim(payload);
    response(res, 201, 'Klaim atau laporan temuan berhasil diajukan', data);
  } catch (err) {
    next(err);
  }
};

export const handleGetClaims = async (req, res, next) => {
  try {
    const queryParams = req.query || {};
    const result = await getClaims(queryParams);
    response(res, 200, 'success', result);
  } catch (err) {
    next(err);
  }
};

export const handleGetClaimById = async (req, res, next) => {
  try {
    const data = await getClaimById(req.params.id);
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleGetClaimByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const result = await getClaimByUserId(user_id, page, limit);
    response(res, 200, 'success', result);
  } catch (err) {
    next(err);
  }
};

// [BARU] Handler untuk Pengajuan Masuk (Inbox)
export const handleGetIncomingClaims = async (req, res, next) => {
  try {
    const { user_id } = req.params; // Menggunakan user_id sebagai report_owner_id
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const result = await getIncomingClaims(user_id, page, limit);
    response(res, 200, 'success', result);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateClaimStatus = async (req, res, next) => {
  try {
    const payload = req.validated || req.body;
    const data = await updateClaimStatus(req.params.id, payload);
    response(res, 200, 'Status klaim berhasil diperbarui', data);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteClaim = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    await deleteClaim(req.params.id, user_id);
    response(res, 200, 'Data klaim berhasil dibatalkan/dihapus', null);
  } catch (err) {
    next(err);
  }
};
