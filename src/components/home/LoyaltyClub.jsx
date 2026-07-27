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
          className="rounded-[36px] bg-gradient-to-br from-[#0F291B] via-[#123524] to-[#0A1A12] border border-[#D6AE4D]/35 p-8 sm:p-12 text-center shadow-2xl space-y-10 relative overflow-hidden"
        >
          {/* Background overlay details */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D6AE4D]/10 to-transparent rounded-bl-full pointer-events-none" />
          
          {/* Glowing Ambient Background Spotlights */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D6AE4D]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#D6AE4D]/5 rounded-full blur-[120px] pointer-events-none" />

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
                whileHover={{ y: -8, scale: 1.02 }}
                className="flex flex-col items-center text-center space-y-5 p-7 rounded-[24px] bg-[#162A1D]/60 backdrop-blur-xl border border-[#D6AE4D]/15 hover:border-[#D6AE4D]/50 hover:bg-[#1A3122]/70 transition-all duration-300 shadow-2xl group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A1D17] to-[#1A110D] text-[#D6AE4D] flex items-center justify-center shadow-lg border border-[#D6AE4D]/45 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-[#D6AE4D]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-extrabold text-white mb-2 uppercase tracking-wider">{item.title}</h4>
                  <p className="text-[11px] text-white/70 font-light leading-relaxed max-w-[180px] mx-auto">
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
              className="rounded-xl px-8 bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#0C1A12] hover:brightness-110 shadow-xl shadow-[#D6AE4D]/20 text-xs tracking-widest uppercase font-black transition-all border border-[#FFF5D6]"
            >
              <Sparkles className="w-4.5 h-4.5 mr-1.5 inline-block text-[#0C1A12] stroke-[2.5]" /> JOIN THE CLUB NOW
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default LoyaltyClub;
