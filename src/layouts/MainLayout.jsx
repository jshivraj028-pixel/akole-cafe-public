import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import ToastContainer from '../components/common/ToastContainer';
import Lenis from 'lenis';

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  const isStandalonePage = pathname === '/login' || pathname === '/admin';

  useEffect(() => {
    // Initialize Lenis Smooth Scroll for main website
    if (!isStandalonePage) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 2.0,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [isStandalonePage]);

  // If standalone login or admin page, render clean full-screen view without main website navbar/footer
  if (isStandalonePage) {
    return (
      <div className="min-h-screen bg-primary text-secondary selection:bg-accent-gold selection:text-primary">
        <ToastContainer />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary text-dark relative font-sans selection:bg-accent-gold selection:text-primary">
      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Luxury Sticky Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Scroll To Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
