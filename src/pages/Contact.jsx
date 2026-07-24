import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiSend, FiInstagram, FiFacebook, FiTwitter, FiMessageSquare } from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { showToast } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`Thank you ${form.name}, your message has been sent to Akole Café!`, 'success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="bg-[#F5EFE3] min-h-screen text-[#1F3A2B]">
      {/* Hero Page Banner */}
      <PageBanner
        title="Get in"
        highlight="Touch"
        subtitle=""
        bgImage="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Main Content Section */}
      <section className="py-16 sm:py-24 bg-[#F5EFE3]">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact Info & Socials */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C8A96A] block mb-2">
                  CONTACT INFO
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1F3A2B]">
                  We'd Love to Hear From You
                </h2>
              </div>

              {/* Info Items */}
              <div className="space-y-6">
                {/* Visit Us */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#EFE8D8] border border-[#E5DDD0] flex items-center justify-center text-[#C8A96A] shrink-0 mt-1">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8B9B90] font-semibold uppercase tracking-wider block mb-0.5">
                      Visit Us
                    </span>
                    <p className="text-xs sm:text-sm text-[#1F3A2B] font-medium leading-relaxed max-w-xs">
                      123 Brew Street, Café District <br />
                      Mumbai 400001, India
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#EFE8D8] border border-[#E5DDD0] flex items-center justify-center text-[#C8A96A] shrink-0 mt-1">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8B9B90] font-semibold uppercase tracking-wider block mb-0.5">
                      Call Us
                    </span>
                    <p className="text-xs sm:text-sm text-[#1F3A2B] font-medium">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-[#E5DDD0] my-8" />

              {/* Social Follow */}
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C8A96A] block">
                  FOLLOW US
                </span>
                <div className="flex items-center gap-3">
                  <a href="#instagram" aria-label="Instagram" className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#E5DDD0] text-[#1F3A2B] hover:border-[#C8A96A] hover:text-[#C8A96A] flex items-center justify-center transition-colors">
                    <FiInstagram className="w-4 h-4" />
                  </a>
                  <a href="#facebook" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#E5DDD0] text-[#1F3A2B] hover:border-[#C8A96A] hover:text-[#C8A96A] flex items-center justify-center transition-colors">
                    <FiFacebook className="w-4 h-4" />
                  </a>
                  <a href="#twitter" aria-label="Twitter" className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#E5DDD0] text-[#1F3A2B] hover:border-[#C8A96A] hover:text-[#C8A96A] flex items-center justify-center transition-colors">
                    <FiTwitter className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all mt-3"
                >
                  <FiMessageSquare className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Form & Map Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl py-3 px-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl py-3 px-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl py-3 px-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl py-3 px-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#6B7C70] mb-1 font-medium">Message</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-xl p-4 text-xs text-[#1F3A2B] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#351E13] hover:bg-[#4A2C1D] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <FiSend className="w-4 h-4" />
                  <span>SEND MESSAGE</span>
                </button>
              </form>

              {/* Map Box Matching Screenshot */}
              <div className="bg-[#EFE8D8] rounded-3xl p-8 border border-[#E5DDD0] text-center space-y-2 flex flex-col items-center justify-center min-h-[160px] shadow-sm">
                <FiMapPin className="w-7 h-7 text-[#C8A96A] mb-1" />
                <h4 className="font-serif text-base font-semibold text-[#1F3A2B]">
                  123 Brew Street, Mumbai
                </h4>
                <p className="text-xs text-[#6B7C70] font-light">
                  Café District, 400001
                </p>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
