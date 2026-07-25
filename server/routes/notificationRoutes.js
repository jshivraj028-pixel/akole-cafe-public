import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// GET notifications for user (or broadcast 'ALL')
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};

    if (email) {
      query = { $or: [{ userEmail: email.toLowerCase() }, { userEmail: 'ALL' }] };
    }

    const notifications = await Notification.find(query).sort({ createdAt: -1 }).limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
});

// POST create notification (Admin send direct or broadcast)
router.post('/', async (req, res) => {
  try {
    const { userEmail, title, message, type, orderId } = req.body;

    if (!userEmail || !title || !message) {
      return res.status(400).json({ message: 'User email, title, and message are required' });
    }

    const notification = new Notification({
      userEmail: userEmail.toLowerCase(),
      title,
      message,
      type: type || 'order_update',
      orderId: orderId || ''
    });

    const saved = await notification.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
});

// PUT mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
});

export default router;
