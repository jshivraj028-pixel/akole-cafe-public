import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Plus, Minus, Check, Sparkles, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const MenuItemDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { showToast, wishlistItems, toggleWishlist } = useTheme();

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState('Whole Milk');
  const [selectedSugar, setSelectedSugar] = useState('100% Regular');
  const [selectedAddons, setSelectedAddons] = useState([]);

  if (!isOpen || !product) return null;

  const isWishlisted = wishlistItems?.some(i => i.id === product.id || i._id === product._id);

  const milkOptions = [
    { name: 'Whole Milk', extra: 0 },
    { name: 'Oat Milk', extra: 40 },
    { name: 'Almond Milk', extra: 40 },
    { name: 'Coconut Milk', extra: 40 },
  ];

  const sugarOptions = ['100% Regular', '50% Less Sugar', '0% No Sugar'];

  const addonOptions = [
    { id: 'shot', name: 'Extra Arabica Espresso Shot', price: 60 },
    { id: 'gold', name: '24K Edible Gold Flakes', price: 90 },
    { id: 'cream', name: 'Handcrafted Whipped Cream', price: 30 },
  ];

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculate extra price
  const milkExtra = milkOptions.find(m => m.name === selectedMilk)?.extra || 0;
  const addonsExtra = selectedAddons.reduce((acc, id) => {
    const found = addonOptions.find(a => a.id === id);
    return acc + (found ? found.price : 0);
  }, 0);

  const unitPrice = product.price + milkExtra + addonsExtra;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const customizedItem = {
      ...product,
      price: unitPrice,
      customizations: {
        milk: selectedMilk,
        sugar: selectedSugar,
        addons: selectedAddons.map(id => addonOptions.find(a => a.id === id)?.name)
      }
    };
    addToCart(customizedItem, quantity);
    showToast(`Added ${quantity}x "${product.name}" to Cart!`, 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative z-10 w-full max-w-2xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 rounded-3xl overflow-hidden text-[#1F3A2B] dark:text-[#EAE3D2] shadow-2xl my-auto max-h-[92vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors shadow-lg border border-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto flex-1 p-0">
            {/* Top Product Hero Image Banner */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1B3828]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121A15] via-transparent to-black/30" />

              {/* Tag / Bestseller Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {(product.isBestseller || product.tag === 'BESTSELLER') && (
                  <span className="px-3 py-1 rounded-full bg-[#D6AE4D] text-[#123524] font-extrabold text-[10px] uppercase tracking-widest shadow-md">
                    BESTSELLER
                  </span>
                )}
                {product.category && (
                  <span className="px-3 py-1 rounded-full bg-black/50 text-white font-semibold text-[10px] uppercase tracking-widest border border-white/20 backdrop-blur-sm">
                    {product.category.replace('-', ' ')}
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all border ${
                  isWishlisted 
                    ? 'bg-rose-500 text-white border-rose-400' 
                    : 'bg-black/50 text-white hover:bg-black/80 border-white/20'
                }`}
                title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Product Info & Options */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Header Title & Rating */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#123524] dark:text-white">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AE4D]/15 text-[#D6AE4D] font-bold text-xs shrink-0 border border-[#D6AE4D]/30">
                    <Star className="w-3.5 h-3.5 fill-current text-[#D6AE4D]" />
                    <span>{product.rating || '4.9'}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed mt-2">
                  {product.description || 'Artisanal specialty item crafted fresh daily at Akole Café.'}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 pb-4 border-b border-[#E5DDD0] dark:border-[#D6AE4D]/20">
                <span className="font-serif text-3xl font-extrabold text-[#123524] dark:text-[#D6AE4D]">
                  ₹{unitPrice}
                </span>
                {(milkExtra > 0 || addonsExtra > 0) && (
                  <span className="text-xs text-[#8B9B90] dark:text-[#A0B0A5] font-light">
                    (Base: ₹{product.price} + Addons: ₹{milkExtra + addonsExtra})
                  </span>
                )}
              </div>

              {/* CUSTOMIZATION 1: MILK SELECTION */}
              {product.category?.includes('coffee') && (
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#C8A96A]">
                    Milk Selection
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {milkOptions.map((m) => (
                      <button
                        key={m.name}
                        type="button"
                        onClick={() => setSelectedMilk(m.name)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-center ${
                          selectedMilk === m.name
                            ? 'bg-[#123524] dark:bg-[#D6AE4D] text-white dark:text-[#123524] border-[#123524] dark:border-[#D6AE4D] shadow-sm'
                            : 'bg-white dark:bg-[#1D2C22] text-[#123524] dark:text-[#EAE3D2] border-[#E5DDD0] dark:border-[#D6AE4D]/20 hover:border-[#D6AE4D]'
                        }`}
                      >
                        <div>{m.name}</div>
                        {m.extra > 0 && <div className="text-[10px] opacity-80">+₹{m.extra}</div>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CUSTOMIZATION 2: SUGAR LEVEL */}
              {product.category?.includes('coffee') && (
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#C8A96A]">
                    Sugar Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {sugarOptions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSugar(s)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-center ${
                          selectedSugar === s
                            ? 'bg-[#123524] dark:bg-[#D6AE4D] text-white dark:text-[#123524] border-[#123524] dark:border-[#D6AE4D] shadow-sm'
                            : 'bg-white dark:bg-[#1D2C22] text-[#123524] dark:text-[#EAE3D2] border-[#E5DDD0] dark:border-[#D6AE4D]/20 hover:border-[#D6AE4D]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CUSTOMIZATION 3: ADDONS */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold tracking-wider text-[#C8A96A]">
                  Optional Gourmet Add-ons
                </label>
                <div className="space-y-2">
                  {addonOptions.map((a) => {
                    const isSelected = selectedAddons.includes(a.id);
                    return (
                      <div
                        key={a.id}
                        onClick={() => toggleAddon(a.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#D6AE4D]/15 border-[#D6AE4D] text-[#123524] dark:text-white'
                            : 'bg-white dark:bg-[#1D2C22] border-[#E5DDD0] dark:border-[#D6AE4D]/20 text-[#123524] dark:text-[#EAE3D2]'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-[#D6AE4D] border-[#D6AE4D] text-[#123524]' : 'border-gray-400'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{a.name}</span>
                        </div>
                        <span className="text-xs font-bold text-[#D6AE4D]">+₹{a.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 sm:p-6 bg-white dark:bg-[#1D2C22] border-t border-[#E5DDD0] dark:border-[#D6AE4D]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-[#FAF6EE] dark:bg-[#121A15] p-1.5 rounded-full border border-[#E5DDD0] dark:border-[#D6AE4D]/30">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-white dark:bg-[#1D2C22] text-[#123524] dark:text-white flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-colors shadow-sm"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <span className="font-bold text-sm text-[#123524] dark:text-white px-2 font-mono">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-white dark:bg-[#1D2C22] text-[#123524] dark:text-white flex items-center justify-center hover:bg-[#D6AE4D] hover:text-[#123524] transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] hover:from-[#E5BC58] hover:via-[#FFF3C4] hover:to-[#C99D3B] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-[#D6AE4D]/30 border border-[#FFF5D6]/60 transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>ADD TO CART • ₹{totalPrice}</span>
            </button>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MenuItemDetailModal;
