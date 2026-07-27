import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiGift, FiAward, FiSmile, FiCheckCircle } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';

const clubFeatures = [
  {
    icon: FiCoffee,
    title: "Earn Points",
    desc: "Earn points on every cup & purchase",
  },
  {
    icon: FiGift,
    title: "Free Treats",
    desc: "Get free drinks and birthday treats",
  },
  {
    icon: FiAward,
    title: "Early Access",
    desc: "Early access to new seasonal menu",
  },
  {
    icon: FiSmile,
    title: "VIP Events",
    desc: "VIP invitations to special events",
  },
];

const LoyaltyClub = () => {
  return (
    <section className="py-20 bg-[#F8F5EE] dark:bg-[#0F1712] relative overflow-hidden transition-colors duration-300">
      <Container>
        {/* Soft Warm Gold/Beige Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-[#123524] border border-[#D6AE4D]/35 p-8 sm:p-12 text-center shadow-2xl space-y-10 relative overflow-hidden"
        >
          {/* Background overlay details */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D6AE4D]/10 to-transparent rounded-bl-full pointer-events-none" />

          {/* Header */}
          <div className="space-y-2 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] font-sans block">
              EXCLUSIVE BENEFITS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              The Akole <span className="bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] bg-clip-text text-transparent">Loyalty Club</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
              Become a VIP member to earn points, claim complimentary artisanal items, and receive private dining invites.
            </p>
          </div>

          {/* 4 Feature Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 relative z-10">
            {clubFeatures.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.03 }}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-[#D6AE4D]/45 transition-all duration-300 shadow-xl"
              >
                <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#1D4732] to-[#123524] text-[#D6AE4D] flex items-center justify-center shadow-lg border border-[#D6AE4D]/40">
                  <item.icon className="w-6 h-6 text-[#D6AE4D]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white mb-1 uppercase tracking-wide">{item.title}</h4>
                  <p className="text-[11px] text-white/75 font-light leading-snug">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join Button */}
          <div className="pt-4 relative z-10">
            <Button
              to="/profile"
              variant="primary"
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] text-[#123524] hover:brightness-110 shadow-xl shadow-[#D6AE4D]/20 text-xs tracking-widest uppercase font-extrabold transition-all"
            >
              <Sparkles className="w-4.5 h-4.5 mr-1.5 inline-block" /> JOIN THE CLUB NOW
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default LoyaltyClub;
