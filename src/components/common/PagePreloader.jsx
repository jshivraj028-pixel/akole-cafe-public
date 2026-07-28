import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import goldHeartLogo from '../../assets/gold-heart-logo.png';

const PagePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 1.5 seconds on page refresh / initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0C1A12] text-white overflow-hidden select-none"
        >
          {/* Background Radial Gold Glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(214, 174, 77, 0.22) 0%, rgba(18, 34, 25, 0.75) 45%, rgba(12, 26, 18, 1) 85%)'
            }}
          />

          {/* Floating Gold Sparkle Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(18)].map((_, i) => {
              const size = Math.random() * 4 + 2;
              const left = Math.random() * 100;
              const top = Math.random() * 100;
              const delay = Math.random() * 2;
              const duration = Math.random() * 3 + 2;

              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: [0, 0.85, 0], 
                    y: [-20, -80],
                    scale: [0.5, 1.25, 0.2]
                  }}
                  transition={{ 
                    duration, 
                    repeat: Infinity, 
                    delay, 
                    ease: 'easeInOut' 
                  }}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    backgroundColor: '#D6AE4D',
                    boxShadow: '0 0 12px #D6AE4D, 0 0 24px rgba(214, 174, 77, 0.9)'
                  }}
                />
              );
            })}
          </div>

          {/* Central Logo & Concentric Spinning Circles Container */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
            
            {/* Concentric Spinning Rings & Exact Gold Heart Emblem Container */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              
              {/* Outer Dashed Spinning Gold Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#D6AE4D]/60 shadow-[0_0_30px_rgba(214,174,77,0.3)]"
              />

              {/* Inner Glowing Spinning Arc Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 sm:inset-3 rounded-full border-2 border-t-[#D6AE4D] border-r-transparent border-b-[#FFF3C4] border-l-transparent shadow-[0_0_20px_rgba(214,174,77,0.5)]"
              />

              {/* Counter-Clockwise Secondary Accent Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-5 sm:inset-6 rounded-full border border-t-transparent border-r-[#D6AE4D]/70 border-b-transparent border-l-[#F3E5AB]/70"
              />

              {/* Central Pulsing Glass Circle Badge with EXACT Gold Heart Image (No Fill Box) */}
              <motion.div
                animate={{ scale: [0.95, 1.06, 0.95] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-[#183B2A]/40 to-[#0E1A13]/40 border-2 border-[#D6AE4D]/60 shadow-[0_0_45px_rgba(214,174,77,0.5)] backdrop-blur-md flex items-center justify-center p-3 overflow-hidden"
              >
                <img
                  src={goldHeartLogo}
                  alt="Akole Café Gold Heart Emblem"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(214,174,77,0.95)] mix-blend-screen transform scale-[1.1]"
                />
              </motion.div>

            </div>

            {/* Brand Title & Typography */}
            <div className="text-center space-y-2 pt-1">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 text-[#D6AE4D] text-[10px] uppercase font-black tracking-[3px] shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D6AE4D]" />
                <span>AKOLE CAFÉ & RESTO</span>
              </motion.div>

              {/* Brand Typography matching Website Navbar */}
              <div className="flex items-baseline justify-center font-serif text-3xl sm:text-4xl tracking-[-0.5px]">
                <span className="font-extrabold text-white drop-shadow-md">
                  Akole
                </span>
                <span className="italic font-medium text-[#D6AE4D] ml-1.5 drop-shadow-md">
                  Café
                </span>
              </div>

              <p className="text-[11px] font-mono font-bold text-[#D6AE4D] uppercase tracking-[2.5px]">
                Artisanal Brews & Culinary Art
              </p>
            </div>

            {/* Glowing Golden Progress Bar */}
            <div className="w-48 sm:w-60 h-1.5 rounded-full bg-[#183B2A] border border-[#D6AE4D]/40 overflow-hidden relative shadow-inner">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="h-full w-full rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#FFF3C4] to-[#B89035] shadow-[0_0_15px_#D6AE4D]"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PagePreloader;
