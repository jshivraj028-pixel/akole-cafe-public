import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiGift, FiStar, FiCalendar, FiPercent, FiCheck, FiX } from 'react-icons/fi';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';

const benefits = [
  {
    icon: FiAward,
    title: 'Earn Reward Points',
    description: 'Get 10 Akole Gold points for every ₹100 spent. Redeem points for free brews and artisanal dishes.'
  },
  {
    icon: FiGift,
    title: 'Birthday & Anniversary Treats',
    description: 'Enjoy a complimentary artisanal dessert & signature drink on your special celebration week.'
  },
  {
    icon: FiCalendar,
    title: 'Priority Table Reservations',
    description: 'Skip weekend waiting lines with dedicated VIP table reservations and outdoor terrace seating.'
  },
  {
    icon: FiPercent,
    title: 'Exclusive Discounts',
    description: 'Access member-only flash discounts, off-menu chef specials, and early access to live music tickets.'
  },
  {
    icon: FiStar,
    title: 'Free Coffee Rewards',
    description: 'Every 5th coffee purchase earns you a free signature single-origin brew of your choice.'
  }
];

const LoyaltyClub = () => {
  const { showToast } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`Welcome to Akole Loyalty Club, ${formData.name}! Your 500 bonus points have been credited.`, 'success');
    setIsModalOpen(false);
    setFormData({ name: '', phone: '', email: '' });
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden text-secondary">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8A96A_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="botanical-glow top-0 right-1/4 opacity-30" />
      <div className="botanical-glow bottom-0 left-10 opacity-30" />

      <Container className="relative z-10">
        <SectionTitle
          subtitle="VIP HOSPITALITY & REWARDS"
          title="Akole Loyalty Club"
          description="Elevate your daily coffee ritual. Join our exclusive rewards program and enjoy VIP privileges, complimentary brews, and handcrafted surprises."
          centered
        />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {benefits.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300 group hover:-translate-y-1 shadow-luxury"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-gradient text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <b.icon className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-secondary mb-2 group-hover:text-accent-gold transition-colors">
                {b.title}
              </h4>
              <p className="text-xs text-secondary/70 leading-relaxed font-light">
                {b.description}
              </p>
            </motion.div>
          ))}

          {/* Special Join Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 rounded-2xl bg-gold-gradient text-primary flex flex-col justify-between shadow-gold relative overflow-hidden"
          >
            <div>
              <div className="inline-block px-3 py-1 bg-primary text-accent-gold rounded-full text-[10px] uppercase font-bold tracking-widest mb-3">
                Bonus Offer
              </div>
              <h4 className="font-serif text-2xl font-bold mb-2">Instant 500 Gold Points</h4>
              <p className="text-xs text-primary/80 font-medium leading-relaxed">
                Sign up today to receive 500 welcome points (worth ₹250) redeemable on your next visit to Akole Cafe.
              </p>
            </div>
            <div className="pt-6">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="dark"
                size="md"
                className="w-full"
              >
                Join Now for Free
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative z-10 w-full max-w-md bg-primary border border-accent-gold/40 rounded-2xl p-6 sm:p-8 text-secondary shadow-luxury"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-secondary/60 hover:text-accent-gold"
                >
                  <FiX className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                  <span className="text-3xl mb-2 block">👑</span>
                  <h3 className="font-serif text-2xl font-bold text-accent-gold">Join Akole Loyalty Club</h3>
                  <p className="text-xs text-secondary/70 mt-1">Unlock instant VIP rewards and 500 bonus points.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-accent-gold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-accent-gold mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-accent-gold mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold"
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full mt-2">
                    Claim 500 Points & Join
                  </Button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default LoyaltyClub;
