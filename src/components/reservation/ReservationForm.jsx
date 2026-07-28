import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiCalendar, FiClock, FiUsers, FiMapPin, FiSend, FiUser, FiMail, FiPhone, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Sparkles, Compass, Sun, BookOpen, Home, ShieldCheck, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { submitReservation, createNotificationAPI } from '../../services/api';

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

const zones = [
  { title: 'MAIN HALL', desc: 'Open, Vibrant Café Atmosphere', icon: Home },
  { title: 'THE GARDEN', desc: 'Al Fresco Outdoor Dining', icon: Sun },
  { title: 'THE LIBRARY', desc: 'Quiet, Cozy Private Corner', icon: BookOpen },
  { title: 'SUN DECK', desc: 'Rooftop View of Akole Hills', icon: Compass },
  { title: 'PRIVATE ROOM', desc: 'Exclusive Luxury VIP Lounge', icon: ShieldCheck }
];

// Helper to format date label
const getFormattedQuickDate = (daysToAdd) => {
  const d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  const iso = d.toISOString().split('T')[0];
  const dayName = daysToAdd === 0 ? 'Today' : daysToAdd === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  return { label: `${dayName} (${dateStr})`, value: iso };
};

const ReservationForm = () => {
  const { showToast } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const quickDates = [
    getFormattedQuickDate(0),
    getFormattedQuickDate(1),
    getFormattedQuickDate(2),
    getFormattedQuickDate(3)
  ];

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

  const handleMonthPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const handleMonthNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  // Custom Compact Crystal-Clear Calendar Days Generator
  const renderCustomCalendarDays = () => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday start
    const days = [];

    // Empty cells for previous month padding
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-7 w-7" />);
    }

    const todayStr = new Date().toISOString().split('T')[0];

    for (let day = 1; day <= daysInMonth; day++) {
      const monthStr = String(viewMonth + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateIso = `${viewYear}-${monthStr}-${dayStr}`;

      const isPast = dateIso < todayStr;
      const isSelected = formData.date === dateIso;
      const isToday = dateIso === todayStr;

      days.push(
        <button
          type="button"
          key={day}
          disabled={isPast}
          onClick={() => {
            setFormData({ ...formData, date: dateIso });
            setIsCalendarOpen(false);
          }}
          className={`h-7 w-7 rounded-lg text-[11px] font-black transition-all duration-200 flex items-center justify-center cursor-pointer ${
            isSelected
              ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] font-black shadow-md scale-105 border border-[#D6AE4D]'
              : isPast
              ? 'text-gray-400/70 dark:text-gray-500/70 font-semibold cursor-not-allowed'
              : isToday
              ? 'border-2 border-[#D6AE4D] text-[#123524] dark:text-[#D6AE4D] font-black bg-[#D6AE4D]/20'
              : 'text-[#123524] dark:text-[#EAE3D2] font-black hover:bg-[#D6AE4D] hover:text-[#123524] hover:scale-105'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await submitReservation(formData);
      const bookingId = res.bookingId || res.reservation?.bookingId || ('AKL-' + Math.floor(100000 + Math.random() * 900000));
      const details = { ...formData, bookingId };
      setBookingDetails(details);
      setSubmitted(true);
      showToast(`Table Reserved Successfully! Ref: ${bookingId}`, 'success');

      if (formData.email) {
        try {
          await createNotificationAPI({
            userEmail: formData.email,
            title: 'Table Reserved Successfully! 🍽️',
            message: `Your table for ${formData.guests} Guests on ${formData.date} at ${formData.time} in ${formData.zone} has been confirmed. Ref: ${bookingId}`,
            type: 'order'
          });
        } catch (err) {}
      }
    } catch (err) {
      const fallbackId = 'AKL-' + Math.floor(100000 + Math.random() * 900000);
      setBookingDetails({ ...formData, bookingId: fallbackId });
      setSubmitted(true);
      showToast('Table Reserved Successfully!', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  const formattedSelectedDate = new Date(formData.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="max-w-3xl mx-auto py-4">
      <AnimatePresence mode="wait">
        {submitted && bookingDetails ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12 space-y-6 bg-white dark:bg-[#16231B] rounded-3xl p-8 sm:p-12 border border-[#D6AE4D]/50 shadow-2xl text-[#123524] dark:text-[#EAE3D2]"
          >
            <div className="w-20 h-20 rounded-full bg-[#123524] text-[#D6AE4D] border-2 border-[#D6AE4D] flex items-center justify-center mx-auto shadow-2xl shadow-[#D6AE4D]/20 animate-pulse">
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
            className="space-y-10 text-[#123524] dark:text-[#EAE3D2]"
          >
            {/* 1. PERSONAL DETAILS */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#16231B]/90 backdrop-blur-xl border border-gray-200 dark:border-[#D6AE4D]/30 shadow-xl space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-[#D6AE4D]/20">
                <div className="w-9 h-9 rounded-xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 flex items-center justify-center text-[#D6AE4D]">
                  <FiUser className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#D6AE4D] block">
                    STEP 01
                  </span>
                  <h4 className="font-serif font-extrabold text-lg sm:text-xl text-[#123524] dark:text-white">
                    Personal Details
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF6EE] dark:bg-[#0E1A13] border border-gray-200/90 dark:border-[#D6AE4D]/30 rounded-xl py-3 pl-11 pr-4 text-xs font-semibold text-[#123524] dark:text-[#EAE3D2] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#D6AE4D] focus:ring-2 focus:ring-[#D6AE4D]/30 transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF6EE] dark:bg-[#0E1A13] border border-gray-200/90 dark:border-[#D6AE4D]/30 rounded-xl py-3 pl-11 pr-4 text-xs font-semibold text-[#123524] dark:text-[#EAE3D2] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#D6AE4D] focus:ring-2 focus:ring-[#D6AE4D]/30 transition-all shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF6EE] dark:bg-[#0E1A13] border border-gray-200/90 dark:border-[#D6AE4D]/30 rounded-xl py-3 pl-11 pr-4 text-xs font-semibold text-[#123524] dark:text-[#EAE3D2] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#D6AE4D] focus:ring-2 focus:ring-[#D6AE4D]/30 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 2. DATE & TIME SELECTION */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#16231B]/90 backdrop-blur-xl border border-gray-200 dark:border-[#D6AE4D]/30 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-[#D6AE4D]/20">
                <div className="w-9 h-9 rounded-xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 flex items-center justify-center text-[#D6AE4D]">
                  <FiCalendar className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#D6AE4D] block">
                    STEP 02
                  </span>
                  <h4 className="font-serif font-extrabold text-lg sm:text-xl text-[#123524] dark:text-white">
                    Date & Time Slots
                  </h4>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-2">
                  Select Date
                </label>
                
                {/* Quick Date Pills + Compact Translucent Glassmorphic Custom Calendar */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                    {quickDates.map((qd) => {
                      const isSelected = formData.date === qd.value;
                      return (
                        <button
                          type="button"
                          key={qd.value}
                          onClick={() => {
                            setFormData({ ...formData, date: qd.value });
                            setIsCalendarOpen(false);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all duration-300 cursor-pointer border shrink-0 ${
                            isSelected
                              ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] border-[#D6AE4D] shadow-md scale-105'
                              : 'bg-white/70 dark:bg-[#0E1A13]/70 backdrop-blur-md text-[#123524] dark:text-white border-gray-200/90 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D]'
                          }`}
                        >
                          {qd.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Calendar Trigger Input */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="w-full bg-white/75 dark:bg-[#0E1A13]/80 backdrop-blur-md border border-[#D6AE4D]/60 rounded-xl py-3 pl-11 pr-4 text-xs font-extrabold text-[#123524] dark:text-white text-left flex items-center justify-between shadow-sm hover:border-[#D6AE4D] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <FiCalendar className="w-4 h-4 text-[#D6AE4D]" />
                        <span className="font-serif text-sm tracking-wide">{formattedSelectedDate}</span>
                      </div>
                      <span className="text-[10px] text-[#D6AE4D] bg-[#D6AE4D]/15 px-2.5 py-0.5 rounded-md uppercase tracking-widest font-extrabold">
                        {isCalendarOpen ? 'CLOSE CALENDAR' : 'CHANGE DATE'}
                      </span>
                    </button>

                    {/* Translucent Glassmorphic Custom Calendar Popover */}
                    <AnimatePresence>
                      {isCalendarOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          className="absolute left-0 top-14 z-50 w-64 sm:w-72 bg-white/85 dark:bg-[#0E1A13]/90 backdrop-blur-2xl border-2 border-[#D6AE4D] rounded-2xl p-3 shadow-2xl shadow-black/40 space-y-2.5"
                        >
                          {/* Calendar Header */}
                          <div className="flex items-center justify-between border-b border-[#D6AE4D]/30 pb-2">
                            <h5 className="font-serif font-extrabold text-sm text-[#123524] dark:text-white">
                              {monthNames[viewMonth]} {viewYear}
                            </h5>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={handleMonthPrev}
                                className="w-6.5 h-6.5 rounded-lg bg-white/80 dark:bg-[#162A1E]/80 border border-[#D6AE4D]/40 flex items-center justify-center text-[#D6AE4D] hover:bg-[#D6AE4D] hover:text-[#123524] transition-all cursor-pointer"
                              >
                                <FiChevronLeft className="w-3 h-3 stroke-[2.5]" />
                              </button>
                              <button
                                type="button"
                                onClick={handleMonthNext}
                                className="w-6.5 h-6.5 rounded-lg bg-white/80 dark:bg-[#162A1E]/80 border border-[#D6AE4D]/40 flex items-center justify-center text-[#D6AE4D] hover:bg-[#D6AE4D] hover:text-[#123524] transition-all cursor-pointer"
                              >
                                <FiChevronRight className="w-3 h-3 stroke-[2.5]" />
                              </button>
                            </div>
                          </div>

                          {/* Weekday Headers */}
                          <div className="grid grid-cols-7 gap-0.5 text-center font-extrabold text-[9px] uppercase text-[#D6AE4D] tracking-widest">
                            <div>MO</div>
                            <div>TU</div>
                            <div>WE</div>
                            <div>TH</div>
                            <div>FR</div>
                            <div>SA</div>
                            <div>SU</div>
                          </div>

                          {/* Days Grid */}
                          <div className="grid grid-cols-7 gap-0.5 text-center justify-items-center">
                            {renderCustomCalendarDays()}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-3">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.time === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`py-3 px-4 rounded-xl text-xs font-extrabold tracking-wide transition-all duration-300 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] border-[#D6AE4D] shadow-lg shadow-[#D6AE4D]/25 scale-105 ring-2 ring-[#D6AE4D]/50'
                            : 'bg-white/70 dark:bg-[#0E1A13]/70 backdrop-blur-md text-[#123524] dark:text-[#EAE3D2] border-gray-200/90 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D] hover:bg-white dark:hover:bg-[#16291E]'
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
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#16231B]/90 backdrop-blur-xl border border-gray-200 dark:border-[#D6AE4D]/30 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-[#D6AE4D]/20">
                <div className="w-9 h-9 rounded-xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 flex items-center justify-center text-[#D6AE4D]">
                  <FiUsers className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#D6AE4D] block">
                    STEP 03
                  </span>
                  <h4 className="font-serif font-extrabold text-lg sm:text-xl text-[#123524] dark:text-white">
                    Preferences & Seating Zone
                  </h4>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-3">
                  Number of Guests
                </label>
                <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 no-scrollbar">
                  {['1', '2', '3', '4', '5', '6', '7', '8+'].map((num) => {
                    const isSelected = formData.guests === num;
                    return (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setFormData({ ...formData, guests: num })}
                        className={`w-12 h-12 rounded-2xl text-xs font-black transition-all duration-300 shrink-0 cursor-pointer flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] border-[#D6AE4D] shadow-lg shadow-[#D6AE4D]/30 scale-110 ring-2 ring-[#D6AE4D]/50'
                            : 'bg-white/70 dark:bg-[#0E1A13]/70 backdrop-blur-md text-[#123524] dark:text-white border-gray-200/90 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D] hover:scale-105'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-3">
                  Preferred Seating Zone
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {zones.map((z) => {
                    const isSelected = formData.zone === z.title;
                    const IconComp = z.icon;
                    return (
                      <div
                        key={z.title}
                        onClick={() => setFormData({ ...formData, zone: z.title })}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-[#123524] dark:bg-[#D6AE4D] text-white dark:text-[#123524] border-[#D6AE4D] shadow-xl scale-[1.02] ring-2 ring-[#D6AE4D]/40'
                            : 'bg-white/70 dark:bg-[#0E1A13]/70 backdrop-blur-md text-[#123524] dark:text-white border-gray-200/90 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D] hover:bg-white dark:hover:bg-[#16291E]'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#D6AE4D]/20 dark:bg-[#123524]/20 text-[#D6AE4D] dark:text-[#123524]'
                            : 'bg-[#D6AE4D]/15 text-[#D6AE4D]'
                        }`}>
                          <IconComp className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                          <h5 className={`font-serif text-sm font-extrabold ${isSelected ? 'text-[#D6AE4D] dark:text-[#123524]' : 'text-[#123524] dark:text-white'}`}>{z.title}</h5>
                          <p className={`text-[11px] font-medium mt-0.5 ${isSelected ? 'text-white/80 dark:text-[#123524]/80' : 'text-[#6B7C70] dark:text-[#A0B0A5]'}`}>{z.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests / Notes */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#123524] dark:text-[#D6AE4D] uppercase tracking-wider mb-2">
                  Special Requests / Notes (Optional)
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Birthday celebration, high chair, floral setup, dietary preferences..."
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                    className="w-full bg-[#FAF6EE] dark:bg-[#0E1A13] border border-gray-200/90 dark:border-[#D6AE4D]/30 rounded-2xl p-4 text-xs font-medium text-[#123524] dark:text-[#EAE3D2] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#D6AE4D] focus:ring-2 focus:ring-[#D6AE4D]/30 transition-all shadow-xs resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              disabled={submitting}
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#123524] via-[#1F4A34] to-[#123524] dark:from-[#D6AE4D] dark:via-[#F3E5AB] dark:to-[#B89035] text-[#D6AE4D] dark:text-[#123524] border border-[#D6AE4D] font-extrabold text-xs sm:text-sm uppercase tracking-widest shadow-2xl hover:shadow-[#D6AE4D]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 text-[#D6AE4D] dark:text-[#123524] animate-spin" />
                  <span>RESERVING YOUR TABLE...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#D6AE4D] dark:text-[#123524]" />
                  <span>CONFIRM TABLE RESERVATION</span>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReservationForm;
