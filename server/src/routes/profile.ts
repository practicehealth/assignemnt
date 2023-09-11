import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/profileController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateUser, getUserProfile);

// Update user profile
router.put('/profile', authenticateUser, updateUserProfile);

export default router;
