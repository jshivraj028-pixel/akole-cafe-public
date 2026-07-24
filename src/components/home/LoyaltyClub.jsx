import React from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import Button from '../common/Button';
import { FiCoffee, FiGift, FiAward, FiSmile } from 'react-icons/fi';

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
    <section className="py-16 sm:py-20 bg-[#F5F2EA] relative overflow-hidden">
      <Container>
        {/* Soft Warm Gold/Beige Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-[#E9E2D5] border border-[#C8A96A]/30 p-8 sm:p-12 text-center shadow-md space-y-10"
        >
          {/* Header */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] font-sans block">
              EXCLUSIVE BENEFITS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1B3828] italic">
              The Akole Loyalty Club
            </h2>
          </div>

          {/* 4 Feature Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {clubFeatures.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-3 p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#1B3828] text-[#C8A96A] flex items-center justify-center shadow-sm">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-xs text-[#4A5D50] font-light leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Join Button */}
          <div className="pt-2">
            <Button
              to="/profile"
              variant="primary"
              size="lg"
              className="rounded-full px-8 bg-[#1B3828] hover:bg-[#12281c] text-white shadow-md text-xs tracking-widest uppercase font-semibold"
            >
              Join The Club Now
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default LoyaltyClub;
