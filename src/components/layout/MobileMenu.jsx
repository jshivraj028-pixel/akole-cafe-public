import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPhone, FiMapPin, FiMail } from 'react-icons/fi';
import logoEmblem from '../../assets/logo-emblem.png';

const MobileMenu = ({ isOpen, onClose, links = [] }) => {
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
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md lg:hidden"
          />

          {/* Mobile Drawer Slide (iOS & Android Safe Area Inset Support) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-xs bg-[#122219] text-white p-6 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl pt-safe pb-safe border-l border-[#D6AE4D]/30"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#D6AE4D]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#2A1D17] border border-[#D6AE4D]/50 rounded-full p-1 shadow-md">
                    <img
                      src={logoEmblem}
                      alt="Akole Café Logo"
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-extrabold text-xl text-white tracking-tight">
                      Akole
                    </span>
                    <span className="font-serif italic font-normal text-xl text-[#D6AE4D] tracking-wide ml-0.5">
                      Café
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-[#D6AE4D] rounded-full transition-colors cursor-pointer"
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
                          ? 'bg-[#D6AE4D] text-[#122219] font-black shadow-lg scale-[1.02]'
                          : 'text-white/90 hover:bg-white/10 hover:text-[#D6AE4D]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 border-t border-[#D6AE4D]/30 space-y-4">
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-full border border-[#D6AE4D] text-[#D6AE4D] font-serif font-bold text-xs uppercase tracking-wider text-center block hover:bg-[#D6AE4D]/15 transition-all"
                >
                  LOG IN
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-full bg-white/10 text-white font-serif font-bold text-xs uppercase tracking-wider text-center block hover:bg-white/20 transition-all"
                >
                  SIGN UP
                </Link>
              </div>

              <Link
                to="/menu"
                onClick={onClose}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#D6AE4D] via-[#F3E5AB] to-[#B89035] text-[#122219] font-serif font-black text-xs uppercase tracking-wider text-center block shadow-lg hover:brightness-110 transition-all"
              >
                ORDER NOW
              </Link>

              <div className="space-y-2 text-xs text-white/70 font-light pt-2">
                <p className="flex items-center gap-2">
                  <FiMapPin className="text-[#D6AE4D] shrink-0" /> Akole Bypass Road, Akole 422601
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-[#D6AE4D] shrink-0" /> <a href="tel:+918432387670" className="hover:text-[#D6AE4D] transition-colors">+91 84323 87670</a>
                </p>
                <p className="flex items-center gap-2">
                  <FiMail className="text-[#D6AE4D] shrink-0" /> <a href="mailto:akolecafe@gmail.com" className="hover:text-[#D6AE4D] transition-colors">akolecafe@gmail.com</a>
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
