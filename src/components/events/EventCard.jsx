import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiCheckCircle, 
  FiX, 
  FiCheck, 
  FiDownload, 
  FiShare2, 
  FiMail, 
  FiPhone, 
  FiCreditCard, 
  FiGrid,
  FiPrinter
} from 'react-icons/fi';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';

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
              onClick={() => {
                setBooked(false);
                setIsRsvpOpen(true);
              }}
              variant="gold"
              size="md"
              className="w-full sm:w-auto"
            >
              Reserve VIP Pass
            </Button>
          </div>
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
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-lg bg-primary border border-accent-gold/40 rounded-3xl p-6 sm:p-8 text-secondary shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsRsvpOpen(false)}
                className="absolute top-4 right-4 text-secondary/60 hover:text-accent-gold"
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
                        OFFICIAL VIP EVENT PASS
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-200">{passId}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-extrabold text-white mb-1">{event.title}</h3>
                    <p className="text-xs text-emerald-100 font-medium">{event.date} • {event.time}</p>
                  </div>

                  {/* Receipt Details Box */}
                  <div className="p-6 rounded-2xl bg-primary-dark/90 border border-accent-gold/30 text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                      <span className="text-secondary/60 uppercase tracking-wider">Guest Name</span>
                      <span className="font-bold text-secondary text-sm">{guestName}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                      <span className="text-secondary/60 uppercase tracking-wider">Contact Email</span>
                      <span className="font-medium text-accent-gold">{guestEmail}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                      <span className="text-secondary/60 uppercase tracking-wider">Phone Number</span>
                      <span className="font-medium text-secondary">{guestPhone}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                      <span className="text-secondary/60 uppercase tracking-wider">Reserved Passes</span>
                      <span className="font-extrabold text-amber-400 text-sm">{guestCount} VIP Seats</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                      <span className="text-secondary/60 uppercase tracking-wider">Payment Method</span>
                      <span className="font-medium text-emerald-400">{paymentMethod}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-secondary/60 uppercase tracking-wider font-bold">Booking Status</span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase border border-emerald-500/40 flex items-center gap-1">
                        <FiCheckCircle /> PAID & CONFIRMED
                      </span>
                    </div>
                  </div>

                  {/* QR Code Placeholder */}
                  <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-secondary/10 border border-accent-gold/20 text-center">
                    <FiGrid className="w-10 h-10 text-accent-gold" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-secondary font-mono tracking-widest">VERIFIED VIP ENTRY PASS</div>
                      <div className="text-[10px] text-secondary/60">Akole Cafe Entrance • Single Scan Verified</div>
                    </div>
                  </div>

                  {/* Actions: Download & Share Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleDownloadReceipt}
                      className="py-3 px-4 rounded-xl bg-gold-gradient text-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold hover:opacity-90 transition-opacity"
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
                    <span className="text-xs uppercase tracking-widest text-accent-gold block font-semibold mb-1">
                      VIP EVENT RESERVATION
                    </span>
                    <h3 className="font-serif text-xl font-bold text-secondary">{event.title}</h3>
                    <p className="text-xs text-secondary/60 mt-1">{event.date} • {event.time}</p>
                  </div>

                  <div>
                    <label className="block text-accent-gold mb-1 font-medium uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Kadam"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-accent-gold mb-1 font-medium uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="pooja@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-accent-gold mb-1 font-medium uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-accent-gold mb-1 font-medium uppercase tracking-wider">
                        Number of Passes
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary focus:outline-none focus:border-accent-gold"
                      >
                        <option value="1">1 VIP Pass</option>
                        <option value="2">2 VIP Passes</option>
                        <option value="4">4 VIP Passes</option>
                        <option value="6">6 VIP Passes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-accent-gold mb-1 font-medium uppercase tracking-wider">
                        Payment Option
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary focus:outline-none focus:border-accent-gold"
                      >
                        <option value="UPI / Google Pay / PhonePe">UPI / GPay / PhonePe</option>
                        <option value="Credit / Debit Card">Credit / Debit Card</option>
                        <option value="Pay at Venue">Pay at Venue</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full mt-3">
                    Confirm & Generate VIP Pass Receipt
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
