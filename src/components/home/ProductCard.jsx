import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiPlus, FiStar, FiClock } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist, showToast } = useTheme();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`Added "${product.name}" to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onQuickView && onQuickView(product)}
      className="group relative rounded-2xl bg-white border border-accent-gold/20 shadow-luxury overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Image Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-primary/10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Tag Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.tags && product.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md border border-accent-gold/30 text-accent-gold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleToggleWishlist}
          aria-label="Toggle Wishlist"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white border-rose-400'
              : 'bg-primary/70 text-secondary border-accent-gold/30 hover:text-accent-gold'
          }`}
        >
          <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-secondary font-semibold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-accent-gold/30">
          <FiStar className="w-3.5 h-3.5 text-accent-gold fill-current" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-primary group-hover:text-accent-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-dark-lighter line-clamp-2 mt-1 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer info: price & Add to cart */}
        <div className="flex items-center justify-between pt-3 border-t border-accent-gold/15">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-dark-lighter">Price</span>
            <span className="font-serif text-xl font-bold text-primary">₹{product.price}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold-gradient text-primary font-semibold text-xs shadow-gold hover:scale-105 active:scale-95 transition-all"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
