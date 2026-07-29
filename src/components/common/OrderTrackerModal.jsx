import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiCheckCircle, 
  FiClock, 
  FiMapPin, 
  FiPhone, 
  FiShoppingBag, 
  FiSearch, 
  FiRefreshCw, 
  FiTruck,
  FiCoffee
} from 'react-icons/fi';
import { trackOrderAPI } from '../../services/api';

const ORDER_STEPS = [
  { id: 'Pending', label: 'Order Placed', desc: 'Received & Sent to Kitchen', icon: FiShoppingBag },
  { id: 'Confirmed', label: 'Preparing in Kitchen', desc: 'Chefs handcrafting your food', icon: FiCoffee },
  { id: 'Packed', label: 'Packed & Sealed', desc: 'Fresh, hot & quality checked', icon: FiCheckCircle },
  { id: 'Out for Delivery', label: 'Out for Delivery', desc: 'Rider is on the way to you', icon: FiTruck },
  { id: 'Delivered', label: 'Delivered', desc: 'Enjoy your delicious meal!', icon: FiCheckCircle },
];

const OrderTrackerModal = ({ isOpen, onClose, defaultOrderId = null, initialOrder = null }) => {
  const [searchId, setSearchId] = useState(defaultOrderId || (initialOrder ? initialOrder.orderId : ''));
  const [currentOrder, setCurrentOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialOrder) {
        setCurrentOrder(initialOrder);
        setSearchId(initialOrder.orderId || initialOrder._id || initialOrder.id || '');
      } else if (defaultOrderId) {
        setSearchId(defaultOrderId);
        fetchOrder(defaultOrderId);
      } else {
        try {
          const local = JSON.parse(localStorage.getItem('akole_user_orders') || '[]');
          if (Array.isArray(local) && local.length > 0) {
            const latest = local[local.length - 1];
            setCurrentOrder(latest);
            setSearchId(latest.orderId || latest._id || latest.id || '');
          }
        } catch (e) {}
      }
    }
  }, [defaultOrderId, initialOrder, isOpen]);

  const fetchOrder = async (idToFetch) => {
    const targetId = idToFetch || searchId;
    if (!targetId || !targetId.trim()) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const data = await trackOrderAPI(targetId.trim());
      const orderObj = data.order || data;
      setCurrentOrder(orderObj);
    } catch (err) {
      setErrorMsg('Order not found. Please check Order ID (e.g. AKL-123456)');
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (stepId) => {
    if (!currentOrder) return 'upcoming';
    const statusOrder = ['Pending', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];
    const currentStatus = currentOrder.status || 'Confirmed';
    
    const currentIndex = statusOrder.indexOf(currentStatus) === -1 ? 1 : statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-md"
        />

        {/* Modal Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-lg bg-white rounded-[24px] border border-[#E2E8E4] shadow-[0_25px_70px_rgba(0,0,0,0.22)] max-h-[88vh] flex flex-col min-h-0 overflow-hidden my-auto"
        >
          {/* HEADER */}
          <div className="p-4 sm:p-5 border-b border-[#E4ECE5] bg-[#F7F9F6] relative flex-shrink-0 flex items-center justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3EC] text-[#20571C] text-[9px] uppercase font-extrabold tracking-widest border border-[#D4E3D5] inline-block mb-1">
                LIVE KITCHEN & DELIVERY STATUS
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-[#1E2621] flex items-center gap-2">
                <FiTruck className="text-[#20571C]" /> Track Your Order
              </h3>
            </div>

            <button
              onClick={onClose}
              className="text-[#606E64] hover:text-[#1E2621] bg-white hover:bg-[#E4ECE5] p-2 rounded-full transition-all cursor-pointer shadow-xs border border-[#D4E0D6]"
            >
              <FiX className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0 space-y-4 no-scrollbar scrollbar-none">
            {/* SEARCH INPUT BAR */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchOrder()}
                  placeholder="Enter Order ID (e.g. AKL-948201)..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-[14px] bg-[#F7F9F6] border border-[#D4E0D6] text-xs font-semibold text-[#1E2621] placeholder-[#8B9B8E] focus:outline-none focus:border-[#20571C] focus:ring-2 focus:ring-[#20571C]/10 transition-all"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              </div>
              <button
                onClick={() => fetchOrder()}
                disabled={loading}
                className="px-4 py-2.5 rounded-[14px] bg-[#1E2621] hover:bg-black text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                <FiRefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Track</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                {errorMsg}
              </div>
            )}

            {currentOrder && (
              <>
                {/* ESTIMATED TIME BANNER */}
                <div className="p-4 rounded-[20px] bg-gradient-to-r from-[#20571C] via-[#2A6E25] to-[#164213] text-white shadow-md flex items-center justify-between relative overflow-hidden">
                  <div className="space-y-1 z-10">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-bold uppercase tracking-wider">
                      <FiClock className="w-3.5 h-3.5" /> Estimated Delivery Time
                    </div>
                    <div className="text-2xl font-serif font-black text-white">25 - 35 Mins</div>
                    <div className="text-[11px] text-white/80 font-medium">Order ID: <span className="font-mono text-emerald-200 font-bold">{currentOrder.orderId || currentOrder._id}</span></div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xs border border-white/20">
                    <FiTruck className="w-6 h-6 text-[#F3E5AB]" />
                  </div>
                </div>

                {/* STEPPER PROGRESS TIMELINE */}
                <div className="p-4 rounded-[20px] bg-[#F7F9F6] border border-[#E2E8E4] space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#20571C]">
                    Order Status Progress
                  </h4>

                  <div className="space-y-4 relative before:absolute before:left-[17px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gray-200">
                    {ORDER_STEPS.map((step) => {
                      const state = getStepStatus(step.id);
                      const Icon = step.icon;

                      return (
                        <div key={step.id} className="flex items-start gap-3.5 relative z-10">
                          {/* Dot / Icon */}
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs shrink-0 ${
                              state === 'completed'
                                ? 'bg-[#20571C] text-white border-2 border-emerald-600'
                                : state === 'active'
                                ? 'bg-[#C8A96A] text-[#1E2621] border-2 border-[#F0D89E] animate-pulse ring-4 ring-[#C8A96A]/20'
                                : 'bg-white text-gray-400 border border-gray-300'
                            }`}
                          >
                            <Icon className="w-4 h-4 stroke-[2]" />
                          </div>

                          {/* Step Info */}
                          <div className="pt-0.5 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <h5 className={`font-bold text-xs ${state === 'upcoming' ? 'text-gray-400' : 'text-[#1E2621]'}`}>
                                {step.label}
                              </h5>
                              {state === 'active' && (
                                <span className="px-2 py-0.5 rounded-full bg-[#C8A96A]/20 text-[#8A6D2A] text-[9px] font-black uppercase tracking-wider border border-[#C8A96A]/30">
                                  In Progress
                                </span>
                              )}
                              {state === 'completed' && (
                                <span className="text-emerald-700 text-[11px] font-bold">Done</span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-500 font-medium leading-tight">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* DELIVERY AGENT & ADDRESS DETAILS */}
                <div className="p-4 rounded-[20px] bg-[#F7F9F6] border border-[#E2E8E4] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-[#E4ECE5] pb-2">
                    <span className="text-[#606E64] uppercase font-extrabold text-[10px]">Delivery Executive</span>
                    <span className="font-bold text-[#1E2621] flex items-center gap-1.5">
                      Ramesh Shinde (Akole Express)
                    </span>
                  </div>

                  <div className="flex items-start justify-between border-b border-[#E4ECE5] pb-2">
                    <span className="text-[#606E64] uppercase font-extrabold text-[10px] shrink-0 mt-0.5">Delivery Address</span>
                    <span className="font-medium text-[#1E2621] text-right line-clamp-2 max-w-xs pl-2">
                      {currentOrder.deliveryAddress}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#606E64] uppercase font-extrabold text-[10px]">Customer Contact</span>
                    <span className="font-bold text-[#1E2621]">{currentOrder.customerName} • {currentOrder.customerPhone}</span>
                  </div>
                </div>

                {/* ORDER ITEMS SUMMARY */}
                <div className="p-4 rounded-[20px] bg-[#F7F9F6] border border-[#E2E8E4] space-y-2 text-xs">
                  <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-[#606E64]">
                    Ordered Items Summary ({currentOrder.items ? currentOrder.items.length : 0})
                  </h4>
                  <div className="space-y-1">
                    {currentOrder.items && currentOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between font-medium text-[#3B4A3E]">
                        <span>• {item.name} (x{item.quantity})</span>
                        <span className="text-[#1E2621] font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#E4ECE5] font-serif text-base font-bold text-[#1E2621]">
                    <span>Total Amount Paid</span>
                    <span className="text-emerald-700">₹{currentOrder.totalAmount} ({currentOrder.paymentMethod})</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="p-3.5 sm:p-4 border-t border-[#E4ECE5] bg-[#F7F9F6] flex-shrink-0 flex gap-2">
            <a
              href="tel:+918432387067"
              onClick={(e) => {
                try {
                  if (typeof window !== 'undefined' && window.navigator && window.navigator.clipboard) {
                    window.navigator.clipboard.writeText('8432387067');
                  }
                } catch (err) {}
              }}
              className="flex-1 py-2.5 rounded-[14px] bg-white border border-[#D4E0D6] hover:bg-[#EBF3EC] text-[#20571C] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer active:scale-95"
            >
              <FiPhone className="w-3.5 h-3.5 text-[#20571C]" /> Call Cafe Hotline (8432387067)
            </a>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-[14px] bg-[#1E2621] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              Close Tracker
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderTrackerModal;
