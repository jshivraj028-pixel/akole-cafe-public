import React from 'react';
import { motion } from 'framer-motion';

const PageBanner = ({
  title = "Our",
  highlight = "Story",
  subtitle = "ABOUT US",
  bgImage = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
}) => {
  return (
    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center bg-[#1B110B] overflow-hidden pt-16">
      {/* Dark Cozy Cafe Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-luminosity"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B110B] via-transparent to-[#1B110B]/70" />

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
          {title} <span className="italic font-serif font-normal text-[#D4B055] ml-1">{highlight}</span>
        </h1>
      </motion.div>
    </div>
  );
};

export default PageBanner;
