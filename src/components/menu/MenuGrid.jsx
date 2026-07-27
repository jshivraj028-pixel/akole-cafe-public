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
  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 bg-white dark:bg-[#16231B] rounded-3xl border border-gray-200 dark:border-[#D6AE4D]/30 shadow-xl flex flex-col items-center"
      >
        <FiCoffee className="w-12 h-12 text-[#D6AE4D] mb-4 stroke-[1.5] animate-bounce" />
        <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-[#D6AE4D] mb-2">No Delicacies Found</h3>
        <p className="text-xs text-gray-500 dark:text-[#A0B0A5] max-w-md mx-auto font-medium">
          We couldn't find any dishes matching your search query. Try typing another name like Misal, Dosa, Biryani, Vada Pav, or Ice Cream.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div key={item._id || item.id} variants={itemVariants} layout>
            <MenuCard item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuGrid;


//Hot Cappuccino Coffee Cold Coffee with Vanilla Ice Cream //
