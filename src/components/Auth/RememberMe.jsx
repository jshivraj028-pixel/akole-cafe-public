import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const RememberMe = ({ rememberMe, setRememberMe }) => {
  return (
    <div className="flex items-center justify-between text-xs font-montserrat pt-1">
      <label
        onClick={() => setRememberMe(!rememberMe)}
        className="flex items-center gap-2.5 cursor-pointer select-none text-[#6B7C70] dark:text-[#A0B0A5] hover:text-[#123524] dark:hover:text-white transition-colors group"
      >
        <div
          className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center shrink-0 transform group-hover:scale-105 ${
            rememberMe
              ? 'bg-gradient-to-br from-[#D6AE4D] to-[#B89035] border-[#D6AE4D] shadow-md shadow-[#D6AE4D]/25 ring-2 ring-[#D6AE4D]/20'
              : 'bg-white/90 dark:bg-[#16231B] border-[#D6AE4D]/50 group-hover:border-[#D6AE4D]'
          }`}
        >
          {rememberMe && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 600, damping: 22 }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3.5] text-[#123524]" />
            </motion.div>
          )}
        </div>
        <span className="font-medium text-xs text-[#123524] dark:text-[#EAE3D2]">Remember Me</span>
      </label>

      <Link
        to="/forgot-password"
        className="font-medium text-[#D6AE4D] hover:text-[#c59d3c] transition-colors hover:underline text-[11px] uppercase tracking-wider font-bold"
      >
        FORGOT PASSWORD?
      </Link>
    </div>
  );
};

export default RememberMe;
