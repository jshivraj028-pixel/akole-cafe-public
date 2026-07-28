import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MobileBottomNav from '../components/layout/MobileBottomNav';
import ScrollToTop from '../components/common/ScrollToTop';
import ToastContainer from '../components/common/ToastContainer';
import Lenis from 'lenis';

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  const isStandalonePage = 
    pathname === '/login' || 
    pathname === '/register' || 
    pathname === '/signup' || 
    pathname === '/forgot-password' || 
    pathname === '/admin';

  useEffect(() => {
    // Reset scroll to top instantly on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (lenisRef.current) {
      try {
        lenisRef.current.scrollTo(0, { immediate: true });
      } catch (e) {}
    }
  }, [pathname]);

  useEffect(() => {
    if (!isStandalonePage) {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        try {
          lenis.destroy();
        } catch (e) {}
        lenisRef.current = null;
      };
    }
  }, [isStandalonePage]);

  if (isStandalonePage) {
    return (
      <div className="min-h-screen bg-primary text-secondary selection:bg-accent-gold selection:text-primary">
        <ToastContainer />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary text-dark relative font-sans selection:bg-accent-gold selection:text-primary overflow-x-hidden">
      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Luxury Sticky Navbar */}
      <Navbar />

      {/* Main Content Area with Smooth Route Transitions */}
      <main className="flex-grow pb-16 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Glassmorphic Mobile Bottom Nav (Matches User Reference Image) */}
      <MobileBottomNav />

      {/* Scroll To Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
