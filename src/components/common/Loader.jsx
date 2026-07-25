import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee } from 'react-icons/fi';

const Loader = ({ fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="w-20 h-20 border-2 border-dashed border-accent-gold rounded-full flex items-center justify-center mb-4 relative"
      >
        <FiCoffee className="w-8 h-8 text-[#D6AE4D] stroke-[1.5]" />
      </motion.div>
      <h3 className="font-serif text-xl font-semibold text-accent-gold tracking-widest uppercase">
        Akole Cafe
      </h3>
      <p className="text-xs text-secondary/60 tracking-wider mt-1">Brewing perfection...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-primary flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
