import { nanoid } from 'nanoid';
import ClaimRepositories from '../repositories/claimRepositories.js';
import rpcRequest from '../../../shared/messaging/rpcClient.js';
import InvariantError from '../../../shared/exceptions/invariant-error.js';
import NotFoundError from '../../../shared/exceptions/not-found-error.js';

export const createClaim = async (payload) => {
  const { exists } = await rpcRequest('user.verify', {
    id: payload.user_id,
    user_id: payload.user_id,
    userId: payload.user_id,
  });
  if (!exists) throw new InvariantError('User tidak ditemukan');

  const id = `claim-${nanoid(16)}`;
  return ClaimRepositories.createNewClaim({ ...payload, id });
};

export const getClaims = async (queryParams = {}) => {
  const page = parseInt(queryParams.page, 10) || 1;
  const limit = parseInt(queryParams.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const claims = await ClaimRepositories.findAllClaims(limit, offset);
  return claims;
};

export const getClaimByUserId = async (userId, page, limit) => {
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;
  const offset = (parsedPage - 1) * parsedLimit;

  const claims = await ClaimRepositories.findClaimByUserId(
    userId,
    parsedLimit,
    offset,
  );
  return claims;
};

// [BARU] Service untuk Pengajuan Masuk (Inbox)
export const getIncomingClaims = async (reportOwnerId, page, limit) => {
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;
  const offset = (parsedPage - 1) * parsedLimit;

  const claims = await ClaimRepositories.findIncomingClaims(
    reportOwnerId,
    parsedLimit,
    offset,
  );
  return claims;
};

export const getClaimById = async (id) => {
  const claim = await ClaimRepositories.findClaimById(id);
  if (!claim) throw new NotFoundError('Claim tidak ditemukan');
  return claim;
};

export const updateClaimStatus = async (id, payload) => {
  const claim = await ClaimRepositories.findClaimById(id);
  if (!claim) throw new NotFoundError('Claim tidak ditemukan');
  
  return ClaimRepositories.updateClaimStatus(id, payload.status);
};

export const deleteClaim = async (id) => {
  const claim = await ClaimRepositories.findClaimById(id);
  if (!claim) throw new NotFoundError('Claim tidak ditemukan');
  
  return ClaimRepositories.deleteClaim(id, claim.user_id);
};