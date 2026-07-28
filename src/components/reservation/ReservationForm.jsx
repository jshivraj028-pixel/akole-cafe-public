import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiCalendar, FiClock, FiUsers, FiMapPin, FiSend } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

const zones = [
  { title: 'MAIN HALL', desc: 'OPEN, VIBRANT ATMOSPHERE' },
  { title: 'THE GARDEN', desc: 'AL FRESCO DINING' },
  { title: 'THE LIBRARY', desc: 'QUIET, COZY CORNER' },
  { title: 'SUN DECK', desc: 'ROOFTOP WITH A VIEW' },
  { title: 'PRIVATE ROOM', desc: 'EXCLUSIVE, INTIMATE SPACE' }
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
    time: '7:00 PM',
    guests: '2',
    zone: 'MAIN HALL',
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
    <div className="max-w-3xl mx-auto py-4">
      <AnimatePresence mode="wait">
        {submitted && bookingDetails ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12 space-y-6 bg-white dark:bg-[#16231B] rounded-3xl p-8 sm:p-12 border border-[#D6AE4D]/40 shadow-2xl text-[#123524] dark:text-[#EAE3D2]"
          >
            <div className="w-20 h-20 rounded-full bg-[#123524] text-[#D6AE4D] border border-[#D6AE4D]/40 flex items-center justify-center mx-auto shadow-xl">
              <FiCheckCircle className="w-10 h-10 text-[#D6AE4D]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block">
                RESERVATION CONFIRMED
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold mt-1 text-[#123524] dark:text-white">
                We Can't Wait to Host You!
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] mt-2 font-light">
                A confirmation SMS & Email has been sent to{' '}
                <span className="text-[#D6AE4D] font-bold">{bookingDetails.email}</span>.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8F5EE] dark:bg-[#121A15] border border-gray-200/80 dark:border-[#D6AE4D]/30 text-left space-y-4 max-w-lg mx-auto text-xs sm:text-sm shadow-inner">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-[#D6AE4D]/20">
                <span className="text-[#6B7C70] dark:text-[#A0B0A5]">Booking Reference</span>
                <span className="font-mono text-base font-extrabold text-[#D6AE4D]">
                  {bookingDetails.bookingId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7C70] dark:text-[#A0B0A5]">Guest Name</span>
                <span className="font-bold text-[#123524] dark:text-white">{bookingDetails.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7C70] dark:text-[#A0B0A5]">Date & Time</span>
                <span className="font-bold text-[#123524] dark:text-white">
                  {bookingDetails.date} at {bookingDetails.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7C70] dark:text-[#A0B0A5]">Guests & Zone</span>
                <span className="font-bold text-[#123524] dark:text-white">
                  {bookingDetails.guests} Guests • {bookingDetails.zone}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3.5 rounded-full bg-[#123524] dark:bg-[#D6AE4D] text-white dark:text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer shadow-lg"
            >
              MAKE ANOTHER RESERVATION
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-12 text-[#123524] dark:text-[#EAE3D2]"
          >
            {/* 1. PERSONAL DETAILS */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block border-b border-[#D6AE4D]/30 pb-2">
                1. PERSONAL DETAILS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white dark:bg-[#16231B] border border-gray-200/80 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white dark:bg-[#16231B] border border-gray-200/80 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white dark:bg-[#16231B] border border-gray-200/80 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium"
                />
              </div>
            </div>

            {/* 2. DATE & TIME SELECTION */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block border-b border-[#D6AE4D]/30 pb-2">
                2. DATE & TIME SLOTS
              </span>

              <div>
                <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-1.5">Select Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white dark:bg-[#16231B] border border-gray-200/80 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-2">Select Time Slot</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.time === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#D6AE4D] to-[#B89035] text-[#123524] shadow-md scale-[1.03] ring-1 ring-[#D6AE4D]/50'
                            : 'bg-white dark:bg-[#16231B] text-[#123524] dark:text-white border border-gray-200/80 dark:border-[#D6AE4D]/20 hover:border-[#D6AE4D]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. PREFERENCES & GUEST COUNT */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block border-b border-[#D6AE4D]/30 pb-2">
                3. PREFERENCES & GUESTS
              </span>

              <div>
                <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-2">Number of Guests</label>
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {['1', '2', '3', '4', '5', '6', '7', '8+'].map((num) => {
                    const isSelected = formData.guests === num;
                    return (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setFormData({ ...formData, guests: num })}
                        className={`w-11 h-11 rounded-full text-xs font-extrabold transition-all duration-200 shrink-0 cursor-pointer flex items-center justify-center shadow-sm ${
                          isSelected
                            ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] scale-110 ring-2 ring-[#D6AE4D]/50'
                            : 'bg-white dark:bg-[#16231B] text-[#123524] dark:text-white border border-gray-200/80 dark:border-[#D6AE4D]/20 hover:border-[#D6AE4D]'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-2">Preferred Seating Zone</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {zones.map((z) => {
                    const isSelected = formData.zone === z.title;
                    return (
                      <div
                        key={z.title}
                        onClick={() => setFormData({ ...formData, zone: z.title })}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white dark:bg-[#16231B] border-[#D6AE4D] ring-2 ring-[#D6AE4D]/40 shadow-md'
                            : 'bg-white/80 dark:bg-[#16231B]/80 border-gray-200/80 dark:border-[#D6AE4D]/20 hover:border-[#D6AE4D]/50'
                        }`}
                      >
                        <h5 className="font-serif text-sm font-extrabold text-[#123524] dark:text-white">{z.title}</h5>
                        <p className="text-[10px] text-[#6B7C70] dark:text-[#A0B0A5] font-light mt-0.5">{z.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-1.5">Special Requests / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Birthday celebration, high chair, floral setup, dietary preferences..."
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  className="w-full bg-white dark:bg-[#16231B] border border-gray-200/80 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white placeholder-gray-400 dark:placeholder-[#7A8E81] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-[#D6AE4D]/20 hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#123524]" /> CONFIRM TABLE RESERVATION
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReservationForm;
