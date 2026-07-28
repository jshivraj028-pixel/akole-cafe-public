import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiCheckCircle, FiInfo, FiAlertCircle } from 'react-icons/fi';

const ToastContainer = () => {
  const { toasts, removeToast } = useTheme();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-4 h-4 text-[#D6AE4D]" />;
      case 'info':
        return <FiInfo className="w-4 h-4 text-[#D6AE4D]" />;
      case 'error':
        return <FiAlertCircle className="w-4 h-4 text-rose-400" />;
      default:
        return <FiCheckCircle className="w-4 h-4 text-[#D6AE4D]" />;
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-sm w-full sm:w-auto pointer-events-none px-2 sm:px-0">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={{ left: 0.1, right: 0.8 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 70 || info.velocity.x > 250) {
                removeToast(toast.id);
              }
            }}
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 150, scale: 0.9 }}
            whileDrag={{ scale: 1.03, opacity: 0.85 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 py-3.5 px-4 rounded-2xl bg-[#0F261A]/95 text-white border border-[#D6AE4D]/50 shadow-2xl backdrop-blur-xl cursor-grab active:cursor-grabbing select-none hover:border-[#D6AE4D] transition-all relative overflow-hidden group"
          >
            {/* Left subtle gold bar accent */}
            <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] shrink-0" />

            {/* Icon container */}
            <div className="w-8 h-8 rounded-xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/35 flex items-center justify-center shrink-0">
              {getIcon(toast.type)}
            </div>

            {/* Message Text */}
            <p className="text-xs sm:text-sm font-semibold text-white leading-snug flex-1 pr-1">
              {toast.message}
            </p>

            {/* Slide Right Indicator Hint */}
            <span className="text-[10px] text-[#D6AE4D]/70 font-semibold uppercase tracking-wider shrink-0 opacity-80 group-hover:opacity-100 flex items-center gap-0.5">
              Swipe ➔
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
