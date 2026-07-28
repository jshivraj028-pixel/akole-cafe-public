import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// GET all registered users from single shared MongoDB Atlas database (Admin view)
router.get('/', async (req, res) => {
  try {
    // Ensure Main Admin Account exists in MongoDB Atlas
    let admin = await User.findOne({ email: 'akolecafe@gmail.com' });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Akolecafe2007', salt);
      await User.create({
        name: 'Akole Cafe Admin',
        email: 'akolecafe@gmail.com',
        password: hashedPassword,
        role: 'admin',
        phone: '+91 98765 43210'
      });
    }

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

// GET check user ban & account status
router.get('/status/:idOrEmail', async (req, res) => {
  try {
    const { idOrEmail } = req.params;
    if (!idOrEmail || idOrEmail === 'undefined' || idOrEmail === 'null') {
      return res.status(400).json({ message: 'User ID or Email is required' });
    }

    let user = null;
    if (idOrEmail.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(idOrEmail);
    }
    if (!user) {
      const cleanInput = idOrEmail.toLowerCase().trim();
      user = await User.findOne({ 
        $or: [{ email: cleanInput }, { name: cleanInput }] 
      });
    }

    if (!user) {
      return res.json({ exists: false, isBanned: false });
    }

    res.json({
      exists: true,
      id: user._id,
      email: user.email,
      name: user.name,
      isBanned: Boolean(user.isBanned),
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking user status', error: error.message });
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
