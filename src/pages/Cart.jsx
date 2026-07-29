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
  FiCoffee,
  FiTruck
} from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import OrderTrackerModal from '../components/common/OrderTrackerModal';
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
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  
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
    pincode: savedAddress?.pincode || '422601',
    landmark: savedAddress?.landmark || '',
    saveForFuture: true,
    paymentMethod: 'UPI / Google Pay'
  });

  const [placingOrder, setPlacingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

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

  // Address Save Handler
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.phone || !addressForm.street) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    const newAddressObj = {
      name: addressForm.name,
      phone: addressForm.phone,
      email: addressForm.email,
      street: addressForm.street,
      area: addressForm.area,
      city: addressForm.city,
      pincode: addressForm.pincode,
      landmark: addressForm.landmark
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
      customerEmail: addressForm.email || (loggedUser ? loggedUser.email : 'customer@akolecafe.com'),
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
      paymentMethod: addressForm.paymentMethod,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setPlacingOrder(true);

    try {
      let finalOrder = orderPayload;
      try {
        const response = await createOrderAPI(orderPayload);
        if (response.order) finalOrder = response.order;
        else if (response._id) finalOrder = response;
      } catch (apiErr) {
        console.warn('Backend API note:', apiErr.message);
      }

      // Save order to localStorage for Profile -> My Orders tab
      const existingLocal = JSON.parse(localStorage.getItem('akole_user_orders') || '[]');
      localStorage.setItem('akole_user_orders', JSON.stringify([finalOrder, ...existingLocal]));

      setConfirmedOrder(finalOrder);
      setCheckoutStep('receipt');
      showToast(`Order Placed Successfully via ${addressForm.paymentMethod}!`, 'success');
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
    if (!confirmedOrder) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }
    const itemsHtml = (confirmedOrder.items || []).map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #E2E8E4; font-weight: 600;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #E2E8E4; text-align: center; font-weight: bold;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #E2E8E4; text-align: right;">₹${item.price}</td>
        <td style="padding: 10px; border-bottom: 1px solid #E2E8E4; text-align: right; font-weight: bold; color: #20571C;">₹${item.price * item.quantity}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Akole_Cafe_Receipt_${confirmedOrder.orderId}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 30px; color: #1E2621; max-width: 550px; margin: 0 auto; background: #FFF; }
          .header { text-align: center; border-bottom: 3px double #20571C; padding-bottom: 16px; margin-bottom: 20px; }
          .title { font-size: 26px; font-weight: 900; color: #20571C; letter-spacing: 1px; }
          .subtitle { font-size: 11px; color: #606E64; margin-top: 4px; font-weight: 600; text-transform: uppercase; }
          .badge { display: inline-block; background: #20571C; color: #F3E5AB; font-weight: 800; padding: 4px 12px; border-radius: 20px; font-size: 10px; margin-top: 10px; letter-spacing: 1px; }
          .info-table { width: 100%; margin-bottom: 20px; font-size: 12px; border-collapse: collapse; }
          .info-table td { padding: 6px 0; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
          .items-table th { background: #F7F9F6; color: #20571C; text-align: left; padding: 8px; font-size: 10px; text-transform: uppercase; border-bottom: 2px solid #D4E0D6; font-weight: 800; }
          .total-box { background: #F7F9F6; padding: 14px 18px; border-radius: 14px; border: 1px solid #D4E0D6; text-align: right; margin-top: 10px; }
          .total-price { font-size: 22px; font-weight: 900; color: #20571C; }
          .footer { text-align: center; margin-top: 25px; font-size: 11px; color: #708074; border-top: 1px solid #E2E8E4; padding-top: 15px; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">AKOLE CAFE</div>
          <div class="subtitle">Artisanal Maharashtrian & Global Gourmet • Akole</div>
          <div class="badge">OFFICIAL PAYMENT RECEIPT</div>
        </div>
        <table class="info-table">
          <tr><td><strong>Order ID:</strong> ${confirmedOrder.orderId}</td><td style="text-align:right;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</td></tr>
          <tr><td><strong>Customer:</strong> ${confirmedOrder.customerName}</td><td style="text-align:right;"><strong>Phone:</strong> ${confirmedOrder.customerPhone}</td></tr>
          <tr><td colspan="2" style="padding-top: 4px;"><strong>Address:</strong> ${confirmedOrder.deliveryAddress}</td></tr>
          <tr><td><strong>Payment:</strong> ${confirmedOrder.paymentMethod}</td><td style="text-align:right;"><strong>Status:</strong> Paid & Confirmed</td></tr>
        </table>
        <table class="items-table">
          <thead>
            <tr>
              <th>Item Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Rate</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <div class="total-box">
          <div style="font-size: 11px; color: #606E64; font-weight: 700; uppercase">Grand Total (Taxes Included)</div>
          <div class="total-price">₹${confirmedOrder.totalAmount}</div>
        </div>
        <div class="footer">
          Thank you for ordering with Akole Cafe!<br>
          Customer Support: +91 98765 43210 | www.akolecafe.com
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleShareReceipt = () => {
    if (!confirmedOrder) return;
    const text = `AKOLE CAFE OFFICIAL ORDER RECEIPT\n\n` +
      `Order ID: ${confirmedOrder.orderId}\n` +
      `Customer: ${confirmedOrder.customerName}\n` +
      `Phone: ${confirmedOrder.customerPhone}\n` +
      `Address: ${confirmedOrder.deliveryAddress}\n` +
      `Items: ${(confirmedOrder.items || []).map(i => i.name + ' (x' + i.quantity + ')').join(', ')}\n` +
      `Total Paid: ₹${confirmedOrder.totalAmount}\n` +
      `Payment Method: ${confirmedOrder.paymentMethod}\n\n` +
      `Thank you for ordering with Akole Cafe!`;

    if (navigator.share) {
      navigator.share({
        title: `Akole Cafe Receipt - ${confirmedOrder.orderId}`,
        text: text
      }).catch(() => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
      });
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      showToast('Opening order receipt on WhatsApp...', 'success');
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
                          type="button"
                          onClick={() => {
                            setOrderType(mode);
                            showToast(`Selected ${mode} fulfillment mode`, 'info');
                          }}
                          className={`py-2 px-2 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all border cursor-pointer active:scale-95 ${
                            orderType === mode
                              ? 'bg-[#1E2621] text-white border-[#1E2621] shadow-md'
                              : 'bg-white/60 text-[#48594B] border-white/80 hover:bg-white'
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
                        className={`px-3 py-1 rounded-full border text-[11px] font-black transition-all shrink-0 cursor-pointer active:scale-95 ${
                          appliedCoupon === 'AKOLE20'
                            ? 'bg-[#20571C] text-white border-[#20571C] shadow-xs'
                            : 'bg-white/80 border-[#B3C5B0] text-[#1E2621] hover:bg-[#1E2621] hover:text-white'
                        }`}
                      >
                        AKOLE20 (20% OFF)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickCoupon('AKOLEVIP')}
                        className={`px-3 py-1 rounded-full border text-[11px] font-black transition-all shrink-0 cursor-pointer active:scale-95 ${
                          appliedCoupon === 'AKOLEVIP'
                            ? 'bg-[#20571C] text-white border-[#20571C] shadow-xs'
                            : 'bg-white/80 border-[#B3C5B0] text-[#1E2621] hover:bg-[#1E2621] hover:text-white'
                        }`}
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
                        className="flex-1 bg-white border border-[#C5D4C2] rounded-2xl py-2 px-3 text-xs text-[#1E2621] font-bold placeholder-gray-400 focus:outline-none focus:border-[#1E2621] uppercase"
                      />
                      <button
                        type="submit"
                        className="py-2 px-4 rounded-2xl bg-[#1E2621] text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors shrink-0 cursor-pointer active:scale-95"
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
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCheckoutOpen(false)}
                  className="fixed inset-0 bg-black/65 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-[22px] border border-[#E2E8E4] shadow-[0_20px_50px_rgba(0,0,0,0.22)] max-h-[90vh] sm:max-h-[85vh] flex flex-col min-h-0 font-sans overflow-hidden my-auto"
                >
                  {/* FIXED HEADER */}
                  <div className="p-2.5 sm:p-3 border-b border-[#E4ECE5] bg-white relative text-center flex-shrink-0">
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="absolute top-2.5 right-2.5 text-[#606E64] hover:text-[#1E2621] bg-[#F2F6F1] hover:bg-[#E4ECE5] p-1.5 rounded-full transition-all cursor-pointer shadow-xs border border-[#D4E0D6] z-20"
                      title="Close"
                    >
                      <FiX className="w-3.5 h-3.5 stroke-[2.2]" />
                    </button>

                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3EC] text-[#20571C] text-[8px] uppercase font-extrabold tracking-widest border border-[#D4E3D5] inline-block mb-0.5 shadow-xs">
                      ORDER FULFILLMENT & ADDRESS
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-black text-[#1E2621] tracking-tight leading-tight">
                      Delivery & Payment Details
                    </h3>
                    <div className="inline-flex items-center justify-center gap-1 mt-0.5 px-2.5 py-0.5 rounded-full bg-[#1E2621] text-[#F3E5AB] font-bold text-[10px] shadow-xs border border-white/20">
                      <span>Total Payable:</span>
                      <span className="text-[10px] text-white font-black">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* STEP 2: COLORFUL ORDER CONFIRMATION RECEIPT */}
                  {checkoutStep === 'receipt' && confirmedOrder ? (
                    <div className="p-2.5 sm:p-3 no-scrollbar scrollbar-none overflow-y-auto flex-1 min-h-0 space-y-2 text-xs">
                      {/* Vibrant Banner */}
                      <div className="p-2.5 sm:p-3 rounded-[14px] bg-gradient-to-r from-[#1E2621] via-[#2A362E] to-[#1E2621] text-white shadow-md relative overflow-hidden border border-white/20">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#D6AE4D]/20 text-[#F3E5AB] text-[8px] font-extrabold uppercase tracking-widest border border-[#D6AE4D]/40">
                            ORDER CONFIRMED
                          </span>
                          <span className="font-mono text-[10px] font-extrabold text-[#F3E5AB]">{confirmedOrder.orderId}</span>
                        </div>

                        <h3 className="text-base font-extrabold text-white mb-0.5">
                          Thank you, {confirmedOrder.customerName}!
                        </h3>
                        <p className="text-[9px] text-emerald-300 font-medium">
                          Fulfillment: {orderType} • Kitchen Preparation Started
                        </p>
                      </div>

                      {/* Live Order Tracking Action Button */}
                      <button
                        onClick={() => setIsTrackerOpen(true)}
                        className="w-full py-2 px-3 rounded-[12px] bg-gradient-to-r from-[#174815] via-[#246920] to-[#123910] text-white font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(23,72,21,0.3)] border border-emerald-400/40 hover:brightness-110 cursor-pointer transition-all active:scale-98"
                      >
                        <FiTruck className="w-3.5 h-3.5 text-[#F3E5AB]" />
                        <span>Track Order Live</span>
                      </button>

                      {/* Order Receipt Details Table */}
                      <div className="p-2.5 rounded-[14px] bg-[#F7F9F6] border border-[#E2E8E4] shadow-xs text-[10px] space-y-1">
                        <div className="flex items-center justify-between border-b border-[#E4ECE5] pb-0.5">
                          <span className="text-[#606E64] uppercase font-extrabold tracking-wider text-[8px]">Customer Name</span>
                          <span className="font-bold text-[#1E2621] text-[10px]">{confirmedOrder.customerName}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-[#E4ECE5] pb-0.5">
                          <span className="text-[#606E64] uppercase font-extrabold tracking-wider text-[8px]">Contact Phone</span>
                          <span className="font-medium text-[#1E2621] text-[10px]">{confirmedOrder.customerPhone}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-[#E4ECE5] pb-0.5">
                          <span className="text-[#606E64] uppercase font-extrabold tracking-wider text-[8px]">Delivery Address</span>
                          <span className="font-medium text-[#1E2621] text-right text-[10px] line-clamp-1 max-w-[200px]">
                            {confirmedOrder.deliveryAddress}
                          </span>
                        </div>

                        <div className="border-b border-[#E4ECE5] pb-0.5">
                          <span className="text-[#606E64] uppercase font-extrabold tracking-wider text-[8px] block mb-0.5">Ordered Items</span>
                          <div className="space-y-0.5">
                            {confirmedOrder.items && confirmedOrder.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between font-medium text-[#3B4A3E] text-[10px]">
                                <span>• {it.name} (x{it.quantity})</span>
                                <span className="text-[#1E2621] font-bold">₹{it.price * it.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b border-[#E4ECE5] pb-0.5">
                          <span className="text-[#606E64] uppercase font-extrabold tracking-wider text-[8px]">Payment Method</span>
                          <span className="font-bold text-[#20571C] text-[10px]">{confirmedOrder.paymentMethod}</span>
                        </div>

                        <div className="flex items-center justify-between pt-0.5">
                          <span className="text-[#1E2621] uppercase tracking-wider font-extrabold text-[10px]">Total Paid</span>
                          <span className="font-serif text-sm font-extrabold text-[#1E2621]">
                            ₹{confirmedOrder.totalAmount}
                          </span>
                        </div>
                      </div>

                      {/* Download & Share Actions */}
                      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                        <button
                          onClick={handleDownloadReceipt}
                          className="py-2 px-2.5 rounded-[12px] bg-gradient-to-r from-[#D6AE4D] via-[#F5E6B8] to-[#B58C32] text-[#1E2621] font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-[0_3px_12px_rgba(214,174,77,0.3)] border border-[#FDF0CB] hover:brightness-105 active:scale-95 cursor-pointer transition-all"
                        >
                          <FiDownload className="text-xs text-[#1E2621]" /> Receipt
                        </button>

                        <button
                          onClick={handleShareReceipt}
                          className="py-2 px-2.5 rounded-[12px] bg-gradient-to-r from-[#172019] via-[#2A3B2D] to-[#172019] text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-[0_3px_12px_rgba(23,32,25,0.25)] border border-white/30 hover:brightness-125 active:scale-95 cursor-pointer transition-all"
                        >
                          <FiShare2 className="text-xs text-white" /> Share
                        </button>
                      </div>

                      <button 
                        onClick={handleFinishCheckout} 
                        className="w-full py-2 rounded-[12px] bg-[#F0F4F1] hover:bg-[#E2ECE4] text-[#1E2621] font-black text-[11px] uppercase tracking-wider shadow-xs border border-[#D4E0D6] active:scale-98 transition-all cursor-pointer"
                      >
                        Done & Return to Homepage
                      </button>
                    </div>
                  ) : (
                    /* STEP 1: SCROLLABLE ADDRESS & PAYMENT FORM */
                    <>
                      <div className="p-3.5 sm:p-4 no-scrollbar scrollbar-none overflow-y-auto flex-1 min-h-0 space-y-2.5 text-xs">
                        {/* SAVED ADDRESS CARD VS EDIT FORM */}
                        {savedAddress && !isEditingAddress ? (
                          <div className="p-3 rounded-[16px] bg-[#F7F9F6] border border-[#20571C]/30 shadow-xs relative space-y-1">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="px-2 py-0.5 rounded-full bg-[#EBF3EC] text-[#20571C] text-[8px] uppercase font-extrabold tracking-wider border border-[#D4E3D5] flex items-center gap-1">
                                <FiMapPin className="text-[#20571C]" /> Saved Address
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsEditingAddress(true)}
                                className="text-[#20571C] hover:text-[#1E2621] flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                              >
                                <FiEdit3 /> Edit
                              </button>
                            </div>

                            <div className="font-bold text-xs text-[#1E2621]">{savedAddress.name}</div>
                            <div className="text-[#606E64] text-[11px] font-medium">{savedAddress.phone} • {savedAddress.email}</div>
                            <div className="text-[#3B4A3E] text-[11px] font-semibold leading-relaxed">
                              {savedAddress.street}, {savedAddress.area ? savedAddress.area + ', ' : ''}{savedAddress.city} - {savedAddress.pincode}
                            </div>
                            {savedAddress.landmark && (
                              <div className="text-[#20571C] text-[11px] font-bold">Landmark: {savedAddress.landmark}</div>
                            )}
                          </div>
                        ) : (
                          /* ADDRESS EDIT / FIRST TIME FORM */
                          <form onSubmit={handleSaveAddress} className="space-y-2 p-3 sm:p-3.5 rounded-[16px] bg-[#F7F9F6] border border-[#E2E8E4] shadow-xs">
                            <div className="flex items-center justify-between border-b border-[#E4ECE5] pb-1">
                              <span className="text-[#1E2621] font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1">
                                <FiMapPin className="text-[#20571C]" />
                                {savedAddress ? 'Edit Address' : '1st Time Address'}
                              </span>
                              {savedAddress && (
                                <button
                                  type="button"
                                  onClick={() => setIsEditingAddress(false)}
                                  className="text-[#606E64] hover:text-[#1E2621] text-[10px] font-bold cursor-pointer"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[#3B4A3E] font-extrabold uppercase text-[8px] tracking-wider mb-0.5">Full Name *</label>
                                <input
                                  type="text"
                                  required
                                  value={addressForm.name}
                                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                                  className="w-full px-2.5 py-1.5 rounded-[10px] bg-white border border-[#D4E0D6] text-[#1E2621] font-semibold text-xs placeholder-[#8B9B8E] focus:outline-none focus:border-[#1E2621] focus:ring-1 focus:ring-[#1E2621]/10 transition-all"
                                  placeholder="Mayur Gambhire"
                                />
                              </div>
                              <div>
                                <label className="block text-[#3B4A3E] font-extrabold uppercase text-[8px] tracking-wider mb-0.5">Phone *</label>
                                <input
                                  type="tel"
                                  required
                                  value={addressForm.phone}
                                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                  className="w-full px-2.5 py-1.5 rounded-[10px] bg-white border border-[#D4E0D6] text-[#1E2621] font-semibold text-xs placeholder-[#8B9B8E] focus:outline-none focus:border-[#1E2621] focus:ring-1 focus:ring-[#1E2621]/10 transition-all"
                                  placeholder="+91 8432387067"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[#3B4A3E] font-extrabold uppercase text-[8px] tracking-wider mb-0.5">Street Address *</label>
                              <input
                                type="text"
                                required
                                value={addressForm.street}
                                onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                                className="w-full px-2.5 py-1.5 rounded-[10px] bg-white border border-[#D4E0D6] text-[#1E2621] font-semibold text-xs placeholder-[#8B9B8E] focus:outline-none focus:border-[#1E2621] focus:ring-1 focus:ring-[#1E2621]/10 transition-all"
                                placeholder="House 42, Main Market Road"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[#3B4A3E] font-extrabold uppercase text-[8px] tracking-wider mb-0.5">Locality / Area</label>
                                <input
                                  type="text"
                                  value={addressForm.area}
                                  onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                                  className="w-full px-2.5 py-1.5 rounded-[10px] bg-white border border-[#D4E0D6] text-[#1E2621] font-semibold text-xs placeholder-[#8B9B8E] focus:outline-none focus:border-[#1E2621] focus:ring-1 focus:ring-[#1E2621]/10 transition-all"
                                  placeholder="Near Bus Stand"
                                />
                              </div>
                              <div>
                                <label className="block text-[#3B4A3E] font-extrabold uppercase text-[8px] tracking-wider mb-0.5">Landmark</label>
                                <input
                                  type="text"
                                  value={addressForm.landmark}
                                  onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                                  className="w-full px-2.5 py-1.5 rounded-[10px] bg-white border border-[#D4E0D6] text-[#1E2621] font-semibold text-xs placeholder-[#8B9B8E] focus:outline-none focus:border-[#1E2621] focus:ring-1 focus:ring-[#1E2621]/10 transition-all"
                                  placeholder="Opp. SBI Bank"
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 pt-0.5">
                              <input
                                type="checkbox"
                                id="saveForFuture"
                                checked={addressForm.saveForFuture}
                                onChange={(e) => setAddressForm({ ...addressForm, saveForFuture: e.target.checked })}
                                className="w-3.5 h-3.5 accent-[#1E2621] rounded cursor-pointer"
                              />
                              <label htmlFor="saveForFuture" className="text-[#3B4A3E] text-[10px] font-semibold cursor-pointer select-none">
                                Save address for future orders
                              </label>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-2 rounded-[12px] bg-gradient-to-r from-[#1E2621] via-[#2A362E] to-[#1E2621] hover:bg-black text-white font-extrabold uppercase tracking-wider text-[10px] shadow-xs border border-white/20 cursor-pointer active:scale-[0.98] transition-all"
                            >
                              Save Address
                            </button>
                          </form>
                        )}

                        {/* PAYMENT METHOD SELECTOR */}
                        <div className="pt-0.5 space-y-1">
                          <label className="block text-[#3B4A3E] font-extrabold uppercase tracking-wider text-[9px]">
                            Select Payment Method
                          </label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              'UPI / Google Pay',
                              'Credit / Debit Card',
                              'Cash on Delivery'
                            ].map((pm) => (
                              <button
                                key={pm}
                                type="button"
                                onClick={() => setAddressForm({ ...addressForm, paymentMethod: pm })}
                                className={`py-2 px-1 rounded-[10px] text-[8px] uppercase tracking-wider transition-all border text-center cursor-pointer font-extrabold ${
                                  addressForm.paymentMethod === pm
                                    ? 'bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#1E2621] border-[#F0D89E] shadow-xs scale-[1.01]'
                                    : 'bg-white text-[#48594B] border-[#D4E0D6] hover:bg-[#F2F6F1] hover:text-[#1E2621] shadow-2xs'
                                }`}
                              >
                                {pm}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* FIXED FOOTER WITH FINAL SUBMIT ORDER BUTTON */}
                      <div className="p-3 sm:p-3.5 border-t border-[#E4ECE5] bg-[#F7F9F6] flex-shrink-0">
                        <form onSubmit={(e) => { e.preventDefault(); handleConfirmOrder(); }}>
                          <button
                            type="submit"
                            disabled={placingOrder}
                            className="w-full py-2.5 rounded-[14px] bg-gradient-to-r from-[#20571C] via-[#2D7A27] to-[#164213] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-[1.5px] shadow-[0_4px_14px_rgba(32,87,28,0.25)] border border-white/30 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            <FiCheck className="w-3.5 h-3.5" />
                            <span>{placingOrder ? 'Processing...' : `Confirm Order & Pay ₹${grandTotal}`}</span>
                          </button>
                        </form>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      {/* LIVE ORDER TRACKING MODAL */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrder={confirmedOrder}
        defaultOrderId={confirmedOrder?.orderId}
      />
    </>
  );
};

export default Cart;
