import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import Container from '../common/Container';
import Button from '../common/Button';
import MobileMenu from './MobileMenu';
import SearchModal from './SearchModal';

const navLinks = [
  { name: 'Home', path: '/' },
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
  const { pathname } = useLocation();
  const { totalItemsCount } = useCart();
  const { wishlistItems, setIsSearchOpen, isSearchOpen } = useTheme();

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
            <Link to="/" className="flex items-center gap-3 group">
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
            <div className="flex items-center gap-4">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-secondary/80 hover:text-accent-gold transition-colors relative"
                title="Search Menu"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>

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
