import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Percent, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MobileBottomNav = ({ onOpenCart }) => {
  const { pathname } = useLocation();
  const { totalItemsCount } = useCart();

  const navItems = [
    { id: 'home', name: 'Home', path: '/', icon: Home },
    { id: 'menu', name: 'Menu', path: '/menu', icon: Percent },
    { id: 'cart', name: 'Cart', path: '/cart', icon: ShoppingBag, isCart: true },
    { id: 'profile', name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-sm z-40 lg:hidden pointer-events-none">
      <div className="pointer-events-auto relative overflow-hidden rounded-[32px] bg-gradient-to-r from-emerald-500/20 via-white/90 to-white/95 backdrop-blur-2xl border-2 border-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2.5 px-7 flex items-center justify-between">
        
        {/* Ambient Subtle Green Glow on Left Corner */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-emerald-400/25 to-transparent pointer-events-none" />

        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.isCart && pathname === '/cart');
          const IconComponent = item.icon;

          return (
            <div key={item.id} className="relative flex flex-col items-center justify-center py-1">
              <Link
                to={item.path}
                onClick={(e) => {
                  if (item.isCart && onOpenCart) {
                    // Optional trigger cart drawer
                  }
                }}
                className="relative group p-1 flex flex-col items-center justify-center transition-all cursor-pointer"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className="relative flex items-center justify-center"
                >
                  <IconComponent 
                    className={`w-6 h-6 stroke-[2.2] transition-colors ${
                      isActive ? 'text-[#1E2621]' : 'text-[#48594B]/75 hover:text-[#1E2621]'
                    }`} 
                  />

                  {/* Cart Item Counter Badge */}
                  {item.isCart && totalItemsCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 bg-[#1E2621] text-white font-black text-[9px] rounded-full flex items-center justify-center border-2 border-white shadow-sm leading-none">
                      {totalItemsCount}
                    </span>
                  )}
                </motion.div>
              </Link>

              {/* Exact Coral/Orange Active Indicator Dot from User Image */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavDot"
                  className="w-3.5 h-1.5 rounded-full bg-[#FF5722] shadow-xs mt-1"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default MobileBottomNav;
