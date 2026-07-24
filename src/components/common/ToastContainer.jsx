import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';

const ToastContainer = () => {
  const { toasts, removeToast } = useTheme();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'info':
        return <FiInfo className="w-5 h-5 text-accent-gold" />;
      case 'error':
        return <FiAlertCircle className="w-5 h-5 text-rose-400" />;
      default:
        return <FiCheckCircle className="w-5 h-5 text-accent-gold" />;
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="pointer-events-auto flex items-center gap-3 p-4 rounded-xl bg-primary-dark/95 border border-accent-gold/40 text-secondary shadow-luxury backdrop-blur-md"
          >
            {getIcon(toast.type)}
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-secondary/60 hover:text-secondary p-1"
            >
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
