import React, { useRef, useState } from 'react';
import { FiSearch, FiSliders, FiChevronDown, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
    <div className="space-y-4 mb-6 w-full">
      {/* Top Row: Search + Veg/Non-Veg Filter + Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 w-full">
        
        {/* 1. Glass Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D] stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search delicacies, coffee, misal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/80 dark:bg-[#121A15]/85 backdrop-blur-xl border border-gray-200/90 dark:border-[#D6AE4D]/40 rounded-2xl py-3 pl-10 pr-9 text-xs font-semibold text-[#123524] dark:text-[#EAE3D2] placeholder:text-[#6B7C70]/80 dark:placeholder:text-[#A0B0A5]/75 shadow-md focus:outline-none focus:border-[#D6AE4D] focus:ring-2 focus:ring-[#D6AE4D]/40 transition-all truncate"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 cursor-pointer"
              title="Clear search"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. Frosted Glass Veg / Non-Veg Toggle Pills */}
        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-[#121A15]/85 backdrop-blur-xl p-1.5 rounded-2xl border border-gray-200/90 dark:border-[#D6AE4D]/40 shadow-md shrink-0">
          <button
            onClick={() => setVegFilter && setVegFilter('all')}
            className={`py-2 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              vegFilter === 'all' || !vegFilter
                ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] shadow-md scale-[1.02] border border-[#D6AE4D]'
                : 'text-gray-600 dark:text-[#A0B0A5] hover:text-[#123524] dark:hover:text-white'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setVegFilter && setVegFilter('veg')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              vegFilter === 'veg'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-[1.02]'
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/40'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white shadow-sm ring-2 ring-emerald-500/40 animate-pulse" />
            Pure Veg
          </button>

          <button
            onClick={() => setVegFilter && setVegFilter('nonveg')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              vegFilter === 'nonveg'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30 scale-[1.02]'
                : 'text-red-600 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-950/40'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-white shadow-sm ring-2 ring-red-500/40 animate-pulse" />
            Non-Veg
          </button>
        </div>

        {/* 3. Glass Sort Dropdown */}
        <div className="relative shrink-0 min-w-[180px]">
          <FiSliders className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D] pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-white/80 dark:bg-[#121A15]/85 backdrop-blur-xl border border-gray-200/90 dark:border-[#D6AE4D]/40 rounded-2xl py-3 pl-10 pr-8 text-xs font-bold text-[#123524] dark:text-[#EAE3D2] appearance-none shadow-md focus:outline-none cursor-pointer hover:bg-white dark:hover:bg-[#1D2C22] transition-all"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="rating">Sort by: Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

      </div>

      {/* Bottom Row: Ultra-Luxury Frosted Glass Category Buttons with Mouse Drag + Arrows */}
      <div className="relative flex items-center w-full">
        {/* Left Arrow Button with Pure Translucent Glass Hover */}
        <button
          type="button"
          onClick={() => handleScroll('left')}
          style={{ borderRadius: '50%', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px' }}
          className="hidden sm:flex bg-[#122219]/80 dark:bg-[#0E1A13]/85 hover:bg-[#123524]/95 dark:hover:bg-[#182C20]/95 backdrop-blur-2xl border-2 border-[#D6AE4D] hover:border-[#FFF3C4] text-[#D6AE4D] hover:text-[#F3E5AB] shadow-xl hover:shadow-[0_0_20px_rgba(214,174,77,0.4)] items-center justify-center shrink-0 hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer z-10 p-0 mr-2 group"
          aria-label="Scroll category left"
          title="Scroll Left"
        >
          <FiChevronLeft className="w-4.5 h-4.5 stroke-[3] group-hover:-translate-x-0.5 transition-transform text-[#D6AE4D] group-hover:text-[#F3E5AB]" />
        </button>

        {/* Category Container: Touch Swipe + Mouse Drag Scroll */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className="flex items-center gap-3 overflow-x-auto py-3 px-1 scroll-smooth w-full no-scrollbar select-none cursor-grab active:cursor-grabbing"
        >
          {menuCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-extrabold tracking-wide uppercase transition-all duration-300 shrink-0 whitespace-nowrap backdrop-blur-xl cursor-pointer shadow-md ${
                  isActive
                    ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] border border-[#D6AE4D] shadow-lg shadow-[#D6AE4D]/25 scale-105 ring-2 ring-[#D6AE4D]/30'
                    : 'bg-white/80 dark:bg-[#121A15]/80 text-[#123524] dark:text-[#EAE3D2] hover:bg-white dark:hover:bg-[#1D2C22] border border-gray-200/90 dark:border-[#D6AE4D]/30 hover:border-[#D6AE4D] hover:shadow-[0_0_15px_rgba(214,174,77,0.3)]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button with Pure Translucent Glass Hover */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          style={{ borderRadius: '50%', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px' }}
          className="hidden sm:flex bg-[#122219]/80 dark:bg-[#0E1A13]/85 hover:bg-[#123524]/95 dark:hover:bg-[#182C20]/95 backdrop-blur-2xl border-2 border-[#D6AE4D] hover:border-[#FFF3C4] text-[#D6AE4D] hover:text-[#F3E5AB] shadow-xl hover:shadow-[0_0_20px_rgba(214,174,77,0.4)] items-center justify-center shrink-0 hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer z-10 p-0 ml-2 group"
          aria-label="Scroll category right"
          title="Scroll Right"
        >
          <FiChevronRight className="w-4.5 h-4.5 stroke-[3] group-hover:translate-x-0.5 transition-transform text-[#D6AE4D] group-hover:text-[#F3E5AB]" />
        </button>
      </div>
    </div>
  );
};

export default MenuFilter;
