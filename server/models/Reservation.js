import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    specialRequest: { type: String, default: '' },
    bookingId: { type: String, required: true },
    status: { type: String, enum: ['Confirmed', 'Pending', 'Cancelled'], default: 'Confirmed' }
  },
  { timestamps: true }
);

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;
