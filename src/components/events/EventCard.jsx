import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiX, FiCheck } from 'react-icons/fi';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';

const EventCard = ({ event }) => {
  const { showToast } = useTheme();
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-3xl overflow-hidden border border-accent-gold/25 shadow-luxury flex flex-col lg:flex-row gap-0 group transition-all duration-300"
      >
        {/* Image Side */}
        <div className="relative lg:w-5/12 h-64 lg:h-auto overflow-hidden bg-primary-dark shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent lg:hidden" />
          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1 bg-gold-gradient text-primary text-xs font-extrabold uppercase tracking-wider rounded-full shadow-gold">
              {event.category}
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="p-6 sm:p-8 lg:w-7/12 flex flex-col justify-between bg-white/90">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-semibold text-accent-goldDark">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5"><FiCalendar className="w-4 h-4" /> {event.date}</span>
                <span className="flex items-center gap-1.5"><FiClock className="w-4 h-4" /> {event.time}</span>
              </div>
              <span className="px-3 py-1 bg-primary/10 rounded-full text-primary font-bold">{event.price}</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-primary mb-2 group-hover:text-coffee transition-colors">
              {event.title}
            </h3>

            <p className="text-xs sm:text-sm text-dark/70 font-light leading-relaxed mb-4">
              {event.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {event.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-dark/80">
                  <FiCheck className="text-accent-goldDark w-4 h-4 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-accent-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-dark/60">
              <FiMapPin className="text-accent-goldDark" />
              <span>{event.location}</span>
            </div>
            <Button
              onClick={() => setIsRsvpOpen(true)}
              variant="gold"
              size="md"
              className="w-full sm:w-auto"
            >
              Reserve VIP Pass
            </Button>
          </div>
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
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-md bg-primary border border-accent-gold/40 rounded-3xl p-6 sm:p-8 text-secondary shadow-2xl"
            >
              <button
                onClick={() => setIsRsvpOpen(false)}
                className="absolute top-4 right-4 text-secondary/60 hover:text-accent-gold"
              >
                <FiX className="w-6 h-6" />
              </button>

              {booked ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold-gradient text-primary flex items-center justify-center mx-auto shadow-gold">
                    <FiCheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-accent-gold">Pass Reserved!</h3>
                  <p className="text-xs text-secondary/80 font-light">
                    We've saved {guestCount} seats for <span className="font-semibold text-secondary">{guestName}</span> at <br />
                    <span className="text-accent-gold font-medium">{event.title}</span>.
                  </p>
                  <Button onClick={() => setIsRsvpOpen(false)} variant="gold" size="md" className="w-full mt-4">
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleRSVP} className="space-y-4">
                  <div className="text-center mb-4">
                    <span className="text-xs uppercase tracking-widest text-accent-gold block font-semibold mb-1">Event RSVP</span>
                    <h3 className="font-serif text-xl font-bold text-secondary">{event.title}</h3>
                    <p className="text-xs text-secondary/60 mt-1">{event.date} • {event.time}</p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-accent-gold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Kadam"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-accent-gold mb-1">Number of Pass Seats</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-secondary focus:outline-none focus:border-accent-gold"
                    >
                      <option value="1">1 VIP Pass</option>
                      <option value="2">2 VIP Passes</option>
                      <option value="4">4 VIP Passes</option>
                      <option value="6">6 VIP Passes</option>
                    </select>
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full mt-2">
                    Confirm Seat Reservation
                  </Button>
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
