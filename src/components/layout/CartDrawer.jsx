import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X, Plus, Minus, Trash2, Tag, Check, Sparkles, ShoppingBag } from 'lucide-react';
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
  const [showPromoInput, setShowPromoInput] = useState(false);

  const handleApplyCoupon = (e) => {
    if (e) e.preventDefault();
    const codeToApply = couponCode.trim() || 'AKOLE20';
    const result = applyCoupon(codeToApply);
    if (result.success) {
      setCouponMsg({ text: result.message, isError: false });
    } else {
      setCouponMsg({ text: result.message, isError: true });
    }
  };

  const handleQuickCoupon = (code) => {
    setCouponCode(code);
    const result = applyCoupon(code);
    if (result.success) {
      setCouponMsg({ text: result.message, isError: false });
    } else {
      setCouponMsg({ text: result.message, isError: true });
    }
  };

  const handleRemoveCoupon = () => {
    applyCoupon('');
    setCouponCode('');
    setCouponMsg({ text: 'Coupon code removed', isError: false });
  };

  const handleCheckoutClick = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Soft Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-4 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="pointer-events-auto w-full max-w-full sm:max-w-md bg-gradient-to-b from-[#F2F6ED] via-[#EDF3E7] to-[#E6EFE0] text-[#1E2621] shadow-2xl flex flex-col justify-between overflow-hidden relative border-l border-white/60"
            >
              {/* Glossy Ambient Glow Orbs */}
              <div className="absolute -top-16 -right-16 w-60 h-60 bg-white/60 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#D5E4CE]/50 rounded-full blur-3xl pointer-events-none" />

              {/* 1. TOP HEADER - EXACT MATCH TO IMAGE */}
              <div className="relative z-10 px-6 pt-6 pb-4 flex items-center justify-between shrink-0">
                {/* Back / Close Circular Glossy Button */}
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.06)] hover:shadow-md flex items-center justify-center text-[#1E2621] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Back to Shop"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
                </button>

                {/* Center Title */}
                <h2 className="text-xl font-semibold text-[#1E2621] tracking-tight">
                  Cart
                </h2>

                {/* Right Item Counter */}
                <span className="text-sm font-normal text-[#606E64]">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* 2. SCROLLABLE CART ITEMS BODY */}
              <div className="relative z-10 flex-1 overflow-y-auto px-6 py-2 space-y-6 no-scrollbar">
                {cartItems.length === 0 ? (
                  /* Empty State */
                  <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                    <div className="w-20 h-20 rounded-full bg-white/80 border border-white shadow-lg backdrop-blur-md flex items-center justify-center text-[#4A5E4E]">
                      <ShoppingBag className="w-9 h-9 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-[#1E2621]">Your Cart is Empty</h3>
                      <p className="text-xs text-[#606E64] max-w-xs">
                        Discover Akole Café delicacies, freshly brewed coffees & gourmet specialties.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        navigate('/menu');
                      }}
                      className="px-6 py-3 rounded-full bg-[#1E2621] text-white text-xs font-medium hover:bg-black transition-all shadow-md active:scale-95 cursor-pointer mt-2"
                    >
                      Explore Menu
                    </button>
                  </div>
                ) : (
                  /* Cart Items List */
                  <div className="space-y-5 pt-1">
                    <AnimatePresence mode="popLayout">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between border-b border-[#D8E3D2]/70 pb-5 last:border-0"
                        >
                          {/* Left: Product Thumbnail & Details */}
                          <div className="flex items-center gap-3.5 flex-1 min-w-0">
                            <div className="w-16 h-16 rounded-2xl bg-white/90 p-1 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] shrink-0 overflow-hidden flex items-center justify-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-xl"
                              />
                            </div>

                            <div className="flex flex-col min-w-0 space-y-1">
                              <h4 className="text-base font-semibold text-[#1E2621] leading-tight truncate pr-1">
                                {item.name}
                              </h4>

                              {/* Size / Variant Pill Badge */}
                              <div>
                                <span className="inline-block px-3 py-0.5 rounded-full border border-[#B3C5B0] text-[11px] font-medium text-[#48594B] bg-white/40 backdrop-blur-xs">
                                  {item.category || 'Standard'}
                                </span>
                              </div>

                              {/* Unit Price */}
                              <span className="text-base font-semibold text-[#1E2621]">
                                ₹{(item.price * item.quantity).toFixed(item.price % 1 === 0 ? 0 : 2)}
                              </span>
                            </div>
                          </div>

                          {/* Right: Circular Stepper Controls (+ Qty -) */}
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            {/* Plus Circle Button */}
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-9 h-9 rounded-full bg-white/90 border border-white shadow-[0_3px_10px_rgba(0,0,0,0.06)] hover:shadow-md active:scale-90 text-[#1E2621] flex items-center justify-center transition-all cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4 stroke-[2.2]" />
                            </button>

                            {/* Quantity Number */}
                            <span className="w-5 text-center text-sm font-medium text-[#1E2621]">
                              {item.quantity}
                            </span>

                            {/* Minus Circle Button */}
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  removeFromCart(item.id);
                                } else {
                                  updateQuantity(item.id, -1);
                                }
                              }}
                              className="w-9 h-9 rounded-full bg-white/90 border border-white shadow-[0_3px_10px_rgba(0,0,0,0.06)] hover:shadow-md active:scale-90 text-[#1E2621] flex items-center justify-center transition-all cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              {item.quantity === 1 ? (
                                <Trash2 className="w-3.5 h-3.5 text-rose-500 stroke-[2]" />
                              ) : (
                                <Minus className="w-4 h-4 stroke-[2.2]" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Promo Offer Accordion Toggle */}
                    <div className="pt-2">
                      {!showPromoInput ? (
                        <button
                          onClick={() => setShowPromoInput(true)}
                          className="flex items-center gap-1.5 text-xs font-medium text-[#48594B] hover:text-[#1E2621] cursor-pointer"
                        >
                          <Tag className="w-3.5 h-3.5 text-[#48594B]" />
                          <span>Have a promo coupon?</span>
                        </button>
                      ) : (
                        <div className="p-3 rounded-2xl bg-white/60 border border-white/80 space-y-2 shadow-xs backdrop-blur-md">
                          <div className="flex items-center justify-between text-xs font-semibold text-[#1E2621]">
                            <span>Apply Promo Code</span>
                            <button onClick={() => setShowPromoInput(false)} className="text-gray-400 hover:text-gray-600">
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                            {appliedCoupon === 'AKOLE20' ? (
                              <span className="px-3 py-1 rounded-full bg-[#D4F4CE] text-[#20571C] text-xs font-bold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> AKOLE20 (20% OFF)
                                <button onClick={handleRemoveCoupon} className="ml-1 text-gray-500 hover:text-black">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleQuickCoupon('AKOLE20')}
                                className="px-3 py-1 rounded-full bg-white border border-[#B3C5B0] text-xs font-medium text-[#1E2621] hover:bg-[#1E2621] hover:text-white transition-all cursor-pointer"
                              >
                                AKOLE20 (20% OFF)
                              </button>
                            )}

                            {appliedCoupon === 'AKOLEVIP' ? (
                              <span className="px-3 py-1 rounded-full bg-[#D4F4CE] text-[#20571C] text-xs font-bold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> AKOLEVIP (15% OFF)
                                <button onClick={handleRemoveCoupon} className="ml-1 text-gray-500 hover:text-black">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleQuickCoupon('AKOLEVIP')}
                                className="px-3 py-1 rounded-full bg-white border border-[#B3C5B0] text-xs font-medium text-[#1E2621] hover:bg-[#1E2621] hover:text-white transition-all cursor-pointer"
                              >
                                AKOLEVIP (15% OFF)
                              </button>
                            )}
                          </div>

                          <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-1">
                            <input
                              type="text"
                              placeholder="Enter coupon code"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              className="flex-1 bg-white border border-[#C5D4C2] rounded-xl px-3 py-1.5 text-xs text-[#1E2621] focus:outline-none focus:border-[#1E2621]"
                            />
                            <button
                              type="submit"
                              className="px-4 py-1.5 bg-[#1E2621] text-white text-xs font-medium rounded-xl hover:bg-black transition-colors"
                            >
                              Apply
                            </button>
                          </form>

                          {couponMsg.text && (
                            <p className={`text-[11px] ${couponMsg.isError ? 'text-rose-500' : 'text-emerald-700'} font-medium`}>
                              {couponMsg.text}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. GLOSSY SUMMARY & BOTTOM CTA BUTTON - EXACT MATCH TO IMAGE */}
              {cartItems.length > 0 && (
                <div className="relative z-10 px-6 pb-6 pt-3 space-y-4 shrink-0">
                  
                  {/* Glossy Glass Summary Container */}
                  <div className="rounded-[28px] bg-[#E2E9DB]/90 backdrop-blur-xl border border-white/80 p-5 space-y-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                    <div className="flex justify-between items-center text-sm font-normal text-[#48594B]">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#1E2621]">₹{subtotal.toFixed(subtotal % 1 === 0 ? 0 : 2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between items-center text-sm font-medium text-[#20571C]">
                        <span>Discount ({appliedCoupon})</span>
                        <span>-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm font-normal text-[#48594B]">
                      <span>Delivery</span>
                      <span className="px-3 py-0.5 rounded-full bg-[#D4F4CE] text-[#20571C] font-semibold text-xs border border-white/60">
                        Free
                      </span>
                    </div>

                    {taxAmount > 0 && (
                      <div className="flex justify-between items-center text-xs text-[#606E64]">
                        <span>Taxes & GST (5%)</span>
                        <span>₹{taxAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 text-lg font-bold text-[#1E2621]">
                      <span>Total</span>
                      <span>₹{grandTotal.toFixed(grandTotal % 1 === 0 ? 0 : 2)}</span>
                    </div>
                  </div>

                  {/* Dark Rounded Pill Action Button */}
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-4 rounded-[28px] bg-[#1E2621] hover:bg-black text-white font-medium text-base shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue</span>
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
