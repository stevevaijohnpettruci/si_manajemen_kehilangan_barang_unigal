import { Router } from 'express';
import { validate } from '../../../shared/middleware/validate.js';
import { addReportSchema } from '../validator/schema.js';
import {
  handleCreateReport,
  handleGetReports,
  handleGetReportById,
  handleUpdateReport,
  handleDeleteReport,
  handleGetReportByUserId,
} from '../controller/reportController.js';
import { paginationMiddleware } from '../../../shared/middleware/pagination-middleware.js';

const router = Router();

router.get('/api/v1/reports', paginationMiddleware, handleGetReports);
router.get('/api/v1/reports/:id', handleGetReportById);
router.get('/api/v1/reports/user/:user_id', paginationMiddleware, handleGetReportByUserId);
router.post('/api/v1/reports', validate(addReportSchema), handleCreateReport);
router.put(
  '/api/v1/reports/:id',
  validate(addReportSchema),
  handleUpdateReport,
);

router.delete('/api/v1/reports/:id', handleDeleteReport);

export default router;
