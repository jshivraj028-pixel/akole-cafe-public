import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('akole_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('akole_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setDiscountPercent(0);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AKOLE20') {
      setAppliedCoupon('AKOLE20');
      setDiscountPercent(20);
      return { success: true, message: '20% Special Akole Discount Applied!' };
    } else if (cleanCode === 'LUXURY10') {
      setAppliedCoupon('LUXURY10');
      setDiscountPercent(10);
      return { success: true, message: '10% Luxury Guest Discount Applied!' };
    }
    return { success: false, message: 'Invalid Promo Code. Try AKOLE20' };
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxAmount = Math.round((subtotal - discountAmount) * 0.05); // 5% GST
  const grandTotal = subtotal - discountAmount + taxAmount;
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      appliedCoupon,
      applyCoupon,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal,
      totalItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
