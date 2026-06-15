import httpClient from '../utils/httpClient.js';
import { CLAIM_SERVICE_URL } from '../config/env.js';

export const getClaims = async () => {
  const { data } = await httpClient.get(`${CLAIM_SERVICE_URL}/api/v1/claims`);
  return data;
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
