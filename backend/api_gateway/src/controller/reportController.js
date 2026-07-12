import {
  getReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  getReportByUserId,
  updateReportStatus,
} from '../services/reportServices.js';
import response from '../../../shared/utils/response.js';

export const handleGetReports = async (req, res, next) => {
  try {
    const queryParams = req.query;

    const data = await getReports(queryParams);

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

export const handleGetReportByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // 1. TANGKAP page dan limit dari query frontend
    const { page, limit } = req.query;

    // 2. Lempar semuanya ke service
    const data = await getReportByUserId(userId, page, limit);

    response(res, 200, 'success', data);
  } catch (err) {
    next(err);
  }
};

export const handleCreateReport = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      user_id: req.user.id,
    };

    if (req.file) {
      payload.image_url = `/uploads/${req.file.filename}`;
    }

    const data = await createReport(payload);
    response(res, 201, 'Report berhasil dibuat', data);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateReport = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image_url = `/uploads/${req.file.filename}`;
    }

    const data = await updateReport(req.params.id, payload);
    response(res, 200, 'report updated', data);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteReport = async (req, res, next) => {
  try {
    const data = await deleteReport(req.params.id);
    response(res, 200, 'report deleted', data);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateReportStatus = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const payload = req.validated || req.body;
    const data = await updateReportStatus(req.params.id, payload, token);
    
    response(res, 200, 'report status updated', data);
  } catch (err) {
    next(err);
  }
};
