import { createReport, getReports, getReportById, updateReport, deleteReport } from '../services/reportServices.js';
import response from '../../../shared/utils/response.js';

export const handleCreateReport = async (req, res, next) => {
  try {
    const data = await createReport(req.validated);
    response(res, 201, 'Report berhasil dibuat', data);
  } catch (err) {
    next(err);
  }
};

export const handleGetReports = async (req, res, next) => {
  try {
    const data = await getReports();
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleGetReportById = async (req, res, next) => {
  try {
    const data = await getReportById(req.params.id);
    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateReport = async (req, res, next) => {
  try {
    const data = await updateReport(req.params.id, req.validated);
    response(res, 200, 'Report berhasil diupdate', data);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteReport = async (req, res, next) => {
  try {
    await deleteReport(req.params.id);
    response(res, 200, 'Report berhasil dihapus', null);
  } catch (err) {
    next(err);
  }
};
