import { Router } from 'express';
import { validate } from '../../../shared/middleware/validate.js';
import {
  createClaimSchema,
  updateClaimStatusSchema,
} from '../validator/schema.js';
import {
  handleGetClaims,
  handleGetClaimById,
  handleGetClaimByUserId,
  handleGetIncomingClaims, // [BARU] Import controller
  handleCreateClaim,
  handleUpdateClaimStatus,
  handleDeleteClaim,
} from '../controller/claimController.js';
import { paginationMiddleware } from '../../../shared/middleware/pagination-middleware.js';

const router = Router();

router.get('/api/v1/claims', paginationMiddleware, handleGetClaims);
router.get('/api/v1/claims/:id', handleGetClaimById);

// [BARU] Route untuk Inbox (Orang yang mengklaim laporanku)
router.get(
  '/api/v1/claims/incoming/:user_id',
  paginationMiddleware,
  handleGetIncomingClaims,
);

// Route untuk History (Klaim yang aku ajukan)
router.get(
  '/api/v1/claims/user/:user_id',
  paginationMiddleware,
  handleGetClaimByUserId,
);

router.post('/api/v1/claims', validate(createClaimSchema), handleCreateClaim);
router.put(
  '/api/v1/claims/:id',
  validate(updateClaimStatusSchema),
  handleUpdateClaimStatus,
);
router.delete('/api/v1/claims/:id', handleDeleteClaim);

export default router;
