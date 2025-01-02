// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// routes/userRoutes.js
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // `req.user.id` is attached by authMiddleware after decoding the JWT
    const userId = req.user.id;  
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error('Fetch User Error:', err);
    res.status(500).json({ message: 'Server error retrieving user.' });
  }
});


// @route   GET /api/users/me
// @desc    Get current user info
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error('Fetch User Error:', err);
    res.status(500).json({ message: 'Server error retrieving user.' });
  }
});

// @route   PATCH /api/users/profile
// @desc    Update user profile (e.g., about, avatarUrl)
// @access  Private
router.patch('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { about, avatarUrl } = req.body;

    const updateFields = {};
    if (about !== undefined) updateFields.about = about;
    if (avatarUrl !== undefined) updateFields.avatarUrl = avatarUrl;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ message: 'Server error updating profile.' });
  }
});

// PATCH /api/users/profile -> Update user's profile
router.patch('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // from the JWT
    const { about, avatarUrl } = req.body;

    // Build an object of fields to update
    const updateFields = {};
    if (about !== undefined) updateFields.about = about;
    if (avatarUrl !== undefined) updateFields.avatarUrl = avatarUrl;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true } // returns the updated doc
    ).select('-password'); // exclude password

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ message: 'Server error updating profile.' });
  }
});

module.exports = router;
