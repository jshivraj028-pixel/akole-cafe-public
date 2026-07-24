import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize2, FiX } from 'react-icons/fi';
import { galleryCategories, galleryItems } from '../../data/gallery';

const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-3">
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === cat.id
                ? 'bg-gold-gradient text-primary border-accent-gold shadow-gold scale-105 font-bold'
                : 'bg-primary/60 text-secondary/80 border-accent-gold/20 hover:border-accent-gold hover:text-accent-gold'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setActiveLightboxItem(item)}
              className="relative h-80 rounded-2xl overflow-hidden group shadow-luxury border border-accent-gold/20 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-accent-gold text-[10px] uppercase font-bold tracking-widest rounded-full border border-accent-gold/30">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-secondary flex items-end justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold group-hover:text-accent-gold transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-secondary/70 line-clamp-1 font-light">{item.description}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold-gradient text-primary flex items-center justify-center shrink-0 ml-2 group-hover:scale-110 transition-transform shadow-gold">
                  <FiMaximize2 className="w-5 h-5" />
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
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-4xl w-full bg-primary border border-accent-gold/40 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-primary/80 text-secondary hover:text-accent-gold flex items-center justify-center border border-accent-gold/30"
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

              <div className="p-6 bg-primary text-secondary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-accent-gold/20">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-accent-gold">{activeLightboxItem.title}</h3>
                  <p className="text-sm text-secondary/70 font-light mt-1">{activeLightboxItem.description}</p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30 shrink-0">
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
