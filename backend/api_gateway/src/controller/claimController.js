import {
  getClaims,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim,
  getClaimByUserId,
  getIncomingClaims, // [BARU] Import fungsi service
} from '../services/claimServices.js';
import response from '../../../shared/utils/response.js';

export const handleGetClaims = async (req, res, next) => {
  try {
    const queryParams = req.query;
    const data = await getClaims(queryParams);
    response(res, 200, 'success', data);
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
    const userId = req.user.id;
    const { page, limit } = req.query;
    const data = await getClaimByUserId(userId, page, limit);
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

// [BARU] Controller untuk mengambil Pengajuan Masuk
export const handleGetIncomingClaims = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page, limit } = req.query;

    const data = await getIncomingClaims(userId, page, limit);
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleCreateClaim = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      user_id: req.user.id,
    };

    if (req.file) {
      payload.image_url = `/uploads/${req.file.filename}`;
    }

    const data = await createClaim(payload);
    response(res, 201, 'Claim berhasil dibuat', data);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateClaim = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image_url = `/uploads/${req.file.filename}`;
    }

    const data = await updateClaim(req.params.id, payload);
    response(res, 200, 'claim updated', data);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteClaim = async (req, res, next) => {
  try {
    const data = await deleteClaim(req.params.id);
    response(res, 200, 'claim deleted', data);
  } catch (err) {
    next(err);
  }
};
