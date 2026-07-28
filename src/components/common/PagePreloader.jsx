import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';

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
              background: 'radial-gradient(circle at center, rgba(214, 174, 77, 0.18) 0%, rgba(18, 34, 25, 0.6) 40%, rgba(12, 26, 18, 1) 80%)'
            }}
          />

          {/* Floating Gold Sparkle Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(16)].map((_, i) => {
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
                    opacity: [0, 0.8, 0], 
                    y: [-20, -80],
                    scale: [0.5, 1.2, 0.2]
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
                    boxShadow: '0 0 10px #D6AE4D, 0 0 20px rgba(214, 174, 77, 0.8)'
                  }}
                />
              );
            })}
          </div>

          {/* Central Logo & Concentric Spinning Circles Container */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
            
            {/* Concentric Spinning Rings & Heart Emblem Container */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              
              {/* Outer Dashed Spinning Gold Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#D6AE4D]/50 shadow-[0_0_25px_rgba(214,174,77,0.25)]"
              />

              {/* Inner Glowing Spinning Arc Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-2 border-t-[#D6AE4D] border-r-transparent border-b-[#FFF3C4] border-l-transparent shadow-[0_0_20px_rgba(214,174,77,0.4)]"
              />

              {/* Counter-Clockwise Secondary Accent Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-5 rounded-full border border-t-transparent border-r-[#D6AE4D]/60 border-b-transparent border-l-[#F3E5AB]/60"
              />

              {/* Central Pulsing Glass Circle Badge with Heart Emblem & Logo */}
              <motion.div
                animate={{ scale: [0.96, 1.06, 0.96] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-[#183B2A] to-[#0E1A13] border-2 border-[#D6AE4D] shadow-[0_0_30px_rgba(214,174,77,0.5)] backdrop-blur-2xl flex items-center justify-center p-3"
              >
                {/* Heart Emblem with Glowing Pulsing Aura */}
                <div className="relative flex items-center justify-center">
                  <FiHeart className="w-10 h-10 sm:w-12 sm:h-12 text-[#D6AE4D] fill-[#D6AE4D]/30 stroke-[1.8] drop-shadow-[0_0_12px_rgba(214,174,77,0.8)]" />
                  <Sparkles className="w-4 h-4 text-[#FFF3C4] absolute -top-1 -right-1 animate-ping opacity-75" />
                </div>
              </motion.div>

            </div>

            {/* Brand Title & Typography */}
            <div className="text-center space-y-1.5 pt-2">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#D6AE4D]/15 border border-[#D6AE4D]/30 text-[#D6AE4D] text-[10px] uppercase font-black tracking-[3px]"
              >
                <Sparkles className="w-3 h-3 text-[#D6AE4D]" />
                <span>AKOLE CAFÉ & RESTO</span>
              </motion.div>

              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
                Akole Café
              </h1>

              <p className="text-[11px] font-mono font-bold text-[#D6AE4D] uppercase tracking-[2px]">
                Artisanal Brews & Culinary Art
              </p>
            </div>

            {/* Glowing Golden Progress Bar */}
            <div className="w-48 sm:w-56 h-1.5 rounded-full bg-[#183B2A] border border-[#D6AE4D]/30 overflow-hidden relative shadow-inner">
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
