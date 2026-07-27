import React from 'react';
import { motion } from 'framer-motion';

const PageBanner = ({
  title = "",
  highlight = "",
  subtitle = "",
  bgImage = "/assets/maharashtrian-photo-banner.svg"
}) => {
  return (
    <div className="relative h-72 sm:h-80 md:h-96 flex items-center justify-center bg-[#0C1A12] overflow-hidden pt-16 border-b border-[#D6AE4D]/30 shadow-2xl">
      {/* Authentic Maharashtrian Heritage Akole Cafe Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-85 transition-all duration-500 hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A12] via-[#0C1A12]/30 to-[#0C1A12]/80" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center space-y-1.5"
      >
        {subtitle && (
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4B055] block">
            {subtitle}
          </span>
        )}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-wide">
          {title}
          {highlight && (
            <span className="italic font-serif font-normal text-[#D4B055] ml-1">{highlight}</span>
          )}
        </h1>
      </motion.div>
    </div>
  );
};

export default PageBanner;
