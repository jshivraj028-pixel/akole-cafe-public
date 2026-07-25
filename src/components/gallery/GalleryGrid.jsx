import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { galleryCategories, galleryItems } from '../../data/gallery';

const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs (Matching Screenshot 2) */}
      <div className="flex items-center justify-center flex-wrap gap-3">
        {galleryCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-[#351E13] text-white font-bold shadow-md'
                  : 'bg-[#FAF6EE] border border-[#E5DDD0] text-[#1F3A2B] hover:border-[#D4B055]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              onClick={() => setActiveLightboxItem(item)}
              className="relative h-72 sm:h-80 md:h-84 rounded-3xl overflow-hidden group shadow-sm border border-[#E5DDD0] cursor-pointer bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3A2B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80 font-light mt-0.5">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxItem(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-w-4xl w-full bg-[#FAF6EE] border border-[#E5DDD0] rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:text-[#D4B055] flex items-center justify-center"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div className="relative h-96 sm:h-[500px]">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-[#FAF6EE] text-[#1F3A2B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E5DDD0]">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1F3A2B]">{activeLightboxItem.title}</h3>
                  <p className="text-sm text-[#6B7C70] font-light mt-1">{activeLightboxItem.description}</p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-[#351E13] text-white text-xs font-semibold uppercase tracking-wider shrink-0">
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
