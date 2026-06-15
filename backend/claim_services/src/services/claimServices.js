import ClaimRepositories from '../repositories/claimRepositories.js';
import nanoid from 'nanoid';
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

export const getClaims = async () => {
  const claims = await ClaimRepositories.findAllClaims();
  if (!claims) throw new NotFoundError('Claims tidak ditemukan');
  return claims;
};

export const getClaimByUserId = async (user_id) => {
  const claims = await ClaimRepositories.findClaimByUserId(user_id);
  if (!claims) throw new NotFoundError('Claims tidak ditemukan');
  return claims;
};

export const updateClaim = async (id, user_id, payload) => {
  const claim = await ClaimRepositories.findClaimById(id);
  if (!claim) throw new NotFoundError('Claim tidak ditemukan');
  if (claim.user_id !== user_id)
    throw new InvariantError(
      'Anda tidak memiliki akses untuk mengupdate claim ini',
    );
  return ClaimRepositories.updateClaim(id, user_id, payload);
};
