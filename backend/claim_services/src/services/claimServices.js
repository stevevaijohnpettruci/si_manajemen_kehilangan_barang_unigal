import { nanoid } from 'nanoid';
import ClaimRepositories from '../repositories/claimRepositories.js';
import rpcRequest from '../../../shared/messaging/rpcClient.js';
import InvariantError from '../../../shared/exceptions/invariant-error.js';
import NotFoundError from '../../../shared/exceptions/not-found-error.js';
import rabbitmq from '../../../shared/messaging/rabbitmq.js';
import { sendClaimEmail, sendUpdateClaimStatusEmail } from '../utils/mailer.js';

export const createClaim = async (payload) => {
  // Verifikasi user yang mengajukan klaim
  const { exists } = await rpcRequest('user.verify', {
    userId: payload.user_id,
  });
  if (!exists) throw new InvariantError('User tidak ditemukan');

  const { user: reportOwner } = await rpcRequest('user.verify', {
    userId: payload.report_owner_id,
  });

  await sendClaimEmail({
    to: reportOwner.email,
    report_id: payload.report_id,
    reporter_name: payload.reporter_name,
    contact_phone: payload.contact_phone,
    description: payload.description,
    created_at: payload.created_at,
  });

  await rabbitmq.publish('ex.notifications', 'claim.created', {
    user_id: payload.report_owner_id,
    report_id: payload.report_id,
    title: 'Ada Pengajuan Klaim Baru!',
    message: `${payload.reporter_name} telah merespons laporan barang Anda.`,
  });

  console.log('[NOTIFICATION] Publishing notification for new claim');

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

  const { user: claimant } = await rpcRequest('user.verify', {
    userId: claim.user_id,
  });

  await sendUpdateClaimStatusEmail({
    to: claimant.email,
    report_id: claim.report_id,
    reporter_name: claim.reporter_name,
    status: payload.status, // 'accepted' atau 'rejected'
  });

  return ClaimRepositories.updateClaimStatus(id, payload.status);
};

export const deleteClaim = async (id) => {
  const claim = await ClaimRepositories.findClaimById(id);
  if (!claim) throw new NotFoundError('Claim tidak ditemukan');

  return ClaimRepositories.deleteClaim(id, claim.user_id);
};
