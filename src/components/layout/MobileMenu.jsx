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
  { name: 'MENU', path: '/menu', icon: FiCoffee, badge: 'POPULAR', badgeStyle: 'text-[#1E2621] bg-white border border-white' },
  { name: 'ABOUT', path: '/about', icon: FiInfo },
  { name: 'RESERVE', path: '/reserve', icon: FiCalendar, badge: 'BOOK', badgeStyle: 'text-emerald-800 bg-emerald-100 border border-emerald-200' },
  { name: 'EVENTS', path: '/events', icon: FiMusic, badge: 'LIVE', badgeStyle: 'text-rose-800 bg-rose-100 border border-rose-200' },
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
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Light Sage Glossy Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-[320px] bg-gradient-to-b from-[#F2F6ED] via-[#EDF3E7] to-[#E6EFE0] text-[#1E2621] flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl border-l border-white/80"
          >
            <div>
              {/* Header */}
              <div className="p-4.5 flex items-center justify-between border-b border-white/80 bg-white/70 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#18201B] border-2 border-white rounded-full p-1 shadow-md">
                    <img
                      src={logoEmblem}
                      alt="Akole Café Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-baseline font-cormorant text-xl tracking-tight">
                    <span className="font-bold text-[#1E2621]">
                      Akole
                    </span>
                    <span className="italic font-medium text-[#48594B] ml-1">
                      Café
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white border border-white shadow-md text-[#1E2621] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Close Menu"
                >
                  <FiX className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>

              {/* User Greeting Card (If Logged In) */}
              {isUserLoggedIn && (
                <div className="mx-4 mt-4 p-3.5 rounded-2xl bg-white/80 border border-white shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-[#18201B] text-white font-bold flex items-center justify-center text-sm shadow">
                      {userInitial}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#1E2621] truncate max-w-[120px]">
                        {userName}
                      </span>
                      <span className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                        <FiStar className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" /> {userRole}
                      </span>
                    </div>
                  </div>
                  {loggedUser?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={onClose}
                      className="px-2.5 py-1 rounded-full bg-[#1E2621] text-white text-[9px] font-bold uppercase tracking-wider shadow-sm hover:scale-105 transition-all shrink-0"
                    >
                      Admin
                    </Link>
                  )}
                </div>
              )}

              {/* Navigation Items */}
              <nav className="p-3.5 space-y-1.5 mt-1">
                {menuItemsList.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={onClose}
                      className={`group flex items-center justify-between py-3 px-4 rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-[#18201B] text-white font-black shadow-md scale-[1.02]'
                          : 'bg-white/60 text-[#48594B] hover:bg-white hover:text-[#1E2621] border border-white/80'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-amber-400' : 'text-[#48594B] group-hover:text-[#1E2621]'
                          }`}
                        />
                        <span className="text-xs font-montserrat font-bold tracking-[1.5px] uppercase truncate">
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider whitespace-nowrap shadow-xs ${item.badgeStyle}`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <FiChevronRight
                          className={`w-3.5 h-3.5 transition-all ${
                            isActive ? 'text-white opacity-100' : 'text-gray-400 opacity-60 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/80 bg-white/70 backdrop-blur-md space-y-3">
              {/* Order Now Primary Button */}
              <Link
                to="/menu"
                onClick={onClose}
                className="w-full py-3.5 px-4 rounded-full bg-[#18201B] hover:bg-black text-white font-montserrat font-black text-xs uppercase tracking-[2px] text-center flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all cursor-pointer border border-[#18201B]"
              >
                <FiShoppingBag className="w-4 h-4 text-amber-400" /> ORDER ONLINE NOW
              </Link>

              {/* Login / Logout Area */}
              {isUserLoggedIn ? (
                <button
                  onClick={handleLogoutClick}
                  className="w-full py-2.5 px-4 rounded-full border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white font-montserrat font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <FiLogOut className="w-3.5 h-3.5" /> LOG OUT
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="py-2.5 rounded-full border border-white bg-white text-[#1E2621] font-montserrat font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-xs hover:bg-gray-50 transition-all"
                  >
                    <FiLogIn className="w-3.5 h-3.5" /> LOG IN
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="py-2.5 rounded-full bg-[#18201B] text-white font-montserrat font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 hover:bg-black transition-all shadow-xs"
                  >
                    <FiUserPlus className="w-3.5 h-3.5" /> SIGN UP
                  </Link>
                </div>
              )}

              {/* Cafe Contact Info */}
              <div className="pt-1 text-[11px] text-[#556B5D] space-y-1 font-sans">
                <p className="flex items-center gap-2 truncate">
                  <FiMapPin className="text-[#1E2621] shrink-0 w-3 h-3" /> Akole Bypass Road, Akole 422601
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-[#1E2621] shrink-0 w-3 h-3" />
                  <a href="tel:+918432387670" className="hover:text-[#1E2621] transition-colors font-medium">
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
