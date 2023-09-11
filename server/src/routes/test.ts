import express from 'express';
import { test } from '../controllers/testController';

const router = express.Router();

// GET route for testing
router.get('/test', test);

// POST route for testing
router.post('/test', test);

// PATCH route for testing
router.patch('/test', test);

// DELETE route for testing
router.delete('/test', test);

export default router;
