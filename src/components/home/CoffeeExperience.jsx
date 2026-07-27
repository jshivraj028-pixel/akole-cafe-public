import React from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import botanicalPattern from '../../assets/botanical-banner.png';
import logoEmblem from '../../assets/logo-emblem.png';

const CoffeeExperience = () => {
  return (
    <div className="w-full bg-[#351E13]">
      {/* 1. Ultra-HD Vintage Botanical Coffee Cherry Banner Strip (Proper Height & Seamless Framing) */}
      <div className="w-full h-52 sm:h-64 md:h-72 lg:h-80 relative overflow-hidden bg-[#F5EFE3] border-t border-[#E5DDD0]">
        <div
          className="w-full h-full bg-repeat-x bg-cover bg-center transition-all duration-300"
          style={{ backgroundImage: `url(${botanicalPattern})` }}
        />
        {/* Subtle Bottom Blend */}
        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#351E13]/20 to-transparent pointer-events-none" />
      </div>

      {/* 2. Dark Espresso Brown Section (Matching Reference Crop) */}
      <section className="py-16 sm:py-24 bg-[#351E13] text-white text-center relative overflow-hidden">
        <Container className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4 flex flex-col items-center"
          >
            {/* Akole Cafe Logo Emblem */}
            <div className="w-12 h-12 mb-1 flex items-center justify-center">
              <img src={logoEmblem} alt="Akole Cafe Emblem Logo" className="w-full h-full object-contain drop-shadow-md" />
            </div>

            {/* Main Title: Brewing Connections, Serving Memories. */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight">
              Brewing Connections, Serving Memories.
            </h2>

            {/* Subtext: A premium café experience crafted for those who appreciate the art of coffee. */}
            <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#D4B055] font-light max-w-2xl leading-relaxed pt-1">
              A premium café experience crafted for those who appreciate the art of coffee.
            </p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default CoffeeExperience;
