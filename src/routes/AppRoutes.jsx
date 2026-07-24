import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useTheme } from '../context/ThemeContext';

// Pages
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import About from '../pages/About';
import Reserve from '../pages/Reserve';
import Events from '../pages/Events';
import Gallery from '../pages/Gallery';
import Blog from '../pages/Blog';
import Franchise from '../pages/Franchise';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useTheme();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicLoginRoute = ({ children }) => {
  const { isAuthenticated } = useTheme();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTopOnRoute />
      <Routes>
        {/* Full-screen Login Page */}
        <Route
          path="/login"
          element={
            <PublicLoginRoute>
              <Login />
            </PublicLoginRoute>
          }
        />

        {/* Protected Main Layout Pages */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/reserve" element={<Reserve />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/franchise" element={<Franchise />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
