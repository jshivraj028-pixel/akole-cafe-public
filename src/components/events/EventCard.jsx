import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiUsers, FiMusic, FiMic, FiCoffee, FiCheckCircle, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const getCategoryIcon = (category) => {
  switch (category?.toLowerCase()) {
    case 'open mic':
      return <FiMic className="w-7 h-7 stroke-[1.5]" />;
    case 'workshop':
      return <FiCoffee className="w-7 h-7 stroke-[1.5]" />;
    default:
      return <FiMusic className="w-7 h-7 stroke-[1.5]" />;
  }
};

const EventCard = ({ event }) => {
  const { showToast } = useTheme();
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [booked, setBooked] = useState(false);

  const handleRSVP = (e) => {
    e.preventDefault();
    setBooked(true);
    showToast(`RSVP Confirmed for ${event.title}!`, 'success');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
      >
        {/* Left Side: Icon + Details */}
        <div className="flex items-start gap-5">
          {/* Icon Box */}
          <div className="w-14 h-14 rounded-2xl bg-[#EFE8D8] flex items-center justify-center text-[#C8A96A] shrink-0 mt-1">
            {getCategoryIcon(event.category)}
          </div>

          {/* Event Information */}
          <div className="space-y-1.5">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C8A96A] block">
              {event.category || 'LIVE MUSIC'}
            </span>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1F3A2B]">
              {event.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#6B7C70] font-light leading-relaxed max-w-xl">
              {event.description}
            </p>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8B9B90] font-medium pt-2">
              <span className="flex items-center gap-1.5">
                <FiCalendar className="text-[#C8A96A]" /> {event.date}
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock className="text-[#C8A96A]" /> {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <FiUsers className="text-[#C8A96A]" /> {event.spots || '40 spots'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Price & Register Button */}
        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#E5DDD0]">
          <span className="font-serif text-lg font-bold text-[#1F3A2B] mb-2">
            {event.price}
          </span>
          <button
            onClick={() => setIsRsvpOpen(true)}
            className="px-7 py-2.5 rounded-full bg-[#351E13] hover:bg-[#4A2C1D] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            REGISTER
          </button>
        </div>
      </motion.div>

      {/* RSVP Modal */}
      <AnimatePresence>
        {isRsvpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRsvpOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md bg-[#FAF6EE] border border-[#E5DDD0] rounded-3xl p-6 sm:p-8 text-[#1F3A2B] shadow-2xl"
            >
              <button
                onClick={() => setIsRsvpOpen(false)}
                className="absolute top-4 right-4 text-[#8B9B90] hover:text-[#351E13]"
              >
                <FiX className="w-6 h-6" />
              </button>

              {booked ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4B055] text-[#2B4236] flex items-center justify-center mx-auto shadow-md">
                    <FiCheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1F3A2B]">RSVP Confirmed!</h3>
                  <p className="text-xs text-[#6B7C70] font-light">
                    We've saved a spot for <span className="font-semibold text-[#1F3A2B]">{guestName}</span> at <br />
                    <span className="text-[#C8A96A] font-medium">{event.title}</span>.
                  </p>
                  <button
                    onClick={() => setIsRsvpOpen(false)}
                    className="w-full py-3 rounded-full bg-[#351E13] text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRSVP} className="space-y-4">
                  <div className="text-center mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#C8A96A] block font-semibold mb-1">Event RSVP</span>
                    <h3 className="font-serif text-xl font-bold text-[#1F3A2B]">{event.title}</h3>
                    <p className="text-xs text-[#6B7C70] mt-1">{event.date} • {event.time}</p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C8A96A] mb-1 font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Kadam"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#F5EFE3] border border-[#E5DDD0] rounded-xl py-2.5 px-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#351E13] hover:bg-[#4A2C1D] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all mt-2"
                  >
                    Confirm RSVP
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventCard;
