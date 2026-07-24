import React from 'react';
import { FiSearch, FiSliders, FiChevronDown } from 'react-icons/fi';

const categoriesList = [
  { id: 'all', name: 'ALL' },
  { id: 'hot-coffee', name: 'HOT COFFEE' },
  { id: 'cold-coffee', name: 'COLD COFFEE' },
  { id: 'espresso', name: 'ESPRESSO' },
  { id: 'tea', name: 'TEA' },
  { id: 'mocktails', name: 'MOCKTAILS' },
  { id: 'sandwiches', name: 'SANDWICHES' },
  { id: 'burgers', name: 'BURGERS' },
  { id: 'pizza', name: 'PIZZA' },
  { id: 'snacks', name: 'SNACKS' },
  { id: 'desserts', name: 'DESSERTS' },
];

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
      {/* Search Bar + Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Search Input (Takes 7 Cols) */}
        <div className="md:col-span-7 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search our menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-xs text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:border-[#C8A96A]"
          />
        </div>

        {/* Dropdown 1: All Category Filter (Takes 2.5 Cols) */}
        <div className="md:col-span-2.5 relative">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-medium text-gray-700 appearance-none shadow-sm focus:outline-none cursor-pointer pr-8"
          >
            <option value="all">All</option>
            <option value="hot-coffee">Hot Coffee</option>
            <option value="cold-coffee">Cold Coffee</option>
            <option value="espresso">Espresso</option>
            <option value="tea">Tea</option>
            <option value="mocktails">Mocktails</option>
            <option value="sandwiches">Sandwiches</option>
            <option value="burgers">Burgers</option>
            <option value="pizza">Pizza</option>
            <option value="snacks">Snacks</option>
            <option value="desserts">Desserts</option>
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Dropdown 2: Sort By Name / Price (Takes 2.5 Cols) */}
        <div className="md:col-span-2.5 relative flex items-center">
          <FiSliders className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-9 pr-8 text-xs font-medium text-gray-700 appearance-none shadow-sm focus:outline-none cursor-pointer"
          >
            <option value="featured">Name</option>
            <option value="rating">Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

      </div>

      {/* Categories Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoriesList.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-[#3C2A1E] text-white shadow-sm'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 border border-gray-200/60'
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
