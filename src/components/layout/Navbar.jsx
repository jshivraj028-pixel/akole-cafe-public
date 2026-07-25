import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiHeart, 
  FiShoppingBag, 
  FiUser, 
  FiMenu, 
  FiX, 
  FiBell, 
  FiCheck, 
  FiInfo, 
  FiTruck, 
  FiPackage 
} from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import Container from '../common/Container';
import Button from '../common/Button';
import MobileMenu from './MobileMenu';
import SearchModal from './SearchModal';
import { fetchNotificationsAPI, markNotificationReadAPI } from '../../services/api';

const navLinks = [
  { name: 'Home', path: '/home' },
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Reserve', path: '/reserve' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Franchise', path: '/franchise' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const { pathname } = useLocation();
  const { totalItemsCount } = useCart();
  const { wishlistItems, setIsSearchOpen, isSearchOpen } = useTheme();

  const loggedUser = (() => {
    const saved = localStorage.getItem('akole_user');
    return saved ? JSON.parse(saved) : null;
  })();

  const loadNotifications = async () => {
    const email = loggedUser?.email || '';
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
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Poll notifications every 8 seconds for live updates
  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 8000);
    return () => clearInterval(interval);
  }, [loggedUser?.email]);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationReadAPI(id);
      setNotifications(prev => prev.map(n => (n._id === id || n.id === id) ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-primary/90 backdrop-blur-xl border-b border-accent-gold/20 shadow-luxury'
            : 'py-5 bg-gradient-to-b from-primary/80 to-transparent'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-primary shadow-gold group-hover:scale-105 transition-transform duration-300">
                <span className="text-xl">☕</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-widest text-secondary group-hover:text-accent-gold transition-colors">
                  AKOLE <span className="text-accent-gold font-light">CAFE</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-accent-gold/80 font-sans -mt-1">
                  Akole • Maharashtra
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-xs uppercase tracking-widest font-medium transition-all duration-300 py-1 ${
                      isActive ? 'text-accent-gold font-semibold' : 'text-secondary/80 hover:text-accent-gold'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-gradient rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Buttons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-secondary/80 hover:text-accent-gold transition-colors relative"
                title="Search Menu"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* LIVE NOTIFICATIONS BELL ICON */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 text-secondary/80 hover:text-accent-gold transition-colors relative"
                  title="Notifications & Order Updates"
                  aria-label="Notifications"
                >
                  <FiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-4.5 h-4.5 bg-amber-500 text-primary font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-gold animate-pulse border border-primary">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Drawer */}
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-12 w-80 sm:w-96 bg-primary border border-accent-gold/30 rounded-2xl shadow-2xl p-4 text-secondary z-50 backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-accent-gold/20 mb-3">
                        <div className="flex items-center gap-2">
                          <FiBell className="text-accent-gold text-base" />
                          <h4 className="font-serif font-bold text-sm text-secondary">Live Notifications</h4>
                        </div>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold text-[10px] font-bold">
                            {unreadCount} Unread
                          </span>
                        )}
                      </div>

                      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                        {notifications.length === 0 ? (
                          <div className="text-center py-8 text-secondary/50 text-xs">
                            No notifications yet.
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif._id || notif.id}
                              className={`p-3 rounded-xl border text-xs transition-colors flex items-start gap-3 ${
                                notif.isRead 
                                  ? 'bg-secondary/5 border-accent-gold/10 text-secondary/70' 
                                  : 'bg-accent-gold/10 border-accent-gold/30 text-secondary'
                              }`}
                            >
                              <div className="mt-0.5 text-accent-gold shrink-0">
                                {notif.type === 'order_update' ? <FiPackage className="text-base" /> : <FiInfo className="text-base" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-serif font-bold text-xs text-secondary flex items-center justify-between">
                                  <span>{notif.title}</span>
                                  {!notif.isRead && (
                                    <button
                                      onClick={() => handleMarkAsRead(notif._id || notif.id)}
                                      className="text-[10px] text-accent-gold hover:underline font-normal"
                                      title="Mark as read"
                                    >
                                      Mark Read
                                    </button>
                                  )}
                                </div>
                                <p className="text-[11px] text-secondary/80 mt-1 leading-snug">{notif.message}</p>
                                <span className="text-[9px] text-secondary/40 block mt-1">
                                  {notif.createdAt ? new Date(notif.createdAt).toLocaleTimeString() : 'Just now'}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist Link */}
              <Link
                to="/profile"
                className="p-2 text-secondary/80 hover:text-accent-gold transition-colors relative hidden sm:block"
                title="Saved Wishlist"
              >
                <FiHeart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-accent-gold text-primary font-bold text-[10px] rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Link */}
              <Link
                to="/cart"
                className="p-2 text-secondary/80 hover:text-accent-gold transition-colors relative"
                title="Shopping Cart"
              >
                <FiShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-0 right-0 w-4.5 h-4.5 bg-accent-gold text-primary font-bold text-[10px] rounded-full flex items-center justify-center shadow-gold">
                    {totalItemsCount}
                  </span>
                )}
              </Link>

              {/* Profile Icon */}
              <Link
                to="/profile"
                className="p-2 text-secondary/80 hover:text-accent-gold transition-colors hidden md:block"
                title="Account Profile"
              >
                <FiUser className="w-5 h-5" />
              </Link>

              {/* Order Now CTA */}
              <div className="hidden sm:block">
                <Button to="/menu" variant="gold" size="sm">
                  Order Now
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-secondary hover:text-accent-gold lg:hidden"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />

      {/* Global Search Overlay Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
