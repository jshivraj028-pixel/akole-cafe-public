import React from 'react';
import { motion } from 'framer-motion';

const PageBanner = ({
  title = "",
  highlight = "",
  subtitle = "AKOLE CAFÉ SPECIALTIES",
  bgImage = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80"
}) => {
  return (
    <div className="relative h-64 sm:h-72 md:h-80 flex items-center justify-center bg-gradient-to-r from-[#0C1A12] via-[#162A1E] to-[#0C1A12] overflow-hidden pt-20 sm:pt-24 border-b border-[#D6AE4D]/30 shadow-2xl">
      {/* Background Image Layer with Gradient Overlay */}
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 transition-all duration-500 hover:scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A12] via-[#0C1A12]/40 to-[#0C1A12]/75" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center space-y-2 px-4"
      >
        {subtitle && (
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D6AE4D] block">
            {subtitle}
          </span>
        )}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide">
          {title}
          {highlight && (
            <span className="italic font-serif font-normal text-[#D6AE4D] ml-2">{highlight}</span>
          )}
        </h1>
      </motion.div>
    </div>
  );
};

export default PageBanner;
