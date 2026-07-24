import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('akole_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('akole_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistItems]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to Wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <ThemeContext.Provider value={{
      wishlistItems,
      toggleWishlist,
      isInWishlist,
      toasts,
      showToast,
      removeToast,
      isSearchOpen,
      setIsSearchOpen,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
