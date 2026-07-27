import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiPlus, FiArrowRight } from 'react-icons/fi';
import { menuItems } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const { showToast } = useTheme();
  const navigate = useNavigate();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = searchTerm.trim()
    ? menuItems.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleAddToCart = (item) => {
    addToCart(item);
    showToast(`Added ${item.name} to Cart!`, 'success');
  };

  const handleSelectProduct = (item) => {
    onClose();
    navigate(`/menu?search=${encodeURIComponent(item.name)}`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onClose();
      navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
        {/* Dark Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Compact Search Dialog Window */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          className="relative z-10 w-full max-w-lg bg-[#123524] border border-[#D6AE4D]/40 rounded-2xl p-4 text-white shadow-2xl overflow-hidden"
        >
          {/* Header Input Form ONLY */}
          <form onSubmit={handleFormSubmit} className="relative flex items-center">
            <FiSearch className="absolute left-4 w-5 h-5 text-[#D6AE4D]" />
            <input
              type="text"
              autoFocus
              placeholder="Type to search coffee, pizza, desserts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1B4330] border border-[#D6AE4D]/30 rounded-xl py-3 pl-11 pr-20 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#D6AE4D] transition-colors"
            />
            <div className="absolute right-3 flex items-center gap-1.5">
              {searchTerm && (
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-[#D6AE4D] text-[#123524] hover:bg-[#c59d3c] transition-colors"
                  title="Search"
                >
                  <FiArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-white/60 hover:text-[#D6AE4D] transition-colors"
                title="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Show Live Matches ONLY when user types something */}
          {searchTerm.trim() && (
            <div className="mt-3 max-h-72 overflow-y-auto pr-1 space-y-2 border-t border-[#D6AE4D]/20 pt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#D6AE4D]">
                  Results ({filteredItems.length})
                </span>
                {filteredItems.length > 0 && (
                  <button
                    onClick={handleFormSubmit}
                    className="text-[11px] text-[#D6AE4D] hover:underline flex items-center gap-1"
                  >
                    View in Menu <FiArrowRight />
                  </button>
                )}
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-4 text-white/60 text-xs">
                  No item found for "{searchTerm}".
                </div>
              ) : (
                filteredItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#1B4330]/70 border border-[#D6AE4D]/15 hover:border-[#D6AE4D]/50 transition-colors group cursor-pointer"
                    onClick={() => handleSelectProduct(item)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="font-serif text-xs font-semibold text-white group-hover:text-[#D6AE4D] transition-colors truncate">
                          {item.name}
                        </h5>
                        <span className="text-[10px] text-[#D6AE4D]/90 capitalize block">{item.category.replace('-', ' ')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="font-semibold text-[#D6AE4D] text-xs">₹{item.price}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        className="w-7 h-7 rounded-full bg-[#D6AE4D] text-[#123524] flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                        title="Add to Cart"
                      >
                        <FiPlus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
