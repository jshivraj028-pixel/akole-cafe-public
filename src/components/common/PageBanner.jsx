import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container';

const PageBanner = ({ title, subtitle, bgImage = 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920&q=80' }) => {
  return (
    <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center bg-primary overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/40" />

      {/* Ambient Glow */}
      <div className="botanical-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {subtitle && (
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-accent-gold"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-accent-gold">
                {subtitle}
              </span>
              <span className="h-[1px] w-8 bg-accent-gold"></span>
            </div>
          )}

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary tracking-wide">
            {title}
          </h1>

          <div className="w-16 h-1 bg-gold-gradient mx-auto mt-6 rounded-full" />
        </motion.div>
      </Container>
    </div>
  );
};

export default PageBanner;
