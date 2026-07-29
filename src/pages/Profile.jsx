import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { fetchOrdersAPI } from '../services/api';
import OrderTrackerModal from '../components/common/OrderTrackerModal';
import logoEmblem from '../assets/logo-emblem.png';
import { 
  LayoutGrid, 
  User, 
  Package, 
  Heart, 
  MapPin, 
  RefreshCw, 
  Star, 
  Tag, 
  Bell, 
  BellOff,
  LogOut, 
  Camera, 
  CheckCircle,
  Search,
  Copy,
  Plus,
  Coffee,
  ArrowRight,
  Truck,
  Trash2
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, setCurrentUser, updateUserAvatar, wishlist, removeFromWishlist, showToast, logout, logoutUser } = useTheme();
  const { addToCart, applyCoupon } = useCart();

  // Saved user sync
  const savedUserStr = typeof window !== 'undefined' ? localStorage.getItem('akole_user') : null;
  const savedUserObj = savedUserStr ? JSON.parse(savedUserStr) : null;
  const activeUser = currentUser || savedUserObj;
  
  const initialEmail = activeUser?.email || (typeof window !== 'undefined' ? localStorage.getItem('akole_user_email') : '') || 'mayurgambhire4565@gmail.com';
  const rawName = activeUser?.name || activeUser?.username || (initialEmail && initialEmail.includes('@') ? initialEmail.split('@')[0] : 'Mayur Gambhire');
  const initialName = (!rawName || rawName === 'unknown') ? 'Mayur Gambhire' : rawName;

  const [userName, setUserName] = useState(initialName);
  const [userPhone, setUserPhone] = useState(activeUser?.phone || '+91 98765 43210');
  const [userEmailAddress, setUserEmailAddress] = useState(initialEmail);
  const [userAvatar, setUserAvatar] = useState(activeUser?.avatar || '');

  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam || (location.pathname === '/dashboard' ? 'dashboard' : (location.pathname === '/orders' ? 'orders' : (location.pathname === '/wishlist' ? 'wishlist' : (location.pathname === '/profile' ? 'profile' : 'dashboard'))));

  const [activeTab, setActiveTab] = useState(initialTab);

  // Live Tracker State
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  // Orders State
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Saved Address System
  const [savedAddress, setSavedAddress] = useState(() => {
    try {
      const saved = localStorage.getItem('akole_saved_address');
      return saved ? JSON.parse(saved) : {
        name: 'Mayur Gambhire',
        phone: '+91 98765 43210',
        street: 'Main Market Road, Near Bus Stand',
        area: 'Akole City',
        city: 'Akole',
        pincode: '422601',
        landmark: 'Opp. SBI Bank'
      };
    } catch (e) {
      return null;
    }
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(savedAddress || {
    name: userName,
    phone: userPhone,
    street: '',
    area: '',
    city: 'Akole',
    pincode: '422601',
    landmark: ''
  });

  // Active Subscriptions State
  const [activeSubscriptions, setActiveSubscriptions] = useState(['coffee']);

  // Notifications State
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, title: 'Order Confirmed 🎉', desc: 'Your order #AKL-488908 for ₹305 has been received & sent to kitchen.', time: '10 mins ago', read: false },
    { id: 2, title: '20% Promo Unlocked 🏷️', desc: 'Use promo code AKOLE20 to get 20% OFF on your next gourmet order.', time: '2 hours ago', read: false },
    { id: 3, title: 'Welcome to Akole Club ☕', desc: 'You earned 250 Bonus Stars on creating your Akole Café member profile!', time: '1 day ago', read: true }
  ]);

  useEffect(() => {
    if (location.pathname === '/dashboard') setActiveTab('dashboard');
    else if (location.pathname === '/orders') setActiveTab('orders');
    else if (location.pathname === '/wishlist') setActiveTab('wishlist');
    else if (location.pathname === '/profile' && !tabParam) setActiveTab('profile');
    else if (tabParam) setActiveTab(tabParam);
  }, [location.pathname, tabParam]);

  // Load orders from LocalStorage + API
  useEffect(() => {
    let isMounted = true;
    const loadOrders = async () => {
      try {
        setLoadingOrders(true);
        let apiOrders = [];
        try {
          apiOrders = await fetchOrdersAPI();
        } catch (e) {}

        const localOrders = JSON.parse(localStorage.getItem('akole_user_orders') || '[]');
        
        // Merge unique orders by orderId
        const mergedMap = new Map();
        [...localOrders, ...(Array.isArray(apiOrders) ? apiOrders : [])].forEach(ord => {
          const id = ord.orderId || ord._id || ord.id;
          if (id && !mergedMap.has(id)) {
            mergedMap.set(id, ord);
          }
        });

        // Default mock orders if none exist
        if (mergedMap.size === 0) {
          const mockOrders = [
            {
              orderId: 'AKL-488908',
              customerName: userName,
              customerPhone: userPhone,
              deliveryAddress: 'Main Market Road, Akole - 422601',
              items: [{ name: 'Butter Chicken Gravy', quantity: 1, price: 290 }],
              totalAmount: 305,
              paymentMethod: 'UPI / Google Pay',
              status: 'Confirmed',
              createdAt: new Date().toISOString()
            },
            {
              orderId: 'AKL-393943',
              customerName: userName,
              customerPhone: userPhone,
              deliveryAddress: 'Near Bus Stand, Akole - 422601',
              items: [{ name: 'Special Tandoori Smoked Misal', quantity: 1, price: 160 }, { name: 'Special Filter Coffee', quantity: 1, price: 50 }],
              totalAmount: 220,
              paymentMethod: 'Cash on Delivery',
              status: 'Delivered',
              createdAt: new Date(Date.now() - 86400000).toISOString()
            }
          ];
          mockOrders.forEach(m => mergedMap.set(m.orderId, m));
        }

        if (isMounted) {
          setUserOrders(Array.from(mergedMap.values()));
        }
      } catch (err) {
        console.error('Failed to load user orders:', err);
      } finally {
        if (isMounted) setLoadingOrders(false);
      }
    };
    loadOrders();
    return () => { isMounted = false; };
  }, [currentUser, userName, userPhone]);

  const wishlistItems = wishlist || [];
  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'M';

  // Open live tracker for specific order
  const handleOpenTracker = (ordId) => {
    setSelectedOrderId(ordId);
    setIsTrackerOpen(true);
  };

  // Logout handler
  const handleLogout = () => {
    try {
      if (typeof logoutUser === 'function') {
        logoutUser();
      } else if (typeof logout === 'function') {
        logout();
      }
      localStorage.removeItem('akole_is_authenticated');
      localStorage.removeItem('akole_user_email');
      localStorage.removeItem('akole_user');
      localStorage.removeItem('akole_token');
      localStorage.removeItem('akole_admin_token');
    } catch (e) {
      console.warn('Logout warning:', e);
    }
    if (showToast) showToast('Logged out successfully!', 'info');
    navigate('/login');
  };

  // Avatar upload handler
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        setUserAvatar(base64Url);
        if (updateUserAvatar) {
          updateUserAvatar(base64Url);
        }
        showToast('Profile photo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updated = {
      ...(currentUser || {}),
      name: userName,
      phone: userPhone,
      email: userEmailAddress,
      avatar: userAvatar
    };
    if (updateUserAvatar && userAvatar) {
      updateUserAvatar(userAvatar);
    }
    setCurrentUser(updated);
    localStorage.setItem('akole_user', JSON.stringify(updated));
    localStorage.setItem('akole_user_email', userEmailAddress);
    showToast('Profile settings saved successfully!', 'success');
  };

  // Save address handler
  const handleSaveAddressSubmit = (e) => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.phone || !addressForm.street) {
      showToast('Please fill all address fields.', 'error');
      return;
    }
    localStorage.setItem('akole_saved_address', JSON.stringify(addressForm));
    setSavedAddress(addressForm);
    setIsEditingAddress(false);
    showToast('Primary delivery address updated successfully!', 'success');
  };

  // Filtered orders for My Orders tab
  const filteredOrders = userOrders.filter(ord => {
    if (!orderSearchQuery) return true;
    const q = orderSearchQuery.toLowerCase();
    return (ord.orderId || '').toLowerCase().includes(q) ||
           (ord.items || []).some(i => (i.name || '').toLowerCase().includes(q));
  });

  // Sidebar navigation menu items
  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'subscriptions', label: 'Subscriptions', icon: RefreshCw },
    { id: 'rewards', label: 'Rewards', icon: Star },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2621] font-sans flex flex-col md:flex-row">
      
      {/* LEFT SIDEBAR PANEL */}
      <aside className="w-full md:w-72 bg-white border-r border-gray-200/70 p-6 flex flex-col justify-between shrink-0 shadow-xs md:min-h-screen">
        <div>
          
          {/* Top Logo Header */}
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[#18201B] border-2 border-white shadow-md shrink-0 flex items-center justify-center p-1 overflow-hidden">
              <img src={logoEmblem} alt="Akole Cafe Logo" className="w-full h-full object-contain filter drop-shadow-md scale-[1.15]" />
            </div>
            <div className="flex items-baseline font-serif text-2xl tracking-[-0.5px]">
              <span className="font-bold text-[#1E2621]">Akole</span>
              <span className="italic font-medium text-[#48594B] ml-1">Café</span>
            </div>
          </Link>

          {/* User Profile Avatar Bar */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#F4F7F4] mb-6 border border-[#E2E8E4]">
            <div className="w-11 h-11 rounded-full bg-[#20571C] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0 overflow-hidden">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userInitial
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-[#1E2621] truncate">{userName}</h3>
              <p className="text-[11px] text-gray-500 truncate">{userEmailAddress}</p>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#EBF3EA] text-[#20571C] font-bold shadow-xs'
                      : 'text-[#4A5D50] hover:bg-gray-100/70 hover:text-[#1E2621]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#20571C]' : 'text-gray-400'}`} />
                  <span>{link.label}</span>
                  {link.id === 'orders' && userOrders.length > 0 && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-[#20571C] text-white text-[10px] font-bold">
                      {userOrders.length}
                    </span>
                  )}
                  {link.id === 'wishlist' && wishlistItems.length > 0 && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="pt-6 mt-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm text-rose-500 hover:bg-rose-50 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-rose-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 max-w-5xl">
        
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Member Banner Card */}
            <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-r from-[#1E2621] via-[#2A362E] to-[#1E2621] text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/20">
              <div className="space-y-1.5 z-10">
                <span className="px-3 py-1 rounded-full bg-[#D6AE4D]/20 text-[#F3E5AB] text-[10px] font-extrabold uppercase tracking-widest border border-[#D6AE4D]/40 inline-block">
                  ✦ MEMBER AREA
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                  Welcome back, {userName}!
                </h1>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium max-w-md">
                  Manage your orders, update your delivery profile, and track live kitchen status.
                </p>
              </div>

              <Link
                to="/menu"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#1E2621] font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all cursor-pointer shrink-0"
              >
                Continue Shopping →
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div 
                onClick={() => setActiveTab('orders')}
                className="p-5 rounded-[22px] bg-white border border-gray-200/70 shadow-2xs flex items-center justify-between cursor-pointer hover:border-[#20571C] transition-all"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Total Orders</span>
                  <div className="text-2xl font-serif font-black text-[#1E2621] mt-0.5">{userOrders.length}</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#EBF3EC] text-[#20571C] flex items-center justify-center">
                  <Package className="w-5.5 h-5.5 stroke-[2]" />
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('wishlist')}
                className="p-5 rounded-[22px] bg-white border border-gray-200/70 shadow-2xs flex items-center justify-between cursor-pointer hover:border-rose-300 transition-all"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Wishlist Items</span>
                  <div className="text-2xl font-serif font-black text-[#1E2621] mt-0.5">{wishlistItems.length}</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  <Heart className="w-5.5 h-5.5 stroke-[2]" />
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('rewards')}
                className="p-5 rounded-[22px] bg-white border border-gray-200/70 shadow-2xs flex items-center justify-between cursor-pointer hover:border-[#D6AE4D] transition-all"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Akole Club Stars</span>
                  <div className="text-2xl font-serif font-black text-[#1E2621] mt-0.5">250 ★</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#F6EED8] text-[#8C6D23] flex items-center justify-center">
                  <Star className="w-5.5 h-5.5 stroke-[2]" />
                </div>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="p-6 rounded-[28px] bg-white border border-gray-200/70 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#1E2621] flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#20571C]" /> Recent Orders
                </h3>
                <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-[#20571C] hover:underline">
                  View All →
                </button>
              </div>

              <div className="space-y-3">
                {userOrders.slice(0, 3).map((ord) => (
                  <div key={ord.orderId || ord._id} className="p-4 rounded-2xl bg-[#F7F9F6] border border-[#E2E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-[#1E2621]">{ord.orderId}</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#EBF3EC] text-[#20571C] text-[9px] font-black uppercase border border-[#D4E3D5]">
                          {ord.status || 'Confirmed'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        {(ord.items || []).map(i => i.name).join(', ') || 'Akole Gourmet Order'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-serif font-black text-sm text-[#1E2621]">₹{ord.totalAmount}</span>
                      <button
                        onClick={() => handleOpenTracker(ord.orderId)}
                        className="py-1.5 px-3 rounded-xl bg-[#20571C] hover:bg-[#164213] text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                      >
                        <Truck className="w-3 h-3 text-[#F3E5AB]" /> Track Live
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6EED8] text-[#8C6D23] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#EADBBD]">
                ✦ SETTINGS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                Profile Settings
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your personal information, contact details, and account preferences.
              </p>
            </div>

            <form onSubmit={handleSaveChanges} className="bg-white rounded-[32px] p-6 sm:p-10 border border-gray-200/60 shadow-sm space-y-8">
              {/* Profile Photo Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-100">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-full border-2 border-[#D6AE4D] bg-gray-50 flex items-center justify-center p-0.5 overflow-hidden shadow-inner">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <User className="w-12 h-12 text-gray-400 stroke-[1.5]" />
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload-main"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#D6AE4D] text-[#1E2621] flex items-center justify-center shadow-md border-2 border-white hover:scale-105 transition-transform cursor-pointer"
                    title="Change Photo"
                  >
                    <Camera className="w-4 h-4" />
                    <input id="avatar-upload-main" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                </div>

                <div className="text-center sm:text-left space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#1E2621]">Profile Photo</h3>
                  <p className="text-xs text-gray-400 max-w-sm">Upload a clear photo. PNG or JPG format accepted.</p>
                  <label htmlFor="avatar-upload-btn" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D6AE4D] text-[#1E2621] font-bold text-xs hover:bg-[#FDF9F0] transition-colors cursor-pointer">
                    <Camera className="w-3.5 h-3.5 text-[#8C6D23]" />
                    <span>Upload New Photo</span>
                    <input id="avatar-upload-btn" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A7B31] border-b border-gray-100 pb-2">
                  PERSONAL DETAILS
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-[#1E2621] focus:outline-none focus:border-[#20571C] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-[#1E2621] focus:outline-none focus:border-[#20571C] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="block text-xs font-bold text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={userEmailAddress}
                    onChange={(e) => setUserEmailAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-[#1E2621] focus:outline-none focus:border-[#20571C] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#20571C] via-[#2D7A27] to-[#164213] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all cursor-pointer"
              >
                Save Profile Settings
              </button>
            </form>
          </motion.div>
        )}

        {/* TAB 3: MY ORDERS */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6EED8] text-[#8C6D23] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#EADBBD]">
                  ✦ TRANSACTIONS
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                  My Orders
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Track kitchen status live and review your past purchases.
                </p>
              </div>

              {/* Order Search Bar */}
              <div className="relative shrink-0 min-w-[240px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search order ID or item..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-[#1E2621] focus:outline-none focus:border-[#20571C] shadow-2xs"
                />
              </div>
            </div>

            {loadingOrders ? (
              <p className="text-sm text-gray-500">Loading order history...</p>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200/80 rounded-[32px] p-12 sm:p-16 text-center max-w-3xl space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-[#8C6D23] flex items-center justify-center mx-auto mb-2 border border-[#EADBBD]/50">
                  <Package className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1E2621] mb-1">No orders found</h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">Explore our menu and place your first order!</p>
                </div>
                <Link to="/menu" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#20571C] text-white font-bold text-xs uppercase shadow-md">
                  <Coffee className="w-4 h-4" /> Browse Menu
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-w-4xl">
                {filteredOrders.map((ord) => (
                  <div key={ord.orderId || ord._id} className="p-5 sm:p-6 rounded-[24px] bg-white border border-gray-200/70 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                      <div>
                        <span className="font-mono text-sm font-black text-[#1E2621]">{ord.orderId}</span>
                        <div className="text-xs text-gray-400 mt-0.5">Date: {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-IN')}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#EBF3EC] text-[#20571C] text-[10px] font-extrabold uppercase border border-[#D4E3D5]">
                          {ord.status || 'Confirmed'}
                        </span>
                        <button
                          onClick={() => handleOpenTracker(ord.orderId)}
                          className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-[#20571C] via-[#2D7A27] to-[#164213] text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-xs hover:brightness-110 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5 text-[#F3E5AB]" /> Track Live 🛵
                        </button>
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-gray-500 font-medium">Items:</div>
                      <div className="font-semibold text-[#1E2621]">
                        {(ord.items || []).map(i => `${i.name} (x${i.quantity})`).join(', ')}
                      </div>
                      <div className="text-gray-500 text-[11px] pt-1">
                        Delivery Address: <span className="text-[#1E2621] font-medium">{ord.deliveryAddress}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                      <span className="text-gray-500 font-medium">Payment: <strong>{ord.paymentMethod}</strong></span>
                      <span className="font-serif text-lg font-black text-[#20571C]">₹{ord.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: WISHLIST */}
        {activeTab === 'wishlist' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6EED8] text-[#8C6D23] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#EADBBD]">
                ✦ FAVOURITES
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                My Wishlist ({wishlistItems.length})
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Your curated collection of artisanal brews and premium treats.
              </p>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200/80 rounded-[32px] p-12 text-center max-w-3xl space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-2 border border-rose-100">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1E2621]">Your wishlist is empty</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">Save your favorite dishes to order them anytime in 1-click!</p>
                <Link to="/menu" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#20571C] text-white font-bold text-xs uppercase shadow-md">
                  <Coffee className="w-4 h-4" /> Explore Our Menu
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
                {wishlistItems.map((item) => (
                  <div key={item.id || item._id} className="p-4 rounded-2xl bg-white border border-gray-200/70 shadow-sm flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-[#1E2621] truncate">{item.name}</h4>
                        <p className="text-xs text-[#20571C] font-black">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { addToCart(item); showToast(`Added "${item.name}" to cart!`); }}
                        className="py-1.5 px-3 rounded-xl bg-[#20571C] text-white font-bold text-[10px] uppercase cursor-pointer"
                      >
                        + Add
                      </button>
                      <button
                        onClick={() => removeFromWishlist && removeFromWishlist(item)}
                        className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 5: ADDRESSES */}
        {activeTab === 'addresses' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6EED8] text-[#8C6D23] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#EADBBD]">
                  ✦ LOCATIONS
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                  Saved Delivery Address
                </h1>
              </div>

              <button
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className="px-5 py-2.5 rounded-2xl bg-[#20571C] hover:bg-[#164213] text-white font-bold text-xs shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isEditingAddress ? 'Cancel' : 'Edit Address'}</span>
              </button>
            </div>

            {isEditingAddress ? (
              <form onSubmit={handleSaveAddressSubmit} className="bg-white rounded-[28px] p-6 border border-gray-200/70 shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#1E2621]">Edit Primary Delivery Address</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={addressForm.name}
                      onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Locality / Area</label>
                    <input
                      type="text"
                      value={addressForm.area}
                      onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Landmark</label>
                    <input
                      type="text"
                      value={addressForm.landmark}
                      onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-3 rounded-xl bg-[#20571C] text-white font-bold text-xs uppercase shadow-sm cursor-pointer">
                  Save Primary Address
                </button>
              </form>
            ) : savedAddress ? (
              <div className="p-6 rounded-[24px] bg-white border border-[#20571C]/40 shadow-sm max-w-2xl space-y-2 relative">
                <span className="px-3 py-1 rounded-full bg-[#EBF3EC] text-[#20571C] text-[10px] uppercase font-extrabold border border-[#D4E3D5] inline-flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#20571C]" /> Primary Delivery Location
                </span>
                <h3 className="font-serif text-xl font-extrabold text-[#1E2621]">{savedAddress.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{savedAddress.phone}</p>
                <p className="text-xs text-[#3B4A3E] font-semibold leading-relaxed">
                  {savedAddress.street}, {savedAddress.area ? savedAddress.area + ', ' : ''}{savedAddress.city} - {savedAddress.pincode}
                </p>
                {savedAddress.landmark && (
                  <p className="text-xs text-[#20571C] font-bold">Landmark: {savedAddress.landmark}</p>
                )}
              </div>
            ) : null}
          </motion.div>
        )}

        {/* TAB 6: SUBSCRIPTIONS */}
        {activeTab === 'subscriptions' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                Coffee & Meal Subscriptions
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Fresh filter coffee, Maharashtrian tiffin, and snacks delivered daily to your doorstep.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {/* Plan 1 */}
              <div className="p-6 rounded-[28px] bg-white border border-gray-200/70 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-[#EBF3EC] text-[#20571C] text-[9px] font-black uppercase tracking-wider">
                    DAILY COFFEE
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1E2621]">Artisanal Coffee Sub</h3>
                  <div className="text-2xl font-serif font-black text-[#20571C]">₹499 <span className="text-xs font-normal text-gray-500">/ month</span></div>
                  <p className="text-xs text-gray-500">1 Hot/Cold Filter Coffee delivered daily (30 Days).</p>
                </div>
                <button
                  onClick={() => showToast('Subscribed to Daily Coffee Plan!', 'success')}
                  className="w-full py-2.5 rounded-xl bg-[#20571C] text-white font-bold text-xs uppercase shadow-xs cursor-pointer"
                >
                  Active Subscription ✓
                </button>
              </div>

              {/* Plan 2 */}
              <div className="p-6 rounded-[28px] bg-white border border-[#D6AE4D]/50 shadow-md space-y-4 flex flex-col justify-between relative overflow-hidden">
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#D6AE4D] text-[#1E2621] text-[8px] font-black uppercase">
                  POPULAR
                </span>
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-[#F6EED8] text-[#8C6D23] text-[9px] font-black uppercase tracking-wider">
                    ROYAL LUNCH
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1E2621]">Maharashtrian Thali Sub</h3>
                  <div className="text-2xl font-serif font-black text-[#20571C]">₹1,499 <span className="text-xs font-normal text-gray-500">/ month</span></div>
                  <p className="text-xs text-gray-500">Authentic Veg/Non-Veg Tiffin Thali for lunch daily.</p>
                </div>
                <button
                  onClick={() => showToast('Subscribed to Maharashtrian Thali Plan!', 'success')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C8A96A] to-[#B08E48] text-[#1E2621] font-bold text-xs uppercase shadow-xs cursor-pointer"
                >
                  Subscribe Now
                </button>
              </div>

              {/* Plan 3 */}
              <div className="p-6 rounded-[28px] bg-white border border-gray-200/70 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[9px] font-black uppercase tracking-wider">
                    EVENING SNACKS
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1E2621]">Chai & Snack Box Sub</h3>
                  <div className="text-2xl font-serif font-black text-[#20571C]">₹399 <span className="text-xs font-normal text-gray-500">/ month</span></div>
                  <p className="text-xs text-gray-500">Fresh Vada Pav, Misal or Bakery Treats every evening.</p>
                </div>
                <button
                  onClick={() => showToast('Subscribed to Snack Box Plan!', 'success')}
                  className="w-full py-2.5 rounded-xl bg-[#1E2621] text-white font-bold text-xs uppercase shadow-xs cursor-pointer"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 7: REWARDS */}
        {activeTab === 'rewards' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                Akole Loyalty Club 👑
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Earn stars on every meal and redeem them for free food & discounts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl">
              <div className="md:col-span-7 bg-[#20571C] text-white rounded-[28px] p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200 block">
                    YOUR CURRENT BALANCE
                  </span>
                  <p className="font-serif text-4xl font-bold text-white flex items-baseline gap-2 mt-2">
                    250 <span className="text-sm font-normal text-emerald-200">Akole Stars ★</span>
                  </p>
                </div>

                <div className="border-t border-white/20 pt-3 flex items-center justify-between text-xs text-emerald-100">
                  <span>Cash Value: <strong>₹25.00</strong></span>
                  <button onClick={() => showToast('Redeemed 100 Stars for ₹10 Promo Code!', 'success')} className="font-bold underline cursor-pointer">
                    Redeem Now
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 bg-white rounded-[28px] p-6 border border-gray-200/70 shadow-sm min-h-[160px] flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                    REFER A FRIEND
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#1E2621]">Share the love & earn ₹50!</h3>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-between font-mono font-bold text-xs text-[#1E2621]">
                  <span>BREW50</span>
                  <button onClick={() => { navigator.clipboard.writeText('BREW50'); showToast('Referral code BREW50 copied!', 'success'); }} className="p-1 text-[#20571C] cursor-pointer">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 8: COUPONS */}
        {activeTab === 'coupons' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6EED8] text-[#8C6D23] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#EADBBD]">
                ✦ PROMOS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                Member Coupons & Offers
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
              {[
                { code: 'AKOLE20', title: '20% OFF Everything', desc: 'Valid on all gourmet dishes, coffee & desserts.', badge: '20% OFF' },
                { code: 'WELCOME100', title: '₹100 Flat Discount', desc: 'Instant ₹100 discount on orders above ₹300.', badge: 'FLAT ₹100' },
                { code: 'FREEDEL', title: 'Free Home Delivery', desc: 'Zero delivery fees anywhere in Akole.', badge: 'FREE SHIP' },
                { code: 'AKOLEVIP', title: 'VIP Gold 15% OFF', desc: 'Exclusive discount for registered members.', badge: 'VIP SPECIAL' }
              ].map((c) => (
                <div key={c.code} className="bg-white rounded-[24px] p-5 border border-gray-200/70 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3EC] text-[#20571C] text-[9px] font-extrabold uppercase border border-[#D4E3D5]">
                      {c.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-gray-400">{c.code}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1E2621]">{c.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => { navigator.clipboard.writeText(c.code); showToast(`Coupon code ${c.code} copied!`, 'success'); }}
                      className="flex-1 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[#1E2621] font-extrabold text-[10px] uppercase cursor-pointer"
                    >
                      Copy Code
                    </button>
                    <button
                      onClick={() => { applyCoupon(c.code); showToast(`Applied ${c.code} discount!`, 'success'); navigate('/cart'); }}
                      className="flex-1 py-2 rounded-xl bg-[#20571C] text-white font-extrabold text-[10px] uppercase cursor-pointer"
                    >
                      Apply to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 9: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                Notifications ({notificationsList.length})
              </h1>
              <button
                onClick={() => { setNotificationsList([]); showToast('Notifications cleared!', 'info'); }}
                className="text-xs font-bold text-[#20571C] hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {notificationsList.length === 0 ? (
              <div className="bg-white rounded-[32px] p-12 border border-gray-200/60 shadow-sm text-center max-w-4xl space-y-3">
                <BellOff className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#1E2621]">Clean slate</h3>
                <p className="text-xs text-gray-400">You don't have any notifications at the moment.</p>
              </div>
            ) : (
              <div className="space-y-3 max-w-4xl">
                {notificationsList.map((n) => (
                  <div key={n.id} className="p-4 rounded-2xl bg-white border border-gray-200/70 shadow-2xs flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EBF3EC] text-[#20571C] flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-[#1E2621]">{n.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

      </main>

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        defaultOrderId={selectedOrderId}
      />
    </div>
  );
};

export default Profile;
