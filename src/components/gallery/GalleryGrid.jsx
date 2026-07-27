import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize2, FiEye } from 'react-icons/fi';
import { galleryCategories, galleryItems } from '../../data/gallery';

const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-12">
      
      {/* Ultra-Luxury Category Filter Bar */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 p-2 bg-[#F5F2EA] dark:bg-[#121A15] rounded-full border border-gray-200/80 dark:border-[#D6AE4D]/30 max-w-3xl mx-auto shadow-inner">
        {galleryCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#123524] to-[#1D4732] dark:from-[#D6AE4D] dark:to-[#F0D588] text-[#D6AE4D] dark:text-[#123524] shadow-md scale-[1.03] ring-1 ring-[#D6AE4D]/50'
                  : 'text-[#6B7C70] dark:text-[#A0B0A5] hover:text-[#123524] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#1D2C22]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* High-Definition Photo Showcase Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
              className="relative h-80 sm:h-84 md:h-90 rounded-3xl overflow-hidden group shadow-xl border border-gray-200/80 dark:border-[#D6AE4D]/30 cursor-pointer bg-white dark:bg-[#16231B]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Dark Gradient Overlay & Info on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1511]/90 via-[#0E1511]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-[#D6AE4D] flex items-center justify-center border border-white/30 shadow-lg">
                    <FiEye className="w-5 h-5" />
                  </span>
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-md bg-[#D6AE4D] text-[#123524] uppercase shadow-sm inline-block mb-2">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80 font-light mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Glassmorphic Lightbox Overlay */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxItem(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 max-w-4xl w-full bg-white dark:bg-[#16231B] border border-[#D6AE4D]/50 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-black/60 text-white hover:text-[#D6AE4D] flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                aria-label="Close modal"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div className="relative h-80 sm:h-[480px] w-full bg-black">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-white dark:bg-[#16231B] text-[#123524] dark:text-[#EAE3D2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100 dark:border-[#D6AE4D]/20">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-white">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] font-light mt-1">
                    {activeLightboxItem.description}
                  </p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-[#123524] dark:bg-[#D6AE4D] text-[#D6AE4D] dark:text-[#123524] text-xs font-extrabold uppercase tracking-wider shrink-0 border border-[#D6AE4D]/40">
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
