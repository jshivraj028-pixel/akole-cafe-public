import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiHome,
  FiCoffee,
  FiInfo,
  FiCalendar,
  FiMusic,
  FiImage,
  FiSend,
  FiMapPin,
  FiPhone,
  FiLogOut,
  FiShoppingBag,
  FiChevronRight,
  FiLogIn,
  FiUserPlus,
  FiStar
} from 'react-icons/fi';
import logoEmblem from '../../assets/logo-emblem.png';
import { useTheme } from '../../context/ThemeContext';

const menuItemsList = [
  { name: 'HOME', path: '/', icon: FiHome },
  { name: 'MENU', path: '/menu', icon: FiCoffee, badge: 'POPULAR', badgeStyle: 'text-[#E6C364] bg-[#D6AE4D]/20 border border-[#D6AE4D]/40' },
  { name: 'ABOUT', path: '/about', icon: FiInfo },
  { name: 'RESERVE', path: '/reserve', icon: FiCalendar, badge: 'BOOK', badgeStyle: 'text-emerald-400 bg-emerald-500/20 border border-emerald-500/40' },
  { name: 'EVENTS', path: '/events', icon: FiMusic, badge: 'LIVE', badgeStyle: 'text-rose-400 bg-rose-500/20 border border-rose-500/40' },
  { name: 'GALLERY', path: '/gallery', icon: FiImage },
  { name: 'CONTACT', path: '/contact', icon: FiSend }
];

const MobileMenu = ({ isOpen, onClose, isAuthenticated: propIsAuth, onLogout }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated: contextIsAuth, logoutUser, showToast, userEmail } = useTheme();

  const isUserLoggedIn =
    propIsAuth ||
    contextIsAuth ||
    Boolean(localStorage.getItem('akole_user')) ||
    Boolean(localStorage.getItem('akole_token'));

  const loggedUser = (() => {
    try {
      const saved = localStorage.getItem('akole_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  })();

  const userName = loggedUser?.name || userEmail?.split('@')[0] || 'Valued Guest';
  const userRole = loggedUser?.role === 'admin' ? 'Administrator' : 'VIP Member';
  const userInitial = (userName[0] || 'A').toUpperCase();

  const handleLogoutClick = () => {
    onClose();
    if (onLogout) {
      onLogout();
    } else {
      if (logoutUser) logoutUser();
      localStorage.removeItem('akole_user');
      localStorage.removeItem('akole_token');
      localStorage.removeItem('akole_is_authenticated');
      localStorage.removeItem('akole_user_email');
      if (showToast) showToast('Logged out successfully', 'info');
    }
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md lg:hidden"
          />

          {/* Clean Luxury Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-[300px] bg-gradient-to-b from-[#0F1E15] via-[#122219] to-[#0A140E] text-white flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl border-l border-[#D6AE4D]/30"
          >
            <div>
              {/* Header */}
              <div className="p-4.5 flex items-center justify-between border-b border-[#D6AE4D]/20 bg-black/30 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-gradient-to-br from-[#2A1D17] to-[#140D0A] border border-[#D6AE4D]/60 rounded-full p-1 shadow-md">
                    <img
                      src={logoEmblem}
                      alt="Akole Café Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-extrabold text-xl text-white tracking-tight">
                      Akole
                    </span>
                    <span className="font-serif italic font-normal text-xl text-[#D6AE4D]">
                      Café
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 text-white/70 hover:text-[#D6AE4D] hover:bg-white/10 rounded-full transition-all cursor-pointer border border-white/10"
                  aria-label="Close Menu"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* User Greeting Card (If Logged In) */}
              {isUserLoggedIn && (
                <div className="mx-4 mt-4 p-3 rounded-2xl bg-gradient-to-r from-[#1A3324] to-[#14261B] border border-[#D6AE4D]/35 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#122219] font-serif font-extrabold flex items-center justify-center text-sm shadow">
                      {userInitial}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-white truncate max-w-[120px]">
                        {userName}
                      </span>
                      <span className="text-[10px] text-[#D6AE4D] font-semibold flex items-center gap-1">
                        <FiStar className="w-2.5 h-2.5 fill-[#D6AE4D]" /> {userRole}
                      </span>
                    </div>
                  </div>
                  {loggedUser?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={onClose}
                      className="px-2 py-0.5 rounded-md bg-[#D6AE4D]/20 text-[#D6AE4D] border border-[#D6AE4D]/40 text-[9px] font-bold uppercase tracking-wider hover:bg-[#D6AE4D] hover:text-[#122219] transition-all shrink-0"
                    >
                      Admin
                    </Link>
                  )}
                </div>
              )}

              {/* Navigation Items - Clean Single-Line Row */}
              <nav className="p-3.5 space-y-1 mt-1">
                {menuItemsList.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={onClose}
                      className={`group flex items-center justify-between py-3 px-3.5 rounded-xl transition-all duration-150 ${
                        isActive
                          ? 'bg-[#183022] text-[#D6AE4D] font-bold border-l-4 border-[#D6AE4D] shadow-sm'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-[#D6AE4D]' : 'text-[#D6AE4D]/80 group-hover:text-[#D6AE4D]'
                          }`}
                        />
                        <span className="text-xs font-serif font-bold tracking-[1.5px] uppercase truncate">
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span
                            className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider whitespace-nowrap shadow-xs ${item.badgeStyle}`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <FiChevronRight
                          className={`w-3.5 h-3.5 transition-all ${
                            isActive ? 'text-[#D6AE4D] opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-[#D6AE4D]/20 bg-black/40 space-y-3">
              {/* Order Now Primary Button */}
              <Link
                to="/menu"
                onClick={onClose}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#122219] font-serif font-black text-xs uppercase tracking-[2px] text-center flex items-center justify-center gap-2.5 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer border border-[#FFF5D6]/40"
              >
                <FiShoppingBag className="w-4 h-4" /> ORDER ONLINE NOW
              </Link>

              {/* Login / Logout Area */}
              {isUserLoggedIn ? (
                <button
                  onClick={handleLogoutClick}
                  className="w-full py-2.5 px-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white font-serif font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FiLogOut className="w-3.5 h-3.5" /> LOG OUT
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="py-2.5 rounded-xl border border-[#D6AE4D]/60 text-[#D6AE4D] font-serif font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 hover:bg-[#D6AE4D]/15 transition-all"
                  >
                    <FiLogIn className="w-3.5 h-3.5" /> LOG IN
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="py-2.5 rounded-xl bg-white/10 text-white font-serif font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 hover:bg-white/20 transition-all border border-white/10"
                  >
                    <FiUserPlus className="w-3.5 h-3.5" /> SIGN UP
                  </Link>
                </div>
              )}

              {/* Cafe Contact Info */}
              <div className="pt-1 text-[11px] text-white/60 space-y-1 font-sans">
                <p className="flex items-center gap-2 truncate">
                  <FiMapPin className="text-[#D6AE4D] shrink-0 w-3 h-3" /> Akole Bypass Road, Akole 422601
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-[#D6AE4D] shrink-0 w-3 h-3" />
                  <a href="tel:+918432387670" className="hover:text-[#D6AE4D] transition-colors font-medium">
                    +91 84323 87670
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
