import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiStar, FiClock, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist, showToast } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = isInWishlist(item.id);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    showToast(`Added ${quantity}x "${item.name}" to cart!`, 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-2xl overflow-hidden border border-accent-gold/20 shadow-luxury flex flex-col justify-between group transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-primary-dark">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(item)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-md ${
            isWishlisted
              ? 'bg-accent-gold text-primary'
              : 'bg-primary/60 text-secondary hover:bg-accent-gold hover:text-primary'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-primary' : ''}`} />
        </button>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-full bg-primary/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-accent-gold border border-accent-gold/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rating & Prep Time */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-secondary font-medium">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md border border-accent-gold/30">
            <FiStar className="w-3.5 h-3.5 text-accent-gold fill-accent-gold" />
            <span>{item.rating}</span>
          </div>
          {item.prepTime && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md border border-accent-gold/30 text-[11px] text-secondary/80">
              <FiClock className="w-3 h-3 text-accent-gold" />
              <span>{item.prepTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white/90">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-lg font-bold text-primary group-hover:text-coffee transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="font-serif text-lg font-bold text-accent-goldDark shrink-0">
              ₹{item.price}
            </span>
          </div>
          <p className="text-xs text-dark/70 line-clamp-2 leading-relaxed font-light mb-4">
            {item.description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-accent-gold/15 flex items-center justify-between gap-2">
          {/* Quantity selector */}
          <div className="flex items-center rounded-lg border border-accent-gold/30 bg-secondary/50 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-6 h-6 rounded flex items-center justify-center text-dark/70 hover:bg-accent-gold hover:text-primary transition-colors"
            >
              <FiMinus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center font-bold text-xs text-dark">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 rounded flex items-center justify-center text-dark/70 hover:bg-accent-gold hover:text-primary transition-colors"
            >
              <FiPlus className="w-3 h-3" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 px-3 rounded-xl bg-gold-gradient text-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:scale-102 transition-all shadow-gold"
          >
            <FiShoppingBag className="w-4 h-4" /> Add to Order
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
