import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { getProductImage } from '../../utils/imageHelper';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { showToast, openQuickView } = useTheme();

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

  const imgSrc = getProductImage(product);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      onClick={handleCardClick}
      className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F5F2EA]">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Overlay (Top Left & Right) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
          {(product.isBestseller || product.tag === 'BESTSELLER') && (
            <span className="text-[9px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-md bg-[#D6AE4D] text-[#123524] uppercase shadow-sm">
              BESTSELLER
            </span>
          )}
          {product.isChefSpecial && (
            <span className="text-[9px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-md bg-[#123524] text-[#D6AE4D] border border-[#D6AE4D]/40 uppercase shadow-sm">
              CHEF SPECIAL
            </span>
          )}
        </div>

        {/* Veg / Non-Veg Indicator (Top Right) */}
        <div className="absolute top-3 right-3 z-10">
          {product.isVeg === false ? (
            <div className="w-5 h-5 rounded-md bg-white/90 border-2 border-red-600 flex items-center justify-center p-0.5 shadow-md" title="Non-Vegetarian">
              <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-md bg-white/90 border-2 border-emerald-600 flex items-center justify-center p-0.5 shadow-md" title="100% Pure Vegetarian">
              <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-base font-bold text-[#123524] dark:text-white group-hover:text-[#D6AE4D] transition-colors line-clamp-1">
              {product.name}
            </h3>
            {product.spicyLevel > 0 && (
              <span className="text-xs shrink-0" title={`Spicy Level: ${product.spicyLevel}/3`}>
                {'🌶️'.repeat(product.spicyLevel)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#6B7C70] dark:text-[#A0B0A5] line-clamp-2 mt-1 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom row: Price, Rating & Shopping Cart Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="font-serif text-base font-bold text-[#2F4436]">₹{product.price}</span>
            {product.rating && (
              <div className="flex items-center gap-0.5 text-[11px] text-gray-500 font-medium">
                <FiStar className="w-3 h-3 text-[#D4B055] fill-current" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="w-9 h-9 rounded-full bg-[#123524] text-[#D6AE4D] flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-all duration-300 shadow-md border border-[#D6AE4D]/30 shrink-0 group/btn"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4 stroke-[2.2] group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
