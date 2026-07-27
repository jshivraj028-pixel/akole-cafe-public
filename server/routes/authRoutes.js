import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'akole_cafe_secret_key_2026';

const ADMIN_EMAIL = 'akolecafe@gmail.com';
const ADMIN_PASS = 'Akolecafe2007';

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password do not match.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ $or: [{ email: cleanEmail }, { name: name.trim() }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email/username already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isExplicitAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();

    const newUser = new User({
      name,
      email: cleanEmail,
      password: hashedPassword,
      phone: phone || '',
      role: isExplicitAdmin ? 'admin' : 'user'
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        avatar: newUser.avatar
      },
      token,
      isAdmin: newUser.role === 'admin'
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login User / Admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email/Username and password are required.' });
    }

    const cleanInput = email.toLowerCase().trim();

    // Special Admin Login check for akolecafe@gmail.com / Akolecafe2007
    if ((cleanInput === ADMIN_EMAIL.toLowerCase() || cleanInput === 'akolecafe') && password === ADMIN_PASS) {
      let adminUser = await User.findOne({ email: ADMIN_EMAIL });
      if (!adminUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(ADMIN_PASS, salt);
        adminUser = new User({
          name: 'Akole Cafe Admin',
          email: ADMIN_EMAIL,
          password: hashedPassword,
          role: 'admin',
          phone: '+91 98765 43210'
        });
        await adminUser.save();
      }
      const token = jwt.sign({ id: adminUser._id, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        message: 'Admin login successful! Redirecting to Admin Panel...',
        user: {
          id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: 'admin',
          avatar: adminUser.avatar
        },
        token,
        isAdmin: true
      });
    }

    // Search user by email, name, or handle
    const user = await User.findOne({ 
      $or: [
        { email: cleanInput }, 
        { name: cleanInput }, 
        { email: `${cleanInput}@gmail.com` }
      ] 
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found. Please check your credentials or register.' });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: 'Your account has been suspended/banned by Administrator. Please contact support.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const isAdmin = user.role === 'admin' || user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    res.json({
      message: isAdmin ? 'Admin login successful' : 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar
      },
      token,
      isAdmin
    });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
});

export default router;
