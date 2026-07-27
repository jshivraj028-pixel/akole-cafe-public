import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, FiPhone, FiMail, FiClock, FiSend, 
  FiInstagram, FiFacebook, FiTwitter, FiMessageSquare, FiCompass, FiChevronDown, FiCheckCircle 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
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
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`Thank you ${form.name}! Your message has been received by Akole Café.`, 'success');
    setForm({ name: '', email: '', phone: '', inquiryType: 'Table Reservation', message: '' });
  };

  const faqs = [
    {
      q: 'What are Akole Café opening hours?',
      a: 'We are open 7 days a week from 7:00 AM to 11:00 PM, serving fresh artisanal coffee, wood-fired pizzas, and gourmet bakes.'
    },
    {
      q: 'Can I reserve a private table for birthday or acoustic event celebrations?',
      a: 'Yes! You can reserve priority seating or private lounge corners directly via our website or by calling us at +91 84323 87670.'
    },
    {
      q: 'Do you offer home delivery in Akole & nearby areas?',
      a: 'Yes, we provide instant hot delivery within Akole city limits. Order directly from our website menu for fast dispatch.'
    }
  ];

  return (
    <div className="bg-[#F5EFE3] dark:bg-[#121A15] min-h-screen text-[#1F3A2B] dark:text-[#EAE3D2] transition-colors duration-300">
      {/* Hero Page Banner */}
      <PageBanner
        title="Contact Us"
        subtitle="VISIT OUR ARTISANAL CAFÉ & LUXURY LOUNGE"
        bgImage="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1920&q=80"
      />

      {/* SECTION 1: TOP 3 LUXURY INFO CARDS */}
      <section className="py-16 bg-[#F5EFE3] dark:bg-[#121A15]">
        <Container className="max-w-6xl">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block">
              WE ARE ALWAYS AT YOUR SERVICE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#123524] dark:text-white">
              Connect With Akole Café
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] font-light">
              Have a question about our menu, table bookings, or hosting an event? Reach out to our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Address */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-3xl bg-white/90 dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-xl text-center flex flex-col items-center justify-between"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#123524] text-[#D6AE4D] flex items-center justify-center text-2xl mx-auto shadow-md border border-[#D6AE4D]/30">
                  <FiMapPin />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#123524] dark:text-white mb-1">
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
                className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#123524] dark:bg-[#D6AE4D] text-white dark:text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity"
              >
                <FiMapPin className="w-4 h-4 text-[#D6AE4D] dark:text-[#123524]" /> Get Directions
              </a>
            </motion.div>

            {/* Card 2: Phone & WhatsApp */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-3xl bg-white/90 dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-xl text-center flex flex-col items-center justify-between"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#123524] text-[#D6AE4D] flex items-center justify-center text-2xl mx-auto shadow-md border border-[#D6AE4D]/30">
                  <FiPhone />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#123524] dark:text-white mb-1">
                    Phone & Support
                  </h3>
                  <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed">
                    Direct Line: <a href="tel:+918432387670" className="font-bold text-[#123524] dark:text-[#D6AE4D] hover:underline">+91 84323 87670</a><br />
                    Available 7 Days a week
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/918432387670?text=Hello%20Akole%20Cafe%2C%20I%20would%20like%20to%20make%20an%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#25D366] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider shadow-sm hover:bg-[#1ebd59] transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </motion.div>

            {/* Card 3: Email & Hours */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-3xl bg-white/90 dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-xl text-center flex flex-col items-center justify-between"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#123524] text-[#D6AE4D] flex items-center justify-center text-2xl mx-auto shadow-md border border-[#D6AE4D]/30">
                  <FiMail />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#123524] dark:text-white mb-1">
                    Email & Timings
                  </h3>
                  <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed">
                    <a href="mailto:akolecafe@gmail.com" className="font-bold text-[#123524] dark:text-[#D6AE4D] hover:underline">akolecafe@gmail.com</a><br />
                    Open Daily: 7:00 AM - 11:00 PM
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <a href="https://instagram.com/akolecafe" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#123524] text-[#D6AE4D] flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-colors">
                  <FiInstagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com/akolecafe" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#123524] text-[#D6AE4D] flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-colors">
                  <FiFacebook className="w-4 h-4" />
                </a>
                <a href="https://twitter.com/akolecafe" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#123524] text-[#D6AE4D] flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-colors">
                  <FiTwitter className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* SECTION 2: FORM & EMBEDDED MAP GRID */}
      <section className="py-12 bg-[#FAF6EE] dark:bg-[#0E1511]">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left 7 Columns: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#D6AE4D] block mb-0.5">
                  DIRECT MESSAGE
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-white">
                  Send Us an Inquiry
                </h3>
                <p className="text-[11px] text-[#6B7C70] dark:text-[#A0B0A5] font-light mt-0.5">
                  Fill in your details below and our team will get back to you within 30 minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-[#8B9B90] mb-0.5 uppercase tracking-wider">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mayur Gambhire"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-lg py-2 px-3 text-xs text-[#123524] dark:text-white placeholder-[#8B9B90] focus:outline-none focus:border-[#D6AE4D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#8B9B90] mb-0.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. user@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-lg py-2 px-3 text-xs text-[#123524] dark:text-white placeholder-[#8B9B90] focus:outline-none focus:border-[#D6AE4D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-[#8B9B90] mb-0.5 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+91 84323 87670"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-lg py-2 px-3 text-xs text-[#123524] dark:text-white placeholder-[#8B9B90] focus:outline-none focus:border-[#D6AE4D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#8B9B90] mb-0.5 uppercase tracking-wider">
                      Inquiry Category
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-lg py-2 px-3 text-xs text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D]"
                    >
                      <option value="Table Reservation">Table Reservation</option>
                      <option value="Private Event & Acoustic Party">Private Event & Acoustic Party</option>
                      <option value="Franchise Opportunity">Franchise Opportunity</option>
                      <option value="Feedback & Complement">Feedback & Complement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#8B9B90] mb-0.5 uppercase tracking-wider">
                    Your Message / Request
                  </label>
                  <textarea
                    rows={2.5}
                    required
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-lg py-2 px-3 text-xs text-[#123524] dark:text-white placeholder-[#8B9B90] focus:outline-none focus:border-[#D6AE4D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#D6AE4D] to-[#B89035] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <FiSend className="w-3.5 h-3.5" /> SEND INQUIRY MESSAGE
                </button>
              </form>
            </motion.div>

            {/* Right 5 Columns: Google Map Embed */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 rounded-3xl overflow-hidden border border-[#D6AE4D]/40 shadow-2xl relative flex flex-col bg-[#123524]"
            >
              <div className="p-6 bg-[#123524] text-white space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6AE4D] block">
                  LOCATE US ON GOOGLE MAPS
                </span>
                <h4 className="font-serif text-xl font-bold">Akole Bypass Road Lounge</h4>
                <p className="text-xs text-white/70 font-light">Near Bus Stand, Akole, Maharashtra 422601</p>
              </div>

              <div className="flex-1 min-h-[350px] w-full relative">
                <iframe
                  title="Akole Cafe Google Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15024.12345!2d74.0042!3d19.5492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcdd8655555555%3A0x1234567890abcdef!2sAkole%2C%20Maharashtra%20422601!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[350px]"
                />
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* SECTION 3: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 bg-[#F5EFE3] dark:bg-[#121A15] border-t border-[#D6AE4D]/20">
        <Container className="max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#123524] dark:text-white">
              Got Questions? We Have Answers.
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-[#1D2C22] border border-[#D6AE4D]/30 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-base text-[#123524] dark:text-white"
                >
                  <span>{faq.q}</span>
                  <FiChevronDown className={`w-5 h-5 text-[#D6AE4D] transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>

                {activeFaq === index && (
                  <div className="px-5 pb-5 text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed border-t border-[#D6AE4D]/15 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
};

export default Contact;
