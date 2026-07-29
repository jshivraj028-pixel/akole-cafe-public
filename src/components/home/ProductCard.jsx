import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiHeart } from 'react-icons/fi';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { getProductImage } from '../../utils/imageHelper';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { showToast, openQuickView, toggleWishlist, isInWishlist } = useTheme();

  const isLiked = isInWishlist ? isInWishlist(product) : false;

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(product);
    } else if (openQuickView) {
      openQuickView(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`Added "${product.name}" to cart!`);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    if (toggleWishlist) {
      toggleWishlist(product);
    }
  };

  const imgSrc = getProductImage(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ 
        y: -8,
        scale: 1.015,
        boxShadow: "0 20px 30px -10px rgba(214, 174, 77, 0.3), 0 10px 15px -5px rgba(0, 0, 0, 0.4)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      onClick={handleCardClick}
      className="group relative rounded-[28px] bg-white/80 dark:bg-[#15241C]/90 backdrop-blur-xl border border-[#E5DDD0] dark:border-[#D6AE4D]/30 shadow-lg hover:border-[#D6AE4D] dark:hover:border-[#D6AE4D] dark:hover:bg-[#1B2F24] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer w-full max-w-sm sm:max-w-none h-full min-h-[380px]"
    >
      {/* Product Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-[#F5F2EA] dark:bg-[#0E1A13]">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Subtle Dark Gradient Bottom Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Top Left: Vertical Stacked Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
          {(product.isBestseller || product.tag === 'BESTSELLER') && (
            <span className="text-[9px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-md bg-[#D6AE4D] text-[#123524] uppercase shadow-md font-sans">
              BESTSELLER
            </span>
          )}

          {product.isChefSpecial && (
            <span className="text-[9px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-md bg-[#123524]/90 text-[#D6AE4D] border border-[#D6AE4D]/50 uppercase shadow-md backdrop-blur-md font-sans">
              CHEF SPECIAL
            </span>
          )}
        </div>

        {/* Top Right: 100% Mathematically Perfect Round Circle Glass Heart Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.15 }}
          onClick={handleToggleLike}
          style={{ borderRadius: '50%', width: '36px', height: '36px', minWidth: '36px', minHeight: '36px' }}
          className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/60 dark:bg-black/50 dark:hover:bg-black/80 backdrop-blur-md border border-white/30 dark:border-[#D6AE4D]/50 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg p-0"
          title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
        >
          <FiHeart
            className={`w-4 h-4 transition-all duration-300 ${
              isLiked 
                ? "text-rose-500 fill-rose-500 scale-110 drop-shadow-[0_2px_6px_rgba(244,63,94,0.6)]" 
                : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
            }`}
          />
        </motion.button>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 text-left">
        <div className="space-y-1.5">
          {/* Header Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif font-bold text-base text-[#123524] dark:text-[#EAE3D2] leading-snug group-hover:text-[#D6AE4D] dark:group-hover:text-[#F3E5AB] transition-colors line-clamp-1">
              {product.name}
            </h3>
            {product.rating && (
              <div className="flex items-center gap-1 bg-[#FAF6EE] dark:bg-[#0E1A13] px-2 py-0.5 rounded-full border border-[#D6AE4D]/30 shrink-0 shadow-xs group-hover:border-[#D6AE4D]/60 transition-colors">
                <FiStar className="w-3 h-3 text-[#D6AE4D] fill-[#D6AE4D]" />
                <span className="text-[11px] font-bold text-[#123524] dark:text-[#EAE3D2]">{product.rating}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-[#556B5D] dark:text-[#A0B0A5] line-clamp-2 font-light leading-relaxed group-hover:text-[#6E8577] dark:group-hover:text-[#C2D1C8] transition-colors">
            {product.description}
          </p>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#D6AE4D]/20 mt-auto">
          <div>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-widest block font-bold">PRICE</span>
            <span className="font-serif font-black text-lg text-[#123524] dark:text-[#D6AE4D] group-hover:scale-105 transition-transform inline-block">
              ₹{product.price}
            </span>
          </div>

          {/* Luxury Glossy Gold Glass Add Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-b from-[#FCEBB6] via-[#D6AE4D] to-[#B58A28] text-[#0C1A12] font-black text-xs uppercase tracking-wider shadow-[0_4px_14px_rgba(214,174,77,0.38)] border border-white/60 hover:shadow-[0_6px_20px_rgba(214,174,77,0.55)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer group/btn"
            title="Add to Cart"
          >
            {/* Glossy Top Glass Reflective Sheen Layer */}
            <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none rounded-t-xl" />
            
            {/* Subtle Hover Gloss Highlight */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <ShoppingCart className="w-3.5 h-3.5 text-[#0C1A12] stroke-[2.5] relative z-10" />
            <span className="relative z-10">ADD</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
