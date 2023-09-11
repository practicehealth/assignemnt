import express from 'express';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// Get events
router.get('/events', authenticateUser, getEvents);

// Create an event
router.post('/events', authenticateUser, createEvent);

// Update an event
router.put('/events/:eventId', authenticateUser, updateEvent);

// Delete an event
router.delete('/events/:eventId', authenticateUser, deleteEvent);

export default router;
