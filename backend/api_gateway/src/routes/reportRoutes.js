import { Router } from 'express';
import {
  handleGetReports,
  handleGetReportById,
  handleCreateReport,
  handleUpdateReport,
  handleDeleteReport,
  handleGetReportByUserId,
  handleUpdateReportStatus,
} from '../controller/reportController.js';
import auth from '../../../shared/middleware/auth.js';
import { uploadImage } from '../../../shared/middleware/upload-middleware.js';

const router = Router();

router.get('/api/v1/reports', auth, handleGetReports);
router.get('/api/v1/reports/user/:user_id', auth, handleGetReportByUserId);
router.get('/api/v1/reports/:id', auth, handleGetReportById);
router.post(
  '/api/v1/reports',
  auth,
  uploadImage.single('image'),
  handleCreateReport,
);
router.put(
  '/api/v1/reports/:id',
  auth,
  uploadImage.single('image'),
  handleUpdateReport,
);
router.put('/api/v1/reports/status/:id', auth, handleUpdateReportStatus);
router.delete('/api/v1/reports/:id', auth, handleDeleteReport);

export default router;
