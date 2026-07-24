import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiPlus } from 'react-icons/fi';
import { menuItems } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const { showToast } = useTheme();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filteredItems = searchTerm.trim()
    ? menuItems.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : menuItems.slice(0, 4); // show bestsellers when empty

  const handleAddToCart = (item) => {
    addToCart(item);
    showToast(`Added ${item.name} to Cart!`);
  };

  const handleSelectProduct = (item) => {
    onClose();
    navigate('/menu');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="relative z-10 w-full max-w-2xl bg-primary-dark border border-accent-gold/40 rounded-2xl p-6 text-secondary shadow-luxury overflow-hidden"
        >
          {/* Header Input */}
          <div className="relative flex items-center mb-6">
            <FiSearch className="absolute left-4 w-6 h-6 text-accent-gold" />
            <input
              type="text"
              autoFocus
              placeholder="Search handcrafted coffee, woodfired pizzas, desserts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-primary/80 border border-accent-gold/30 rounded-xl py-4 pl-12 pr-12 text-sm md:text-base text-secondary placeholder-secondary/50 focus:outline-none focus:border-accent-gold transition-colors"
            />
            <button
              onClick={onClose}
              className="absolute right-4 text-secondary/60 hover:text-accent-gold"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto pr-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-accent-gold mb-2">
              {searchTerm ? `Search Results (${filteredItems.length})` : 'Popular Recommendations'}
            </h4>

            {filteredItems.length === 0 ? (
              <p className="text-center py-8 text-secondary/60 text-sm">
                No coffee or dish found matching "{searchTerm}".
              </p>
            ) : (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-primary/40 border border-accent-gold/10 hover:border-accent-gold/40 transition-colors group cursor-pointer"
                  onClick={() => handleSelectProduct(item)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <h5 className="font-serif text-base font-semibold text-secondary group-hover:text-accent-gold transition-colors">
                        {item.name}
                      </h5>
                      <span className="text-xs text-accent-gold/80 capitalize">{item.category.replace('-', ' ')}</span>
                      <p className="text-xs text-secondary/60 line-clamp-1 max-w-xs">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-accent-gold text-sm">₹{item.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="w-8 h-8 rounded-full bg-gold-gradient text-primary flex items-center justify-center hover:scale-110 transition-transform"
                      title="Add to Cart"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
