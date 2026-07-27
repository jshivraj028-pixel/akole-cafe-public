import React from 'react';
import { FiSearch, FiSliders, FiChevronDown } from 'react-icons/fi';
import { menuCategories } from '../../data/menu';

const MenuFilter = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  vegFilter,
  setVegFilter
}) => {
  return (
    <div className="space-y-4 mb-8 w-full">
      {/* Top Row: Search + Veg/Non-Veg Filter + Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 w-full">
        
        {/* 1. Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type="text"
            placeholder="Search Misal, Vada Pav, Dosa, Biryani, Coffee, Ice Cream..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#16231B] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-full py-2.5 pl-10 pr-4 text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-gray-400 dark:placeholder-[#7A8E81] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all"
          />
        </div>

        {/* 2. Veg / Non-Veg Filter Toggle */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#16231B] p-1 rounded-full border border-gray-200 dark:border-[#D6AE4D]/30 shadow-sm shrink-0">
          <button
            onClick={() => setVegFilter && setVegFilter('all')}
            className={`py-1.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              vegFilter === 'all' || !vegFilter
                ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] shadow-sm'
                : 'text-gray-600 dark:text-[#A0B0A5] hover:text-[#123524]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setVegFilter && setVegFilter('veg')}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              vegFilter === 'veg'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white" />
            Pure Veg
          </button>
          <button
            onClick={() => setVegFilter && setVegFilter('nonveg')}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              vegFilter === 'nonveg'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-600 border border-white" />
            Non-Veg
          </button>
        </div>

        {/* 3. Sort Dropdown */}
        <div className="relative shrink-0 min-w-[170px]">
          <FiSliders className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#D6AE4D] pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-white dark:bg-[#16231B] border border-gray-200 dark:border-[#D6AE4D]/30 rounded-full py-2.5 pl-9 pr-8 text-xs font-semibold text-[#123524] dark:text-[#EAE3D2] appearance-none shadow-sm focus:outline-none cursor-pointer"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="rating">Sort by: Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

      </div>

      {/* Bottom Row: Pure Smooth Scrollable Category Pills Bar (No overlay buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto py-2.5 px-1 scroll-smooth w-full no-scrollbar">
        {menuCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200 shrink-0 whitespace-nowrap shadow-sm ${
                isActive
                  ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] border border-[#D6AE4D]/60 scale-105'
                  : 'bg-white dark:bg-[#16231B] text-[#123524] dark:text-[#EAE3D2] hover:bg-white/80 dark:hover:bg-[#1D2C22] border border-gray-200 dark:border-[#D6AE4D]/20'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuFilter;
