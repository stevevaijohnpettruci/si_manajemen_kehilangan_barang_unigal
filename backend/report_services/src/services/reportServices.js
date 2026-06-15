import { nanoid } from 'nanoid';
import ReportRepositories from '../repositories/reportRepositories.js';
import rpcRequest from '../../../shared/messaging/rpcClient.js';
import InvariantError from '../../../shared/exceptions/invariant-error.js';
import NotFoundError from '../../../shared/exceptions/not-found-error.js';

export const createReport = async (payload) => {
  const { exists } = await rpcRequest('user.verify', {
    id: payload.user_id,
    user_id: payload.user_id,
    userId: payload.user_id,
  });
  if (!exists) throw new InvariantError('User tidak ditemukan');

  const id = `report-${nanoid(16)}`;
  return ReportRepositories.createNewReport({ ...payload, id });
};

export const getReports = async () => {
  return ReportRepositories.findAllReports();
};

export const getReportById = async (id) => {
  const report = await ReportRepositories.findReportById(id);
  if (!report) throw new NotFoundError('Report tidak ditemukan');
  return report;
};

export const updateReport = async (id, payload) => {
  const report = await ReportRepositories.findReportById(id);
  if (!report) throw new NotFoundError('Report tidak ditemukan');
  return ReportRepositories.updateReport(id, payload);
};

export const deleteReport = async (id) => {
  const report = await ReportRepositories.findReportById(id);
  if (!report) throw new NotFoundError('Report tidak ditemukan');
  return ReportRepositories.deleteReport(id);
};
