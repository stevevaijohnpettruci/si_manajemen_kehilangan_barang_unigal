import { getClaims, getClaimById, createClaim, updateClaim } from '../services/claimServices.js';
import response from '../../../shared/utils/response.js';

export const handleGetClaims = async (req, res, next) => {
  try {
    const data = await getClaims();
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

export const handleCreateClaim = async (req, res, next) => {
  try {
    const data = await createClaim(req.body);
    response(res, 201, 'claim created', data);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateClaim = async (req, res, next) => {
  try {
    const data = await updateClaim(req.params.id, req.body);
    response(res, 200, 'claim updated', data);
  } catch (err) {
    next(err);
  }
};
