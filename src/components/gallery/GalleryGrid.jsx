import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize2, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { galleryCategories, galleryItems } from '../../data/gallery';

const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

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

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-10">
      
      {/* Ultra-Luxury Responsive Category Filter Bar with Mouse Drag + Arrows */}
      <div className="relative flex items-center justify-center max-w-4xl mx-auto w-full">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll('left')}
          style={{ borderRadius: '50%', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px' }}
          className="hidden sm:flex bg-[#122219]/80 dark:bg-[#0E1A13]/85 hover:bg-[#123524]/95 dark:hover:bg-[#182C20]/95 backdrop-blur-2xl border-2 border-[#D6AE4D] hover:border-[#FFF3C4] text-[#D6AE4D] hover:text-[#F3E5AB] shadow-xl hover:shadow-[0_0_20px_rgba(214,174,77,0.4)] items-center justify-center shrink-0 hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer z-10 p-0 mr-2 group"
          aria-label="Scroll left"
          title="Scroll Left"
        >
          <FiChevronLeft className="w-4.5 h-4.5 stroke-[3] group-hover:-translate-x-0.5 transition-transform text-[#D6AE4D] group-hover:text-[#F3E5AB]" />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className="flex items-center justify-start sm:justify-center gap-2.5 py-2.5 px-3 bg-white/80 dark:bg-[#121A15]/85 backdrop-blur-xl rounded-2xl border border-gray-200/90 dark:border-[#D6AE4D]/40 shadow-md overflow-x-auto no-scrollbar scroll-smooth w-full select-none cursor-grab active:cursor-grabbing"
        >
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shrink-0 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] border border-[#D6AE4D] shadow-md shadow-[#D6AE4D]/25 scale-105'
                    : 'bg-white/80 dark:bg-[#16231B]/80 text-[#123524] dark:text-[#EAE3D2] border border-gray-200/80 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D] hover:shadow-[0_0_15px_rgba(214,174,77,0.3)]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          style={{ borderRadius: '50%', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px' }}
          className="hidden sm:flex bg-[#122219]/80 dark:bg-[#0E1A13]/85 hover:bg-[#123524]/95 dark:hover:bg-[#182C20]/95 backdrop-blur-2xl border-2 border-[#D6AE4D] hover:border-[#FFF3C4] text-[#D6AE4D] hover:text-[#F3E5AB] shadow-xl hover:shadow-[0_0_20px_rgba(214,174,77,0.4)] items-center justify-center shrink-0 hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer z-10 p-0 ml-2 group"
          aria-label="Scroll right"
          title="Scroll Right"
        >
          <FiChevronRight className="w-4.5 h-4.5 stroke-[3] group-hover:translate-x-0.5 transition-transform text-[#D6AE4D] group-hover:text-[#F3E5AB]" />
        </button>
      </div>

      {/* High-Definition Photo Showcase Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              onClick={() => setActiveLightboxItem(item)}
              className="relative h-72 sm:h-80 md:h-84 rounded-3xl overflow-hidden group shadow-xl border border-gray-200/80 dark:border-[#D6AE4D]/30 cursor-pointer bg-[#0E1511]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              
              {/* Always-Visible Gradient Overlay & Info for Mobile & Desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1511]/95 via-[#0E1511]/40 to-transparent flex flex-col justify-between p-5 sm:p-6">
                <div className="flex justify-end">
                  <span
                    style={{ borderRadius: '50%', width: '36px', height: '36px', minWidth: '36px', minHeight: '36px' }}
                    className="bg-black/40 hover:bg-black/60 dark:bg-black/50 dark:hover:bg-black/80 backdrop-blur-md border border-white/30 dark:border-[#D6AE4D]/50 flex items-center justify-center text-[#D6AE4D] shadow-lg group-hover:scale-110 transition-all p-0"
                  >
                    <FiEye className="w-4 h-4 text-[#D6AE4D]" />
                  </span>
                </div>
                
                <div>
                  <span className="text-[9px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-md bg-[#D6AE4D] text-[#123524] uppercase shadow-sm inline-block mb-1.5">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80 font-light mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxItem(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-4xl w-full bg-[#122219] border border-[#D6AE4D]/40 rounded-3xl overflow-hidden shadow-2xl text-white"
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:text-[#D6AE4D] flex items-center justify-center border border-white/30 cursor-pointer"
              >
                <FiX className="w-6 h-6" />
              </button>
              <div className="relative h-80 sm:h-[480px]">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-[#122219] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#D6AE4D]/20">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#D6AE4D]">{activeLightboxItem.title}</h3>
                  <p className="text-xs text-white/80 font-light mt-1">{activeLightboxItem.description}</p>
                </div>
                <span className="px-3 py-1 bg-[#D6AE4D] text-[#123524] text-[10px] font-extrabold uppercase tracking-widest rounded-md shrink-0">
                  {activeLightboxItem.category}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryGrid;
