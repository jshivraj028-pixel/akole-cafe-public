import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, UtensilsCrossed, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MobileBottomNav = ({ onOpenCart }) => {
  const { pathname } = useLocation();
  const { totalItemsCount } = useCart();

  const navItems = [
    { id: 'home', name: 'Home', path: '/', icon: Home },
    { id: 'menu', name: 'Menu', path: '/menu', icon: UtensilsCrossed },
    { id: 'cart', name: 'Cart', path: '/cart', icon: ShoppingBag, isCart: true },
    { id: 'profile', name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-sm z-50 lg:hidden pointer-events-none">
      {/* Luxury Frosted Glassmorphic Pod Container */}
      <div className="pointer-events-auto relative overflow-hidden rounded-[30px] bg-white/70 dark:bg-[#122017]/80 backdrop-blur-xl backdrop-saturate-150 border border-white/80 dark:border-[#D6AE4D]/35 shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-2 px-6 flex items-center justify-between transition-all duration-300">
        
        {/* Subtle Specular Top Highlight for Premium Glass Depth */}
        <div className="absolute inset-0 rounded-[30px] border-t border-white/90 dark:border-white/20 pointer-events-none" />

        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.isCart && pathname === '/cart');
          const IconComponent = item.icon;

          return (
            <div key={item.id} className="relative flex flex-col items-center justify-center py-1 z-10">
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
                  className="relative flex flex-col items-center justify-center"
                >
                  <div className="relative flex items-center justify-center">
                    <IconComponent 
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive 
                          ? 'text-[#123524] dark:text-[#D6AE4D] stroke-[2.4]' 
                          : 'text-[#48594B]/70 dark:text-gray-400 group-hover:text-[#123524] dark:group-hover:text-[#D6AE4D] stroke-[1.8]'
                      }`} 
                    />

                    {/* Cart Item Counter Badge */}
                    {item.isCart && totalItemsCount > 0 && (
                      <span className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 bg-[#FF5722] text-white font-bold text-[10px] rounded-full flex items-center justify-center border border-white dark:border-[#122017] shadow-sm leading-none">
                        {totalItemsCount}
                      </span>
                    )}
                  </div>

                  <span className={`text-[10px] font-semibold mt-0.5 transition-colors duration-200 ${
                    isActive 
                      ? 'text-[#123524] dark:text-[#D6AE4D]' 
                      : 'text-[#48594B]/70 dark:text-gray-400 group-hover:text-[#123524] dark:group-hover:text-[#D6AE4D]'
                  }`}>
                    {item.name}
                  </span>
                </motion.div>
              </Link>

              {/* Active Indicator Pill */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavDot"
                  className="w-3.5 h-1 rounded-full bg-[#FF5722] shadow-xs mt-0.5"
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
