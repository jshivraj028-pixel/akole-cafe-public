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
          className={`w-4.5 h-4.5 rounded-md border transition-all flex items-center justify-center ${
            rememberMe
              ? 'bg-[#123524] border-[#D6AE4D] text-[#D6AE4D] shadow-sm'
              : 'bg-white/80 dark:bg-[#16231B] border-[#D6AE4D]/40 group-hover:border-[#D6AE4D]'
          }`}
        >
          {rememberMe && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3] text-[#D6AE4D]" />
            </motion.div>
          )}
        </div>
        <span className="font-medium text-xs">Remember Me</span>
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
