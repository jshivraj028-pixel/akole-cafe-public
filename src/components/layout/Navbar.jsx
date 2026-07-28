import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ShoppingCart, Sun, Moon, Menu, X, User, ChevronDown, Settings, Package, ShoppingBag, Heart, ShieldCheck, LogOut, LogIn, ChevronRight, Sparkles } from 'lucide-react';
import { FiPackage, FiInfo, FiBell } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import MobileMenu from './MobileMenu';
import LocationModal from './LocationModal';
import CartDrawer from './CartDrawer';
import logoEmblem from '../../assets/logo-emblem.png';
import { fetchNotificationsAPI, markNotificationReadAPI } from '../../services/api';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'MENU', path: '/menu' },
  { name: 'ABOUT', path: '/about' },
  { name: 'RESERVE', path: '/reserve' },
  { name: 'EVENTS', path: '/events' },
  { name: 'GALLERY', path: '/gallery' },
  { name: 'CONTACT', path: '/contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { totalItemsCount } = useCart();
  const { isSearchOpen, setIsSearchOpen, isDarkMode, toggleDarkMode, wishlistItems, isAuthenticated, userEmail, logoutUser, showToast } = useTheme();

  const loggedUser = (() => {
    try {
      const saved = localStorage.getItem('akole_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  })();

  const userInitial = (loggedUser?.name?.[0] || userEmail?.[0] || 'S').toUpperCase();

  const handleLogout = () => {
    try {
      if (logoutUser) logoutUser();
      localStorage.removeItem('akole_user');
      if (showToast) showToast('Successfully logged out!', 'info');
    } catch (e) {}
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  const loadNotifications = async () => {
    const email = loggedUser?.email || userEmail || '';
    try {
      const data = await fetchNotificationsAPI(email);
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (err) {
      console.warn('Error loading notifications:', err);
    }
  };

  // Poll notifications every 8 seconds for live updates
  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 8000);
    return () => clearInterval(interval);
  }, [loggedUser?.email, userEmail]);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationReadAPI(id);
      setNotifications(prev => prev.map(n => (n._id === id || n.id === id) ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchOpen(false);
      navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const isHome = pathname === '/' || pathname === '/home';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[74px] sm:h-[82px] px-2.5 sm:px-8 transition-colors duration-300 shadow-md flex items-center ${
          isHome
            ? 'bg-[#445648] dark:bg-[#0F261A] border-b border-[#536958] dark:border-[#D6AE4D]/30'
            : 'bg-[#EFE8D8] dark:bg-[#121A15] border-b border-[#D8CEB8] dark:border-[#D6AE4D]/30'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between gap-1">
          
          {/* Logo: Circular Emblem Image + Cormorant Garamond Typography */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#2A1D17] border-2 border-[#D6AE4D]/45 shadow-xl shrink-0 flex items-center justify-center p-1 sm:p-1.5 overflow-hidden group-hover:border-[#D6AE4D] group-hover:shadow-[#D6AE4D]/25 transition-all duration-300">
              <img
                src={logoEmblem}
                alt="Akole Café Emblem Logo"
                className="w-full h-full object-contain filter drop-shadow-md transform scale-[1.15] group-hover:scale-[1.22] transition-transform duration-300"
              />
            </div>

            {/* Brand Name Text: Akole (700 White) Café (500 Italic Gold #D6AE4D) */}
            <div className="flex items-baseline font-cormorant text-xl sm:text-3xl tracking-[-0.5px]">
              <span
                className={`font-bold transition-colors ${
                  isHome ? 'text-white' : 'text-[#123524] dark:text-white'
                }`}
              >
                Akole
              </span>
              <span className="italic font-medium text-[#D6AE4D] ml-1">
                Café
              </span>
            </div>
          </Link>

          {/* Navigation Links + Action Icons Grouped with Compact Balanced Spacing */}
          <div className="flex items-center gap-2 xl:gap-6 ml-auto justify-end">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 ml-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative font-montserrat text-[11px] xl:text-xs font-semibold tracking-widest uppercase transition-colors duration-200 py-1 ${
                      isActive
                        ? 'text-[#D6AE4D]'
                        : isHome
                        ? 'text-[#D6E0DA] hover:text-[#D6AE4D]'
                        : 'text-[#4A5D50] hover:text-[#D6AE4D]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#D6AE4D]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Gold Rounded ORDER NOW Button */}
            <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
              {/* 1. Ultra-Luxury Executive ORDER NOW Button */}
              <Link
                to="/menu"
                className="hidden sm:inline-flex items-center justify-center px-4.5 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] text-[#0A1A12] font-montserrat font-extrabold text-[11px] xl:text-xs uppercase tracking-[2px] shadow-lg shadow-[#D6AE4D]/30 border border-[#FFF5D6]/70 hover:from-[#E5BC58] hover:via-[#FFF3C4] hover:to-[#C99D3B] hover:shadow-xl hover:shadow-[#D6AE4D]/50 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 stroke-[2.5] text-[#0A1A12] group-hover:scale-110 transition-transform" />
                <span className="font-extrabold tracking-[2px]">ORDER NOW</span>
              </Link>

              {/* 2. Search Icon & Popover */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-1 sm:p-1.5 transition-colors ${
                    isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
                  }`}
                  title="Search Menu Items"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </button>

                {/* Search Input Popover */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      className="fixed sm:absolute top-16 sm:top-12 left-3 right-3 sm:left-auto sm:right-0 sm:w-80 z-50"
                    >
                      <form onSubmit={handleSearchSubmit}>
                        <div className="w-full bg-[#FAF6EE] dark:bg-[#122219] border-2 border-[#D6AE4D] rounded-2xl py-3 px-4 flex items-center gap-3 shadow-2xl backdrop-blur-2xl">
                          <Search className="w-4 h-4 text-[#D6AE4D] shrink-0 stroke-[2.5]" />
                          <input
                            type="text"
                            autoFocus
                            placeholder="Search delicacies, coffee, misal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#123524] dark:text-white placeholder:text-[#6B7C70]/80 dark:placeholder:text-[#A0B0A5]/75 focus:outline-none border-none outline-none ring-0 font-sans shadow-none truncate pr-1"
                          />
                          {searchTerm ? (
                            <button
                              type="button"
                              onClick={() => setSearchTerm('')}
                              className="text-gray-400 dark:text-white/70 hover:text-[#D6AE4D] p-1 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIsSearchOpen(false)}
                              className="text-xs font-extrabold text-[#D6AE4D] hover:underline uppercase tracking-wider cursor-pointer whitespace-nowrap"
                            >
                              Close
                            </button>
                          )}
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Location Pin Icon & Satellite Map Modal Trigger */}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className={`p-1 sm:p-1.5 transition-colors ${
                  isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
                }`}
                title="Our Location & Satellite Earth Map"
                aria-label="Location Map"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
              </button>

              {/* 4. Shopping Cart Icon & Slide-Over Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className={`p-1 sm:p-1.5 transition-colors relative flex items-center justify-center ${
                  isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
                }`}
                title="Shopping Cart & Quick Order"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] px-1 bg-[#D6AE4D] text-[#123524] font-black text-[10px] rounded-full flex items-center justify-center shadow-md border border-[#123524]/20 leading-none">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* 5. Theme Mode Toggle (Sun/Moon) */}
              <button
                onClick={toggleDarkMode}
                className={`p-1 sm:p-1.5 transition-colors relative ${
                  isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
                }`}
                title={isDarkMode ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
                aria-label="Toggle Light Dark Theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2] text-[#D6AE4D]" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                )}
              </button>

              {/* 6. User Profile Avatar Circle + Direct Profile Link + Interactive Hover Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <Link
                  to="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-0.5 group p-0.5 sm:p-1 focus:outline-none"
                  title={loggedUser?.name || userEmail || 'Profile / Account Settings'}
                  aria-label="User Profile"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#D6AE4D]/80 bg-[#D6AE4D]/10 flex items-center justify-center font-bold text-[10px] sm:text-xs text-[#D6AE4D] shadow-inner group-hover:bg-[#D6AE4D]/20 transition-all overflow-hidden shrink-0">
                    {loggedUser?.avatar ? (
                      <img src={loggedUser.avatar} alt={loggedUser?.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      userInitial
                    )}
                  </div>
                  <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180 text-[#D6AE4D]' : isHome ? 'text-white/80' : 'text-[#354F42]'
                  }`} />
                </Link>

                {/* Compact Sleek Dropdown Menu Card */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 top-10 w-56 bg-[#10291C]/95 border border-[#D6AE4D]/35 rounded-2xl shadow-xl p-2 text-white z-50 backdrop-blur-2xl ring-1 ring-[#D6AE4D]/15"
                    >
                      {/* Golden Top Accent Line */}
                      <div className="h-[2px] w-1/3 mx-auto bg-gradient-to-r from-transparent via-[#D6AE4D] to-transparent rounded-full mb-1.5 opacity-80" />

                      {/* Compact User Header Card */}
                      <div className="p-2 bg-gradient-to-br from-[#1B3E2D] to-[#0A1A12] border border-[#D6AE4D]/25 rounded-xl mb-1.5 flex items-center gap-2 relative shadow-inner">
                        <div className="relative shrink-0">
                          <div className="w-8 h-8 rounded-full border border-[#D6AE4D] bg-gradient-to-tr from-[#D6AE4D] to-[#F3E5AB] flex items-center justify-center font-bold font-serif text-xs text-[#123524] overflow-hidden">
                            {loggedUser?.avatar ? (
                              <img src={loggedUser.avatar} alt={loggedUser?.name || 'User'} className="w-full h-full object-cover" />
                            ) : (
                              userInitial
                            )}
                          </div>
                          <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-[#10291C] rounded-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 text-[8px] uppercase font-extrabold tracking-wider text-[#D6AE4D]">
                            <Sparkles className="w-2.5 h-2.5 text-[#D6AE4D]" />
                            <span>Akole Member</span>
                          </div>
                          <p className="font-serif font-bold text-xs text-white truncate">
                            {loggedUser?.name || userEmail || 'Guest Explorer'}
                          </p>
                        </div>
                      </div>

                      {/* Compact Options List */}
                      <div className="space-y-0.5">
                        {/* Item 1: My Profile */}
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-semibold text-white/90 hover:text-white hover:bg-[#D6AE4D]/15 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-[#D6AE4D]/10 border border-[#D6AE4D]/20 flex items-center justify-center text-[#D6AE4D] group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                              <User className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span>My Profile</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-[#D6AE4D] group-hover:translate-x-0.5 transition-all" />
                        </Link>

                        {/* Item 2: My Orders */}
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-semibold text-white/90 hover:text-white hover:bg-[#D6AE4D]/15 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-[#D6AE4D]/10 border border-[#D6AE4D]/20 flex items-center justify-center text-[#D6AE4D] group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                              <Package className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span>My Orders & Status</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-[#D6AE4D] group-hover:translate-x-0.5 transition-all" />
                        </Link>

                        {/* Item 3: Cart */}
                        <Link
                          to="/cart"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-semibold text-white/90 hover:text-white hover:bg-[#D6AE4D]/15 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-[#D6AE4D]/10 border border-[#D6AE4D]/20 flex items-center justify-center text-[#D6AE4D] group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                              <ShoppingBag className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span>View Cart</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-[#D6AE4D]/20 text-[#D6AE4D] border border-[#D6AE4D]/30">
                              {totalItemsCount}
                            </span>
                            <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-[#D6AE4D] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </Link>

                        {/* Item 4: Wishlist */}
                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-semibold text-white/90 hover:text-white hover:bg-[#D6AE4D]/15 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-[#D6AE4D]/10 border border-[#D6AE4D]/20 flex items-center justify-center text-[#D6AE4D] group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                              <Heart className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span>Wishlist</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {wishlistItems?.length > 0 && (
                              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-[#D6AE4D]/20 text-[#D6AE4D] border border-[#D6AE4D]/30">
                                {wishlistItems.length}
                              </span>
                            )}
                            <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-[#D6AE4D] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </Link>

                        {/* Item 5: Settings */}
                        <Link
                          to="/settings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-semibold text-white/90 hover:text-white hover:bg-[#D6AE4D]/15 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-[#D6AE4D]/10 border border-[#D6AE4D]/20 flex items-center justify-center text-[#D6AE4D] group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                              <Settings className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span>Settings & Preferences</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-[#D6AE4D] group-hover:translate-x-0.5 transition-all" />
                        </Link>

                        {/* Item 6: Admin Dashboard (Only visible for Admin accounts) */}
                        {(loggedUser?.role === 'admin' || loggedUser?.email === 'akolecafe@gmail.com' || userEmail === 'akolecafe@gmail.com') && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-semibold text-amber-300 hover:text-white hover:bg-[#D6AE4D]/15 transition-all group"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-md bg-[#D6AE4D]/10 border border-[#D6AE4D]/20 flex items-center justify-center text-[#D6AE4D] group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                                <ShieldCheck className="w-3 h-3 stroke-[2.5]" />
                              </div>
                              <span>Admin Dashboard</span>
                            </div>
                            <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-[#D6AE4D] group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="h-[1px] bg-[#D6AE4D]/20 my-1" />

                      {/* Action Footer */}
                      {isAuthenticated || loggedUser ? (
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11px] font-extrabold text-[#D6AE4D] hover:text-[#123524] bg-[#D6AE4D]/10 hover:bg-gradient-to-r hover:from-[#D6AE4D] hover:via-[#F3E5AB] hover:to-[#B89035] border border-[#D6AE4D]/40 shadow-sm transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-[#D6AE4D]/20 border border-[#D6AE4D]/30 flex items-center justify-center text-[#D6AE4D] group-hover:bg-[#123524] group-hover:text-[#D6AE4D] transition-all">
                              <LogOut className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span className="uppercase tracking-wider">Log Out</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#D6AE4D] group-hover:text-[#123524] group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ) : (
                        <Link
                          to="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold text-[#123524] bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] hover:from-[#E5BC58] hover:via-[#FFF3C4] hover:to-[#C99D3B] shadow-sm transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <LogIn className="w-3.5 h-3.5 text-[#123524]" />
                            <span>Sign In / Register</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#123524] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-1.5 lg:hidden ${
                  isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
                }`}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        isAuthenticated={isAuthenticated || Boolean(loggedUser)}
        onLogout={handleLogout}
      />

      {/* Interactive Satellite & Location Map Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {/* Right Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />
    </>
  );
};

export default Navbar;
