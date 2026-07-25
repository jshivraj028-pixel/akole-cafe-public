import React from 'react';
import { motion } from 'framer-motion';

const AuthCard = ({ children, title = "Welcome Back", subtitle = "Sign in to continue your Akole Cafe experience." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-white/95 dark:bg-[#16241B]/95 backdrop-blur-2xl border border-[#D6AE4D]/35 dark:border-[#D6AE4D]/40 rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-[#123524]/10 text-[#123524] dark:text-[#EAE3D2] relative overflow-hidden"
    >
      {/* Subtle Golden Ambient Top Light Glow */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#D6AE4D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#123524]/10 dark:bg-[#D6AE4D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="text-center mb-8 space-y-2 relative z-10">
        <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#123524] dark:text-white tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm font-montserrat text-[#6B7C70] dark:text-[#A0B0A5] font-light max-w-xs mx-auto leading-relaxed">
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
