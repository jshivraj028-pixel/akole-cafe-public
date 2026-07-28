import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ShoppingCart, Sun, Moon, Menu, X, User, ChevronDown, Settings, Package, ShoppingBag, Heart, ShieldCheck, LogOut, LogIn, ChevronRight, Sparkles, BookOpen, Store, LayoutGrid } from 'lucide-react';
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { totalItemsCount } = useCart();
  const { isSearchOpen, setIsSearchOpen, isDarkMode, toggleDarkMode, wishlistItems, isAuthenticated, userEmail, currentUser, logoutUser, showToast } = useTheme();

  const savedUser = (() => {
    try {
      const saved = localStorage.getItem('akole_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  })();

  const loggedUser = currentUser || savedUser;

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

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 8000);
    return () => clearInterval(interval);
  }, [loggedUser?.email, userEmail]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchOpen(false);
      navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      {/* FULL-WIDTH STICKY NAVBAR HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[74px] sm:h-[82px] px-3 sm:px-8 transition-all duration-300 flex items-center bg-white/70 dark:bg-[#121F17]/80 backdrop-blur-xl border-b border-white/60 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between gap-2 xl:gap-4">
          
          {/* Logo: Circular Emblem Image + Cormorant Garamond Typography */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0 pr-1">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#18201B] border-2 border-white shadow-md shrink-0 flex items-center justify-center p-1 overflow-hidden group-hover:scale-105 transition-all duration-300">
              <img
                src={logoEmblem}
                alt="Akole Café Emblem Logo"
                className="w-full h-full object-contain filter drop-shadow-md transform scale-[1.15] group-hover:scale-[1.22] transition-transform duration-300"
              />
            </div>

            <div className="flex items-baseline font-cormorant text-xl sm:text-2xl xl:text-3xl tracking-[-0.5px]">
              <span className="font-bold text-[#1E2621] dark:text-white transition-colors">
                Akole
              </span>
              <span className="italic font-medium text-[#48594B] dark:text-[#D6AE4D] ml-1">
                Café
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS - TIGHT COMPACT SPACING */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 ml-auto mr-1 xl:mr-1.5 shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative font-montserrat text-[11px] xl:text-xs tracking-wide uppercase px-2 xl:px-2.5 py-1.5 rounded-full flex flex-col items-center justify-center transition-colors group cursor-pointer"
                >
                  {/* Animated Glossy White Glass Pill Background ONLY for Active Link */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 via-white/95 to-white backdrop-blur-2xl border-2 border-white shadow-md overflow-hidden"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    >
                      {/* Green Ambient Glow Accent on Left of Active Pill */}
                      <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-emerald-400/35 to-transparent pointer-events-none" />
                    </motion.div>
                  )}

                  {/* Nav Link Text Label */}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive
                        ? 'font-black text-[#1E2621]'
                        : 'font-bold text-[#48594B] dark:text-[#D6E0DA] hover:text-[#1E2621]'
                    }`}
                  >
                    {link.name}
                  </span>

                  {/* Coral/Orange Active Indicator Dot ONLY for Active Link */}
                  {isActive && (
                    <motion.div
                      layoutId="topNavActiveDot"
                      className="w-3 h-1 rounded-full bg-[#FF5722] shadow-xs absolute bottom-0.5 z-20"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & ORDER NOW Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0 justify-end">
            
            {/* 1. ORDER NOW White Translucent Glossy Pill Button */}
            <Link
              to="/menu"
              className="hidden lg:inline-flex items-center justify-center h-9 px-4 rounded-full bg-white/90 hover:bg-white border-2 border-white shadow-md hover:shadow-lg backdrop-blur-md text-[#1E2621] font-montserrat font-black text-[11px] xl:text-xs uppercase tracking-[1.2px] transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 stroke-[2.2] text-amber-500 group-hover:scale-110 transition-transform" />
              <span>ORDER NOW</span>
            </Link>

            {/* 2. Search Circle Icon */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border-2 border-white shadow-md hover:shadow-lg backdrop-blur-md text-[#1E2621] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="Search Menu Items"
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5 stroke-[2.2]" />
              </button>

              {/* Search Input Popover */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    className="absolute top-12 right-0 w-80 z-50"
                  >
                    <form onSubmit={handleSearchSubmit}>
                      <div className="w-full bg-white/95 border-2 border-white rounded-2xl py-2.5 px-4 flex items-center gap-3 shadow-2xl backdrop-blur-2xl">
                        <Search className="w-4 h-4 text-[#1E2621] shrink-0 stroke-[2.5]" />
                        <input
                          type="text"
                          autoFocus
                          placeholder="Search delicacies, coffee, misal..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-transparent text-xs font-semibold text-[#1E2621] placeholder:text-gray-400 focus:outline-none border-none outline-none ring-0 truncate pr-1"
                        />
                        {searchTerm ? (
                          <button
                            type="button"
                            onClick={() => setSearchTerm('')}
                            className="text-gray-400 hover:text-black p-1 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setIsSearchOpen(false)}
                            className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wider cursor-pointer whitespace-nowrap"
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

            {/* 3. Location Map Pin Circle Icon */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border-2 border-white shadow-md hover:shadow-lg backdrop-blur-md text-[#1E2621] hover:scale-105 active:scale-95 transition-all hidden lg:flex items-center justify-center cursor-pointer"
              title="Our Location & Map"
              aria-label="Location Map"
            >
              <MapPin className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>

            {/* 4. Shopping Cart Drawer Circle Trigger with Dark Badge */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border-2 border-white shadow-md hover:shadow-lg backdrop-blur-md text-[#1E2621] hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative cursor-pointer"
              title="Shopping Cart & Quick Order"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4.5 h-4.5 stroke-[2.2]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#18201B] text-white font-black text-[9px] rounded-full flex items-center justify-center shadow-md border-2 border-white leading-none">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* 5. Theme Mode Toggle (Sun/Moon) Circle Icon */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border-2 border-white shadow-md hover:shadow-lg backdrop-blur-md text-[#1E2621] hover:scale-105 active:scale-95 transition-all hidden lg:flex items-center justify-center cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5 stroke-[2.2] text-[#E6C364]" />
              ) : (
                <Moon className="w-4.5 h-4.5 stroke-[2.2]" />
              )}
            </button>

            {/* 6. User Profile Circle Avatar */}
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <Link
                to="/profile"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-1 group p-0.5 focus:outline-none"
                aria-label="User Profile"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-[#18201B] flex items-center justify-center font-bold text-xs text-white shadow-md overflow-hidden shrink-0 group-hover:scale-105 transition-all">
                  {loggedUser?.avatar ? (
                    <img src={loggedUser.avatar} alt={loggedUser?.name || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    userInitial
                  )}
                </div>
              </Link>

              {/* Dropdown Menu Card */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 top-12 w-56 bg-white/95 border-2 border-white rounded-2xl shadow-2xl p-2.5 text-[#1E2621] z-50 backdrop-blur-2xl"
                  >
                    <div className="p-2.5 bg-[#F2F6ED] border border-white rounded-xl mb-1.5 flex items-center gap-2 shadow-inner">
                      <div className="w-8 h-8 rounded-full bg-[#18201B] text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                        {loggedUser?.avatar ? (
                          <img src={loggedUser.avatar} alt={loggedUser?.name || 'User'} className="w-full h-full object-cover" />
                        ) : (
                          userInitial
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-gray-500 block">
                          Akole Member
                        </span>
                        <p className="font-bold text-xs truncate" style={{ color: '#1E2621' }}>
                          {loggedUser?.name || userEmail || 'Guest Explorer'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-0.5 text-xs font-semibold">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <LayoutGrid className="w-3.5 h-3.5 text-gray-600" />
                          <span>Dashboard</span>
                        </div>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-gray-600" />
                          <span>My Profile</span>
                        </div>
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-gray-600" />
                          <span>My Orders</span>
                        </div>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Heart className="w-3.5 h-3.5 text-gray-600" />
                          <span>Wishlist</span>
                        </div>
                      </Link>

                      <Link
                        to="/cart"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-3.5 h-3.5 text-gray-600" />
                          <span>View Cart</span>
                        </div>
                      </Link>

                      <Link
                        to="/blog"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-gray-600" />
                          <span>Blog</span>
                        </div>
                      </Link>

                      <Link
                        to="/franchise"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Store className="w-3.5 h-3.5 text-gray-600" />
                          <span>Franchise</span>
                        </div>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="w-3.5 h-3.5 text-gray-600" />
                          <span>Settings</span>
                        </div>
                      </Link>
                    </div>

                    <div className="h-[1px] bg-gray-200 my-1" />

                    {isAuthenticated || loggedUser ? (
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Log Out</span>
                        </div>
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold text-[#1E2621] hover:bg-black/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <LogIn className="w-3.5 h-3.5" />
                          <span>Sign In / Register</span>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border-2 border-white shadow-md backdrop-blur-md text-[#1E2621] flex lg:hidden items-center justify-center cursor-pointer ml-1"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 stroke-[2.2]" /> : <Menu className="w-5 h-5 stroke-[2.2]" />}
            </button>
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

      {/* Location Map Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />
    </>
  );
};

export default Navbar;
