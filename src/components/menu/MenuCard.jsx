



import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiHeart } from 'react-icons/fi';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { getProductImage } from '../../utils/imageHelper';

const MenuCard = ({ item, index = 0, onQuickView }) => {
  const { addToCart } = useCart();
  const { showToast, openQuickView, toggleWishlist, isInWishlist } = useTheme();

  const isLiked = isInWishlist ? isInWishlist(item) : false;

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(item);
    } else if (openQuickView) {
      openQuickView(item);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(item);
    showToast(`Added "${item.name}" to cart!`);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    if (toggleWishlist) {
      toggleWishlist(item);
    }
  };

  const imgSrc = getProductImage(item);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ 
        y: -6,
        scale: 1.015,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.12)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      onClick={handleCardClick}
      className="group relative rounded-[24px] bg-white/85 dark:bg-[#16231B]/90 backdrop-blur-xl border border-white/90 dark:border-[#D6AE4D]/30 shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:border-white dark:hover:border-[#D6AE4D]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer w-full max-w-sm mx-auto p-3 sm:p-3.5"
    >
      {/* Product Image Container */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-[18px] bg-gray-100 dark:bg-gray-800/50">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getProductImage({ name: 'water' });
          }}
        />

        {/* Top Left: Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {(item.isBestseller || item.tag === 'BESTSELLER') && (
            <span className="text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-md bg-[#D6AE4D] text-[#123524] uppercase shadow-sm font-sans">
              BESTSELLER
            </span>
          )}

          {item.isChefSpecial && (
            <span className="text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-md bg-[#123524] text-white uppercase shadow-sm font-sans">
              CHEF SPECIAL
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Heart Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleToggleLike}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700 shadow-sm flex items-center justify-center transition-all cursor-pointer"
          title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
        >
          <FiHeart
            className={`w-4 h-4 transition-all duration-300 ${
              isLiked 
                ? "text-rose-500 fill-rose-500 scale-110" 
                : "text-gray-700 dark:text-gray-300 stroke-[2]"
            }`}
          />
        </motion.button>
      </div>

      {/* Content Container */}
      <div className="pt-3 px-1 flex-1 flex flex-col justify-between space-y-3 text-left">
        <div className="space-y-1.5">
          {/* Header Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white tracking-tight leading-snug group-hover:text-[#123524] dark:group-hover:text-[#D6AE4D] transition-colors line-clamp-1">
              {item.name}
            </h3>
            {item.rating && (
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-lg border border-amber-200/80 dark:border-amber-800/40 shrink-0">
                <FiStar className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-900 dark:text-amber-300">{item.rating}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-xs font-normal leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800/80 mt-2">
          <div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-400 block -mb-0.5">
              PRICE
            </span>
            <span className="font-serif text-xl sm:text-2xl font-black text-[#123524] dark:text-[#D6AE4D]">
              ₹{item.price}
            </span>
          </div>

          {/* Luxury White Glossy Glass Add Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-b from-white via-[#F7FAF8] to-[#E2E9E4] dark:from-[#26332B] dark:via-[#1A261F] dark:to-[#121B16] text-[#123524] dark:text-[#D6AE4D] font-black text-xs uppercase tracking-wider shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.3)] border-2 border-white dark:border-white/20 hover:border-[#D6AE4D] hover:shadow-[0_6px_20px_rgba(214,174,77,0.35)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer group/btn"
            title="Add to Cart"
          >
            {/* Glossy Top Glass Reflective Sheen Layer */}
            <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none rounded-t-xl z-0" />
            
            {/* Subtle Hover Gloss Highlight */}
            <div className="absolute inset-0 bg-[#D6AE4D]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <ShoppingCart className="w-3.5 h-3.5 text-[#123524] dark:text-[#D6AE4D] stroke-[2.5] relative z-10" />
            <span className="relative z-10">ADD</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
