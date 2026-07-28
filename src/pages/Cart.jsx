import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag, 
  FiPlus, 
  FiMinus, 
  FiTrash2, 
  FiTag, 
  FiCheckCircle, 
  FiArrowRight, 
  FiX, 
  FiMapPin, 
  FiEdit3, 
  FiCheck, 
  FiDownload, 
  FiShare2, 
  FiCoffee
} from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { createOrderAPI } from '../services/api';
import { getProductImage } from '../utils/imageHelper';

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    subtotal,
    discountAmount,
    taxAmount,
    grandTotal,
    totalItemsCount
  } = useCart();

  const { showToast } = useTheme();

  // Logged-in user from localStorage
  const loggedUser = (() => {
    try {
      const saved = localStorage.getItem('akole_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  })();

  const [couponCode, setCouponCode] = useState('');
  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery' | 'Takeaway' | 'Dine-In'
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('address'); // 'address' | 'receipt'
  
  // Saved Address System
  const [savedAddress, setSavedAddress] = useState(() => {
    try {
      const saved = localStorage.getItem('akole_saved_address');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isEditingAddress, setIsEditingAddress] = useState(() => {
    const saved = localStorage.getItem('akole_saved_address');
    return !saved; // If no saved address, open in edit mode
  });

  // Form State
  const [addressForm, setAddressForm] = useState({
    name: loggedUser?.name || savedAddress?.name || '',
    email: loggedUser?.email || savedAddress?.email || '',
    phone: loggedUser?.phone || savedAddress?.phone || '',
    street: savedAddress?.street || '',
    area: savedAddress?.area || '',
    city: savedAddress?.city || 'Akole',
    landmark: savedAddress?.landmark || '',
    pincode: savedAddress?.pincode || '422601',
    paymentMethod: 'UPI / Google Pay / PhonePe',
    saveForFuture: true
  });

  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    if (savedAddress) {
      setAddressForm(prev => ({
        ...prev,
        name: prev.name || savedAddress.name,
        email: prev.email || savedAddress.email,
        phone: prev.phone || savedAddress.phone,
        street: savedAddress.street,
        area: savedAddress.area,
        city: savedAddress.city || 'Akole',
        landmark: savedAddress.landmark || '',
        pincode: savedAddress.pincode || '422601'
      }));
    }
  }, [savedAddress]);

  const handleApplyCoupon = (e) => {
    if (e) e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleQuickCoupon = (code) => {
    setCouponCode(code);
    const res = applyCoupon(code);
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  // Save Address Handler
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.phone || !addressForm.street) {
      showToast('Please fill in your name, phone number, and street address.', 'error');
      return;
    }

    const newAddressObj = {
      name: addressForm.name,
      email: addressForm.email,
      phone: addressForm.phone,
      street: addressForm.street,
      area: addressForm.area,
      city: addressForm.city,
      landmark: addressForm.landmark,
      pincode: addressForm.pincode
    };

    if (addressForm.saveForFuture) {
      localStorage.setItem('akole_saved_address', JSON.stringify(newAddressObj));
      setSavedAddress(newAddressObj);
    }
    setIsEditingAddress(false);
    showToast('Delivery address saved successfully!', 'success');
  };

  // Confirm Final Order Execution
  const handleConfirmOrder = async () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.street) {
      showToast('Please provide a complete delivery address.', 'error');
      setIsEditingAddress(true);
      return;
    }

    const fullFormattedAddress = `${addressForm.street}, ${addressForm.area ? addressForm.area + ', ' : ''}${addressForm.city} - ${addressForm.pincode}${addressForm.landmark ? ' (Landmark: ' + addressForm.landmark + ')' : ''}`;

    const orderPayload = {
      orderId: 'AKL-' + Math.floor(100000 + Math.random() * 900000),
      orderType: orderType,
      customerName: addressForm.name,
      customerEmail: addressForm.email || 'customer@akolecafe.com',
      customerPhone: addressForm.phone,
      deliveryAddress: fullFormattedAddress,
      items: cartItems.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: getProductImage(i) || i.image
      })),
      totalAmount: grandTotal,
      paymentMethod: addressForm.paymentMethod
    };

    setPlacingOrder(true);

    try {
      const response = await createOrderAPI(orderPayload);
      const createdOrder = response.order || response;
      
      setConfirmedOrder(createdOrder);
      setCheckoutStep('receipt');
      showToast('Order Placed Successfully! Sent to Kitchen & Admin Panel.', 'success');
    } catch (err) {
      showToast('Failed to place order: ' + err.message, 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleFinishCheckout = () => {
    setIsCheckoutOpen(false);
    clearCart();
    setCheckoutStep('address');
    setConfirmedOrder(null);
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  const handleShareReceipt = () => {
    if (!confirmedOrder) return;
    const text = `🛍️ *AKOLE CAFE OFFICIAL ORDER RECEIPT*\n\n` +
      `📌 *Order ID:* ${confirmedOrder.orderId}\n` +
      `👤 *Customer:* ${confirmedOrder.customerName}\n` +
      `📍 *Address:* ${confirmedOrder.deliveryAddress}\n` +
      `🍲 *Items:* ${confirmedOrder.items.map(i => i.name + ' (x' + i.quantity + ')').join(', ')}\n` +
      `💰 *Total Paid:* ₹${confirmedOrder.totalAmount}\n` +
      `💳 *Payment:* ${confirmedOrder.paymentMethod}\n\n` +
      `Thank you for ordering with Akole Cafe! ☕✨`;

    if (navigator.share) {
      navigator.share({
        title: `Akole Cafe Receipt - ${confirmedOrder.orderId}`,
        text: text
      }).catch(() => {});
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      showToast('Sharing order receipt on WhatsApp...', 'success');
    }
  };

  return (
    <>
      <PageBanner
        title="Your Shopping Cart"
        subtitle="Review Items, Delivery Address, & Complete Your Order"
        bgImage="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1920&q=80"
      />

      {/* SAGE PISTACHIO GLOSSY MESH SECTION */}
      <section 
        className="py-16 relative overflow-hidden bg-gradient-to-b from-[#F2F6ED] via-[#EDF3E7] to-[#E6EFE0]"
        style={{ color: '#1E2621' }}
      >
        {/* Ambient Light Glass Orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-white/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D5E4CE]/50 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-white/70 backdrop-blur-xl rounded-[32px] border border-white max-w-xl mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-[#4A5E4E] mb-4">
                <FiCoffee className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-3xl font-bold mb-2" style={{ color: '#1E2621' }}>Your Cart is Empty</h3>
              <p className="text-sm font-light max-w-md mx-auto mb-6" style={{ color: '#606E64' }}>
                Explore our artisanal coffees, traditional Maharashtrian misal, gourmet snacks & desserts to place your order.
              </p>
              <Button to="/menu" variant="gold" size="lg" icon={FiArrowRight} className="rounded-full shadow-md">
                Browse Cafe Menu
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#D8E3D2]">
                  <h3 className="text-2xl font-bold tracking-tight" style={{ color: '#1E2621' }}>
                    Cart Items ({totalItemsCount})
                  </h3>
                  <button
                    onClick={clearCart}
                    className="text-xs uppercase font-bold text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                  >
                    Clear All Items
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const itemImage = getProductImage(item) || item.image || item.imageUrl;

                    return (
                      <motion.div
                        layout
                        key={item.id}
                        className="bg-white/80 backdrop-blur-xl p-5 rounded-[28px] border border-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_6px_25px_rgba(0,0,0,0.03)] hover:shadow-md transition-all"
                      >
                        {/* Left Info: Image + Details */}
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-20 h-20 rounded-2xl bg-white p-1 border border-white shadow-sm shrink-0 overflow-hidden flex items-center justify-center">
                            <img
                              src={itemImage}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-xl"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getProductImage({ name: 'water' });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-base font-bold leading-tight" style={{ color: '#1E2621' }}>
                              {item.name}
                            </h4>
                            <span 
                              className="inline-block px-3 py-0.5 rounded-full border border-[#B3C5B0] text-[11px] font-medium bg-white/60"
                              style={{ color: '#48594B' }}
                            >
                              {(item.category || 'Standard').replace('-', ' ')}
                            </span>
                            <p className="font-bold text-base mt-1" style={{ color: '#1E2621' }}>
                              ₹{item.price}
                            </p>
                          </div>
                        </div>

                        {/* Right Actions: Circular Stepper + Line Total + Remove */}
                        <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0 border-[#D8E3D2]">
                          
                          {/* Pure White Circular Stepper */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full bg-white border border-white shadow-sm hover:shadow-md active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                              style={{ color: '#1E2621' }}
                              title="Decrease quantity"
                            >
                              <FiMinus className="w-3.5 h-3.5 stroke-[2.2]" />
                            </button>

                            <span className="w-6 text-center font-bold text-sm" style={{ color: '#1E2621' }}>
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full bg-white border border-white shadow-sm hover:shadow-md active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                              style={{ color: '#1E2621' }}
                              title="Increase quantity"
                            >
                              <FiPlus className="w-3.5 h-3.5 stroke-[2.2]" />
                            </button>
                          </div>

                          {/* Line Item Total */}
                          <span className="text-lg font-bold min-w-[70px] text-right" style={{ color: '#1E2621' }}>
                            ₹{item.price * item.quantity}
                          </span>

                          {/* Trash Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                            title="Remove Item"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Glossy Order Summary Panel */}
              <div className="lg:col-span-4">
                <div className="bg-[#E2E9DB]/95 backdrop-blur-2xl p-6 sm:p-7 rounded-[32px] border border-white shadow-[0_12px_40px_rgba(0,0,0,0.05)] sticky top-28 space-y-5">
                  <h3 className="text-2xl font-bold border-b border-[#C8D6C3] pb-3" style={{ color: '#1E2621' }}>
                    Order Summary
                  </h3>

                  {/* Order Mode Selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold mb-2.5" style={{ color: '#48594B' }}>
                      Fulfillment Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Delivery', 'Takeaway', 'Dine-In'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setOrderType(mode)}
                          className={`py-2 px-2 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                            orderType === mode
                              ? 'bg-white text-[#1E2621] border-white shadow-md'
                              : 'bg-white/40 text-[#48594B] border-white/60 hover:bg-white/70'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Promo Code Input & Chips */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-bold flex items-center gap-1" style={{ color: '#48594B' }}>
                      <FiTag className="text-[#1E2621]" /> Promo Code
                    </label>

                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                      <button
                        type="button"
                        onClick={() => handleQuickCoupon('AKOLE20')}
                        className="px-3 py-1 rounded-full bg-white/70 border border-[#B3C5B0] text-[11px] font-bold hover:bg-[#1E2621] hover:text-white transition-all shrink-0 cursor-pointer"
                        style={{ color: '#1E2621' }}
                      >
                        AKOLE20 (20% OFF)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickCoupon('AKOLEVIP')}
                        className="px-3 py-1 rounded-full bg-white/70 border border-[#B3C5B0] text-[11px] font-bold hover:bg-[#1E2621] hover:text-white transition-all shrink-0 cursor-pointer"
                        style={{ color: '#1E2621' }}
                      >
                        AKOLEVIP (15% OFF)
                      </button>
                    </div>

                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter Promo Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-white border border-[#C5D4C2] rounded-2xl py-2 px-3 text-xs text-[#1E2621] placeholder-gray-400 focus:outline-none focus:border-[#1E2621] uppercase"
                      />
                      <button
                        type="submit"
                        className="py-2 px-4 rounded-2xl bg-[#1E2621] text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors shrink-0 cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>

                    {appliedCoupon && (
                      <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 pt-1">
                        <FiCheckCircle /> Promo Code {appliedCoupon} Active!
                      </p>
                    )}
                  </div>

                  {/* Pricing Breakdown Box */}
                  <div className="space-y-2.5 text-xs border-t border-b border-[#C8D6C3] py-4 text-[#48594B] font-medium">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold" style={{ color: '#1E2621' }}>₹{subtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Promo Discount</span>
                        <span>- ₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span>Delivery</span>
                      <span className="px-3 py-0.5 rounded-full bg-[#D4F4CE] text-[#20571C] font-semibold text-xs border border-white/60">
                        Free
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>GST & Taxes (5%)</span>
                      <span className="font-bold" style={{ color: '#1E2621' }}>₹{taxAmount}</span>
                    </div>

                    <div className="flex justify-between text-base font-bold pt-2 border-t border-[#C8D6C3]" style={{ color: '#1E2621' }}>
                      <span>Grand Total</span>
                      <span className="text-xl font-bold" style={{ color: '#1E2621' }}>₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Action Checkout Button */}
                  <button
                    onClick={() => {
                      setCheckoutStep('address');
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-4 rounded-[28px] bg-[#1E2621] hover:bg-black text-white font-bold text-base shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FiShoppingBag className="w-5 h-5" />
                    <span>Proceed to Checkout (₹{grandTotal})</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* CHECKOUT & COLORFUL RECEIPT MODAL */}
          <AnimatePresence>
            {isCheckoutOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCheckoutOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative z-10 w-full max-w-lg bg-[#0C1E14]/95 backdrop-blur-2xl border-2 border-[#D6AE4D]/60 rounded-3xl p-6 sm:p-8 text-white shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-y-auto max-h-[92vh]"
                >
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="absolute top-5 right-5 text-white/60 hover:text-[#D6AE4D] transition-colors p-1 cursor-pointer"
                  >
                    <FiX className="w-6 h-6 stroke-[2.2]" />
                  </button>

                  {/* STEP 2: COLORFUL ORDER CONFIRMATION RECEIPT */}
                  {checkoutStep === 'receipt' && confirmedOrder ? (
                    <div className="space-y-6">
                      {/* Vibrant Banner */}
                      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#183B2A] via-[#123524] to-[#0A1A11] text-white shadow-2xl relative overflow-hidden border-2 border-[#D6AE4D]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-3 py-0.5 rounded-full bg-[#D6AE4D]/20 text-[#D6AE4D] text-[10px] font-extrabold uppercase tracking-widest border border-[#D6AE4D]/40">
                            ORDER CONFIRMED & SENT TO KITCHEN
                          </span>
                          <span className="font-mono text-xs font-extrabold text-[#D6AE4D]">{confirmedOrder.orderId}</span>
                        </div>

                        <h3 className="text-2xl font-extrabold text-white mb-1">
                          Thank you, {confirmedOrder.customerName}!
                        </h3>
                        <p className="text-xs text-emerald-300 font-medium">
                          Fulfillment: {orderType} • Preparation Started ☕🍕
                        </p>
                      </div>

                      {/* Order Receipt Details Table */}
                      <div className="p-6 rounded-2xl bg-[#07140D] border border-[#D6AE4D]/35 text-xs space-y-3">
                        <div className="flex items-center justify-between border-b border-[#D6AE4D]/20 pb-2">
                          <span className="text-[#D6AE4D] uppercase font-bold tracking-wider text-[10px]">Customer Name</span>
                          <span className="font-bold text-white text-sm">{confirmedOrder.customerName}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-[#D6AE4D]/20 pb-2">
                          <span className="text-[#D6AE4D] uppercase font-bold tracking-wider text-[10px]">Contact Phone</span>
                          <span className="font-medium text-white">{confirmedOrder.customerPhone}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-[#D6AE4D]/20 pb-2">
                          <span className="text-[#D6AE4D] uppercase font-bold tracking-wider text-[10px]">Delivery Address</span>
                          <span className="font-medium text-white text-right line-clamp-2 max-w-xs">
                            {confirmedOrder.deliveryAddress}
                          </span>
                        </div>

                        <div className="border-b border-[#D6AE4D]/20 pb-2">
                          <span className="text-[#D6AE4D] uppercase font-bold tracking-wider text-[10px] block mb-1">Ordered Items</span>
                          <div className="space-y-1">
                            {confirmedOrder.items && confirmedOrder.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between font-medium text-white/90">
                                <span>• {it.name} (x{it.quantity})</span>
                                <span className="text-[#D6AE4D] font-bold">₹{it.price * it.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b border-[#D6AE4D]/20 pb-2">
                          <span className="text-[#D6AE4D] uppercase font-bold tracking-wider text-[10px]">Payment Method</span>
                          <span className="font-bold text-emerald-400">{confirmedOrder.paymentMethod}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-white uppercase tracking-wider font-extrabold text-xs">Total Paid</span>
                          <span className="font-serif text-xl font-extrabold text-[#D6AE4D]">
                            ₹{confirmedOrder.totalAmount}
                          </span>
                        </div>
                      </div>

                      {/* Download & Share Actions */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          onClick={handleDownloadReceipt}
                          className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#123524] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg border border-[#F0D89E] cursor-pointer"
                        >
                          <FiDownload className="text-base text-[#123524]" /> Download Receipt
                        </button>

                        <button
                          onClick={handleShareReceipt}
                          className="py-3 px-4 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:bg-emerald-500 transition-colors cursor-pointer"
                        >
                          <FiShare2 className="text-base" /> Share Order
                        </button>
                      </div>

                      <button 
                        onClick={handleFinishCheckout} 
                        className="w-full py-3.5 rounded-2xl bg-[#D6AE4D] text-[#123524] font-black text-xs uppercase tracking-wider shadow-lg hover:bg-white transition-all cursor-pointer"
                      >
                        Done & Return to Homepage
                      </button>
                    </div>
                  ) : (
                    /* STEP 1: ADDRESS DETAILS & PAYMENT SELECTION */
                    <div className="space-y-5 text-xs">
                      <div className="text-center mb-4 border-b border-[#D6AE4D]/30 pb-4">
                        <span className="text-[10px] uppercase tracking-[2px] text-[#D6AE4D] block font-extrabold">
                          ORDER FULFILLMENT & ADDRESS
                        </span>
                        <h3 className="font-serif text-2xl font-extrabold text-white">Delivery & Payment Details</h3>
                        <p className="text-xs text-[#D6AE4D] font-bold mt-1">Total Payable: ₹{grandTotal}</p>
                      </div>

                      {/* SAVED ADDRESS CARD VS EDIT FORM */}
                      {savedAddress && !isEditingAddress ? (
                        <div className="p-5 rounded-2xl bg-[#07140D] border-2 border-[#D6AE4D]/50 relative space-y-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-3 py-1 rounded-full bg-[#D6AE4D]/20 text-[#D6AE4D] text-[10px] uppercase font-black tracking-wider border border-[#D6AE4D]/40 flex items-center gap-1.5">
                              <FiMapPin className="text-[#D6AE4D]" /> Saved Primary Address
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsEditingAddress(true)}
                              className="text-[#D6AE4D] hover:underline flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer"
                            >
                              <FiEdit3 /> Edit Address
                            </button>
                          </div>

                          <div className="font-bold text-base text-white">{savedAddress.name}</div>
                          <div className="text-white/70 text-xs font-medium">{savedAddress.phone} • {savedAddress.email}</div>
                          <div className="text-white text-xs mt-2 font-semibold leading-relaxed">
                            {savedAddress.street}, {savedAddress.area ? savedAddress.area + ', ' : ''}{savedAddress.city} - {savedAddress.pincode}
                          </div>
                          {savedAddress.landmark && (
                            <div className="text-[#D6AE4D] text-xs mt-1 font-medium">Landmark: {savedAddress.landmark}</div>
                          )}
                        </div>
                      ) : (
                        /* ADDRESS EDIT / FIRST TIME FORM */
                        <form onSubmit={handleSaveAddress} className="space-y-4 p-5 rounded-2xl bg-[#07140D] border-2 border-[#D6AE4D]/50">
                          <div className="flex items-center justify-between border-b border-[#D6AE4D]/30 pb-2">
                            <span className="text-[#D6AE4D] font-extrabold uppercase tracking-wider text-xs">
                              {savedAddress ? 'Edit Delivery Address' : '1st Time Delivery Address'}
                            </span>
                            {savedAddress && (
                              <button
                                type="button"
                                onClick={() => setIsEditingAddress(false)}
                                className="text-white/60 hover:text-white text-xs font-bold cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[#D6AE4D] font-extrabold uppercase text-[10px] tracking-wider mb-1">Full Name *</label>
                              <input
                                type="text"
                                required
                                value={addressForm.name}
                                onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                                className="w-full p-3 rounded-2xl bg-[#0C1E14] border border-[#D6AE4D]/40 text-white font-semibold text-xs focus:outline-none focus:border-[#D6AE4D]"
                                placeholder="e.g. Mayur Gambhire"
                              />
                            </div>
                            <div>
                              <label className="block text-[#D6AE4D] font-extrabold uppercase text-[10px] tracking-wider mb-1">Phone Number *</label>
                              <input
                                type="tel"
                                required
                                value={addressForm.phone}
                                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                className="w-full p-3 rounded-2xl bg-[#0C1E14] border border-[#D6AE4D]/40 text-white font-semibold text-xs focus:outline-none focus:border-[#D6AE4D]"
                                placeholder="+91 98765 43210"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[#D6AE4D] font-extrabold uppercase text-[10px] tracking-wider mb-1">Flat / House No / Street Address *</label>
                            <input
                              type="text"
                              required
                              value={addressForm.street}
                              onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                              className="w-full p-3 rounded-2xl bg-[#0C1E14] border border-[#D6AE4D]/40 text-white font-semibold text-xs focus:outline-none focus:border-[#D6AE4D]"
                              placeholder="House 42, Main Market Road"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[#D6AE4D] font-extrabold uppercase text-[10px] tracking-wider mb-1">Locality / Area</label>
                              <input
                                type="text"
                                value={addressForm.area}
                                onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                                className="w-full p-3 rounded-2xl bg-[#0C1E14] border border-[#D6AE4D]/40 text-white font-semibold text-xs focus:outline-none focus:border-[#D6AE4D]"
                                placeholder="Near Bus Stand"
                              />
                            </div>
                            <div>
                              <label className="block text-[#D6AE4D] font-extrabold uppercase text-[10px] tracking-wider mb-1">Landmark</label>
                              <input
                                type="text"
                                value={addressForm.landmark}
                                onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                                className="w-full p-3 rounded-2xl bg-[#0C1E14] border border-[#D6AE4D]/40 text-white font-semibold text-xs focus:outline-none focus:border-[#D6AE4D]"
                                placeholder="Opp. SBI Bank"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="saveForFuture"
                              checked={addressForm.saveForFuture}
                              onChange={(e) => setAddressForm({ ...addressForm, saveForFuture: e.target.checked })}
                              className="w-4 h-4 accent-[#D6AE4D] rounded cursor-pointer"
                            />
                            <label htmlFor="saveForFuture" className="text-white/90 text-xs font-medium cursor-pointer">
                              Save address for fast 1-click future orders
                            </label>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#123524] font-montserrat font-extrabold uppercase tracking-wider text-xs shadow-lg border border-[#F0D89E]/60 cursor-pointer hover:brightness-105 active:scale-95 transition-all"
                          >
                            Save Address
                          </button>
                        </form>
                      )}

                      {/* PAYMENT METHOD SELECTOR */}
                      <div className="pt-2 space-y-2">
                        <label className="block text-[#D6AE4D] font-extrabold uppercase tracking-wider text-[11px]">
                          Select Payment Method
                        </label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {[
                            'UPI / Google Pay / PhonePe',
                            'Credit / Debit Card',
                            'Cash on Delivery'
                          ].map((pm) => (
                            <button
                              key={pm}
                              type="button"
                              onClick={() => setAddressForm({ ...addressForm, paymentMethod: pm })}
                              className={`py-3 px-2 rounded-2xl text-[10px] font-extrabold uppercase tracking-wider transition-all border text-center cursor-pointer ${
                                addressForm.paymentMethod === pm
                                  ? 'bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#123524] border-[#F0D89E] shadow-lg scale-[1.02]'
                                  : 'bg-[#07140D] text-white/80 border-[#D6AE4D]/35 hover:border-[#D6AE4D]'
                              }`}
                            >
                              {pm}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* FINAL SUBMIT ORDER BUTTON */}
                      <form onSubmit={(e) => { e.preventDefault(); handleConfirmOrder(); }} className="pt-2">
                        <button
                          type="submit"
                          disabled={placingOrder}
                          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] hover:brightness-110 text-[#123524] font-montserrat font-black text-xs uppercase tracking-[2px] shadow-xl shadow-[#C8A96A]/25 border border-[#F0D89E] cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <FiCheck className="w-4 h-4" />
                          <span>{placingOrder ? 'Processing Order...' : `Confirm Order & Pay ₹${grandTotal}`}</span>
                        </button>
                      </form>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
};

export default Cart;
