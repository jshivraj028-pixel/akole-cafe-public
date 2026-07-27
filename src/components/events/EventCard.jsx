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
  FiGrid 
} from 'react-icons/fi';
import Button from '../common/Button';
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
  
  // RSVP Form Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('UPI / Google Pay / PhonePe');

  const [booked, setBooked] = useState(false);
  const [passId, setPassId] = useState('');

  const receiptRef = useRef();

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

  // Download Receipt via Print
  const handleDownloadReceipt = () => {
    window.print();
  };

  // Share Pass via WhatsApp / Web Share
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#FAF6EE] dark:bg-[#1D2C22] rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] dark:border-[#D6AE4D]/20 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
      >
        {/* Left Side: Icon + Details */}
        <div className="flex items-start gap-5">
          {/* Icon Box */}
          <div className="w-14 h-14 rounded-2xl bg-[#EFE8D8] dark:bg-[#16231B] flex items-center justify-center text-[#C8A96A] shrink-0 mt-1">
            {getCategoryIcon(event.category)}
          </div>

          {/* Event Information */}
          <div className="space-y-1.5">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C8A96A] block">
              {event.category || 'LIVE MUSIC'}
            </span>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1F3A2B] dark:text-white">
              {event.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed max-w-xl">
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
              {event.location && (
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-[#C8A96A]" /> {event.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Price & Register Button */}
        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#E5DDD0] dark:border-[#D6AE4D]/20">
          <span className="font-serif text-lg font-bold text-[#1F3A2B] dark:text-[#D6AE4D] mb-2">
            {event.price || 'Free Admission'}
          </span>
          <button
            onClick={() => {
              setBooked(false);
              setIsRsvpOpen(true);
            }}
            className="px-7 py-2.5 rounded-full bg-[#351E13] dark:bg-[#D6AE4D] hover:bg-[#4A2C1D] dark:hover:bg-[#c59d3c] text-white dark:text-[#123524] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            REGISTER PASS
          </button>
        </div>
      </motion.div>

      {/* RSVP & RECEIPT MODAL */}
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
              className="relative z-10 w-full max-w-md bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-3xl p-6 sm:p-8 text-[#1F3A2B] dark:text-[#EAE3D2] shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsRsvpOpen(false)}
                className="absolute top-4 right-4 text-[#8B9B90] hover:text-[#351E13] dark:hover:text-[#D6AE4D]"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* COLORFUL RECEIPT TICKET PASS */}
              {booked ? (
                <div ref={receiptRef} className="space-y-6">
                  {/* Vibrant Pass Header */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 text-white shadow-2xl relative overflow-hidden border border-white/30">
                    <div className="absolute top-2 right-2 opacity-20 text-7xl font-bold">AKOLE</div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest border border-white/40">
                        OFFICIAL EVENT PASS
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-200">{passId}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-extrabold text-white mb-1">{event.title}</h3>
                    <p className="text-xs text-emerald-100 font-medium">{event.date} • {event.time}</p>
                  </div>

                  {/* Receipt Details Box */}
                  <div className="p-6 rounded-2xl bg-[#123524] text-white border border-[#D6AE4D]/30 text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <span className="text-white/60 uppercase tracking-wider">Guest Name</span>
                      <span className="font-bold text-white text-sm">{guestName}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <span className="text-white/60 uppercase tracking-wider">Contact Email</span>
                      <span className="font-medium text-[#D6AE4D]">{guestEmail}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <span className="text-white/60 uppercase tracking-wider">Phone Number</span>
                      <span className="font-medium text-white">{guestPhone}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <span className="text-white/60 uppercase tracking-wider">Reserved Passes</span>
                      <span className="font-extrabold text-amber-400 text-sm">{guestCount} Reserved Seats</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <span className="text-white/60 uppercase tracking-wider">Payment Method</span>
                      <span className="font-medium text-emerald-400">{paymentMethod}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-white/60 uppercase tracking-wider font-bold">Booking Status</span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase border border-emerald-500/40 flex items-center gap-1">
                        <FiCheckCircle /> PAID & CONFIRMED
                      </span>
                    </div>
                  </div>

                  {/* QR Code Placeholder */}
                  <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/10 dark:bg-black/20 border border-[#D6AE4D]/20 text-center">
                    <FiGrid className="w-10 h-10 text-[#D6AE4D]" />
                    <div className="text-left">
                      <div className="text-xs font-bold font-mono tracking-widest text-[#1F3A2B] dark:text-white">VERIFIED ENTRY PASS</div>
                      <div className="text-[10px] text-[#6B7C70] dark:text-[#A0B0A5]">Akole Cafe Entrance • Single Scan Verified</div>
                    </div>
                  </div>

                  {/* Actions: Download & Share Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleDownloadReceipt}
                      className="py-3 px-4 rounded-xl bg-[#D6AE4D] text-[#123524] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                    >
                      <FiDownload className="text-base" /> Download Pass
                    </button>

                    <button
                      onClick={handleSharePass}
                      className="py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:bg-emerald-500 transition-colors"
                    >
                      <FiShare2 className="text-base" /> Share Pass
                    </button>
                  </div>
                </div>
              ) : (
                /* RSVP REGISTRATION & PAYMENT FORM */
                <form onSubmit={handleRSVP} className="space-y-4 text-xs">
                  <div className="text-center mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#C8A96A] block font-semibold mb-1">
                      EVENT RESERVATION
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1F3A2B] dark:text-white">{event.title}</h3>
                    <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] mt-1">{event.date} • {event.time}</p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C8A96A] mb-1 font-semibold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Kadam"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#F5EFE3] dark:bg-[#16231B] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-xl py-2.5 px-4 text-xs text-[#1F3A2B] dark:text-[#EAE3D2] focus:outline-none focus:border-[#C8A96A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8A96A] mb-1 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="pooja@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-[#F5EFE3] dark:bg-[#16231B] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-xl py-2.5 px-4 text-xs text-[#1F3A2B] dark:text-[#EAE3D2] focus:outline-none focus:border-[#C8A96A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8A96A] mb-1 font-semibold">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 84323 87670"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-[#F5EFE3] dark:bg-[#16231B] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-xl py-2.5 px-4 text-xs text-[#1F3A2B] dark:text-[#EAE3D2] focus:outline-none focus:border-[#C8A96A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8A96A] mb-1 font-semibold">
                        Number of Passes
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-[#F5EFE3] dark:bg-[#16231B] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-xl py-2.5 px-4 text-xs text-[#1F3A2B] dark:text-[#EAE3D2] focus:outline-none focus:border-[#C8A96A]"
                      >
                        <option value="1">1 Pass</option>
                        <option value="2">2 Passes</option>
                        <option value="4">4 Passes</option>
                        <option value="6">6 Passes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8A96A] mb-1 font-semibold">
                        Payment Option
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-[#F5EFE3] dark:bg-[#16231B] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-xl py-2.5 px-4 text-xs text-[#1F3A2B] dark:text-[#EAE3D2] focus:outline-none focus:border-[#C8A96A]"
                      >
                        <option value="UPI / Google Pay / PhonePe">UPI / GPay / PhonePe</option>
                        <option value="Credit / Debit Card">Credit / Debit Card</option>
                        <option value="Pay at Venue">Pay at Venue</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#351E13] dark:bg-[#D6AE4D] hover:bg-[#4A2C1D] dark:hover:bg-[#c59d3c] text-white dark:text-[#123524] font-bold text-xs uppercase tracking-wider shadow-md transition-all mt-3"
                  >
                    Confirm & Generate Event Pass
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
