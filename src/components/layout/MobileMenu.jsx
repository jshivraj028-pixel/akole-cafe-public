import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPhone, FiMapPin } from 'react-icons/fi';
import logoEmblem from '../../assets/logo-emblem.png';

const MobileMenu = ({ isOpen, onClose, links }) => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Touch Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
          />

          {/* Mobile Drawer Slide (iOS & Android Safe Area Inset Support) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-[#354F42] text-white p-6 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl pt-safe pb-safe"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#456455]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 shrink-0 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src={logoEmblem}
                      alt="Akole Café Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-extrabold text-xl text-white tracking-tight">
                      Akole
                    </span>
                    <span className="font-serif italic font-normal text-xl text-[#D4B055] tracking-wide ml-0.5">
                      Café
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-[#D4B055] rounded-full transition-colors"
                  aria-label="Close Menu"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Nav Links with Serif Typography */}
              <nav className="flex flex-col gap-2 my-6">
                {links.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={onClose}
                      className={`font-serif text-sm font-semibold tracking-widest uppercase py-3 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#D4B055] text-[#2B4236] font-bold shadow-md'
                          : 'text-white/90 hover:bg-white/10 hover:text-[#D4B055]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 border-t border-[#456455] space-y-4">
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-full border border-[#D4B055] text-[#D4B055] font-serif font-bold text-xs uppercase tracking-wider text-center block"
                >
                  LOG IN
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-full bg-white/10 text-white font-serif font-bold text-xs uppercase tracking-wider text-center block"
                >
                  SIGN UP
                </Link>
              </div>

              <Link
                to="/menu"
                onClick={onClose}
                className="w-full py-3 rounded-full bg-[#D4B055] text-[#2B4236] font-serif font-bold text-xs uppercase tracking-wider text-center block shadow-md"
              >
                ORDER NOW
              </Link>

              <div className="space-y-1.5 text-xs text-white/70 font-light">
                <p className="flex items-center gap-2">
                  <FiMapPin className="text-[#D4B055]" /> Akole Bypass Road, Akole 422601
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-[#D4B055]" /> +91 98765 43210
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
