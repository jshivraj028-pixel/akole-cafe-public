import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// GET all reservations (Admin view)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
});

// POST new reservation
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, guests, date, time, specialRequest } = req.body;
    
    const bookingId = 'AKL-' + Math.floor(100000 + Math.random() * 900000);
    const newReservation = new Reservation({
      name,
      email,
      phone,
      guests,
      date,
      time,
      specialRequest,
      bookingId
    });

    const saved = await newReservation.save();
    res.status(201).json({
      success: true,
      bookingId: saved.bookingId,
      message: 'Table reservation received successfully.',
      reservation: saved
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error: error.message });
  }
});

export default router;
