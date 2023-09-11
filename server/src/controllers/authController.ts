import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User, { UserDocument } from '../models/userModel'; // Assuming UserModel has a TypeScript definition file

// Signup controller
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, name, email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ message: 'Username already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, name, email });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login controller
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Create and send a JWT token
    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout controller (Clear the token)
export const logout = (req: Request, res: Response): void => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify controller (Check if the user is authenticated)
export const verify = (req: Request, res: Response): void => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET || '') as { username: string; id: string };
    res.status(200).json({ username: decodedData.username, id: decodedData.id });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Reset Password controller
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { newPassword, confirmPassword, resetToken } = req.body;

    // Check if the provided newPassword matches the confirmPassword
    if (newPassword !== confirmPassword) {
      res.status(400).json({ message: "Passwords don't match" });
      return;
    }

    // Find the user by resetPasswordToken
    const user = await User.findOne({ resetPasswordToken: resetToken }) as UserDocument;

    // Check if the user exists and resetPasswordExpires is valid
    if (!user || (user.resetPasswordExpires !== null && user.resetPasswordExpires !== undefined) && user.resetPasswordExpires < Date.now()) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password and reset the token and expiration
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(201).json({ message: 'User password changed successfully' });
  } catch (error) {
    console.error('Reset Password error:', error);
    res.status(500).json({ message: 'Reset Password failed' });
  }
};

// Forgot Password controller
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const token = generateToken();
    await storeResetToken(existingUser, token);
    await sendPasswordResetEmail(existingUser, token);
    res.status(200).json({ message: 'Password reset instructions sent to your email' });
  } catch (error:any) {
    console.error('Forgot Password error:', error);
    res.status(500).json({ message: `Error occurred due to Email Service is not configured with correct SMTP config. However, for testing goto: http://localhost:3000/reset-password/${error.token}` });
  }
};

// Generate a random token
const generateToken = (): string => {
  return Math.random().toString(36).substr(2, 12);
};

// Store the generated token in the database and associate it with the user
const storeResetToken = async (user: UserDocument, token: string): Promise<void> => {
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // Token expiration time (1 hour)
  await user.save();
};

// Send a password reset email to the user
const sendPasswordResetEmail = async (user: UserDocument, token: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    // Configure your email service (e.g., SMTP settings)
    service: 'gmail',
    auth: {
      user: process.env.SYSTEM_EMAIL || '', // Your Gmail email address
      pass: process.env.SYSTEM_EMAIL_PASS || '', // Your App Password
    },
  });
  const mailOptions = {
    from: process.env.SYSTEM_EMAIL || '', // Sender email
    to: user.email, // Recipient email
    subject: 'Password Reset',
    text: `Hi, ${user.name}. You are receiving this because you (or someone else) have Requested the reset of the password for your account.\n\n`
      + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
      + `http://localhost:3000/reset-password/${token}\n\n`
      + `If you did not Request this, please ignore this email and your password will remain unchanged.\n`,
  };

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject({ ...error, token }); // Reject the promise on error
      } else {
        console.log('Email sent:', info.response);
        resolve(); // Resolve the promise on success
      }
    });
  });
};

export default { signup, login, logout, verify, forgotPassword, resetPassword };
