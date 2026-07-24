import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPhone, FiMapPin, FiHeart, FiUser } from 'react-icons/fi';
import Button from '../common/Button';

const MobileMenu = ({ isOpen, onClose, links }) => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer Slide */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-primary border-l border-accent-gold/20 p-6 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-accent-gold/20">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">☕</span>
                  <span className="font-serif text-xl font-bold text-secondary">
                    AKOLE <span className="text-accent-gold">CAFE</span>
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-secondary/70 hover:text-accent-gold rounded-full"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4 my-8">
                {links.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={onClose}
                      className={`text-base uppercase tracking-widest font-medium py-2 px-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-accent-gold/15 text-accent-gold border-l-4 border-accent-gold font-semibold'
                          : 'text-secondary/80 hover:text-accent-gold hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="text-base uppercase tracking-widest font-medium py-2 px-3 rounded-lg text-secondary/80 hover:text-accent-gold hover:bg-white/5 flex items-center gap-3"
                >
                  <FiUser className="w-5 h-5 text-accent-gold" /> Profile & Wishlist
                </Link>
              </nav>
            </div>

            {/* Bottom Actions & Info */}
            <div className="pt-6 border-t border-accent-gold/20 flex flex-col gap-4">
              <Button to="/reserve" variant="gold" size="md" className="w-full" onClick={onClose}>
                Reserve Table
              </Button>

              <div className="space-y-2 text-xs text-secondary/60">
                <p className="flex items-center gap-2">
                  <FiMapPin className="text-accent-gold" /> Main Road, Akole, Maharashtra 422601
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-accent-gold" /> +91 98765 43210
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
