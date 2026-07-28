import React, { createContext, useContext, useState, useEffect } from 'react';
import MenuItemDetailModal from '../components/menu/MenuItemDetailModal';
import { checkUserStatusAPI } from '../services/api';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('akole_is_authenticated');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  const [userEmail, setUserEmail] = useState(() => {
    try {
      return localStorage.getItem('akole_user_email') || '';
    } catch (e) {
      return '';
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('akole_user');
      let parsed = saved ? JSON.parse(saved) : null;
      const savedEmail = localStorage.getItem('akole_user_email') || parsed?.email || '';
      const cleanEmail = (savedEmail || '').toLowerCase().trim();
      const savedAvatar = cleanEmail ? localStorage.getItem(`akole_avatar_${cleanEmail}`) : null;
      if (savedAvatar) {
        if (!parsed) {
          parsed = { email: savedEmail, name: savedEmail.split('@')[0] };
        }
        parsed.avatar = savedAvatar;
        try {
          localStorage.setItem('akole_user', JSON.stringify(parsed));
        } catch (e) {}
      }
      return parsed;
    } catch (e) {
      return null;
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('akole_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('akole_dark_mode');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Realtime & Periodic Ban Status Check for Logged-In User
  useEffect(() => {
    let intervalId;

    const checkCurrentUserBanStatus = async () => {
      try {
        const savedUserStr = localStorage.getItem('akole_user');
        const savedEmailStr = localStorage.getItem('akole_user_email');
        const savedTokenStr = localStorage.getItem('akole_token');

        if (!savedUserStr && !savedEmailStr && !savedTokenStr) return;

        let userObj = null;
        if (savedUserStr) {
          try { userObj = JSON.parse(savedUserStr); } catch (e) {}
        }

        const identifier = userObj?.id || userObj?._id || userObj?.email || savedEmailStr;
        if (!identifier) return;

        // Skip main administrator account check
        const cleanIdentifier = String(identifier).toLowerCase().trim();
        if (userObj?.role === 'admin' || cleanIdentifier === 'akolecafe@gmail.com' || (savedEmailStr && savedEmailStr.toLowerCase() === 'akolecafe@gmail.com')) {
          return;
        }

        const res = await checkUserStatusAPI(identifier);
        if (res) {
          if (res.isBanned) {
            // Banned by Admin! Clear session immediately
            localStorage.removeItem('akole_user');
            localStorage.removeItem('akole_token');
            localStorage.removeItem('akole_is_authenticated');
            localStorage.removeItem('akole_user_email');
            localStorage.removeItem('akole_cart');

            setIsAuthenticated(false);
            setUserEmail('');

            showToast('Your account has been banned.', 'error');

            if (window.location.pathname !== '/login') {
              window.location.href = '/login?reason=banned';
            }
          } else if (res.isDeleted) {
            // Deleted by Admin! Clear session immediately
            localStorage.removeItem('akole_user');
            localStorage.removeItem('akole_token');
            localStorage.removeItem('akole_is_authenticated');
            localStorage.removeItem('akole_user_email');
            localStorage.removeItem('akole_cart');

            setIsAuthenticated(false);
            setUserEmail('');

            showToast('Your account has been deleted.', 'error');

            if (window.location.pathname !== '/login') {
              window.location.href = '/login?reason=deleted';
            }
          }
        }
      } catch (e) {
        // Ignore fetch errors
      }
    };

    checkCurrentUserBanStatus();
    intervalId = setInterval(checkCurrentUserBanStatus, 2000);

    const handleCustomBanEvent = (e) => {
      const savedUserStr = localStorage.getItem('akole_user');
      const savedEmailStr = localStorage.getItem('akole_user_email');
      let userObj = null;
      if (savedUserStr) {
        try { userObj = JSON.parse(savedUserStr); } catch (e) {}
      }

      const targetEmail = e.detail?.email?.toLowerCase();
      const targetId = e.detail?.id;

      const currentEmail = (userObj?.email || savedEmailStr || '').toLowerCase();
      const currentId = userObj?.id || userObj?._id;

      if (
        (targetEmail && currentEmail === targetEmail) ||
        (targetId && String(currentId) === String(targetId))
      ) {
        if (e.detail?.isBanned) {
          localStorage.removeItem('akole_user');
          localStorage.removeItem('akole_token');
          localStorage.removeItem('akole_is_authenticated');
          localStorage.removeItem('akole_user_email');
          localStorage.removeItem('akole_cart');

          setIsAuthenticated(false);
          setUserEmail('');
          showToast('Your account has been banned.', 'error');
          window.location.href = '/login?reason=banned';
        } else if (e.detail?.isDeleted) {
          localStorage.removeItem('akole_user');
          localStorage.removeItem('akole_token');
          localStorage.removeItem('akole_is_authenticated');
          localStorage.removeItem('akole_user_email');
          localStorage.removeItem('akole_cart');

          setIsAuthenticated(false);
          setUserEmail('');
          showToast('Your account has been deleted.', 'error');
          window.location.href = '/login?reason=deleted';
        }
      }
    };

    window.addEventListener('akole_user_banned', handleCustomBanEvent);

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('akole_user_banned', handleCustomBanEvent);
    };
  }, []);

  const loginUser = (email, userObj = null) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    const cleanEmail = (email || '').toLowerCase().trim();
    const savedAvatar = cleanEmail ? localStorage.getItem(`akole_avatar_${cleanEmail}`) : null;
    
    let finalUser = userObj || currentUser;
    if (finalUser) {
      if (savedAvatar && !finalUser.avatar) {
        finalUser = { ...finalUser, avatar: savedAvatar };
      }
      setCurrentUser(finalUser);
      try {
        localStorage.setItem('akole_user', JSON.stringify(finalUser));
      } catch (e) {}
    }
    
    try {
      localStorage.setItem('akole_is_authenticated', JSON.stringify(true));
      localStorage.setItem('akole_user_email', email);
    } catch (e) {}
  };

  const updateUserAvatar = (base64Url) => {
    const email = userEmail || currentUser?.email || localStorage.getItem('akole_user_email') || '';
    const cleanEmail = (email || '').toLowerCase().trim();
    if (cleanEmail) {
      try {
        localStorage.setItem(`akole_avatar_${cleanEmail}`, base64Url);
      } catch (e) {}
    }
    setCurrentUser((prev) => {
      const updated = { ...(prev || { email }), avatar: base64Url };
      try {
        localStorage.setItem('akole_user', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setCurrentUser(null);
    try {
      localStorage.removeItem('akole_is_authenticated');
      localStorage.removeItem('akole_user_email');
      localStorage.removeItem('akole_user');
      localStorage.removeItem('akole_token');
      localStorage.removeItem('akole_admin_token');
    } catch (e) {}
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('akole_dark_mode', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getProductKey = (prod) => {
    if (!prod) return '';
    if (typeof prod === 'string' || typeof prod === 'number') return String(prod).trim();
    return String(prod.id || prod._id || prod.name || '').trim();
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    const targetKey = getProductKey(product);
    if (!targetKey) return;

    setWishlistItems((prev) => {
      const exists = prev.some((item) => getProductKey(item) === targetKey);
      if (exists) {
        showToast(`Removed "${product.name || 'Item'}" from Favorites`, 'info');
        return prev.filter((item) => getProductKey(item) !== targetKey);
      } else {
        showToast(`Added "${product.name || 'Item'}" to Favorites!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productIdOrItem) => {
    const targetKey = getProductKey(productIdOrItem);
    if (!targetKey) return false;
    return wishlistItems.some((item) => getProductKey(item) === targetKey);
  };

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const openQuickView = (product) => {
    setSelectedMenuItem(product);
  };

  const closeQuickView = () => {
    setSelectedMenuItem(null);
  };

  return (
    <ThemeContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        currentUser,
        setCurrentUser,
        updateUserAvatar,
        loginUser,
        logoutUser,
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        isDarkMode,
        toggleDarkMode,
        toasts,
        showToast,
        removeToast,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        selectedMenuItem,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
      <MenuItemDetailModal
        product={selectedMenuItem}
        isOpen={!!selectedMenuItem}
        onClose={closeQuickView}
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
