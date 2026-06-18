import httpClient from '../utils/httpClient.js';
import { CLAIM_SERVICE_URL } from '../config/env.js';

export const getClaims = async (queryParams = {}) => {
  const { data } = await httpClient.get(
    `${CLAIM_SERVICE_URL}/api/v1/claims`,
    {
      params: queryParams,
    },
  );
  return data;
};

export const getClaimByUserId = async (userId, page, limit) => {
  const response = await httpClient.get(
    `${CLAIM_SERVICE_URL}/api/v1/claims/user/${userId}`,
    {
      params: {
        page: page,
        limit: limit,
      },
    },
  );
  return response.data.data;
};

// [BARU] Menembak endpoint Inbox di Claim Service
export const getIncomingClaims = async (userId, page, limit) => {
  const response = await httpClient.get(
    `${CLAIM_SERVICE_URL}/api/v1/claims/incoming/${userId}`,
    {
      params: {
        page: page,
        limit: limit,
      },
    },
  );
  return response.data.data;
};

export const getClaimById = async (id) => {
  const { data } = await httpClient.get(
    `${CLAIM_SERVICE_URL}/api/v1/claims/${id}`,
  );
  return data;
};

export const createClaim = async (payload) => {
  const { data } = await httpClient.post(
    `${CLAIM_SERVICE_URL}/api/v1/claims`,
    payload,
  );
  return data;
};

export const updateClaim = async (id, payload) => {
  const { data } = await httpClient.put(
    `${CLAIM_SERVICE_URL}/api/v1/claims/${id}`,
    payload,
  );
  return data;
};

export const deleteClaim = async (id) => {
  const { data } = await httpClient.delete(
    `${CLAIM_SERVICE_URL}/api/v1/claims/${id}`,
  );
  return data;
};