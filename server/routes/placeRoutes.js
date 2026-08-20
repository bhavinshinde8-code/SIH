import express from 'express';
import {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from '../controllers/placeController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes for travelers
router.get('/', getPlaces);
router.get('/:id', getPlaceById);

// Protected routes for Municipal Admins
router.post('/', protectAdmin, createPlace);
router.put('/:id', protectAdmin, updatePlace);
router.delete('/:id', protectAdmin, deletePlace);

export default router;
