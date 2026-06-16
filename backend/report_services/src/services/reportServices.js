import { nanoid } from 'nanoid';
import ReportRepositories from '../repositories/reportRepositories.js';
import rpcRequest from '../../../shared/messaging/rpcClient.js';
import InvariantError from '../../../shared/exceptions/invariant-error.js';
import NotFoundError from '../../../shared/exceptions/not-found-error.js';

export const createReport = async (payload) => {
  const { exists } = await rpcRequest('user.verify', {
    id: payload.user_id,
    user_fullname: payload.full_name,
    user_id: payload.user_id,
    userId: payload.user_id,
  });
  if (!exists) throw new InvariantError('User tidak ditemukan');

  const id = `report-${nanoid(16)}`;
  return ReportRepositories.createNewReport({ ...payload, id });
};

export const getReports = async (filter, limit, offset) => {
  // Jika tidak ada filter atau filter = "semua", ambil semua data dengan pagination
  console.log("👉 Nilai filter yang masuk ke service:", filter);
  if (!filter || filter === 'semua') {
    return await ReportRepositories.findAllReports(limit, offset);
  }

  const today = new Date();
  let startDate = new Date();
  let endDate = new Date(today.setHours(23, 59, 59, 999)); 
  if (filter === 'hari-ini') {
    startDate.setHours(0, 0, 0, 0)
  } else if (filter === '3-hari') {
    startDate.setDate(startDate.getDate() - 3);
    startDate.setHours(0, 0, 0, 0);
  } else if (filter === '1-minggu') {
    startDate.setDate(startDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0);
  } else {
    return await ReportRepositories.findAllReports(limit, offset);
  }

  console.log(`🔎 Node.js mencari data dari: ${startDate.toLocaleString('id-ID')} sampai ${endDate.toLocaleString('id-ID')}`);

  const reports = await ReportRepositories.findReportsByDate(
    startDate,
    endDate,
    limit,
    offset
  );
  
  return reports;
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
