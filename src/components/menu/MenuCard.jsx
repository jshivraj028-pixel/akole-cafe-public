import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiHeart } from 'react-icons/fi';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { getProductImage } from '../../utils/imageHelper';

// Array of soft luxury pastel glassmorphic gradients matching user reference image
const pastelGlassGradients = [
  'from-[#E2F0D9]/85 via-[#F3F9EF]/90 to-white/95', // Soft Mint Pistachio
  'from-[#E0F2FE]/85 via-[#F0F9FF]/90 to-white/95', // Soft Ice Blue
  'from-[#EDE9FE]/85 via-[#F5F3FF]/90 to-white/95', // Soft Lavender Purple
  'from-[#FEF3C7]/85 via-[#FFFBEB]/90 to-white/95', // Soft Warm Gold Peach
  'from-[#FFE4E6]/85 via-[#FFF1F2]/90 to-white/95', // Soft Rose Pink
  'from-[#E0E7FF]/85 via-[#EEF2FF]/90 to-white/95', // Soft Indigo Periwinkle
];

const MenuCard = ({ item, index = 0, onQuickView }) => {
  const { addToCart } = useCart();
  const { showToast, openQuickView, toggleWishlist, isInWishlist } = useTheme();

  const isLiked = isInWishlist ? isInWishlist(item) : false;

  // Pick gradient deterministically based on item ID or index
  const gradientIndex = typeof item._id === 'string'
    ? item._id.charCodeAt(0) % pastelGlassGradients.length
    : (index || 0) % pastelGlassGradients.length;
  
  const glassGradient = pastelGlassGradients[gradientIndex];

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
        y: -8,
        scale: 1.02,
        boxShadow: "0 22px 45px -10px rgba(0, 0, 0, 0.09)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      onClick={handleCardClick}
      className={`group relative rounded-[32px] bg-gradient-to-br ${glassGradient} backdrop-blur-2xl border-2 border-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-white transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer w-full max-w-sm mx-auto h-full min-h-[395px] p-3 sm:p-3.5`}
      style={{ color: '#1E2621' }}
    >
      {/* Product Image Container with Curved Glass Inset */}
      <div className="relative h-52 w-full overflow-hidden rounded-[24px] bg-white/60 shadow-inner">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getProductImage({ name: 'water' });
          }}
        />

        {/* Top Left: Badges in Glossy White Pods */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
          {(item.isBestseller || item.tag === 'BESTSELLER') && (
            <span className="text-[9px] font-black tracking-wider px-3 py-1 rounded-full bg-white/95 text-[#1E2621] border border-white uppercase shadow-sm backdrop-blur-md font-sans">
              ★ BESTSELLER
            </span>
          )}

          {item.isChefSpecial && (
            <span className="text-[9px] font-black tracking-wider px-3 py-1 rounded-full bg-[#18201B] text-white uppercase shadow-sm font-sans">
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
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 border border-white shadow-sm backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
          title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
        >
          <FiHeart
            className={`w-4 h-4 transition-all duration-300 ${
              isLiked 
                ? "text-rose-500 fill-rose-500 scale-110" 
                : "text-[#1E2621] stroke-[2.2]"
            }`}
          />
        </motion.button>
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3 text-left">
        <div className="space-y-1.5">
          {/* Header Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              className="font-black text-lg tracking-tight leading-snug group-hover:opacity-80 transition-opacity line-clamp-1"
              style={{ color: '#1E2621' }}
            >
              {item.name}
            </h3>
            {item.rating && (
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white shrink-0 shadow-xs">
                <FiStar className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[11px] font-bold text-[#1E2621]">{item.rating}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs line-clamp-2 font-normal leading-relaxed text-[#556B5D]">
            {item.description}
          </p>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between pt-3.5 border-t border-black/5 mt-auto">
          <div>
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#6A7B6E] block mb-0.5">
              PRICE
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-black text-[#18201B]">
                ₹{item.price}
              </span>
            </div>
          </div>

          {/* Glassmorphic Luxury Action Button */}
          <motion.button
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleAddToCart}
            className="px-5 py-2.5 rounded-full bg-white/75 hover:bg-white backdrop-blur-xl border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_25px_rgba(30,86,47,0.15)] text-[#18201B] font-montserrat font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#1E562F] stroke-[2.5]" />
            <span>ADD</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
