import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import ToastContainer from '../components/common/ToastContainer';
import Lenis from 'lenis';

const MainLayout = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
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
  }, []);

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
