import { Request, Response } from 'express';
import User, { UserDocument } from '../models/userModel'; // Assuming UserModel has a TypeScript definition file

// Get user profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Access user data from the authenticated user (req.user)
    const { username, id } = req.user;

    // Retrieve user profile data from the database
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userProfile = {
      username: user.username,
      name: user.name,
      email: user.email,
      // Add more profile fields here
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Access user data from the authenticated user (req.user)
    const { id } = req.user;

    // Update user profile data in the database
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
