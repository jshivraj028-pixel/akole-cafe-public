import React from 'react';
import { FiCoffee } from 'react-icons/fi';
import MenuCard from './MenuCard';
import ResponsiveGrid from '../common/ResponsiveGrid';

const MenuGrid = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center py-12 px-6 bg-white/80 dark:bg-[#16231B]/90 backdrop-blur-xl rounded-3xl border border-gray-200/80 dark:border-[#D6AE4D]/30 shadow-xl flex flex-col items-center justify-center my-6 min-h-[220px] overflow-hidden">
        <FiCoffee className="w-10 h-10 text-[#D6AE4D] mb-3 stroke-[1.5] animate-bounce" />
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#123524] dark:text-[#D6AE4D] mb-2">No Delicacies Found</h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-[#A0B0A5] max-w-md mx-auto font-medium">
          We couldn't find any dishes matching your search query. Try typing another name like Misal, Dosa, Biryani, Vada Pav, or Ice Cream.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveGrid size="sm" className="my-6">
      {items.map((item, idx) => (
        <div key={item._id || item.id} className="w-full max-w-sm mx-auto flex flex-col">
          <MenuCard item={item} index={idx} />
        </div>
      ))}
    </ResponsiveGrid>
  );
};

export default MenuGrid;
