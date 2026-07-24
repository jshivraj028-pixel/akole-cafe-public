import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiUsers, FiUser, FiMail, FiPhone, FiCheckCircle, FiCoffee } from 'react-icons/fi';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';

const ReservationForm = () => {
  const { showToast } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: '2',
    seating: 'Indoor Luxury Lounge',
    specialRequest: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingId = 'AKL-' + Math.floor(100000 + Math.random() * 900000);
    const details = { ...formData, bookingId };
    setBookingDetails(details);
    setSubmitted(true);
    showToast(`Table Reserved Successfully! Booking ID: ${bookingId}`, 'success');
  };

  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-accent-gold/30 shadow-luxury max-w-3xl mx-auto relative overflow-hidden">
      <div className="botanical-glow top-0 right-0 opacity-20 pointer-events-none" />

      <AnimatePresence mode="wait">
        {submitted && bookingDetails ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-8 space-y-6 text-secondary"
          >
            <div className="w-16 h-16 rounded-full bg-gold-gradient text-primary flex items-center justify-center mx-auto shadow-gold">
              <FiCheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-accent-gold">Reservation Confirmed</span>
              <h3 className="font-serif text-3xl font-bold mt-1 text-secondary">We Can't Wait to Host You!</h3>
              <p className="text-xs text-secondary/70 mt-2 font-light">
                A confirmation SMS & Email has been sent to <span className="text-accent-gold font-medium">{bookingDetails.email}</span>.
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="p-6 rounded-2xl bg-primary-dark/90 border border-accent-gold/30 text-left space-y-3 max-w-lg mx-auto text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-accent-gold/20">
                <span className="text-secondary/60">Booking Reference</span>
                <span className="font-mono text-sm font-bold text-accent-gold">{bookingDetails.bookingId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary/60">Guest Name</span>
                <span className="font-semibold text-secondary">{bookingDetails.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary/60">Date & Time</span>
                <span className="font-semibold text-secondary">{bookingDetails.date} at {bookingDetails.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary/60">Guests & Area</span>
                <span className="font-semibold text-secondary">{bookingDetails.guests} Guests • {bookingDetails.seating}</span>
              </div>
              {bookingDetails.specialRequest && (
                <div className="pt-2 border-t border-accent-gold/20">
                  <span className="text-secondary/60 block mb-0.5">Special Notes</span>
                  <p className="text-accent-gold/90 italic">{bookingDetails.specialRequest}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                size="md"
              >
                Make Another Reservation
              </Button>
              <Button to="/menu" variant="gold" size="md">
                Browse Pre-Order Menu
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-6 text-secondary"
          >
            <div className="text-center mb-8">
              <span className="text-accent-gold text-xs uppercase font-bold tracking-[0.25em] block mb-1">
                Table Booking
              </span>
              <h3 className="font-serif text-3xl font-extrabold">Reserve Your Luxury Dining Table</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2 flex items-center gap-1.5">
                  <FiUser className="text-accent-gold" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Shinde"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2 flex items-center gap-1.5">
                  <FiMail className="text-accent-gold" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="vikram@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2 flex items-center gap-1.5">
                  <FiPhone className="text-accent-gold" /> Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98220 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                />
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2 flex items-center gap-1.5">
                  <FiUsers className="text-accent-gold" /> Party Size
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary focus:outline-none focus:border-accent-gold cursor-pointer"
                >
                  <option value="1">1 Person (Solo Coffee Session)</option>
                  <option value="2">2 Persons (Couple / Romantic)</option>
                  <option value="4">4 Persons (Family / Friends)</option>
                  <option value="6">6 Persons (Small Party)</option>
                  <option value="8">8+ Persons (VIP Group Dining)</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2 flex items-center gap-1.5">
                  <FiCalendar className="text-accent-gold" /> Date of Visit
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary focus:outline-none focus:border-accent-gold"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2 flex items-center gap-1.5">
                  <FiClock className="text-accent-gold" /> Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary focus:outline-none focus:border-accent-gold cursor-pointer"
                >
                  <option value="09:00">09:00 AM (Morning Brew)</option>
                  <option value="11:30">11:30 AM (Brunch)</option>
                  <option value="14:00">02:00 PM (Afternoon Tea)</option>
                  <option value="17:00">05:00 PM (Sunset Refreshers)</option>
                  <option value="19:00">07:00 PM (Prime Dinner)</option>
                  <option value="21:00">09:00 PM (Late Night Dessert)</option>
                </select>
              </div>
            </div>

            {/* Seating Preference */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2 flex items-center gap-1.5">
                <FiCoffee className="text-accent-gold" /> Seating Environment Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Indoor Luxury Lounge',
                  'Garden Patio Terrace',
                  'Private Mezzanine VIP'
                ].map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setFormData({ ...formData, seating: pref })}
                    className={`py-3 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      formData.seating === pref
                        ? 'bg-gold-gradient text-primary border-accent-gold shadow-gold font-bold'
                        : 'bg-primary-dark/60 text-secondary/70 border-accent-gold/20 hover:border-accent-gold/50'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2">
                Special Requests or Dietary Requirements
              </label>
              <textarea
                rows="3"
                placeholder="e.g. Celebrating an anniversary, need candle setup or gluten-free options..."
                value={formData.specialRequest}
                onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full">
              Confirm Reservation
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReservationForm;
