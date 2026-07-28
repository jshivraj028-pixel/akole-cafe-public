import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCoffee, FiGift, FiAward, FiSmile, FiCheckCircle } from 'react-icons/fi';
import { Sparkles, X, ChevronRight, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import Button from '../common/Button';

const clubFeatures = [
  {
    id: 'points',
    icon: FiCoffee,
    title: "Earn Points",
    subtitle: "10 Points for every ₹100 spent",
    desc: "Earn points on every cup & purchase at Akole Café",
    details: "Every time you order a handcrafted latte, pour-over coffee, or gourmet bite at Akole Café, earn 10 points for every ₹100 spent. Accumulate points to unlock free coffee, desserts, and exclusive merchandise.",
    highlights: [
      "10 Points per ₹100 spent",
      "Points never expire for active members",
      "Redeem directly via app or at the cafe counter"
    ]
  },
  {
    id: 'treats',
    icon: FiGift,
    title: "Free Treats",
    subtitle: "Complimentary birthday treats & rewards",
    desc: "Get free drinks and birthday treats every year",
    details: "Celebrate your birthday month in style! Akole Café VIP members receive a free signature beverage and pastry on their birthday. Plus, claim surprise complimentary treats when reaching order milestones.",
    highlights: [
      "Free Signature Drink & Pastry on Birthday",
      "Surprise reward vouchers in app",
      "Complimentary beverage size upgrades"
    ]
  },
  {
    id: 'access',
    icon: FiAward,
    title: "Early Access",
    subtitle: "Taste new blends 48 hours before public launch",
    desc: "Early access to new seasonal menus & estate roasts",
    details: "Get priority access to limited edition single-origin coffees, monsoon estate roasts, and seasonal food menus 48 hours before they launch to the general public.",
    highlights: [
      "48-Hour Priority Tasting Preview",
      "Access to rare micro-lot single-origin beans",
      "Special member pricing on new releases"
    ]
  },
  {
    id: 'events',
    icon: FiSmile,
    title: "VIP Events",
    subtitle: "Exclusive barista workshops & cupping sessions",
    desc: "VIP invitations to special coffee cuppings & live events",
    details: "Receive personal invitations to coffee cupping sessions led by our Head Roaster, barista espresso workshops, latte art masterclasses, and acoustic acoustic evenings reserved exclusively for VIP members.",
    highlights: [
      "Free entry to Coffee Cupping Workshops",
      "Priority table reservations on peak weekends",
      "Exclusive Q&A sessions with estate coffee growers"
    ]
  },
];

const LoyaltyClub = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);

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
              Click any card below to explore VIP perks, earn points, and claim complimentary artisanal treats.
            </p>
          </div>

          {/* 4 Interactive Feature Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 relative z-10">
            {clubFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFeature(item)}
                  className="flex flex-col items-center text-center space-y-5 p-7 rounded-[24px] bg-[#162A1D]/60 backdrop-blur-xl border border-[#D6AE4D]/20 hover:border-[#D6AE4D]/70 hover:bg-[#1A3122]/90 transition-all duration-300 shadow-2xl group cursor-pointer relative"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A1D17] to-[#1A110D] text-[#D6AE4D] flex items-center justify-center shadow-lg border border-[#D6AE4D]/45 group-hover:scale-110 group-hover:border-[#D6AE4D] transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#D6AE4D]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-extrabold text-white mb-2 uppercase tracking-wider group-hover:text-[#D6AE4D] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-white/70 font-light leading-relaxed max-w-[180px] mx-auto">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6AE4D] opacity-80 group-hover:opacity-100 flex items-center gap-1 pt-1">
                    Tap for details <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Join Button */}
          <div className="pt-4 relative z-10">
            <Button
              to="/profile"
              variant="gold"
              size="lg"
              className="rounded-2xl px-9 py-4 !bg-gradient-to-r !from-[#F8E29C] !via-[#FFF5D0] !to-[#E6C35C] !text-black hover:brightness-105 shadow-xl shadow-[#D6AE4D]/25 text-xs tracking-widest uppercase font-black transition-all border border-[#FFF8DC]"
            >
              <Sparkles className="w-5 h-5 mr-2 inline-block !text-black stroke-[2.5]" />
              <span className="!text-black font-black tracking-widest">JOIN THE CLUB NOW</span>
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* FEATURE DETAIL POPUP MODAL */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-[#122219] text-[#EAE3D2] border border-[#D6AE4D]/40 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden font-montserrat relative"
            >
              {/* Top Accent Gradient */}
              <div className="h-2 bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035]" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 sm:p-8 space-y-6 text-left">
                {/* Header Icon & Title */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 flex items-center justify-center text-[#D6AE4D] shrink-0">
                    <selectedFeature.icon className="w-7 h-7 text-[#D6AE4D]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6AE4D]">
                      AKOLE CAFÉ VIP PERK
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                      {selectedFeature.title}
                    </h3>
                    <p className="text-xs text-[#D6AE4D] font-medium mt-0.5">
                      {selectedFeature.subtitle}
                    </p>
                  </div>
                </div>

                {/* Main Details Description */}
                <p className="text-xs sm:text-sm leading-relaxed text-white/85 font-light">
                  {selectedFeature.details}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 p-4 rounded-2xl bg-[#0E1A13] border border-[#D6AE4D]/20">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#D6AE4D] block mb-2">
                    Key Membership Benefits:
                  </span>
                  {selectedFeature.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-white/90 font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#D6AE4D]/20 text-[#D6AE4D] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedFeature(null);
                      navigate('/profile');
                    }}
                    className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#0C1A12] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#0C1A12]" />
                    <span>CLAIM PERK / JOIN VIP</span>
                  </button>

                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LoyaltyClub;
