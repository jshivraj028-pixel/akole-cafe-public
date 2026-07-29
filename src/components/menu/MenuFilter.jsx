import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiSliders, FiChevronDown, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { menuCategories } from '../../data/menu';

// Custom Pastel Glossy Glass Gradient for each category filter pill
const categoryGradients = {
  all: 'from-[#E2F0D9]/90 via-[#F3F9EF]/95 to-white/95',
  'hot-coffee': 'from-[#FEF3C7]/90 via-[#FFFBEB]/95 to-white/95',
  'cold-coffee': 'from-[#FEF3C7]/90 via-[#FFFBEB]/95 to-white/95',
  teas: 'from-[#E0F2FE]/90 via-[#F0F9FF]/95 to-white/95',
  'misal-special': 'from-[#FFEDD5]/90 via-[#FFF7ED]/95 to-white/95',
  'vada-pav': 'from-[#FFEDD5]/90 via-[#FFF7ED]/95 to-white/95',
  breakfast: 'from-[#E2F0D9]/90 via-[#F3F9EF]/95 to-white/95',
  'bakery-desserts': 'from-[#EDE9FE]/90 via-[#F5F3FF]/95 to-white/95',
  'ice-cream': 'from-[#FFE4E6]/90 via-[#FFF1F2]/95 to-white/95',
  'fast-food': 'from-[#FFE4E6]/90 via-[#FFF1F2]/95 to-white/95',
  chinese: 'from-[#E0E7FF]/90 via-[#EEF2FF]/95 to-white/95',
  beverages: 'from-[#CCFBF1]/90 via-[#F0FDFA]/95 to-white/95',
  default: 'from-white/90 via-white/95 to-white/95'
};

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
  const scrollContainerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2.2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 mb-8 w-full" style={{ color: '#1E2621' }}>
      {/* Top Row: Search + Veg/Non-Veg Filter + Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 w-full">
        
        {/* 1. Glass Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E2621] stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search delicacies, coffee, misal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/90 backdrop-blur-xl border-2 border-white rounded-full py-3.5 pl-11 pr-10 text-xs font-bold text-[#1E2621] placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-[#1E2621]/15 transition-all truncate"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1 cursor-pointer"
              title="Clear search"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. Veg / Non-Veg Toggle Pills */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xl p-1.5 rounded-full border-2 border-white shadow-sm shrink-0">
          <button
            onClick={() => setVegFilter && setVegFilter('all')}
            className={`py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              vegFilter === 'all' || !vegFilter
                ? 'bg-[#18201B] text-white shadow-sm'
                : 'text-gray-600 hover:text-[#1E2621]'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setVegFilter && setVegFilter('veg')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              vegFilter === 'veg'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white shadow-xs" />
            Pure Veg
          </button>

          <button
            onClick={() => setVegFilter && setVegFilter('nonveg')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              vegFilter === 'nonveg'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-white shadow-xs" />
            Non-Veg
          </button>
        </div>

        {/* 3. Glass Sort Dropdown */}
        <div className="relative shrink-0 min-w-[180px]">
          <FiSliders className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E2621] pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-white/90 backdrop-blur-xl border-2 border-white rounded-full py-3.5 pl-11 pr-8 text-xs font-bold text-[#1E2621] appearance-none shadow-sm focus:outline-none cursor-pointer hover:bg-white transition-all"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="rating">Sort by: Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

      </div>

      {/* Bottom Row: Unique Pastel Glossy Category Pills */}
      <div className="relative flex items-center w-full">
        {/* Scroll Left Button */}
        <button
          type="button"
          onClick={() => handleScroll('left')}
          style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', borderRadius: '50%' }}
          className="hidden sm:flex bg-white border border-gray-200 shadow-md text-[#1E2621] hover:scale-105 active:scale-95 transition-all items-center justify-center shrink-0 cursor-pointer z-10 mr-2 overflow-hidden"
          aria-label="Scroll category left"
        >
          <FiChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Category Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className="flex items-center gap-2 overflow-x-auto py-2 px-1 scroll-smooth w-full no-scrollbar select-none cursor-grab active:cursor-grabbing"
        >
          {menuCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const gradient = categoryGradients[cat.id] || categoryGradients.default;

            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-2 sm:px-4 sm:py-2 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-200 shrink-0 whitespace-nowrap backdrop-blur-xl cursor-pointer border ${
                  isActive
                    ? 'bg-[#1E2621] text-white border-[#1E2621] shadow-sm'
                    : `bg-white/90 text-[#2C3530] border-gray-200/90 shadow-2xs hover:bg-white hover:border-gray-300`
                }`}
              >
                <div className="flex items-center gap-1.5 relative z-10">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                  )}
                  <span>{cat.name}</span>
                </div>

                {/* Animated Glass Highlight Glow for Active Selection */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPillGlow"
                    className="absolute inset-0 rounded-full bg-white/10 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', borderRadius: '50%' }}
          className="hidden sm:flex bg-white border border-gray-200 shadow-md text-[#1E2621] hover:scale-105 active:scale-95 transition-all items-center justify-center shrink-0 cursor-pointer z-10 ml-2 overflow-hidden"
          aria-label="Scroll category right"
        >
          <FiChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default MenuFilter;
