import React from 'react';
import { menuCategories } from '../../data/menu';
import { FiSearch, FiSliders } from 'react-icons/fi';

const MenuFilter = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="space-y-6 mb-10">
      {/* Top Bar: Search + Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-accent-gold/20 shadow-luxury">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-gold" />
          <input
            type="text"
            placeholder="Search menu (e.g. Gold Latte, Pizza, Tiramisu)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-full py-2.5 pl-11 pr-4 text-xs sm:text-sm text-secondary placeholder-secondary/50 focus:outline-none focus:border-accent-gold"
          />
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <FiSliders className="text-accent-gold w-4 h-4" />
          <span className="text-xs uppercase tracking-wider text-secondary/70 shrink-0 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-primary-dark/90 text-accent-gold border border-accent-gold/30 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none focus:border-accent-gold cursor-pointer"
          >
            <option value="featured">Featured / Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Categories Horizontal Scroll / Grid */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none">
        {menuCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0 border ${
                isActive
                  ? 'bg-gold-gradient text-primary border-accent-gold shadow-gold scale-105'
                  : 'bg-primary/60 text-secondary/80 border-accent-gold/20 hover:border-accent-gold hover:text-accent-gold'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuFilter;
