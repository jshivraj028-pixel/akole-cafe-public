import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/common/Container';
import PageBanner from '../components/common/PageBanner';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import { fetchOrdersAPI } from '../services/api';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiEdit3, 
  FiClock, 
  FiHeart, 
  FiAward, 
  FiCheckCircle, 
  FiCamera,
  FiShoppingBag,
  FiChevronRight,
  FiLogOut,
  FiX
} from 'react-icons/fi';
import { Sparkles } from 'lucide-react';

const Profile = () => {
  const { currentUser, setCurrentUser, wishlist, showToast, logout } = useTheme();

  // Redirect or default user info dynamically from logged in account
  const savedUserStr = typeof window !== 'undefined' ? localStorage.getItem('akole_user') : null;
  const savedUserObj = savedUserStr ? JSON.parse(savedUserStr) : null;
  const activeUser = currentUser || savedUserObj;
  const initialEmail = activeUser?.email || (typeof window !== 'undefined' ? localStorage.getItem('akole_user_email') : '') || 'guest@akolecafe.com';
  const initialName = activeUser?.name || activeUser?.username || (initialEmail && initialEmail.includes('@') ? initialEmail.split('@')[0] : 'Akole VIP Member');

  const [userName, setUserName] = useState(initialName);
  const [userPhone, setUserPhone] = useState(activeUser?.phone || '+91 98765 43210');
  const [userEmailAddress, setUserEmailAddress] = useState(initialEmail);
  const [userAddress, setUserAddress] = useState(activeUser?.address || 'Akole Bypass Road, Near Central Bus Stand, Akole, Maharashtra 422601');
  const [userLandmark, setUserLandmark] = useState(activeUser?.landmark || 'Near Central Bus Stand');
  const [userCity, setUserCity] = useState(activeUser?.city || 'Akole, Ahmednagar');
  const [userPincode, setUserPincode] = useState(activeUser?.pincode || '422601');
  const [userAvatar, setUserAvatar] = useState(activeUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');

  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'orders' | 'wishlist' | 'rewards'
  const [isEditing, setIsEditing] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Address Edit Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState(userAddress);
  const [tempLandmark, setTempLandmark] = useState(userLandmark);
  const [tempCity, setTempCity] = useState(userCity);
  const [tempPincode, setTempPincode] = useState(userPincode);

  // Sync state dynamically when currentUser or login session updates
  useEffect(() => {
    const userToSync = currentUser || (localStorage.getItem('akole_user') ? JSON.parse(localStorage.getItem('akole_user')) : null);
    if (userToSync) {
      const email = userToSync.email || localStorage.getItem('akole_user_email') || 'guest@akolecafe.com';
      const name = userToSync.name || userToSync.username || (email && email.includes('@') ? email.split('@')[0] : 'Akole VIP Member');
      setUserName(name);
      setUserEmailAddress(email);
      if (userToSync.phone) setUserPhone(userToSync.phone);
      if (userToSync.address) setUserAddress(userToSync.address);
      if (userToSync.landmark) setUserLandmark(userToSync.landmark);
      if (userToSync.city) setUserCity(userToSync.city);
      if (userToSync.pincode) setUserPincode(userToSync.pincode);
      if (userToSync.avatar) setUserAvatar(userToSync.avatar);
    }
  }, [currentUser]);

  // Load User Orders from API
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

  // Handle Logout
  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
  };

  // Handle Image Upload / Change Photo
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

  // Handle Save Profile Details
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = { 
      ...(currentUser || {}), 
      name: userName, 
      phone: userPhone,
      email: userEmailAddress,
      address: userAddress,
      city: userCity,
      landmark: userLandmark,
      pincode: userPincode,
      avatar: userAvatar
    };
    setCurrentUser(updated);
    localStorage.setItem('akole_user', JSON.stringify(updated));
    localStorage.setItem('akole_user_email', userEmailAddress);
    setIsEditing(false);
    showToast('Profile & delivery address updated successfully!', 'success');
  };

  // Handle Save Address Modal
  const handleSaveAddressModal = (e) => {
    e.preventDefault();
    setUserAddress(tempAddress);
    setUserLandmark(tempLandmark);
    setUserCity(tempCity);
    setUserPincode(tempPincode);
    const updated = { 
      ...(currentUser || {}), 
      address: tempAddress,
      landmark: tempLandmark,
      city: tempCity,
      pincode: tempPincode
    };
    setCurrentUser(updated);
    localStorage.setItem('akole_user', JSON.stringify(updated));
    setIsAddressModalOpen(false);
    showToast('Primary delivery address updated successfully!', 'success');
  };

  return (
    <>
      <PageBanner
        title="My Member Profile"
        subtitle="Manage Personal Details, Saved Delivery Address & Account Activity"
        bgImage="/assets/maharashtrian-photo-banner.svg"
      />

      <section className="py-12 sm:py-16 bg-[#F5EFE3] dark:bg-[#121A15] text-[#1F3A2B] dark:text-[#EAE3D2] transition-colors duration-300 min-h-[75vh]">
        <Container>
          
          {/* USER VIP PROFILE HEADER CARD */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#123524] via-[#1A4330] to-[#0E291C] text-white p-6 sm:p-10 shadow-2xl border border-[#D6AE4D]/40 mb-10">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6AE4D]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10">
              
              {/* Profile Photo Avatar with Edit Upload */}
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                
                <div className="relative group shrink-0">
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#D6AE4D] shadow-2xl ring-4 ring-[#123524]"
                  />
                  <label 
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-[#D6AE4D] text-[#123524] hover:bg-white transition-colors cursor-pointer shadow-lg border-2 border-[#123524]"
                    title="Change Profile Photo"
                  >
                    <FiCamera className="w-4 h-4" />
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarChange} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {/* User Header Information */}
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D6AE4D]/20 text-[#D6AE4D] text-[11px] uppercase font-bold tracking-widest border border-[#D6AE4D]/40">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentUser?.role === 'admin' ? 'Cafe Administrator' : 'Akole Cafe VIP Gold Member'}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
                    {userName}
                  </h2>

                  <div className="space-y-1 text-xs text-white/90 font-light">
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <FiMail className="text-[#D6AE4D] shrink-0" />
                      <span>{userEmailAddress}</span>
                      <span>•</span>
                      <FiPhone className="text-[#D6AE4D] shrink-0" />
                      <span>{userPhone}</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2 text-white/70">
                      <FiMapPin className="text-[#D6AE4D] shrink-0" />
                      <span className="line-clamp-1">{userAddress}</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-5 py-2.5 rounded-full bg-[#D6AE4D] text-[#123524] font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <FiEdit3 className="w-4 h-4" />
                  <span>{isEditing ? 'Close Form' : 'Edit Profile'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-montserrat font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>

            </div>

            {/* EDIT PROFILE DRAWER FORM */}
            <AnimatePresence>
              {isEditing && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSaveProfile}
                  className="mt-8 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#123524] border border-[#D6AE4D]/40 text-white text-xs focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#123524] border border-[#D6AE4D]/40 text-white text-xs focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userEmailAddress}
                      onChange={(e) => setUserEmailAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#123524] border border-[#D6AE4D]/40 text-white text-xs focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">
                      Full Street Delivery Address
                    </label>
                    <input
                      type="text"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#123524] border border-[#D6AE4D]/40 text-white text-xs focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">
                      City / Area & Pincode
                    </label>
                    <input
                      type="text"
                      value={userCity}
                      onChange={(e) => setUserCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#123524] border border-[#D6AE4D]/40 text-white text-xs focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2 rounded-full bg-white/10 text-white text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-full bg-[#D6AE4D] text-[#123524] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#c59d3c] cursor-pointer"
                    >
                      Save Profile & Address
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

          </div>

          {/* PROFILE NAVIGATION TABS */}
          <div className="flex items-center justify-start sm:justify-center gap-3 border-b border-[#D6AE4D]/20 pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-[#D6AE4D] text-[#123524] shadow-md'
                  : 'bg-white/70 dark:bg-[#1D2C22] text-[#123524] dark:text-[#EAE3D2] hover:text-[#D6AE4D]'
              }`}
            >
              <FiUser /> Personal Details & Address
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#D6AE4D] text-[#123524] shadow-md'
                  : 'bg-white/70 dark:bg-[#1D2C22] text-[#123524] dark:text-[#EAE3D2] hover:text-[#D6AE4D]'
              }`}
            >
              <FiClock /> Order History ({userOrders.length})
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-[#D6AE4D] text-[#123524] shadow-md'
                  : 'bg-white/70 dark:bg-[#1D2C22] text-[#123524] dark:text-[#EAE3D2] hover:text-[#D6AE4D]'
              }`}
            >
              <FiHeart /> Saved Favorites ({wishlistItems.length})
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'rewards'
                  ? 'bg-[#D6AE4D] text-[#123524] shadow-md'
                  : 'bg-white/70 dark:bg-[#1D2C22] text-[#123524] dark:text-[#EAE3D2] hover:text-[#D6AE4D]'
              }`}
            >
              <FiAward /> VIP Offers & Perks
            </button>
          </div>

          {/* TAB 1: PERSONAL DETAILS & ADDRESS CARD */}
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* DETAILS & EDIT FORM CARD */}
              <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#143322] via-[#0F261A] to-[#0A1A11] border-2 border-[#D6AE4D]/50 shadow-2xl space-y-8 text-white">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#D6AE4D]/30 pb-5 gap-3">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                      <FiUser className="text-[#D6AE4D]" />
                      <span>Member Profile & Delivery Address</span>
                    </h3>
                    <p className="text-xs text-[#D6AE4D]/80 font-light mt-1">
                      Update your account details below and click "SAVE CHANGES" to update your profile.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 rounded-xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 text-[#D6AE4D] text-xs font-bold uppercase tracking-wider hover:bg-[#D6AE4D] hover:text-[#0C1E14] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <FiEdit3 className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'View Mode' : 'Edit All Fields'}</span>
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-8">
                  {/* Personal Information Grid */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-lg font-bold text-[#D6AE4D] uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D6AE4D]" />
                      <span>Personal Information</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                      
                      {/* Full Name */}
                      <div className="p-4 rounded-2xl bg-[#09170F]/90 border border-[#D6AE4D]/35 space-y-1.5 focus-within:border-[#D6AE4D] transition-colors">
                        <label className="text-[10px] uppercase font-black tracking-wider text-[#D6AE4D] block">
                          Full Member Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-transparent font-serif text-base font-bold text-white focus:outline-none border-b border-[#D6AE4D]/40 pb-1"
                            required
                          />
                        ) : (
                          <p className="font-serif text-base font-bold text-white flex items-center gap-2">
                            <FiUser className="text-[#D6AE4D]" /> {userName}
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="p-4 rounded-2xl bg-[#09170F]/90 border border-[#D6AE4D]/35 space-y-1.5 focus-within:border-[#D6AE4D] transition-colors">
                        <label className="text-[10px] uppercase font-black tracking-wider text-[#D6AE4D] block">
                          Registered Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={userEmailAddress}
                            onChange={(e) => setUserEmailAddress(e.target.value)}
                            className="w-full bg-transparent font-serif text-base font-bold text-white focus:outline-none border-b border-[#D6AE4D]/40 pb-1"
                            required
                          />
                        ) : (
                          <p className="font-serif text-base font-bold text-white flex items-center gap-2 truncate">
                            <FiMail className="text-[#D6AE4D] shrink-0" /> {userEmailAddress}
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="p-4 rounded-2xl bg-[#09170F]/90 border border-[#D6AE4D]/35 space-y-1.5 focus-within:border-[#D6AE4D] transition-colors">
                        <label className="text-[10px] uppercase font-black tracking-wider text-[#D6AE4D] block">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            className="w-full bg-transparent font-serif text-base font-bold text-white focus:outline-none border-b border-[#D6AE4D]/40 pb-1"
                            required
                          />
                        ) : (
                          <p className="font-serif text-base font-bold text-white flex items-center gap-2">
                            <FiPhone className="text-[#D6AE4D]" /> {userPhone}
                          </p>
                        )}
                      </div>

                      {/* Membership Status */}
                      <div className="p-4 rounded-2xl bg-[#09170F]/90 border border-[#D6AE4D]/35 space-y-1.5">
                        <label className="text-[10px] uppercase font-black tracking-wider text-[#D6AE4D] block">
                          Membership Tier
                        </label>
                        <p className="font-serif text-base font-bold text-[#D6AE4D] flex items-center gap-2">
                          <FiCheckCircle className="text-emerald-400" /> Akole VIP Gold (Active)
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Delivery Address Section */}
                  <div className="space-y-4 pt-4 border-t border-[#D6AE4D]/25">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg font-bold text-[#D6AE4D] uppercase tracking-wider flex items-center gap-2">
                        <FiMapPin className="text-[#D6AE4D]" />
                        <span>Saved Primary Delivery Address</span>
                      </h4>
                    </div>

                    <div className="p-5 sm:p-6 rounded-2xl bg-[#09170F]/90 border-2 border-[#D6AE4D]/40 space-y-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] uppercase font-extrabold text-[#D6AE4D] block mb-1">
                            Street Address
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={userAddress}
                              onChange={(e) => setUserAddress(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl bg-[#07140D] border border-[#D6AE4D]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#D6AE4D]"
                              required
                            />
                          ) : (
                            <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                              {userAddress}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-[#D6AE4D]/80 block mb-0.5">Landmark</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={userLandmark}
                                onChange={(e) => setUserLandmark(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-[#07140D] border border-[#D6AE4D]/30 text-white text-xs"
                              />
                            ) : (
                              <span className="text-xs text-white/80 font-medium">{userLandmark}</span>
                            )}
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold text-[#D6AE4D]/80 block mb-0.5">City / Region</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={userCity}
                                onChange={(e) => setUserCity(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-[#07140D] border border-[#D6AE4D]/30 text-white text-xs"
                              />
                            ) : (
                              <span className="text-xs text-white/80 font-medium">{userCity}</span>
                            )}
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold text-[#D6AE4D]/80 block mb-0.5">Pincode</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={userPincode}
                                onChange={(e) => setUserPincode(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-[#07140D] border border-[#D6AE4D]/30 text-white text-xs"
                              />
                            ) : (
                              <span className="text-xs text-white/80 font-medium">{userPincode}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PROMINENT SAVE CHANGES BUTTON */}
                  <div className="pt-4 border-t border-[#D6AE4D]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[#D6AE4D]/90 font-medium flex items-center gap-1.5">
                      <FiCheckCircle className="text-emerald-400" />
                      <span>Changes are saved permanently to your account profile.</span>
                    </p>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] hover:brightness-110 text-[#123524] font-montserrat font-black text-xs uppercase tracking-[2px] shadow-xl shadow-[#D6AE4D]/25 border border-[#FFF3C4] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#123524] stroke-[2.5]" />
                      <span>SAVE CHANGES</span>
                    </button>
                  </div>

                </form>

              </div>
            </motion.div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              {loadingOrders ? (
                <div className="text-center py-10 font-serif text-sm text-[#123524] dark:text-white animate-pulse">
                  Loading order history...
                </div>
              ) : userOrders.length === 0 ? (
                <div className="text-center py-16 p-8 rounded-3xl bg-white/80 dark:bg-[#1D2C22] border border-[#D6AE4D]/20 max-w-lg mx-auto shadow-sm">
                  <FiShoppingBag className="w-12 h-12 text-[#D6AE4D] mx-auto mb-3 opacity-60" />
                  <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-white mb-1">
                    No Orders Placed Yet
                  </h3>
                  <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light mb-6">
                    Your past culinary & brew orders will appear here once placed.
                  </p>
                  <Button to="/menu" variant="gold" size="md">
                    Order Food Now
                  </Button>
                </div>
              ) : (
                userOrders.map((ord) => (
                  <div 
                    key={ord._id || ord.orderId} 
                    className="rounded-2xl bg-white dark:bg-[#1D2C22] p-6 border border-[#D6AE4D]/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#123524] dark:text-[#D6AE4D]">
                          Order #{ord.orderId || ord.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full font-semibold text-[10px] uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                          {ord.status || 'Confirmed'}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5]">
                        {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent Order'}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-lg font-bold text-[#123524] dark:text-white">
                        ₹{ord.totalAmount || ord.total || 250}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="max-w-4xl mx-auto">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16 p-8 rounded-3xl bg-white/80 dark:bg-[#1D2C22] border border-[#D6AE4D]/20 max-w-lg mx-auto shadow-sm">
                  <FiHeart className="w-12 h-12 text-[#D6AE4D] mx-auto mb-3 opacity-60" />
                  <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-[#D6AE4D] mb-1">
                    Your Favorites List is Empty
                  </h3>
                  <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light mb-6">
                    Tap the heart icon on any coffee or dish card to save your favorites.
                  </p>
                  <Button to="/menu" variant="gold" size="md">
                    Explore Cafe Menu
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-md flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-[#123524] dark:text-white truncate">{item.name}</h4>
                        <p className="text-xs text-[#D6AE4D] font-bold">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REWARDS */}
          {activeTab === 'rewards' && (
            <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white/90 dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-xl space-y-6 text-center">
              <Sparkles className="w-12 h-12 text-[#D6AE4D] mx-auto" />
              <h3 className="font-serif text-3xl font-bold text-[#123524] dark:text-white">
                Akole Cafe VIP Gold Member Benefits
              </h3>
              <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] max-w-md mx-auto">
                As a Gold Member, enjoy 10% instant discount on every order, priority table reservations, and exclusive birthday gifts!
              </p>
            </div>
          )}

        </Container>
      </section>

      {/* EDIT PRIMARY DELIVERY ADDRESS MODAL */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddressModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 max-w-lg w-full bg-[#122219] border-2 border-[#D6AE4D] rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#D6AE4D]/30 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#D6AE4D] flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-[#D6AE4D]" />
                  <span>Update Delivery Address</span>
                </h3>
                <button
                  onClick={() => setIsAddressModalOpen(false)}
                  className="text-white/70 hover:text-[#D6AE4D] p-1 cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAddressModal} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-extrabold text-[#D6AE4D] block mb-1">
                    Full Street / Building / House Address
                  </label>
                  <textarea
                    rows={3}
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    placeholder="Enter complete street address..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#0E1A13] border border-[#D6AE4D]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#D6AE4D] resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-extrabold text-[#D6AE4D] block mb-1">
                      Landmark / Area
                    </label>
                    <input
                      type="text"
                      value={tempLandmark}
                      onChange={(e) => setTempLandmark(e.target.value)}
                      placeholder="e.g. Near Bus Stand"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0E1A13] border border-[#D6AE4D]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#D6AE4D]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-extrabold text-[#D6AE4D] block mb-1">
                      City / Pincode
                    </label>
                    <input
                      type="text"
                      value={tempCity}
                      onChange={(e) => setTempCity(e.target.value)}
                      placeholder="e.g. Akole, Ahmednagar 422601"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0E1A13] border border-[#D6AE4D]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D6AE4D]/20">
                  <button
                    type="button"
                    onClick={() => setIsAddressModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-white/20 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#D6AE4D] text-[#123524] text-xs font-black uppercase tracking-wider shadow-lg hover:bg-[#F3E5AB] cursor-pointer"
                  >
                    Save New Address
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
