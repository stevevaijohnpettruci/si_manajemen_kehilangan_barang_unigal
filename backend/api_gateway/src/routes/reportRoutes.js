import { Router } from 'express';
import {
  handleGetReports,
  handleGetReportById,
  handleCreateReport,
  handleUpdateReport,
  handleDeleteReport,
} from '../controller/reportController.js';

const router = Router();

router.get('/reports', handleGetReports);
router.get('/reports/:id', handleGetReportById);
router.post('/reports', handleCreateReport);
router.put('/reports/:id', handleUpdateReport);
router.delete('/reports/:id', handleDeleteReport);

export default router;
