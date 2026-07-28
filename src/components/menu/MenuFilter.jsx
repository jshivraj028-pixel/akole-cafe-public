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
    <div className="space-y-4 mb-8 w-full" style={{ color: '#1E2621' }}>
      {/* Top Row: Search + Veg/Non-Veg Filter + Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 w-full">
        
        {/* 1. Glass Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E2621] stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search delicacies, coffee, misal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/90 backdrop-blur-xl border border-white rounded-2xl py-3 pl-10 pr-9 text-xs font-semibold text-[#1E2621] placeholder:text-gray-400 shadow-sm focus:outline-none focus:border-[#1E2621] transition-all truncate"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1 cursor-pointer"
              title="Clear search"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. Veg / Non-Veg Toggle Pills */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xl p-1.5 rounded-2xl border border-white shadow-sm shrink-0">
          <button
            onClick={() => setVegFilter && setVegFilter('all')}
            className={`py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              vegFilter === 'all' || !vegFilter
                ? 'bg-[#1E2621] text-white shadow-sm'
                : 'text-gray-600 hover:text-[#1E2621]'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setVegFilter && setVegFilter('veg')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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
          <FiSliders className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E2621] pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-white/90 backdrop-blur-xl border border-white rounded-2xl py-3 pl-10 pr-8 text-xs font-bold text-[#1E2621] appearance-none shadow-sm focus:outline-none cursor-pointer hover:bg-white transition-all"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="rating">Sort by: Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

      </div>

      {/* Bottom Row: Glossy Category Pills */}
      <div className="relative flex items-center w-full">
        {/* Scroll Left Button */}
        <button
          type="button"
          onClick={() => handleScroll('left')}
          className="hidden sm:flex w-9.5 h-9.5 rounded-full bg-white border border-white shadow-md text-[#1E2621] hover:scale-105 active:scale-95 transition-all items-center justify-center shrink-0 cursor-pointer z-10 mr-2"
          aria-label="Scroll category left"
        >
          <FiChevronLeft className="w-4.5 h-4.5 stroke-[2.5]" />
        </button>

        {/* Category Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scroll-smooth w-full no-scrollbar select-none cursor-grab active:cursor-grabbing"
        >
          {menuCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 shrink-0 whitespace-nowrap backdrop-blur-xl cursor-pointer shadow-sm ${
                  isActive
                    ? 'bg-[#1E2621] text-white border border-[#1E2621] shadow-md scale-105'
                    : 'bg-white/80 text-[#48594B] hover:bg-white hover:text-[#1E2621] border border-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          className="hidden sm:flex w-9.5 h-9.5 rounded-full bg-white border border-white shadow-md text-[#1E2621] hover:scale-105 active:scale-95 transition-all items-center justify-center shrink-0 cursor-pointer z-10 ml-2"
          aria-label="Scroll category right"
        >
          <FiChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default MenuFilter;
