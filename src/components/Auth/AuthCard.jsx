import React from 'react';
import { motion } from 'framer-motion';

const AuthCard = ({ children, title = "Welcome Back", subtitle = "Sign in to continue your Akole Cafe experience." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-white/80 backdrop-blur-3xl border-2 border-white rounded-[36px] sm:rounded-[44px] p-8 sm:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-[#1E2621] relative overflow-hidden"
    >
      {/* Glowing Light Ambient Orbs */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/90 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#D5E4CE]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="text-center mb-8 space-y-2 relative z-10">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E2621] tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm font-montserrat text-[#556B5D] font-medium max-w-xs mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default AuthCard;
