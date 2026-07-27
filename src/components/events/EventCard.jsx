import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, 
  FiClock, 
  FiUsers, 
  FiMusic, 
  FiMic, 
  FiCoffee, 
  FiCheckCircle, 
  FiX, 
  FiMapPin, 
  FiDownload, 
  FiShare2, 
  FiTag
} from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const getCategoryIcon = (category) => {
  switch (category?.toLowerCase()) {
    case 'open mic':
      return <FiMic className="w-6 h-6 text-[#D6AE4D]" />;
    case 'coffee workshops':
    case 'workshop':
      return <FiCoffee className="w-6 h-6 text-[#D6AE4D]" />;
    default:
      return <FiMusic className="w-6 h-6 text-[#D6AE4D]" />;
  }
};

const EventCard = ({ event }) => {
  const { showToast } = useTheme();
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  
  // RSVP Form Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestCount, setGuestCount] = useState(2);

  const [booked, setBooked] = useState(false);
  const [passId, setPassId] = useState('');

  const handleRSVP = (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      showToast('Please fill out all contact details.', 'error');
      return;
    }
    const generatedId = 'AKL-PASS-' + Math.floor(100000 + Math.random() * 900000);
    setPassId(generatedId);
    setBooked(true);
    showToast(`VIP Pass Generated for ${event.title}!`, 'success');
  };

  const handleSharePass = () => {
    const text = `🎟️ *AKOLE CAFE VIP EVENT PASS*\n\n` +
      `📌 *Event:* ${event.title}\n` +
      `🗓️ *Date & Time:* ${event.date} • ${event.time}\n` +
      `👤 *Guest:* ${guestName}\n` +
      `🎟️ *Passes:* ${guestCount} Seats\n` +
      `🆔 *Pass ID:* ${passId}\n\n` +
      `See you at Akole Cafe! ☕✨`;

    if (navigator.share) {
      navigator.share({
        title: `AKOLE CAFE PASS - ${event.title}`,
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      showToast('Sharing pass details on WhatsApp...', 'success');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#16231B] rounded-3xl overflow-hidden border border-gray-200/80 dark:border-[#D6AE4D]/30 shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch group"
      >
        {/* Left 4 Columns: Event Cover Image Banner */}
        <div className="lg:col-span-4 relative h-64 lg:h-auto min-h-[220px] overflow-hidden bg-[#123524]">
          <img
            src={event.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121A15] via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 items-start">
            <span className="text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full bg-[#D6AE4D] text-[#123524] uppercase shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#123524]" /> {event.category || 'SPECIAL EVENT'}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
            <span className="text-xs font-bold text-[#D6AE4D] font-serif block">
              {event.location || 'Akole Cafe Main Lounge'}
            </span>
          </div>
        </div>

        {/* Right 8 Columns: Details & Action Row */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#123524]/10 dark:bg-[#D6AE4D]/15 flex items-center justify-center">
                  {getCategoryIcon(event.category)}
                </div>
                <span className="text-xs font-extrabold text-[#D6AE4D] uppercase tracking-widest">
                  {event.category}
                </span>
              </div>

              <span className="text-sm sm:text-base font-serif font-extrabold text-[#123524] dark:text-[#D6AE4D] bg-[#F5F2EA] dark:bg-[#121A15] px-3.5 py-1.5 rounded-full border border-[#D6AE4D]/30 shadow-sm">
                {event.price || 'Free Entry'}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#123524] dark:text-white group-hover:text-[#D6AE4D] transition-colors leading-snug">
              {event.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed">
              {event.description}
            </p>

            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#123524] dark:text-[#EAE3D2] pt-2 border-t border-gray-100 dark:border-[#D6AE4D]/15">
              <span className="flex items-center gap-1.5 bg-[#F8F5EE] dark:bg-[#121A15] px-3 py-1 rounded-lg border border-gray-200/80 dark:border-[#D6AE4D]/20">
                <FiCalendar className="text-[#D6AE4D]" /> {event.date}
              </span>
              <span className="flex items-center gap-1.5 bg-[#F8F5EE] dark:bg-[#121A15] px-3 py-1 rounded-lg border border-gray-200/80 dark:border-[#D6AE4D]/20">
                <FiClock className="text-[#D6AE4D]" /> {event.time}
              </span>
              <span className="flex items-center gap-1.5 bg-[#F8F5EE] dark:bg-[#121A15] px-3 py-1 rounded-lg border border-gray-200/80 dark:border-[#D6AE4D]/20">
                <FiUsers className="text-[#D6AE4D]" /> {event.spots || 'Limited Seats'}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setIsRsvpOpen(true)}
              className="py-3 px-6 rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-widest shadow-md shadow-[#D6AE4D]/20 hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#123524]" /> RESERVE PASS
            </button>
          </div>
        </div>
      </motion.div>

      {/* RSVP Modal */}
      <AnimatePresence>
        {isRsvpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRsvpOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 max-w-lg w-full bg-white dark:bg-[#16231B] border border-[#D6AE4D]/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={() => setIsRsvpOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 dark:bg-[#121A15] text-gray-500 dark:text-[#A0B0A5] hover:text-[#D6AE4D] flex items-center justify-center transition-colors cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>

              {!booked ? (
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6AE4D] block">
                      VIP PASS REGISTRATION
                    </span>
                    <h3 className="font-serif text-2xl font-extrabold text-[#123524] dark:text-white mt-1">
                      {event.title}
                    </h3>
                  </div>

                  <form onSubmit={handleRSVP} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mayur Gambhire"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-[#F8F5EE] dark:bg-[#121A15] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. user@example.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full bg-[#F8F5EE] dark:bg-[#121A15] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 84323 87670"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="w-full bg-[#F8F5EE] dark:bg-[#121A15] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] uppercase mb-1">
                        Number of Attendees
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-[#F8F5EE] dark:bg-[#121A15] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-widest shadow-xl hover:brightness-110 transition-all cursor-pointer"
                    >
                      CONFIRM PASS RESERVATION
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-3xl mx-auto border border-emerald-500/40">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6AE4D]">
                      RESERVATION CONFIRMED
                    </span>
                    <h3 className="font-serif text-2xl font-extrabold text-[#123524] dark:text-white mt-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light mt-1">
                      Pass ID: <span className="font-mono font-bold text-[#D6AE4D]">{passId}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleSharePass}
                    className="w-full py-3 rounded-full bg-emerald-600 text-white font-montserrat font-extrabold text-xs uppercase tracking-wider shadow-md hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiShare2 className="w-4 h-4" /> SHARE PASS ON WHATSAPP
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventCard;
