import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          style={{ borderRadius: '50%', width: '44px', height: '44px', minWidth: '44px', minHeight: '44px' }}
          className="fixed bottom-6 right-6 z-40 bg-[#122219]/80 hover:bg-[#122219] dark:bg-[#0E1A13]/85 dark:hover:bg-[#0E1A13] backdrop-blur-2xl border-2 border-[#D6AE4D] text-[#D6AE4D] shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group cursor-pointer p-0"
          aria-label="Scroll to top"
        >
          <FiChevronUp className="w-5 h-5 text-[#D6AE4D] stroke-[2.5] transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
