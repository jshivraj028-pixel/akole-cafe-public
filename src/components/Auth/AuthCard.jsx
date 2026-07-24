import React from 'react';
import { motion } from 'framer-motion';

const AuthCard = ({ children, title = "Welcome Back", subtitle = "Sign in to continue your Akole Cafe experience." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-white/90 dark:bg-[#1D2C22]/90 backdrop-blur-xl border border-[#E5DDD0] dark:border-[#C8A96A]/30 rounded-3xl p-8 sm:p-10 shadow-luxury text-[#1F3A2B] dark:text-[#EAE3D2]"
    >
      <div className="text-center mb-8 space-y-1.5">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#123524] dark:text-[#EAE3D2] tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm font-montserrat text-[#6B7C70] dark:text-[#B2C4B7] font-light">
          {subtitle}
        </p>
      </div>

      {children}
    </motion.div>
  );
};

export default AuthCard;
