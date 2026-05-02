import { Router } from 'express';
import {
  handleGetClaims,
  handleGetClaimById,
  handleCreateClaim,
  handleUpdateClaim,
} from '../controller/claimController.js';

const router = Router();

router.get('/claims', handleGetClaims);
router.get('/claims/:id', handleGetClaimById);
router.post('/claims', handleCreateClaim);
router.put('/claims/:id', handleUpdateClaim);

export default router;
