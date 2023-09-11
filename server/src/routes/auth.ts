import express from 'express';
import {
  signup,
  login,
  logout,
  verify,
  forgotPassword,
  resetPassword,
} from '../controllers/authController';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password', resetPassword);

// Logout route
router.post('/logout', logout);

// Verify route
router.get('/verify', verify);

export default router;
