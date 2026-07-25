import React from 'react';
import { FiCoffee } from 'react-icons/fi';
import MenuCard from './MenuCard';

const MenuGrid = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-primary/40 rounded-3xl border border-accent-gold/20 glass-panel flex flex-col items-center">
        <FiCoffee className="w-12 h-12 text-[#D6AE4D] mb-4 stroke-[1.5]" />
        <h3 className="font-serif text-2xl font-bold text-accent-gold mb-2">No Items Found</h3>
        <p className="text-sm text-secondary/70 max-w-md mx-auto font-light">
          We couldn't find any dishes or drinks matching your current filters. Try searching for something else or reset the category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuGrid;
