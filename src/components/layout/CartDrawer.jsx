import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Sparkles, Tag, ShoppingCart, Award, Edit3 } from 'lucide-react';
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
  const [cookingNote, setCookingNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

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

  const handleCheckoutClick = () => {
    onClose();
    navigate('/cart');
  };

  // VIP Gold Reward Points Calculation
  const pointsEarned = Math.round(grandTotal * 0.1);

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
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Right Slide-Over Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-4">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="w-full max-w-full sm:max-w-md bg-[#0C1E14]/95 backdrop-blur-2xl border-l-2 border-[#D6AE4D]/50 shadow-2xl text-white flex flex-col justify-between overflow-hidden"
            >
              
              {/* 1. ULTRA-LUXURY TOP HEADER */}
              <div className="px-6 py-5 bg-gradient-to-r from-[#0C1E14] via-[#143322] to-[#0A1A11] border-b-2 border-[#D6AE4D]/40 flex items-center justify-between shrink-0 shadow-2xl relative">
                
                {/* Header Title & Icon */}
                <div className="flex items-center gap-3.5">
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-2xl bg-[#D6AE4D]/30 blur-md group-hover:blur-lg transition-all" />
                    <div className="relative w-11 h-11 rounded-2xl bg-[#0A1A11] border-2 border-[#D6AE4D]/60 flex items-center justify-center text-[#D6AE4D] shadow-xl backdrop-blur-xl">
                      <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif font-extrabold text-lg sm:text-xl text-white tracking-wide">
                        VIP Shopping Bag
                      </h2>
                      {totalItemsCount > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#0C1E14] font-montserrat font-black text-[10px] uppercase tracking-wider shadow-md">
                          {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] text-[#D6AE4D] font-mono font-extrabold uppercase tracking-[2px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D6AE4D]" />
                      <span>AKOLE CAFÉ EXECUTIVE CHECKOUT</span>
                    </p>
                  </div>
                </div>

                {/* 100% Geometric Glass Circle Close Button */}
                <button
                  onClick={onClose}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', minWidth: '38px', minHeight: '38px' }}
                  className="bg-[#0A1A11]/80 hover:bg-[#D6AE4D] text-[#D6AE4D] hover:text-[#0C1E14] border-2 border-[#D6AE4D]/50 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(214,174,77,0.6)] cursor-pointer"
                  aria-label="Close Cart Drawer"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* 2. DRAWER MAIN SCROLLABLE BODY */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {cartItems.length === 0 ? (
                  /* Ultra-Luxury 5-Star Empty Cart State */
                  <div className="h-full min-h-[420px] flex flex-col items-center justify-center text-center p-6 space-y-5 my-auto">
                    
                    {/* Glowing Glass Icon Badge */}
                    <div className="relative group">
                      <div className="absolute inset-0 rounded-full bg-[#D6AE4D]/30 blur-2xl group-hover:blur-3xl transition-all" />
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-[#143322] to-[#0A1A11] border-2 border-[#D6AE4D] shadow-[0_0_35px_rgba(214,174,77,0.4)] backdrop-blur-2xl flex items-center justify-center text-[#D6AE4D]">
                        <ShoppingCart className="w-10 h-10 stroke-[2]" />
                      </div>
                    </div>

                    {/* Tag Badge */}
                    <div>
                      <span className="px-4 py-1.5 rounded-full bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 text-[#D6AE4D] text-[10px] font-black uppercase tracking-[3px] shadow-inner">
                        YOUR BAG IS EMPTY
                      </span>
                    </div>

                    {/* Typography */}
                    <div className="space-y-2 max-w-xs mx-auto">
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                        Your Shopping Cart is Empty
                      </h3>
                      <p className="text-xs text-[#A0B0A5] font-light leading-relaxed">
                        Explore our artisanal coffees, traditional Maharashtrian misal, pedha & gourmet delicacies.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        onClose();
                        navigate('/menu');
                      }}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] hover:from-[#E5BC58] hover:via-[#FFF3C4] hover:to-[#C99D3B] text-[#0C1E14] font-montserrat font-black text-xs uppercase tracking-[2px] shadow-2xl shadow-[#D6AE4D]/35 border border-[#FFF5D6]/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#0C1E14] stroke-[2.5]" />
                      <span>EXPLORE CAFE MENU</span>
                    </button>
                  </div>
                ) : (
                  /* Cart Items List with 7-Star Executive VIP Layout */
                  <div className="space-y-3.5">
                    
                    {/* VIP REWARD BANNER (RE-DESIGNED EXECUTIVE STYLE) */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#183B2A] via-[#123524] to-[#0E291C] border-2 border-[#D6AE4D]/40 p-3.5 shadow-xl backdrop-blur-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#D6AE4D]/20 border border-[#D6AE4D]/50 flex items-center justify-center text-[#D6AE4D] shadow-md shrink-0">
                          <Award className="w-4.5 h-4.5 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-[2.5px] text-[#D6AE4D] block">
                            VIP GOLD REWARD PERK
                          </span>
                          <p className="text-xs text-white font-medium">
                            You earn <strong className="text-[#D6AE4D] font-extrabold">+{pointsEarned} Gold Points</strong> on this order!
                          </p>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#0C1E14] font-montserrat font-black text-[10px] uppercase tracking-wider shadow-md shrink-0">
                        10% BACK
                      </span>
                    </div>

                    {/* CART ITEM CARDS (RE-DESIGNED 7-STAR EXECUTIVE CARDS) */}
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-r from-[#122E1F] via-[#0F261A] to-[#0A1A11] border-2 border-[#D6AE4D]/40 hover:border-[#D6AE4D] shadow-xl backdrop-blur-xl flex items-center gap-3.5 transition-all duration-300 group"
                      >
                        {/* Vertical Metallic Gold Accent Line */}
                        <div className="w-1.5 h-14 rounded-full bg-gradient-to-b from-[#D6AE4D] via-[#FFF3C4] to-[#B89035] shadow-[0_0_10px_rgba(214,174,77,0.5)] shrink-0" />

                        {/* Item Thumbnail */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D6AE4D]/50 shadow-md shrink-0 bg-[#0A1A11] group-hover:scale-105 transition-transform"
                        />

                        {/* Item Details */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif font-extrabold text-sm text-white leading-snug truncate pr-1">
                              {item.name}
                            </h4>

                            {/* Delete Trash Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-7 h-7 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 flex items-center justify-center transition-all cursor-pointer shrink-0"
                              title="Remove item from bag"
                            >
                              <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-0.5">
                            {/* Sleek Pill Stepper (- 1 +) */}
                            <div className="flex items-center bg-[#07140D] border-2 border-[#D6AE4D]/50 rounded-xl px-2 py-0.5 shadow-inner gap-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 rounded-lg hover:bg-[#D6AE4D] hover:text-[#0C1E14] text-white/90 font-bold transition-all flex items-center justify-center text-xs cursor-pointer"
                              >
                                <Minus className="w-3 h-3 stroke-[2.5]" />
                              </button>

                              <span className="w-6 text-center text-xs font-black text-[#D6AE4D] font-mono">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 rounded-lg hover:bg-[#D6AE4D] hover:text-[#0C1E14] text-[#D6AE4D] font-bold transition-all flex items-center justify-center text-xs cursor-pointer"
                              >
                                <Plus className="w-3 h-3 stroke-[2.5]" />
                              </button>
                            </div>

                            {/* Total Item Price */}
                            <span className="font-serif text-base font-extrabold text-[#D6AE4D]">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. DRAWER BOTTOM SUMMARY FOOTER */}
              {cartItems.length > 0 && (
                <div className="p-4 sm:p-5 bg-gradient-to-b from-[#143322] to-[#0A1A11] border-t-2 border-[#D6AE4D]/50 space-y-4 shrink-0 shadow-2xl backdrop-blur-2xl">
                  
                  {/* Express Delivery Banner */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-[#D6AE4D]/15 via-[#F3E5AB]/10 to-transparent border border-[#D6AE4D]/35 flex items-center justify-between text-[#D6AE4D]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_10px_#34d399]" />
                      <span className="font-extrabold text-[10px] uppercase tracking-[1.5px]">
                        FREE Express Cafe Delivery (20-30 Mins)
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-[#D6AE4D] bg-[#D6AE4D]/20 px-2 py-0.5 rounded-md border border-[#D6AE4D]/40">
                      LIVE
                    </span>
                  </div>

                  {/* 1-Click Quick Suggest Promo Coupon Chips */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-wider text-[#D6AE4D]">
                      <span>AVAILABLE VIP PROMO OFFERS</span>
                      <span className="text-white/40 text-[9px] font-normal font-mono">1-TAP APPLY</span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                      <button
                        type="button"
                        onClick={() => handleQuickCoupon('AKOLE20')}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D6AE4D]/20 to-[#F3E5AB]/20 border border-[#D6AE4D]/50 text-[#D6AE4D] font-black text-[10px] hover:bg-[#D6AE4D] hover:text-[#0C1E14] transition-all cursor-pointer shrink-0 shadow-md flex items-center gap-1.5 group"
                      >
                        <Tag className="w-3 h-3 group-hover:scale-110 transition-transform" />
                        <span>AKOLE20 (20% OFF)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickCoupon('AKOLEVIP')}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D6AE4D]/20 to-[#F3E5AB]/20 border border-[#D6AE4D]/50 text-[#D6AE4D] font-black text-[10px] hover:bg-[#D6AE4D] hover:text-[#0C1E14] transition-all cursor-pointer shrink-0 shadow-md flex items-center gap-1.5 group"
                      >
                        <Tag className="w-3 h-3 group-hover:scale-110 transition-transform" />
                        <span>AKOLEVIP (15% OFF)</span>
                      </button>
                    </div>
                  </div>

                  {/* Coupon Promo Input Bar */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-[#D6AE4D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Enter Promo Code (e.g. AKOLE20)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full bg-[#07140D] border-2 border-[#D6AE4D]/50 rounded-2xl py-2.5 pl-10 pr-3 text-xs font-semibold text-white placeholder-white/40 focus:outline-none focus:border-[#D6AE4D] shadow-inner"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#0C1E14] font-montserrat font-black text-xs rounded-2xl hover:scale-105 transition-all cursor-pointer uppercase tracking-wider shadow-lg shrink-0"
                    >
                      Apply
                    </button>
                  </form>

                  {couponMsg.text && (
                    <p className={`text-[10px] ${couponMsg.isError ? 'text-rose-400' : 'text-emerald-400'} font-bold px-1`}>
                      {couponMsg.text}
                    </p>
                  )}

                  {/* Summary Rows Card */}
                  <div className="p-3.5 rounded-2xl bg-[#07140D]/80 border border-[#D6AE4D]/30 space-y-2 text-xs text-white/80">
                    <div className="flex justify-between">
                      <span className="text-white/70">Subtotal</span>
                      <span className="font-bold text-white font-mono">₹{subtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-extrabold">
                        <span>Discount Promo ({appliedCoupon})</span>
                        <span className="font-mono">-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-white/60 text-[11px]">
                      <span>Taxes & GST (5%)</span>
                      <span className="font-mono">₹{taxAmount}</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-[#D6AE4D]/40 pt-2.5 text-sm">
                      <span className="font-bold text-white font-serif tracking-wide">Grand Total</span>
                      <span className="font-serif text-xl font-black text-[#D6AE4D] drop-shadow-md">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Royal Gold Checkout Action Button */}
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] hover:from-[#E5BC58] hover:via-[#FFF3C4] hover:to-[#C99D3B] text-[#0C1E14] font-montserrat font-black text-xs uppercase tracking-[2.5px] shadow-2xl shadow-[#D6AE4D]/40 border-2 border-[#FFF5D6]/80 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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
