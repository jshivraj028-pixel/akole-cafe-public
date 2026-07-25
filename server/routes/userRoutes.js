import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET all registered users (Admin view)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// GET user counts & stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const regularUsers = totalUsers - adminCount;
    res.json({ totalUsers, adminCount, regularUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user stats', error: error.message });
  }
});

// PUT toggle user ban status (Admin)
router.put('/:id/ban', async (req, res) => {
  try {
    const { isBanned } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.email === 'akolecafe@gmail.com') {
      return res.status(400).json({ message: 'Main Administrator account cannot be banned.' });
    }

    user.isBanned = Boolean(isBanned);
    await user.save();

    res.json({
      message: `User ${user.name} is now ${user.isBanned ? 'Banned 🚫' : 'Active ✅'}`,
      user: { id: user._id, name: user.name, email: user.email, isBanned: user.isBanned }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user ban status', error: error.message });
  }
});

// DELETE user account (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.email === 'akolecafe@gmail.com') {
      return res.status(400).json({ message: 'Main Administrator account cannot be deleted.' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: `User account ${user.name} deleted successfully`, id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

export default router;
