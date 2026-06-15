import { Router } from 'express';
import {
  handleGetClaims,
  handleGetClaimById,
  handleCreateClaim,
  handleUpdateClaim,
} from '../controller/claimController.js';

const router = Router();

router.get('/api/v1/claims', handleGetClaims);
router.get('/api/v1/claims/:id', handleGetClaimById);
router.post('/api/v1/claims', handleCreateClaim);
router.put('/api/v1/claims/:id', handleUpdateClaim);

export default router;
