import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import Container from '../common/Container';
import botanicalPattern from '../../assets/botanical-banner.png';
import heroCoffeeImg from '../../assets/hero-coffee.png';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 bg-[#F5EFE3] dark:bg-[#121A15] text-[#1F3A2B] dark:text-[#EAE3D2] overflow-hidden min-h-[90vh] flex flex-col justify-center transition-colors duration-300">
      
      {/* Top Right Vintage Botanical Branch Overlay (Seamless Soft Mask Fade) */}
      <div 
        className="absolute top-0 right-0 w-full md:w-1/2 h-80 sm:h-96 md:h-[500px] opacity-40 dark:opacity-25 pointer-events-none z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%), linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%)'
        }}
      >
        <img
          src={botanicalPattern}
          alt="Vintage Botanical Coffee Cherry Branch"
          className="w-full h-full object-cover object-top-right mix-blend-multiply dark:mix-blend-luminosity"
        />
      </div>

      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (Clean, perfectly aligned without clipping) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 xl:col-span-7 space-y-6 text-left"
          >
            {/* Small Gold Uppercase Subtitle */}
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96A] font-sans">
                WELCOME TO AKOLE CAFÉ
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#1F3A2B] dark:text-[#EAE3D2] leading-[1.08] tracking-tight">
              Brewing <br />
              Connections, <br />
              Serving <br />
              <span className="italic font-serif font-light text-[#1F3A2B] dark:text-[#D4B055]">Memories</span>
            </h1>

            {/* Subtext Paragraph */}
            <p className="text-sm sm:text-base text-[#6B7C70] dark:text-[#A0B0A5] font-light max-w-md leading-relaxed pt-1">
              Experience the art of specialty coffee in an atmosphere crafted for moments that matter.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#1F3A2B] dark:border-[#C8A96A] text-[#1F3A2B] dark:text-[#D4B055] hover:bg-[#1F3A2B] dark:hover:bg-[#C8A96A] hover:text-white dark:hover:text-[#121A15] transition-all font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                <span>EXPLORE MENU</span>
                <span className="text-sm">→</span>
              </Link>

              <Link
                to="/reserve"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#B5C2B9] dark:border-[#2D4034] text-[#1F3A2B] dark:text-[#EAE3D2] hover:border-[#1F3A2B] dark:hover:border-[#C8A96A] transition-all font-bold text-xs uppercase tracking-wider"
              >
                <FiCalendar className="w-4 h-4 text-[#D6AE4D]" />
                <span>RESERVE A TABLE</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Hero Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md sm:max-w-lg h-[460px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 dark:border-[#C8A96A]/30">
              <img
                src={heroCoffeeImg}
                alt="Artisanal Latte Art Coffee Experience"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;
