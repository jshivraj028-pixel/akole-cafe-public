import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, Heart, Sun, Moon, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import MobileMenu from './MobileMenu';
import logoEmblem from '../../assets/logo-emblem.png';

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
  const { pathname } = useLocation();
  const { totalItemsCount } = useCart();
  const { setIsSearchOpen, isDarkMode, toggleDarkMode, wishlistItems, isAuthenticated, userEmail } = useTheme();

  // Dynamic route colors: Home is Dark Olive (#445648), Other pages are Warm Cream (#EFE8D8)
  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[82px] px-4 sm:px-8 transition-colors duration-300 shadow-md flex items-center ${
          isHome
            ? 'bg-[#445648] border-b border-[#536958]'
            : 'bg-[#EFE8D8] border-b border-[#D8CEB8]'
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between">
          
          {/* Logo: Circular Emblem Image + Cormorant Garamond Typography */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
              <img
                src={logoEmblem}
                alt="Akole Café Emblem Logo"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform rounded-full"
              />
            </div>

            {/* Brand Name Text: Akole (700 White) Café (500 Italic Gold #D6AE4D) */}
            <div className="flex items-baseline font-cormorant text-2xl sm:text-3xl tracking-[-0.5px]">
              <span
                className={`font-bold transition-colors ${
                  isHome ? 'text-white' : 'text-[#354F42]'
                }`}
              >
                Akole
              </span>
              <span className="italic font-medium text-[#D6AE4D] ml-1">
                Café
              </span>
            </div>
          </Link>

          {/* Navigation Links + Action Icons Grouped with Balanced Spacing */}
          <div className="flex items-center gap-6 xl:gap-10">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
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
            <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
            {/* 1. Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-1.5 transition-colors ${
                isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
              }`}
              title="Search"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            {/* 2. Notification Bell Icon */}
            <button
              className={`p-1.5 transition-colors relative ${
                isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
              }`}
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 stroke-[2]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D6AE4D]" />
            </button>

            {/* 3. Wishlist Heart Icon */}
            <Link
              to="/menu"
              className={`p-1.5 transition-colors relative ${
                isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
              }`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[2]" />
              {wishlistItems && wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D6AE4D] text-[#2A3B2F] font-bold text-[10px] rounded-full flex items-center justify-center shadow-sm">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* 4. Theme Mode Toggle Button (Light/Dark Toggle) */}
            <button
              onClick={toggleDarkMode}
              className={`p-1.5 transition-colors relative ${
                isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
              }`}
              title={isDarkMode ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
              aria-label="Toggle Light Dark Theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 stroke-[2] text-[#D6AE4D]" />
              ) : (
                <Moon className="w-5 h-5 stroke-[2]" />
              )}
            </button>

            {/* 5. User Profile / Logout Icon Link */}
            {isAuthenticated ? (
              <Link
                to="/profile"
                className={`p-1.5 transition-colors relative flex items-center gap-1 ${
                  isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
                }`}
                title={`Profile (${userEmail})`}
                aria-label="Profile"
              >
                <User className="w-5 h-5 stroke-[2] text-[#D6AE4D]" />
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </Link>
            ) : (
              <Link
                to="/login"
                className={`p-1.5 transition-colors relative ${
                  isHome ? 'text-white hover:text-[#D6AE4D]' : 'text-[#354F42] hover:text-[#D6AE4D]'
                }`}
                title="Sign In / Login"
                aria-label="Sign In / Login"
              >
                <User className="w-5 h-5 stroke-[2]" />
              </Link>
            )}

            {/* 6. Gold Rounded ORDER NOW Button (Compact Size) */}
            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center justify-center px-4.5 py-1.5 rounded-full bg-[#D6AE4D] hover:bg-[#c59d3c] text-[#2A3B2F] font-montserrat font-bold text-[11px] xl:text-xs uppercase tracking-widest shadow-sm transition-all transform hover:scale-105 active:scale-95 ml-1"
            >
              ORDER NOW
            </Link>

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
      />
    </>
  );
};

export default Navbar;
