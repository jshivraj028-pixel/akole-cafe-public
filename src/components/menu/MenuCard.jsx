import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiHeart } from 'react-icons/fi';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { getProductImage } from '../../utils/imageHelper';

const MenuCard = ({ item, onQuickView }) => {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ 
        y: -6,
        scale: 1.015,
        boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.08)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      onClick={handleCardClick}
      className="group relative rounded-[28px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_6px_25px_rgba(0,0,0,0.03)] hover:border-white transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer w-full max-w-sm mx-auto h-full min-h-[380px]"
      style={{ color: '#1E2621' }}
    >
      {/* Product Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-white/60 p-2">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-108 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getProductImage({ name: 'water' });
          }}
        />

        {/* Top Left: Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 items-start z-10">
          {(item.isBestseller || item.tag === 'BESTSELLER') && (
            <span className="text-[9px] font-black tracking-wider px-3 py-1 rounded-full bg-[#1E2621] text-white uppercase shadow-md font-sans">
              BESTSELLER
            </span>
          )}

          {item.isChefSpecial && (
            <span className="text-[9px] font-black tracking-wider px-3 py-1 rounded-full bg-white text-[#1E2621] border border-white uppercase shadow-md backdrop-blur-md font-sans">
              CHEF SPECIAL
            </span>
          )}
        </div>

        {/* Top Right: Pure White Circular Glass Heart Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleToggleLike}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-white shadow-md backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
          title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
        >
          <FiHeart
            className={`w-4 h-4 transition-all duration-300 ${
              isLiked 
                ? "text-rose-500 fill-rose-500 scale-110" 
                : "text-[#1E2621]"
            }`}
          />
        </motion.button>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 text-left">
        <div className="space-y-1.5">
          {/* Header Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              className="font-bold text-base leading-snug group-hover:opacity-80 transition-opacity line-clamp-1"
              style={{ color: '#1E2621' }}
            >
              {item.name}
            </h3>
            {item.rating && (
              <div className="flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full border border-white shrink-0 shadow-xs">
                <FiStar className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[11px] font-bold" style={{ color: '#1E2621' }}>{item.rating}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs line-clamp-2 font-normal leading-relaxed" style={{ color: '#556B5D' }}>
            {item.description}
          </p>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between pt-3 border-t border-[#D8E3D2] mt-auto">
          <div>
            <span className="text-[9px] uppercase tracking-widest block font-bold" style={{ color: '#88998C' }}>PRICE</span>
            <span className="font-bold text-lg inline-block" style={{ color: '#1E2621' }}>
              ₹{item.price}
            </span>
          </div>

          {/* Dark Charcoal Pill Add Button */}
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 rounded-full bg-[#1E2621] hover:bg-black text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-[#1E2621]"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>ADD</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
