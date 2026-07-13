import { Router } from 'express';
import { validate } from '../../../shared/middleware/validate.js';
import {
  addReportSchema,
  updateReportSchema,
  updateReportStatusSchema,
} from '../validator/schema.js';
import {
  handleCreateReport,
  handleGetReports,
  handleGetReportById,
  handleUpdateReport,
  handleDeleteReport,
  handleGetReportByUserId,
  handleUpdateReportStatus,
} from '../controller/reportController.js';
import { paginationMiddleware } from '../../../shared/middleware/pagination-middleware.js';

const router = Router();

router.get('/api/v1/reports', paginationMiddleware, handleGetReports);

router.get(
  '/api/v1/reports/user/:user_id',
  paginationMiddleware,
  handleGetReportByUserId,
);

router.get('/api/v1/reports/:id', handleGetReportById);

router.put(
  '/api/v1/reports/status/:id',
  validate(updateReportStatusSchema),
  handleUpdateReportStatus,
);

router.post('/api/v1/reports', validate(addReportSchema), handleCreateReport);
router.put(
  '/api/v1/reports/:id',
  validate(updateReportSchema),
  handleUpdateReport,
);

router.delete('/api/v1/reports/:id', handleDeleteReport);

export default router;
