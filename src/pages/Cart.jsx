import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiPlus, FiMinus, FiTrash2, FiTag, FiCheckCircle, FiArrowRight, FiX, FiCoffee } from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

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
  const [couponCode, setCouponCode] = useState('');
  const [orderType, setOrderType] = useState('Dine-In');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form' | 'success'
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '', paymentMethod: 'UPI' });

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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setCheckoutStep('success');
    showToast('Order Placed Successfully! Your food & coffee preparation has started.', 'success');
  };

  const handleFinishCheckout = () => {
    setIsCheckoutOpen(false);
    clearCart();
    setCheckoutStep('form');
  };

  return (
    <>
      <PageBanner
        title="Your Shopping Cart"
        subtitle="Review Items, Apply VIP Discount Coupons, & Proceed to Checkout"
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
                    <label className="block text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2">Order Fulfillment</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Dine-In', 'Takeaway', 'Delivery'].map((mode) => (
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
                        <span>VIP Discount</span>
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
                    onClick={() => setIsCheckoutOpen(true)}
                    variant="gold"
                    size="lg"
                    className="w-full"
                    icon={FiShoppingBag}
                  >
                    Proceed to Pay (₹{grandTotal})
                  </Button>
                </div>
              </div>

            </div>
          )}

          {/* Checkout Modal */}
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
                  className="relative z-10 w-full max-w-lg bg-primary border border-accent-gold/40 rounded-3xl p-6 sm:p-8 text-secondary shadow-2xl"
                >
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="absolute top-4 right-4 text-secondary/60 hover:text-accent-gold"
                  >
                    <FiX className="w-6 h-6" />
                  </button>

                  {checkoutStep === 'success' ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gold-gradient text-primary flex items-center justify-center mx-auto shadow-gold">
                        <FiCheckCircle className="w-10 h-10" />
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-accent-gold">Order Confirmed!</h3>
                      <p className="text-xs text-secondary/80 font-light">
                        Thank you <span className="font-semibold text-secondary">{customerDetails.name}</span>. Your order has been placed via <span className="text-accent-gold font-medium">{customerDetails.paymentMethod}</span>.
                      </p>

                      <div className="p-4 rounded-xl bg-primary-dark/80 border border-accent-gold/30 text-xs text-left space-y-1 my-4">
                        <p className="text-secondary/70">Fulfillment Mode: <strong className="text-accent-gold">{orderType}</strong></p>
                        <p className="text-secondary/70">Estimated Time: <strong className="text-accent-gold">15-20 Mins</strong></p>
                        <p className="text-secondary/70">Total Paid: <strong className="text-accent-gold">₹{grandTotal}</strong></p>
                      </div>

                      <Button onClick={handleFinishCheckout} variant="gold" size="lg" className="w-full">
                        Back to Homepage
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handlePlaceOrder} className="space-y-4">
                      <div className="text-center mb-4">
                        <span className="text-xs uppercase tracking-widest text-accent-gold block font-semibold">Checkout</span>
                        <h3 className="font-serif text-2xl font-bold text-secondary">Complete Your Order</h3>
                        <p className="text-xs text-secondary/60">Total Payable: ₹{grandTotal}</p>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-accent-gold mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Patil"
                          value={customerDetails.name}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                          className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-secondary focus:outline-none focus:border-accent-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-accent-gold mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={customerDetails.phone}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                          className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-secondary focus:outline-none focus:border-accent-gold"
                        />
                      </div>

                      {orderType === 'Delivery' && (
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-accent-gold mb-1">Delivery Address in Akole</label>
                          <textarea
                            rows="2"
                            required
                            placeholder="Flat / House No, Street name, Akole locality..."
                            value={customerDetails.address}
                            onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                            className="w-full bg-primary-dark/80 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-sm text-secondary focus:outline-none focus:border-accent-gold"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-accent-gold mb-1">Select Payment Method</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['UPI / GPay', 'Card', 'Cash / Pay at Counter'].map((pm) => (
                            <button
                              key={pm}
                              type="button"
                              onClick={() => setCustomerDetails({ ...customerDetails, paymentMethod: pm })}
                              className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all ${
                                customerDetails.paymentMethod === pm
                                  ? 'bg-gold-gradient text-primary border-accent-gold font-bold'
                                  : 'bg-primary-dark/60 text-secondary/70 border-accent-gold/20'
                              }`}
                            >
                              {pm}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button type="submit" variant="gold" size="lg" className="w-full mt-4">
                        Confirm & Pay ₹{grandTotal}
                      </Button>
                    </form>
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
