import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCoffee } from 'react-icons/fi';
import MenuCard from './MenuCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }
};

const MenuGrid = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center py-16 px-6 bg-white/80 dark:bg-[#16231B]/90 backdrop-blur-xl rounded-3xl border border-gray-200/80 dark:border-[#D6AE4D]/30 shadow-xl flex flex-col items-center justify-center my-6 min-h-[250px] overflow-hidden">
        <FiCoffee className="w-12 h-12 text-[#D6AE4D] mb-4 stroke-[1.5] animate-bounce" />
        <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-[#D6AE4D] mb-2">No Delicacies Found</h3>
        <p className="text-xs text-gray-500 dark:text-[#A0B0A5] max-w-md mx-auto font-medium">
          We couldn't find any dishes matching your search query. Try typing another name like Misal, Dosa, Biryani, Vada Pav, or Ice Cream.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-stretch justify-items-center w-full my-6">
      {items.map((item) => (
        <div key={item._id || item.id} className="h-full w-full max-w-sm flex flex-col justify-stretch">
          <MenuCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default MenuGrid;
