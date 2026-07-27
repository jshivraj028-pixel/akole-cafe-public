import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Sparkles, Tag, Check, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    taxAmount,
    grandTotal,
    totalItemsCount,
    appliedCoupon,
    applyCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState({ text: '', isError: false });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const result = applyCoupon(couponCode);
    if (result.success) {
      setCouponMsg({ text: result.message, isError: false });
    } else {
      setCouponMsg({ text: result.message, isError: true });
    }
  };

  const handleCheckoutClick = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
          />

          {/* Right Slide-Over Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="w-screen max-w-md bg-[#10291C] border-l border-[#D6AE4D]/35 shadow-2xl text-white flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#183B2A] to-[#10291C] border-b border-[#D6AE4D]/25 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/30 flex items-center justify-center text-[#D6AE4D]">
                    <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                      <span>Your Order Cart</span>
                      {totalItemsCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#D6AE4D] text-[#123524] font-extrabold text-[10px]">
                          {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}
                        </span>
                      )}
                    </h2>
                    <p className="text-[11px] text-[#D6AE4D] font-mono">Akole Café Quick Checkout</p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close Cart Drawer"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Drawer Main Body (Scrollable Cart Items) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
                {cartItems.length === 0 ? (
                  /* Empty Cart State */
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                    <div className="w-20 h-20 rounded-full bg-[#183B2A] border border-[#D6AE4D]/30 flex items-center justify-center text-[#D6AE4D] shadow-inner">
                      <ShoppingCart className="w-10 h-10 opacity-80" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-lg text-white">Your Cart is Empty</h3>
                      <p className="text-xs text-white/60 max-w-xs">
                        Looks like you haven't added any delicious items yet!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        navigate('/menu');
                      }}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                    >
                      Explore Menu
                    </button>
                  </div>
                ) : (
                  /* Cart Items List */
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-[#183B2A]/70 border border-[#D6AE4D]/20 rounded-2xl flex items-center gap-3 relative group"
                    >
                      {/* Item Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#D6AE4D]/30 shrink-0 bg-[#0A1A12]"
                      />

                      {/* Item Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif font-bold text-xs text-white truncate pr-2">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/40 hover:text-rose-400 p-0.5 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs font-extrabold text-[#D6AE4D]">
                          ₹{item.price} <span className="text-[10px] text-white/50 font-normal">x {item.quantity}</span>
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 pt-0.5">
                          <div className="flex items-center bg-[#0A1A12] border border-[#D6AE4D]/30 rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-5 h-5 rounded hover:bg-white/10 text-white/80 flex items-center justify-center text-xs transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-5 h-5 rounded hover:bg-white/10 text-[#D6AE4D] flex items-center justify-center text-xs transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-white ml-auto">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Bottom Action & Summary Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 sm:p-5 bg-gradient-to-b from-[#0F261B] to-[#0A1A12] border-t border-[#D6AE4D]/25 space-y-3 shrink-0">
                  {/* Coupon Promo Input Bar */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#D6AE4D] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Promo Code (AKOLE20)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full bg-[#183B2A] border border-[#D6AE4D]/30 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D6AE4D]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#D6AE4D]/20 border border-[#D6AE4D]/40 text-[#D6AE4D] font-bold text-xs rounded-xl hover:bg-[#D6AE4D] hover:text-[#123524] transition-all"
                    >
                      Apply
                    </button>
                  </form>

                  {couponMsg.text && (
                    <p className={`text-[10px] ${couponMsg.isError ? 'text-rose-400' : 'text-emerald-400'} font-medium`}>
                      {couponMsg.text}
                    </p>
                  )}

                  {/* Summary Rows */}
                  <div className="space-y-1.5 text-xs text-white/80 pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white">₹{subtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Discount ({appliedCoupon})</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-white/60 text-[11px]">
                      <span>Taxes & GST (5%)</span>
                      <span>₹{taxAmount}</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-[#D6AE4D]/20 pt-2 text-sm">
                      <span className="font-bold text-white font-serif">Grand Total</span>
                      <span className="font-extrabold text-base text-[#D6AE4D]">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Checkout Action Button */}
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] hover:from-[#E5BC58] hover:via-[#FFF3C4] hover:to-[#C99D3B] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-[#D6AE4D]/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
