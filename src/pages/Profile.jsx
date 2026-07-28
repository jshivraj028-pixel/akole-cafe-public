import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { fetchOrdersAPI } from '../services/api';
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
  ShieldCheck,
  Globe,
  Lock,
  Sparkles,
  Search,
  Check,
  Copy,
  Plus,
  Coffee,
  ArrowRight,
  MapPinOff,
  ShoppingBag
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, setCurrentUser, wishlist, showToast, logout } = useTheme();

  // Saved user sync
  const savedUserStr = typeof window !== 'undefined' ? localStorage.getItem('akole_user') : null;
  const savedUserObj = savedUserStr ? JSON.parse(savedUserStr) : null;
  const activeUser = currentUser || savedUserObj;
  
  const initialEmail = activeUser?.email || (typeof window !== 'undefined' ? localStorage.getItem('akole_user_email') : '') || 'mayurgambhire4565@gmail.com';
  const initialName = activeUser?.name || activeUser?.username || (initialEmail && initialEmail.includes('@') ? initialEmail.split('@')[0] : 'Mayur Gambhire');

  const [userName, setUserName] = useState(initialName);
  const [userPhone, setUserPhone] = useState(activeUser?.phone || '+91 9876543210');
  const [userEmailAddress, setUserEmailAddress] = useState(initialEmail);
  const [selectedLanguage, setSelectedLanguage] = useState('English (English)');
  const [userAvatar, setUserAvatar] = useState(activeUser?.avatar || '');

  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam || (location.pathname === '/dashboard' ? 'dashboard' : (location.pathname === '/orders' ? 'orders' : (location.pathname === '/wishlist' ? 'wishlist' : (location.pathname === '/profile' ? 'profile' : 'dashboard'))));

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (location.pathname === '/dashboard') setActiveTab('dashboard');
    else if (location.pathname === '/orders') setActiveTab('orders');
    else if (location.pathname === '/wishlist') setActiveTab('wishlist');
    else if (location.pathname === '/profile' && !tabParam) setActiveTab('profile');
    else if (tabParam) setActiveTab(tabParam);
  }, [location.pathname, tabParam]);
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Sync with currentUser
  useEffect(() => {
    const userToSync = currentUser || (localStorage.getItem('akole_user') ? JSON.parse(localStorage.getItem('akole_user')) : null);
    if (userToSync) {
      const email = userToSync.email || localStorage.getItem('akole_user_email') || 'mayurgambhire4565@gmail.com';
      const name = userToSync.name || userToSync.username || 'Mayur Gambhire';
      setUserName(name);
      setUserEmailAddress(email);
      if (userToSync.phone) setUserPhone(userToSync.phone);
      if (userToSync.avatar) setUserAvatar(userToSync.avatar);
    }
  }, [currentUser]);

  // Load orders
  useEffect(() => {
    let isMounted = true;
    const loadOrders = async () => {
      try {
        setLoadingOrders(true);
        const ordersData = await fetchOrdersAPI();
        if (isMounted) {
          const emailFilter = currentUser?.email?.toLowerCase();
          const myOrders = ordersData.filter(o => 
            !emailFilter || o.email?.toLowerCase() === emailFilter || o.userEmail?.toLowerCase() === emailFilter
          );
          setUserOrders(myOrders.length > 0 ? myOrders : ordersData.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to load user orders:', err);
      } finally {
        if (isMounted) setLoadingOrders(false);
      }
    };
    loadOrders();
    return () => { isMounted = false; };
  }, [currentUser]);

  const wishlistItems = wishlist || [];
  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'M';

  // Logout handler
  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/');
  };

  // Avatar upload handler
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        setUserAvatar(base64Url);
        const updated = {
          ...(currentUser || {}),
          avatar: base64Url
        };
        setCurrentUser(updated);
        localStorage.setItem('akole_user', JSON.stringify(updated));
        showToast('Profile photo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes handler
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updated = {
      ...(currentUser || {}),
      name: userName,
      phone: userPhone,
      email: userEmailAddress,
      avatar: userAvatar
    };
    setCurrentUser(updated);
    localStorage.setItem('akole_user', JSON.stringify(updated));
    localStorage.setItem('akole_user_email', userEmailAddress);
    showToast('Profile settings saved successfully!', 'success');
  };

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
            <div className="flex items-baseline font-cormorant text-2xl tracking-[-0.5px]">
              <span className="font-bold text-[#1E2621]">Akole</span>
              <span className="italic font-medium text-[#48594B] ml-1">Café</span>
            </div>
          </Link>

          {/* User Profile Avatar Bar */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50/80 mb-6 border border-gray-100">
            <div className="w-11 h-11 rounded-full bg-[#8CA48E] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0 overflow-hidden">
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
                      ? 'bg-[#EBF3EA] text-[#1E562F] font-bold shadow-xs'
                      : 'text-[#4A5D50] hover:bg-gray-100/70 hover:text-[#1E2621]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#1E562F]' : 'text-gray-400'}`} />
                  <span>{link.label}</span>
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
        
        {/* TAB 1: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header Badge & Title */}
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6EED8] text-[#8C6D23] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#EADBBD]">
                ✦ SETTINGS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                Profile Settings
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your personal information and contact details.
              </p>
            </div>

            {/* Main Settings Card */}
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
                    title="Change Profile Photo"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="avatar-upload-main"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="text-center sm:text-left space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#1E2621]">
                    Profile Photo
                  </h3>
                  <p className="text-xs text-gray-400 max-w-sm">
                    Upload a clear headshot. Accepted formats: PNG or JPG. Max file size: 5MB.
                  </p>
                  <label
                    htmlFor="avatar-upload-btn"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D6AE4D] text-[#1E2621] font-bold text-xs hover:bg-[#FDF9F0] transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#8C6D23]" />
                    <span>Upload Photo</span>
                    <input
                      id="avatar-upload-btn"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Personal Details Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A7B31] border-b border-gray-100 pb-2">
                  PERSONAL DETAILS
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-[#1E2621] focus:outline-none focus:border-[#1E562F] focus:ring-1 focus:ring-[#1E562F] transition-all"
                        placeholder="Mayur Gambhire"
                        required
                      />
                      <User className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-[#1E2621] focus:outline-none focus:border-[#1E562F] focus:ring-1 focus:ring-[#1E562F] transition-all"
                        placeholder="e.g. +91 9876543210"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Language & Account Settings Section */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A7B31] border-b border-gray-100 pb-2">
                  LANGUAGE & ACCOUNT SETTINGS
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email Address with Verified Badge */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        value={userEmailAddress}
                        onChange={(e) => setUserEmailAddress(e.target.value)}
                        className="w-full px-4 py-3 pr-24 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-[#1E2621] focus:outline-none focus:border-[#1E562F] focus:ring-1 focus:ring-[#1E562F] transition-all truncate"
                        placeholder="mayurgambhire4565@gmail.com"
                        required
                      />
                      <div className="absolute right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E5F5E4] text-[#1E562F] text-[10px] font-bold border border-[#C5E8C3] shrink-0">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Select Language Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-gray-400" />
                      <span>Select Language</span>
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-[#1E2621] focus:outline-none focus:border-[#1E562F] focus:ring-1 focus:ring-[#1E562F] transition-all cursor-pointer"
                    >
                      <option value="English (English)">English (English)</option>
                      <option value="Marathi (मराठी)">Marathi (मराठी)</option>
                      <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Secure Account Alert Note */}
              <div className="p-4 rounded-2xl bg-[#F7F9F6] border border-[#E1E8DF] flex items-start gap-3 text-xs text-gray-600">
                <ShieldCheck className="w-4 h-4 text-[#1E562F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1E2621] block mb-0.5">Secure Account</span>
                  <span>Email changes require contacting customer support to ensure security.</span>
                </div>
              </div>

              {/* Save Changes CTA Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#236336] hover:bg-[#1A4B29] active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>
          </motion.div>
        )}

        {/* TAB 2: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Top Hero Banner */}
            <div className="relative rounded-[32px] bg-gradient-to-r from-[#241710] via-[#332217] to-[#1E120B] text-white p-8 sm:p-10 shadow-xl overflow-hidden">
              
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6AE4D]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#433120] text-[#D6AE4D] text-[11px] font-bold uppercase tracking-wider mb-3 border border-[#59422C]">
                    ✦ MEMBER AREA
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    Welcome back, <span className="text-[#D6AE4D]">{userName}!</span>
                  </h1>
                  <p className="text-xs text-[#C5B7A8] max-w-lg mt-2 leading-relaxed">
                    Manage your orders, update your profile, and browse our gourmet menu all in one place.
                  </p>
                </div>

                <Link
                  to="/menu"
                  className="px-6 py-3 rounded-2xl bg-[#D6AE4D] hover:bg-[#E8C364] text-[#241710] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#241710]" />
                  <span>Continue Shopping</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* Stat Cards (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1: TOTAL ORDERS */}
              <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1E562F] shrink-0 border border-gray-100">
                  <Package className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                    TOTAL ORDERS
                  </span>
                  <p className="font-serif text-2xl font-bold text-[#1E2621]">
                    {userOrders.length}
                  </p>
                </div>
              </div>

              {/* Card 2: WISHLIST ITEMS */}
              <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-rose-500 shrink-0 border border-gray-100">
                  <Heart className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                    WISHLIST ITEMS
                  </span>
                  <p className="font-serif text-2xl font-bold text-[#1E2621]">
                    {wishlistItems.length}
                  </p>
                </div>
              </div>

            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#1E2621] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E562F]" />
                  <span>Recent Orders</span>
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-[#1E562F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <span className="text-sm">→</span>
                </button>
              </div>

              {/* Inner Content Area */}
              {userOrders.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200/80 rounded-[28px] p-10 sm:p-14 text-center bg-gray-50/50 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#1E2621] mb-1">
                      No orders placed yet
                    </h4>
                    <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                      Explore our premium house blends, gourmet light bites, and specialty desserts to place your first order.
                    </p>
                  </div>
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#236336] hover:bg-[#1A4B29] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>Start Shopping</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {userOrders.slice(0, 3).map((ord) => (
                    <div key={ord._id || ord.orderId} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#1E2621]">Order #{ord.orderId || ord.id}</span>
                        <p className="text-gray-500 text-[11px] mt-0.5">{ord.status || 'Confirmed'}</p>
                      </div>
                      <span className="font-bold text-sm text-[#1E562F]">₹{ord.totalAmount || ord.total || 250}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </motion.div>
        )}

        {/* TAB: MY ORDERS */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6EED8] text-[#8C6D23] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#EADBBD]">
                ✦ TRANSACTIONS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                My Orders
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Track and review your past purchases.
              </p>
            </div>

            {loadingOrders ? (
              <p className="text-sm text-gray-500">Loading order history...</p>
            ) : userOrders.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200/80 rounded-[32px] p-12 sm:p-16 text-center max-w-3xl space-y-4">
                <div className="relative w-16 h-16 rounded-full bg-amber-50/80 text-[#8C6D23] flex items-center justify-center mx-auto mb-2 border border-[#EADBBD]/50">
                  <Package className="w-8 h-8 stroke-[1.5]" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#D6AE4D]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2621] mb-1">
                    No orders found
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                    You haven't ordered any premium coffee yet. Start exploring our rich selection of hand-roasted beans and specialty items!
                  </p>
                </div>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#236336] hover:bg-[#1A4B29] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-white" />
                  <span>Browse Menu</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-w-4xl">
                {userOrders.map((ord) => (
                  <div key={ord._id || ord.orderId} className="p-6 rounded-[24px] bg-white border border-gray-200/70 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-bold text-[#1E2621]">Order #{ord.orderId || ord.id}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{ord.status || 'Confirmed'}</p>
                    </div>
                    <span className="font-serif font-bold text-lg text-[#1E562F]">₹{ord.totalAmount || ord.total || 250}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB: WISHLIST */}
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
                My Wishlist
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Your curated collection of artisanal brews and premium treats.
              </p>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200/80 rounded-[32px] p-12 sm:p-16 text-center max-w-3xl space-y-4">
                <div className="relative w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-2 border border-rose-100">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#D6AE4D]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2621] mb-1">
                    Your wishlist is empty
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                    Curate your dream menu! Save your favorite house blends, gourmet sandwich melts, and desserts to order them later.
                  </p>
                </div>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#236336] hover:bg-[#1A4B29] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-white" />
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-white border border-gray-200/70 shadow-sm flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-[#1E2621]">{item.name}</h4>
                      <p className="text-xs text-[#D6AE4D] font-bold">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB: ADDRESSES */}
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
                  My Addresses
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your delivery and billing locations.
                </p>
              </div>

              <button
                onClick={() => showToast('Enter delivery address details', 'info')}
                className="px-5 py-2.5 rounded-2xl bg-[#236336] hover:bg-[#1A4B29] text-white font-bold text-xs shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="bg-white border-2 border-dashed border-gray-200/80 rounded-[32px] p-12 sm:p-16 text-center max-w-3xl space-y-4">
              <div className="relative w-16 h-16 rounded-full bg-amber-50/80 text-[#8C6D23] flex items-center justify-center mx-auto mb-2 border border-[#EADBBD]/50">
                <MapPinOff className="w-8 h-8 stroke-[1.5]" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#D6AE4D]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2621] mb-1">
                  No addresses saved
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                  Add a delivery address to ensure faster checkout for your future premium coffee cravings.
                </p>
              </div>
              <button
                onClick={() => showToast('Enter delivery address details', 'info')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#236336] hover:bg-[#1A4B29] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Add New Address</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB: SUBSCRIPTIONS */}
        {activeTab === 'subscriptions' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                  Coffee Subscriptions
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Freshly roasted beans delivered to your doorstep automatically.
                </p>
              </div>

              <button
                onClick={() => showToast('Choose a coffee bean subscription plan', 'info')}
                className="px-5 py-2.5 rounded-2xl bg-[#236336] hover:bg-[#1A4B29] text-white font-bold text-xs shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Package className="w-4 h-4" />
                <span>Subscribe Now</span>
              </button>
            </div>

            <div className="bg-white rounded-[32px] p-12 sm:p-16 border border-gray-200/60 shadow-sm text-center max-w-3xl space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EBF3EA] text-[#1E562F] flex items-center justify-center mx-auto mb-2 border border-[#C5E8C3]">
                <RefreshCw className="w-8 h-8 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2621] mb-1">
                  No active subscriptions
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                  Get your favorite beans on a regular schedule and save up to 10% on every order.
                </p>
              </div>
              <button
                onClick={() => showToast('Choose a coffee bean subscription plan', 'info')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#236336] hover:bg-[#1A4B29] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <span>Configure A Plan</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB: REWARDS */}
        {activeTab === 'rewards' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                Loyalty Club
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Earn stars on every sip and redeem them for premium rewards.
              </p>
            </div>

            {/* Top 2 Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl">
              
              {/* Green Card: Current Balance */}
              <div className="md:col-span-7 bg-[#28793D] text-white rounded-[28px] p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/80 block">
                    YOUR CURRENT BALANCE
                  </span>
                  <p className="font-serif text-4xl font-bold text-white flex items-baseline gap-2 mt-2">
                    0 <span className="text-sm font-normal text-white/90">Stars</span>
                  </p>
                </div>

                <div className="relative z-10 border-t border-white/20 pt-3 flex items-center justify-between text-xs text-white/90">
                  <span>Estimated Value: <strong>₹0.00</strong></span>
                  <span>10 Stars = ₹1.00</span>
                </div>
              </div>

              {/* White Card: Refer a Friend */}
              <div className="md:col-span-5 bg-white rounded-[28px] p-6 border border-gray-200/70 shadow-sm min-h-[160px] flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                    REFER A FRIEND
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#1E2621]">
                    Share the love, get rewarded!
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Give ₹50 off to your friend. Get 50 stars when they order.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-between font-mono font-bold text-xs text-[#1E2621]">
                  <span>BREW50</span>
                  <button
                    onClick={() => { navigator.clipboard.writeText('BREW50'); showToast('Referral code BREW50 copied!', 'success'); }}
                    className="p-1 hover:text-[#1E562F] transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Stars Ledger */}
            <div className="bg-white rounded-[32px] border border-gray-200/70 shadow-sm overflow-hidden max-w-4xl">
              <div className="p-6 border-b border-gray-100 flex items-center gap-2.5">
                <Star className="w-5 h-5 text-[#1E2621]" />
                <h3 className="font-serif text-xl font-bold text-[#1E2621]">Stars Ledger</h3>
              </div>

              <div className="p-12 text-center space-y-2">
                <Star className="w-12 h-12 text-gray-300 stroke-[1.2] mx-auto mb-2" />
                <h4 className="font-serif text-lg font-bold text-[#1E2621]">
                  No ledger entries yet
                </h4>
                <p className="text-xs text-gray-400">
                  Start purchasing to collect loyalty rewards.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB: COUPONS */}
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
                My Coupons
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Active promo codes and exclusive member discounts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-white rounded-[28px] p-6 border border-gray-200/70 shadow-sm relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#EBF3EA] text-[#1E562F] text-[10px] font-bold uppercase tracking-wider border border-[#C5E8C3]">
                    20% OFF
                  </span>
                  <span className="font-mono text-xs font-bold text-gray-400">AKOLE20</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1E2621]">20% OFF Everything</h3>
                  <p className="text-xs text-gray-500 mt-1">Valid on all coffee beverages, pizzas, and artisanal snacks.</p>
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText('AKOLE20'); showToast('Coupon code AKOLE20 copied!', 'success'); }}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F5] border border-gray-200 text-[#1E2621] font-bold text-xs hover:bg-[#1E2621] hover:text-white transition-all cursor-pointer"
                >
                  Copy Promo Code
                </button>
              </div>

              <div className="bg-white rounded-[28px] p-6 border border-gray-200/70 shadow-sm relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#F6EED8] text-[#8C6D23] text-[10px] font-bold uppercase tracking-wider border border-[#EADBBD]">
                    VIP SPECIAL
                  </span>
                  <span className="font-mono text-xs font-bold text-gray-400">AKOLEVIP</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1E2621]">VIP Gold 15% OFF</h3>
                  <p className="text-xs text-gray-500 mt-1">Exclusive instant discount for registered Akole Café members.</p>
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText('AKOLEVIP'); showToast('Coupon code AKOLEVIP copied!', 'success'); }}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F5] border border-gray-200 text-[#1E2621] font-bold text-xs hover:bg-[#1E2621] hover:text-white transition-all cursor-pointer"
                >
                  Copy Promo Code
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2621]">
                Notifications
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Stay updated on your premium orders and exclusive rewards.
              </p>
            </div>

            <div className="bg-white rounded-[32px] p-12 sm:p-20 border border-gray-200/60 shadow-sm text-center max-w-4xl space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EBF3EA] text-[#1E562F] flex items-center justify-center mx-auto mb-4 border border-[#C5E8C3]">
                <BellOff className="w-8 h-8 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2621]">
                Clean slate
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                You don't have any notifications at the moment.
              </p>
            </div>
          </motion.div>
        )}

      </main>
    </div>
  );
};

export default Profile;
