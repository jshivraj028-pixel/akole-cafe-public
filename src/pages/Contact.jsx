import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiMessageSquare } from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { showToast } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`Thank you ${form.name}, your message has been delivered to Akole Cafe concierge!`, 'success');
    setForm({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  };

  return (
    <>
      <PageBanner
        title="Get in Touch"
        subtitle="We Would Love to Hear From You • Akole, Maharashtra, India"
        bgImage="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-secondary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Contact Cards & Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-accent-goldDark block mb-1">
                  Connect With Us
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-primary">
                  Visit Akole Cafe
                </h2>
                <p className="text-xs sm:text-sm text-dark/70 font-light mt-2 leading-relaxed">
                  Have questions about table reservations, custom celebration cakes, or private catering? Drop us a line or visit our luxury lounge in Akole.
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4 pt-2">
                <div className="glass-card p-5 rounded-2xl border border-accent-gold/20 flex items-start gap-4 shadow-luxury">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient text-primary flex items-center justify-center shrink-0 shadow-gold">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-primary">Café Address</h4>
                    <p className="text-xs text-dark/70 font-light mt-0.5 leading-relaxed">
                      Main College Road, Near High School Ground, Akole, Ahmednagar District, Maharashtra 422601, India
                    </p>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl border border-accent-gold/20 flex items-start gap-4 shadow-luxury">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient text-primary flex items-center justify-center shrink-0 shadow-gold">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-primary">Reservations & Phone</h4>
                    <p className="text-xs text-dark/70 font-light mt-0.5">
                      +91 98220 12345 / +91 94230 67890
                    </p>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl border border-accent-gold/20 flex items-start gap-4 shadow-luxury">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient text-primary flex items-center justify-center shrink-0 shadow-gold">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-primary">Email Support</h4>
                    <p className="text-xs text-dark/70 font-light mt-0.5">
                      concierge@akolecafe.com
                    </p>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl border border-accent-gold/20 flex items-start gap-4 shadow-luxury">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient text-primary flex items-center justify-center shrink-0 shadow-gold">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-primary">Opening Hours</h4>
                    <p className="text-xs text-dark/70 font-light mt-0.5">
                      Monday - Sunday: 08:00 AM - 11:00 PM <br />
                      <span className="text-accent-goldDark font-medium">(Kitchen closes at 10:30 PM)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-accent-gold/30 shadow-2xl bg-primary text-secondary">
                <div className="mb-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-secondary">Send Us a Direct Message</h3>
                  <p className="text-xs text-secondary/70 mt-1 font-light">Our team responds within 2 business hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Ananya Deshmukh"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-1">Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary focus:outline-none focus:border-accent-gold"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Table Reservation">Table Reservation Query</option>
                        <option value="Private Event">Private Party / Event</option>
                        <option value="Franchise">Franchise Interest</option>
                        <option value="Feedback">Guest Feedback & Praise</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-1">Message</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-3 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full" icon={FiSend}>
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

          </div>

          {/* Embedded Google Map Section */}
          <div className="mt-16 rounded-3xl overflow-hidden border border-accent-gold/40 shadow-2xl relative h-96">
            <iframe
              title="Akole Cafe Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30043.203672778434!2d74.0044991!3d19.5447156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcddc3a9d94bbd%3A0xe54cf3c3a4f6690!2sAkole%2C%20Maharashtra%20422601!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.1) saturate(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
