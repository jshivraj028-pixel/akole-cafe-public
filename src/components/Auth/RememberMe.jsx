import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const RememberMe = ({ rememberMe, setRememberMe }) => {
  return (
    <div className="flex items-center justify-between text-xs font-montserrat pt-1 pb-1">
      <label
        onClick={() => setRememberMe(!rememberMe)}
        className="flex items-center gap-2.5 cursor-pointer select-none text-[#1E2621] hover:opacity-80 transition-opacity group"
      >
        <div
          className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center shrink-0 transform group-hover:scale-105 ${
            rememberMe
              ? 'bg-[#18201B] border-[#18201B] shadow-sm'
              : 'bg-white border-gray-300 group-hover:border-[#1E2621]'
          }`}
        >
          {rememberMe && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 600, damping: 22 }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
            </motion.div>
          )}
        </div>
        <span className="font-bold text-xs text-[#1E2621]">Remember Me</span>
      </label>

      <Link
        to="/forgot-password"
        className="font-bold text-[#1E2621] hover:underline text-[11px] uppercase tracking-wider"
      >
        FORGOT PASSWORD?
      </Link>
    </div>
  );
};

export default RememberMe;
