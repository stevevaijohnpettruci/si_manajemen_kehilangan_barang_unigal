import { Router } from 'express';
import {
  handleGetClaims,
  handleGetClaimById,
  handleGetClaimByUserId,
  handleGetIncomingClaims, // [BARU] Import
  handleCreateClaim,
  handleUpdateClaim,
  handleDeleteClaim,
} from '../controller/claimController.js';
import auth from '../../../shared/middleware/auth.js';
import { uploadImage } from '../../../shared/middleware/upload-middleware.js';

const router = Router();

router.get('/api/v1/claims', auth, handleGetClaims);
router.get('/api/v1/claims/:id', auth, handleGetClaimById);
router.get('/api/v1/claims/user/:user_id', auth, handleGetClaimByUserId);

// [BARU] Route untuk mengambil inbox pengajuan
router.get('/api/v1/claims/incoming/:user_id', auth, handleGetIncomingClaims);

router.post(
  '/api/v1/claims',
  auth,
  uploadImage.single('image'),
  handleCreateClaim,
);
router.put(
  '/api/v1/claims/:id',
  auth,
  uploadImage.single('image'),
  handleUpdateClaim,
);
router.delete('/api/v1/claims/:id', auth, handleDeleteClaim);

export default router;
