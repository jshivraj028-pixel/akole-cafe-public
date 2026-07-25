import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiCalendar } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

const zones = [
  { title: 'Main Hall', desc: 'Open, vibrant atmosphere' },
  { title: 'The Garden', desc: 'Al fresco dining' },
  { title: 'The Library', desc: 'Quiet, cozy corner' },
  { title: 'Sun Deck', desc: 'Rooftop with a view' },
  { title: 'Private Room', desc: 'Exclusive, intimate space' }
];

const ReservationForm = () => {
  const { showToast } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '2:00 PM',
    guests: '2',
    zone: 'Main Hall',
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
    <div className="max-w-2xl mx-auto py-6">
      <AnimatePresence mode="wait">
        {submitted && bookingDetails ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-10 space-y-6 bg-white/80 rounded-3xl p-8 border border-[#E5DDD0] shadow-sm text-[#1F3A2B]"
          >
            <div className="w-16 h-16 rounded-full bg-[#D4B055] text-[#2B4236] flex items-center justify-center mx-auto shadow-md">
              <FiCheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#C8A96A]">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-3xl font-bold mt-1 text-[#1F3A2B]">
                We Can't Wait to Host You!
              </h3>
              <p className="text-xs text-[#6B7C70] mt-2 font-light">
                A confirmation SMS & Email has been sent to{' '}
                <span className="text-[#C8A96A] font-medium">{bookingDetails.email}</span>.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#E5DDD0] text-left space-y-3 max-w-lg mx-auto text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5DDD0]">
                <span className="text-[#6B7C70]">Booking Reference</span>
                <span className="font-mono text-sm font-bold text-[#C8A96A]">
                  {bookingDetails.bookingId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7C70]">Guest Name</span>
                <span className="font-semibold text-[#1F3A2B]">{bookingDetails.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7C70]">Date & Time</span>
                <span className="font-semibold text-[#1F3A2B]">
                  {bookingDetails.date} at {bookingDetails.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7C70]">Guests & Zone</span>
                <span className="font-semibold text-[#1F3A2B]">
                  {bookingDetails.guests} Guests • {bookingDetails.zone}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 rounded-full bg-[#351E13] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A2C1D] transition-all"
            >
              Make Another Reservation
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-10 text-[#1F3A2B]"
          >
            {/* 1. PERSONAL DETAILS */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C8A96A] block border-b border-[#C8A96A]/20 pb-2">
                PERSONAL DETAILS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl py-3 px-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl py-3 px-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl py-3 px-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                />
              </div>
            </div>

            {/* 2. DATE & TIME */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C8A96A] block border-b border-[#C8A96A]/20 pb-2">
                DATE & TIME
              </span>

              <div>
                <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Select Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl py-3 px-4 text-xs text-[#1F3A2B] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#6B7C70] mb-2 font-medium">Select Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold tracking-wide transition-all ${
                          isSelected
                            ? 'bg-[#EFE8D8] border-[#C8A96A] text-[#1F3A2B] font-bold shadow-sm'
                            : 'bg-[#FAF6EE] border-[#E5DDD0] text-[#1F3A2B] hover:border-[#C8A96A]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. PREFERENCES */}
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C8A96A] block border-b border-[#C8A96A]/20 pb-2">
                PREFERENCES
              </span>

              {/* Number of Guests */}
              <div>
                <label className="block text-[11px] text-[#6B7C70] mb-2 font-medium">Number of Guests</label>
                <div className="flex flex-wrap items-center gap-3">
                  {['1', '2', '3', '4', '5', '6', '7', '8'].map((num) => {
                    const isSelected = formData.guests === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: num })}
                        className={`w-9 h-9 rounded-full font-serif text-sm font-semibold transition-all flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#351E13] text-white font-bold shadow-md'
                            : 'bg-[#FAF6EE] border border-[#E5DDD0] text-[#1F3A2B] hover:border-[#C8A96A]'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Zone */}
              <div>
                <label className="block text-[11px] text-[#6B7C70] mb-2 font-medium">Preferred Zone</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {zones.map((z) => {
                    const isSelected = formData.zone === z.title;
                    return (
                      <button
                        key={z.title}
                        type="button"
                        onClick={() => setFormData({ ...formData, zone: z.title })}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#FAF6EE] border-2 border-[#C8A96A] shadow-sm'
                            : 'bg-[#FAF6EE] border border-[#E5DDD0] hover:border-[#C8A96A]'
                        }`}
                      >
                        <h4 className="font-serif text-sm font-semibold text-[#1F3A2B]">{z.title}</h4>
                        <p className="text-[11px] text-[#6B7C70] font-light mt-0.5">{z.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Special Requests</label>
                <textarea
                  rows="3"
                  placeholder="Birthday celebration, dietary needs, etc."
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl p-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                />
              </div>
            </div>

            {/* CONFIRM RESERVATION Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#A8988C] hover:bg-[#351E13] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FiCalendar className="w-4 h-4" />
                <span>CONFIRM RESERVATION</span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReservationForm;
