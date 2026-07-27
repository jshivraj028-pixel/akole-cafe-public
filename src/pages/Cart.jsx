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
  FiPrinter, 
  FiPhone, 
  FiMail, 
  FiCreditCard, 
  FiGrid,
  FiCoffee
} from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { createOrderAPI } from '../services/api';

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
    const saved = localStorage.getItem('akole_user');
    return saved ? JSON.parse(saved) : null;
  })();

  const [couponCode, setCouponCode] = useState('');
  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery' | 'Takeaway' | 'Dine-In'
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('address'); // 'address' | 'receipt'
  
  // Saved Address System
  const [savedAddress, setSavedAddress] = useState(() => {
    const saved = localStorage.getItem('akole_saved_address');
    return saved ? JSON.parse(saved) : null;
  });

  const [isEditingAddress, setIsEditingAddress] = useState(() => {
    const saved = localStorage.getItem('akole_saved_address');
    return !saved; // If no saved address, open in edit mode (1st time user)
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
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
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
    const fullAddressObj = {
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
      localStorage.setItem('akole_saved_address', JSON.stringify(fullAddressObj));
      setSavedAddress(fullAddressObj);
    }
    setIsEditingAddress(false);
    showToast('Delivery Address Saved!', 'success');
  };

  // Submit & Place Order to MongoDB Atlas Backend
  const handlePlaceOrderSubmit = async (e) => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.phone) {
      showToast('Please enter your contact details.', 'error');
      return;
    }

    const fullFormattedAddress = `${addressForm.street}, ${addressForm.area ? addressForm.area + ', ' : ''}${addressForm.city} - ${addressForm.pincode} (Landmark: ${addressForm.landmark || 'N/A'})`;

    const orderPayload = {
      customerName: addressForm.name,
      customerEmail: addressForm.email || 'customer@akolecafe.com',
      customerPhone: addressForm.phone,
      deliveryAddress: fullFormattedAddress,
      items: cartItems.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image
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

  // Download Receipt via Print
  const handleDownloadReceipt = () => {
    window.print();
  };

  // Share Receipt via WhatsApp
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

      <section className="py-16 bg-secondary">
        <Container>
          {cartItems.length === 0 ? (
            <div className="text-center py-20 glass-card rounded-3xl border border-accent-gold/20 max-w-xl mx-auto shadow-luxury flex flex-col items-center">
              <FiCoffee className="w-16 h-16 text-[#D6AE4D] mb-4 stroke-[1.5]" />
              <h3 className="font-serif text-3xl font-bold text-primary mb-2">Your Cart is Empty</h3>
              <p className="text-sm text-dark/70 font-light max-w-md mx-auto mb-6">
                Explore our selection of handcrafted 24k gold lattes, sourdough pizzas, and Venetian desserts to place your order.
              </p>
              <Button to="/menu" variant="gold" size="lg" icon={FiArrowRight}>
                Browse Cafe Menu
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-accent-gold/20">
                  <h3 className="font-serif text-2xl font-bold text-primary">
                    Cart Items ({totalItemsCount})
                  </h3>
                  <button
                    onClick={clearCart}
                    className="text-xs uppercase font-semibold text-red-600 hover:underline"
                  >
                    Clear All Items
                  </button>
                </div>

                {cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="glass-card p-4 rounded-2xl border border-accent-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-luxury"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl shrink-0"
                      />
                      <div>
                        <h4 className="font-serif text-base font-bold text-primary">{item.name}</h4>
                        <span className="text-xs text-accent-goldDark font-medium capitalize">{item.category.replace('-', ' ')}</span>
                        <p className="font-semibold text-primary text-sm mt-1">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0 border-accent-gold/15">
                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-xl border border-accent-gold/30 bg-secondary/80 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-dark hover:bg-accent-gold hover:text-primary transition-colors"
                        >
                          <FiMinus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-dark">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-dark hover:bg-accent-gold hover:text-primary transition-colors"
                        >
                          <FiPlus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-serif text-lg font-bold text-primary">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove Item"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Order Summary & Checkout */}
              <div className="lg:col-span-4">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-accent-gold/40 shadow-2xl bg-primary text-secondary sticky top-28">
                  <h3 className="font-serif text-2xl font-bold text-accent-gold mb-4 border-b border-accent-gold/20 pb-3">
                    Order Summary
                  </h3>

                  {/* Order Mode Selector */}
                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2">
                      Fulfillment Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Delivery', 'Takeaway', 'Dine-In'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setOrderType(mode)}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${
                            orderType === mode
                              ? 'bg-gold-gradient text-primary border-accent-gold shadow-gold'
                              : 'bg-primary-dark/60 text-secondary/70 border-accent-gold/20'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyCoupon} className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-1.5 flex items-center gap-1">
                      <FiTag className="text-accent-gold" /> Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try 'AKOLE20'"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2 px-3 text-xs text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent-gold uppercase"
                      />
                      <button
                        type="submit"
                        className="py-2 px-4 rounded-xl bg-gold-gradient text-primary font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedCoupon && (
                      <p className="text-[11px] text-emerald-400 font-medium mt-1.5">
                        ✓ Promo Code {appliedCoupon} Active!
                      </p>
                    )}
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2.5 text-xs border-t border-b border-accent-gold/20 py-4 mb-6 text-secondary/80 font-light">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-secondary">₹{subtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Promo Discount</span>
                        <span>- ₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>GST (5%)</span>
                      <span className="font-semibold text-secondary">₹{taxAmount}</span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-accent-gold pt-2 border-t border-accent-gold/20">
                      <span>Grand Total</span>
                      <span className="font-serif text-xl text-accent-gold">₹{grandTotal}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setCheckoutStep('address');
                      setIsCheckoutOpen(true);
                    }}
                    variant="gold"
                    size="lg"
                    className="w-full"
                    icon={FiShoppingBag}
                  >
                    Proceed to Checkout (₹{grandTotal})
                  </Button>
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
                  className="fixed inset-0 bg-black/85 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative z-10 w-full max-w-lg bg-primary border border-accent-gold/40 rounded-3xl p-6 sm:p-8 text-secondary shadow-2xl overflow-y-auto max-h-[90vh]"
                >
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="absolute top-4 right-4 text-secondary/60 hover:text-accent-gold"
                  >
                    <FiX className="w-6 h-6" />
                  </button>

                  {/* STEP 2: COLORFUL ORDER CONFIRMATION RECEIPT */}
                  {checkoutStep === 'receipt' && confirmedOrder ? (
                    <div className="space-y-6">
                      {/* Vibrant Banner */}
                      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 text-white shadow-2xl relative overflow-hidden border border-white/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-3 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest border border-white/40">
                            ORDER CONFIRMED & SENT TO KITCHEN
                          </span>
                          <span className="font-mono text-xs font-bold text-amber-200">{confirmedOrder.orderId}</span>
                        </div>

                        <h3 className="font-serif text-2xl font-extrabold text-white mb-1">
                          Thank you, {confirmedOrder.customerName}!
                        </h3>
                        <p className="text-xs text-emerald-100 font-medium">
                          Fulfillment: {orderType} • Preparation Started ☕🍕
                        </p>
                      </div>

                      {/* Order Receipt Details Table */}
                      <div className="p-6 rounded-2xl bg-primary-dark/90 border border-accent-gold/30 text-xs space-y-3">
                        <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                          <span className="text-secondary/60 uppercase tracking-wider">Customer Name</span>
                          <span className="font-bold text-secondary text-sm">{confirmedOrder.customerName}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                          <span className="text-secondary/60 uppercase tracking-wider">Contact Phone</span>
                          <span className="font-medium text-accent-gold">{confirmedOrder.customerPhone}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                          <span className="text-secondary/60 uppercase tracking-wider">Delivery Address</span>
                          <span className="font-medium text-secondary text-right line-clamp-2 max-w-xs">
                            {confirmedOrder.deliveryAddress}
                          </span>
                        </div>

                        <div className="border-b border-accent-gold/15 pb-2">
                          <span className="text-secondary/60 uppercase tracking-wider block mb-1">Ordered Items</span>
                          <div className="space-y-1">
                            {confirmedOrder.items && confirmedOrder.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between font-medium text-secondary">
                                <span>• {it.name} (x{it.quantity})</span>
                                <span>₹{it.price * it.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                          <span className="text-secondary/60 uppercase tracking-wider">Payment Method</span>
                          <span className="font-bold text-emerald-400">{confirmedOrder.paymentMethod}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-secondary/60 uppercase tracking-wider font-bold">Total Paid</span>
                          <span className="font-serif text-xl font-extrabold text-accent-gold">
                            ₹{confirmedOrder.totalAmount}
                          </span>
                        </div>
                      </div>

                      {/* Download & Share Actions */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          onClick={handleDownloadReceipt}
                          className="py-3 px-4 rounded-xl bg-gold-gradient text-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold hover:opacity-90 transition-opacity"
                        >
                          <FiDownload className="text-base" /> Download Receipt
                        </button>

                        <button
                          onClick={handleShareReceipt}
                          className="py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:bg-emerald-500 transition-colors"
                        >
                          <FiShare2 className="text-base" /> Share Order
                        </button>
                      </div>

                      <Button onClick={handleFinishCheckout} variant="gold" size="lg" className="w-full">
                        Done & Return to Homepage
                      </Button>
                    </div>
                  ) : (
                    /* STEP 1: ADDRESS DETAILS & PAYMENT SELECTION */
                    <div className="space-y-4 text-xs">
                      <div className="text-center mb-4">
                        <span className="text-xs uppercase tracking-widest text-accent-gold block font-semibold">
                          ORDER FULFILLMENT & ADDRESS
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-secondary">Delivery & Payment Details</h3>
                        <p className="text-xs text-secondary/60">Total Payable: ₹{grandTotal}</p>
                      </div>

                      {/* SAVED ADDRESS CARD VS EDIT FORM */}
                      {savedAddress && !isEditingAddress ? (
                        <div className="p-4 rounded-2xl bg-secondary/10 border border-accent-gold/30 relative">
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold tracking-wider border border-emerald-500/40 flex items-center gap-1">
                              <FiMapPin /> Saved Delivery Address
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsEditingAddress(true)}
                              className="text-accent-gold hover:underline flex items-center gap-1 text-[11px] font-bold"
                            >
                              <FiEdit3 /> Edit Address
                            </button>
                          </div>

                          <div className="font-bold text-sm text-secondary">{savedAddress.name}</div>
                          <div className="text-secondary/70 text-[11px] mt-0.5">{savedAddress.phone} • {savedAddress.email}</div>
                          <div className="text-secondary/90 text-xs mt-2 font-medium">
                            {savedAddress.street}, {savedAddress.area ? savedAddress.area + ', ' : ''}{savedAddress.city} - {savedAddress.pincode}
                          </div>
                          {savedAddress.landmark && (
                            <div className="text-secondary/60 text-[11px] mt-1">Landmark: {savedAddress.landmark}</div>
                          )}
                        </div>
                      ) : (
                        /* ADDRESS EDIT / FIRST TIME FORM */
                        <form onSubmit={handleSaveAddress} className="space-y-3 p-4 rounded-2xl bg-secondary/10 border border-accent-gold/20">
                          <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2">
                            <span className="text-accent-gold font-bold uppercase tracking-wider">
                              {savedAddress ? 'Edit Delivery Address' : '1st Time Delivery Address'}
                            </span>
                            {savedAddress && (
                              <button
                                type="button"
                                onClick={() => setIsEditingAddress(false)}
                                className="text-secondary/60 hover:text-secondary text-[11px]"
                              >
                                Cancel
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-secondary/80 mb-1">Full Name *</label>
                              <input
                                type="text"
                                required
                                value={addressForm.name}
                                onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                                className="w-full p-2.5 rounded-xl bg-primary-dark/90 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                                placeholder="Rahul Patil"
                              />
                            </div>
                            <div>
                              <label className="block text-secondary/80 mb-1">Phone Number *</label>
                              <input
                                type="tel"
                                required
                                value={addressForm.phone}
                                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                className="w-full p-2.5 rounded-xl bg-primary-dark/90 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                                placeholder="+91 98765 43210"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-secondary/80 mb-1">Flat / House No / Street Address *</label>
                            <input
                              type="text"
                              required
                              value={addressForm.street}
                              onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                              className="w-full p-2.5 rounded-xl bg-primary-dark/90 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                              placeholder="House 42, Main Market Road"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-secondary/80 mb-1">Locality / Area</label>
                              <input
                                type="text"
                                value={addressForm.area}
                                onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                                className="w-full p-2.5 rounded-xl bg-primary-dark/90 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                                placeholder="Near Bus Stand"
                              />
                            </div>
                            <div>
                              <label className="block text-secondary/80 mb-1">Landmark</label>
                              <input
                                type="text"
                                value={addressForm.landmark}
                                onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                                className="w-full p-2.5 rounded-xl bg-primary-dark/90 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
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
                              className="w-4 h-4 accent-amber-500 rounded"
                            />
                            <label htmlFor="saveForFuture" className="text-secondary/80 cursor-pointer">
                              Save address for fast 1-click future orders
                            </label>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-gold-gradient text-primary font-bold uppercase tracking-wider text-xs shadow-gold hover:opacity-90 transition-opacity"
                          >
                            Save Address Details
                          </button>
                        </form>
                      )}

                      {/* PAYMENT METHOD SELECTOR */}
                      <div className="pt-2">
                        <label className="block text-accent-gold mb-1 font-bold uppercase tracking-wider">
                          Select Payment Method
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            'UPI / Google Pay / PhonePe',
                            'Credit / Debit Card',
                            'Cash on Delivery'
                          ].map((pm) => (
                            <button
                              key={pm}
                              type="button"
                              onClick={() => setAddressForm({ ...addressForm, paymentMethod: pm })}
                              className={`py-2.5 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border text-center ${
                                addressForm.paymentMethod === pm
                                  ? 'bg-gold-gradient text-primary border-accent-gold shadow-gold'
                                  : 'bg-primary-dark/60 text-secondary/70 border-accent-gold/20'
                              }`}
                            >
                              {pm}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* FINAL SUBMIT ORDER BUTTON */}
                      <form onSubmit={handlePlaceOrderSubmit} className="pt-2">
                        <Button
                          type="submit"
                          variant="gold"
                          size="lg"
                          className="w-full"
                          disabled={placingOrder}
                        >
                          {placingOrder ? 'Processing Order & Backend...' : `Confirm Order & Pay ₹${grandTotal}`}
                        </Button>
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
