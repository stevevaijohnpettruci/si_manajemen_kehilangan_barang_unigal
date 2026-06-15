import {
  getReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} from '../services/reportServices.js';
import response from '../../../shared/utils/response.js';

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

export const handleCreateReport = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      user_id: req.user.id,
    };

    const response = await createReport(payload);
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateReport = async (req, res, next) => {
  try {
    const data = await updateReport(req.params.id, req.body);
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
