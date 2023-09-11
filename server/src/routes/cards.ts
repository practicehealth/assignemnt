import express from 'express';
import {
  getCards,
  createCard,
  updateCard,
  deleteCard,
} from '../controllers/cardController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// Get all cards arranged by card types
router.get('/cards', authenticateUser, getCards);

// Create a card
router.post('/cards', authenticateUser, createCard);

// Update a card
router.put('/cards/:cardId', authenticateUser, updateCard);

// Delete a card
router.delete('/cards/:cardId', authenticateUser, deleteCard);

export default router;
