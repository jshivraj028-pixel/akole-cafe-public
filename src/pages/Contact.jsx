import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, FiPhone, FiMail, FiClock, FiSend, 
  FiInstagram, FiFacebook, FiTwitter, FiChevronDown, FiCheckCircle, FiShield, FiHeart 
} from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { showToast } = useTheme();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Table Reservation',
    message: ''
  });
  const [activeFaq, setActiveFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`Thank you ${form.name}! Your inquiry has been dispatched to Akole Café VIP Desk.`, 'success');
    setForm({ name: '', email: '', phone: '', inquiryType: 'Table Reservation', message: '' });
  };

  const faqs = [
    {
      q: 'What are Akole Café opening hours?',
      a: 'We welcome guests 7 days a week from 7:00 AM to 11:00 PM. Hot breakfast starts at 7:00 AM, artisanal coffee is served all day, and kitchen orders close at 10:45 PM.'
    },
    {
      q: 'Can I reserve a private table for birthday or acoustic event celebrations?',
      a: 'Absolutely! We offer priority table reservations and private corner lounge setups. Submit an inquiry form on this page or call our manager directly at +91 84323 87670.'
    },
    {
      q: 'Do you offer home delivery in Akole & nearby areas?',
      a: 'Yes, we provide instant hot delivery across Akole city and bypass areas. Browse our online menu on this website to order directly with instant tracking.'
    },
    {
      q: 'Are there vegetarian and Jain food options available?',
      a: '100% Yes! Akole Café offers a dedicated menu of pure vegetarian delicacies, freshly baked items, signature misal, ice cream scoops, and customizable beverages.'
    }
  ];

  return (
    <div className="bg-[#F8F5EE] dark:bg-[#0F1712] min-h-screen text-[#123524] dark:text-[#EAE3D2] transition-colors duration-300">
      
      {/* Hero Page Banner */}
      <PageBanner
        title="Contact Us"
        subtitle="EXECUTIVE LOUNGE & ARTISANAL CAFÉ DISPATCH"
        bgImage="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1920&q=80"
      />

      {/* SECTION 1: TOP 3 ULTRA-LUXURY INFO CARDS */}
      <section className="py-20 relative">
        <Container className="max-w-6xl">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123524]/10 dark:bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 text-[#D6AE4D] text-[10px] font-extrabold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-[#D6AE4D] animate-spin-slow" />
              <span>ALWAYS AT YOUR SERVICE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#123524] dark:text-white tracking-tight">
              Connect With <span className="bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] bg-clip-text text-transparent">Akole Café</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed max-w-lg mx-auto">
              Have a question about our artisanal menu, private lounge bookings, or hosting an event? Reach out to our hospitality desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Address */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-3xl bg-white dark:bg-[#16231B] border border-gray-200/80 dark:border-[#D6AE4D]/30 shadow-xl hover:shadow-2xl hover:border-[#D6AE4D] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D6AE4D]/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#123524] to-[#1D4732] text-[#D6AE4D] flex items-center justify-center text-2xl mx-auto shadow-lg shadow-[#123524]/20 border border-[#D6AE4D]/40 group-hover:scale-110 transition-transform duration-300">
                  <FiMapPin />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#123524] dark:text-white mb-2">
                    Café Location
                  </h3>
                  <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed">
                    Akole Bypass Road, Near Bus Stand,<br />
                    Akole, Maharashtra 422601
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Akole+Bypass+Road+Near+Bus+Stand+Akole+Maharashtra+422601"
                target="_blank"
                rel="noreferrer"
                className="mt-8 w-full py-3 rounded-xl bg-[#123524] dark:bg-[#D6AE4D] text-white dark:text-[#123524] font-montserrat font-extrabold text-[11px] uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                <FiMapPin className="w-4 h-4 text-[#D6AE4D] dark:text-[#123524]" /> GET DIRECTIONS
              </a>
            </motion.div>

            {/* Card 2: Phone & WhatsApp */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-3xl bg-white dark:bg-[#16231B] border border-gray-200/80 dark:border-[#D6AE4D]/30 shadow-xl hover:shadow-2xl hover:border-[#D6AE4D] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />

              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#123524] to-[#1D4732] text-[#D6AE4D] flex items-center justify-center text-2xl mx-auto shadow-lg shadow-[#123524]/20 border border-[#D6AE4D]/40 group-hover:scale-110 transition-transform duration-300">
                  <FiPhone />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#123524] dark:text-white mb-2">
                    Direct Line & Support
                  </h3>
                  <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed">
                    VIP Desk: <a href="tel:+918432387670" className="font-extrabold text-[#123524] dark:text-[#D6AE4D] hover:underline">+91 84323 87670</a><br />
                    Available 7 Days a week (7 AM - 11 PM)
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/918432387670?text=Hello%20Akole%20Cafe%2C%20I%20would%20like%20to%20make%20an%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-montserrat font-extrabold text-[11px] uppercase tracking-wider shadow-md shadow-emerald-600/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="w-4 h-4" /> CHAT ON WHATSAPP
              </a>
            </motion.div>

            {/* Card 3: Email & Social Media */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-3xl bg-white dark:bg-[#16231B] border border-gray-200/80 dark:border-[#D6AE4D]/30 shadow-xl hover:shadow-2xl hover:border-[#D6AE4D] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D6AE4D]/10 to-transparent rounded-bl-full pointer-events-none" />

              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#123524] to-[#1D4732] text-[#D6AE4D] flex items-center justify-center text-2xl mx-auto shadow-lg shadow-[#123524]/20 border border-[#D6AE4D]/40 group-hover:scale-110 transition-transform duration-300">
                  <FiMail />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#123524] dark:text-white mb-2">
                    Email & Timings
                  </h3>
                  <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed">
                    <a href="mailto:akolecafe@gmail.com" className="font-extrabold text-[#123524] dark:text-[#D6AE4D] hover:underline">akolecafe@gmail.com</a><br />
                    Serving Fresh Everyday 7:00 AM - 11:00 PM
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <a href="https://instagram.com/akolecafe" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#123524] text-[#D6AE4D] flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-all shadow-sm">
                  <FiInstagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com/akolecafe" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#123524] text-[#D6AE4D] flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-all shadow-sm">
                  <FiFacebook className="w-4 h-4" />
                </a>
                <a href="https://twitter.com/akolecafe" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#123524] text-[#D6AE4D] flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-all shadow-sm">
                  <FiTwitter className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* SECTION 2: FORM & LIVE GOOGLE MAP GRID */}
      <section className="py-20 bg-white dark:bg-[#121A15] border-y border-gray-200/80 dark:border-[#D6AE4D]/20">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left 7 Columns: VIP Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#F8F5EE] dark:bg-[#16231B] border border-gray-200/80 dark:border-[#D6AE4D]/30 shadow-2xl space-y-6 flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6AE4D]/20 text-[#123524] dark:text-[#D6AE4D] text-[10px] font-extrabold uppercase tracking-widest mb-2">
                  <FiSend className="w-3 h-3 text-[#D6AE4D]" /> DIRECT DISPATCH FORM
                </div>
                <h3 className="font-serif text-3xl font-extrabold text-[#123524] dark:text-white">
                  Send Us an Inquiry
                </h3>
                <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light mt-1">
                  Fill in your details below and our concierge desk will respond within 30 minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] mb-1.5 uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mayur Gambhire"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white dark:bg-[#121A15] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white placeholder-gray-400 dark:placeholder-[#7A8E81] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. user@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white dark:bg-[#121A15] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white placeholder-gray-400 dark:placeholder-[#7A8E81] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] mb-1.5 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+91 84323 87670"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white dark:bg-[#121A15] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white placeholder-gray-400 dark:placeholder-[#7A8E81] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] mb-1.5 uppercase tracking-wider">
                      Inquiry Category
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full bg-white dark:bg-[#121A15] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium cursor-pointer"
                    >
                      <option value="Table Reservation">Table Reservation</option>
                      <option value="Private Event & Acoustic Party">Private Event & Acoustic Party</option>
                      <option value="Franchise Opportunity">Franchise Opportunity</option>
                      <option value="Feedback & Complement">Feedback & Complement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#123524] dark:text-[#D6AE4D] mb-1.5 uppercase tracking-wider">
                    Your Message / Request *
                  </label>
                  <textarea
                    rows={3.5}
                    required
                    placeholder="Tell us how our team can serve you best..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white dark:bg-[#121A15] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-xl py-3 px-4 text-xs text-[#123524] dark:text-white placeholder-gray-400 dark:placeholder-[#7A8E81] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all shadow-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-[#D6AE4D]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> SUBMIT INQUIRY MESSAGE
                </button>
              </form>
            </motion.div>

            {/* Right 5 Columns: Interactive Map Container */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 rounded-3xl overflow-hidden border border-gray-200 dark:border-[#D6AE4D]/40 shadow-2xl relative flex flex-col bg-[#123524]"
            >
              <div className="p-7 bg-[#123524] text-white space-y-2 relative overflow-hidden">
                <div className="absolute right-4 top-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[9px] font-extrabold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  OPEN NOW
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6AE4D] block">
                  LOCATE US ON GOOGLE MAPS
                </span>
                <h4 className="font-serif text-2xl font-bold">Akole Bypass Road Lounge</h4>
                <p className="text-xs text-white/70 font-light">Near Bus Stand, Akole, Maharashtra 422601</p>
              </div>

              <div className="flex-1 min-h-[380px] w-full relative">
                <iframe
                  title="Akole Cafe Google Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15024.12345!2d74.0042!3d19.5492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcdd8655555555%3A0x1234567890abcdef!2sAkole%2C%20Maharashtra%20422601!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[380px]"
                />
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* SECTION 3: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-[#F8F5EE] dark:bg-[#0F1712]">
        <Container className="max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#123524] dark:text-white">
              Got Questions? We Have Answers.
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-[24px] transition-all duration-300 overflow-hidden border ${
                    isOpen 
                      ? 'bg-white/95 dark:bg-[#16231B]/95 border-[#D6AE4D] shadow-2xl scale-[1.01]' 
                      : 'bg-white/60 dark:bg-[#16231B]/60 border-white/20 dark:border-[#D6AE4D]/15 backdrop-blur-xs shadow-md hover:border-[#D6AE4D]/55 hover:scale-[1.005]'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between font-serif font-extrabold text-sm sm:text-base text-[#123524] dark:text-white cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#123524] to-[#1D4732] text-[#D6AE4D] flex items-center justify-center text-xs font-sans font-bold border border-[#D6AE4D]/35 shrink-0">
                        0{index + 1}
                      </span>
                      <span className="pr-2">{faq.q}</span>
                    </span>
                    <FiChevronDown className={`w-5 h-5 text-[#D6AE4D] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed border-t border-gray-100 dark:border-[#D6AE4D]/15 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

    </div>
  );
};

export default Contact;
