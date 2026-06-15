import { Router } from 'express';
import {
  handleGetReports,
  handleGetReportById,
  handleCreateReport,
  handleUpdateReport,
  handleDeleteReport,
} from '../controller/reportController.js';
import auth from '../../../shared/middleware/auth.js';

const router = Router();

router.get('/api/v1/reports', auth, handleGetReports);
router.get('/api/v1/reports/:id', auth, handleGetReportById);
router.post('/api/v1/reports', auth, handleCreateReport);
router.put(
  '/api/v1/reports/:id',
  auth,
  handleUpdateReport,
);
router.delete('/api/v1/reports/:id', auth, handleDeleteReport);

export default router;
