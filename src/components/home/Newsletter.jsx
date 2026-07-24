import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import Container from '../common/Container';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useTheme();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed to Akole VIP Newsletter! Check your inbox for your 15% discount code.', 'success');
  };

  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      <Container>
        <div className="relative rounded-3xl bg-primary text-secondary p-8 sm:p-12 lg:p-16 border border-accent-gold/40 shadow-2xl overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="botanical-glow -top-20 -left-20 opacity-40" />
          <div className="botanical-glow -bottom-20 -right-20 opacity-40" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-gold-gradient text-primary flex items-center justify-center mx-auto shadow-gold">
              <FiMail className="w-6 h-6" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-secondary">
              Experience Luxury Coffee <br />
              <span className="text-gold-gradient italic font-normal">Delivered to Your Inbox</span>
            </h2>

            <p className="text-sm sm:text-base text-secondary/80 font-light max-w-xl mx-auto leading-relaxed">
              Subscribe to the Akole Digest for private cupping workshop invitations, off-menu weekend specials, and a 15% discount voucher on your next visit.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl glass-panel border border-accent-gold/40 max-w-md mx-auto flex items-center justify-center gap-3 text-accent-gold"
              >
                <FiCheckCircle className="w-6 h-6 shrink-0" />
                <p className="text-sm font-semibold text-secondary">You are now on the VIP Guest List!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-primary-dark/90 border border-accent-gold/40 rounded-full py-3.5 px-6 text-sm text-secondary placeholder-secondary/50 focus:outline-none focus:border-accent-gold transition-colors shadow-inner"
                />
                <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto shrink-0">
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-[11px] uppercase tracking-widest text-secondary/50 font-light pt-2">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
