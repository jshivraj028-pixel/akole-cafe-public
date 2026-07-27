import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// GET all events from MongoDB
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// POST create new event (Admin)
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
});

export default router;
