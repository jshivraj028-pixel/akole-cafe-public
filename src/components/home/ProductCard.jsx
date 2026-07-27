import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { showToast } = useTheme();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`Added "${product.name}" to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      onClick={() => onQuickView && onQuickView(product)}
      className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F5F2EA]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Bestseller Badge (Top Left) */}
        {(product.isBestseller || product.tag === 'BESTSELLER') && (
          <div className="absolute top-3 left-3">
            <span className="text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-md bg-[#D4B055] text-white uppercase shadow-sm">
              BESTSELLER
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-serif text-base font-medium text-[#2F4436] group-hover:text-[#C8A96A] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 font-light leading-relaxed">
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
            className="w-8.5 h-8.5 rounded-full bg-[#1B3828] text-white flex items-center justify-center hover:bg-[#D4B055] hover:text-[#1B3828] transition-all duration-300 shadow-sm"
          >
            <ShoppingCart className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
