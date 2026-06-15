import httpClient from '../utils/httpClient.js';
import { REPORT_SERVICE_URL } from '../config/env.js';

export const getReports = async () => {
  const { data } = await httpClient.get(`${REPORT_SERVICE_URL}/api/v1/reports`);
  return data;
};

export const getReportById = async (id) => {
  const { data } = await httpClient.get(
    `${REPORT_SERVICE_URL}/api/v1/reports/${id}`,
  );
  return data;
};

export const createReport = async (payload) => {
  const { data } = await httpClient.post(
    `${REPORT_SERVICE_URL}/api/v1/reports`,
    payload,
  );
  return data;
};

export const updateReport = async (id, payload) => {
  const { data } = await httpClient.put(
    `${REPORT_SERVICE_URL}/api/v1/reports/${id}`,
    payload,
  );
  return data;
};

export const deleteReport = async (id) => {
  const { data } = await httpClient.delete(
    `${REPORT_SERVICE_URL}/api/v1/reports/${id}`,
  );
  return data;
};
