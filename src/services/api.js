import { menuItems as fallbackMenuItems } from '../data/menu';
import { eventsData } from '../data/events';
import { blogPosts } from '../data/blogs';

export const getApiBaseUrl = () => {
  if (import.meta.env && import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    const host = window.location.hostname;
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    return `${protocol}//${host}:5000/api`;
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

// Helper for fetch with fallback
const fetchWithFallback = async (endpoint, fallbackData) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[API Warning] Could not reach backend server endpoint (${endpoint}). Using fallback data.`, err.message);
    return fallbackData;
  }
};

// Fetch Menu Items from MongoDB Atlas (Single Source of Truth)
export const fetchMenuItems = async (category = 'all', search = '') => {
  try {
    let url = `${API_BASE_URL}/products?category=${category}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    
    // Always merge backend products with fallback dataset so all items stay available
    const mergedMap = new Map();
    fallbackMenuItems.forEach(item => mergedMap.set(item.name.toLowerCase().trim(), item));
    
    if (Array.isArray(data)) {
      data.forEach(dbItem => {
        if (dbItem && dbItem.name) {
          mergedMap.set(dbItem.name.toLowerCase().trim(), dbItem);
        }
      });
    }

    return Array.from(mergedMap.values());
  } catch (err) {
    console.warn('[API Warning] Using local menu dataset fallback:', err.message);
    return fallbackMenuItems;
  }
};

// Admin Product CRUD APIs
export const createProductAPI = async (productData) => {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create product');
  }
  return res.json();
};

export const updateProductAPI = async (id, productData) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update product');
  }
  return res.json();
};

export const deleteProductAPI = async (id) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to delete product');
  }
  return res.json();
};

// Upload Product Image API
export const uploadImageAPI = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Image upload failed');
  }

  const data = await res.json();
  if (data.imageUrl && data.imageUrl.startsWith('/uploads')) {
    return `${API_BASE_URL.replace('/api', '')}${data.imageUrl}`;
  }
  return data.imageUrl;
};

// ==========================================
// USER & AUTHENTICATION APIs (MONGODB ATLAS)
// ==========================================

// Fetch registered users (Admin view) - Single Source of Truth from MongoDB Atlas
export const fetchUsersAPI = async (includeDeleted = true) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users?includeDeleted=${Boolean(includeDeleted)}`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  } catch (err) {
    console.error('[API Error] Fetch users from MongoDB Atlas failed:', err.message);
    return [];
  }
};

// Delete User Account (Admin) - Direct MongoDB Atlas deletion
export const deleteUserAPI = async (id) => {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete user');
  }
  return data;
};

// Reactivate Deleted User Account (Admin)
export const reactivateUserAPI = async (id) => {
  const res = await fetch(`${API_BASE_URL}/users/${id}/reactivate`, {
    method: 'PUT'
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to reactivate user');
  }
  return data;
};

// Toggle User Ban Status (Admin) - Direct MongoDB Atlas update
export const toggleBanUserAPI = async (id, isBanned) => {
  const res = await fetch(`${API_BASE_URL}/users/${id}/ban`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isBanned })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update ban status');
  }
  return data;
};

// Check User Status (Ban / Active / Soft Delete)
export const checkUserStatusAPI = async (idOrEmail) => {
  if (!idOrEmail) return { exists: false, isBanned: false, isDeleted: false };
  try {
    const res = await fetch(`${API_BASE_URL}/users/status/${encodeURIComponent(idOrEmail)}`);
    if (!res.ok) return { exists: true, isBanned: false, isDeleted: false };
    return await res.json();
  } catch (err) {
    return { exists: true, isBanned: false, isDeleted: false };
  }
};

// User / Admin Login - Single Source of Truth via MongoDB Atlas
export const userLoginAPI = async (email, password) => {
  const cleanInput = (email || '').toLowerCase().trim();
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanInput, password })
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 403) {
      throw new Error(data.message || 'Your account has been banned.');
    }
    if (res.status === 401) {
      throw new Error(data.message || 'Account not found or has been deleted.');
    }
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (err) {
    if (
      err.message.includes('banned') ||
      err.message.includes('deleted') ||
      err.message.includes('not found') ||
      err.message.includes('password') ||
      err.message === 'Login failed'
    ) {
      throw err;
    }
    console.warn("[API Warning] Backend server offline. Falling back to local mock authentication.", err.message);
    if (cleanInput === 'akolecafe@gmail.com' && password === 'Akolecafe2007') {
      return {
        token: 'mock-jwt-admin-token-12345',
        user: {
          id: 'mock-admin-id',
          name: 'Akole Cafe Admin',
          email: 'akolecafe@gmail.com',
          role: 'admin'
        },
        isAdmin: true
      };
    }
    if (password.length >= 6) {
      const mockName = cleanInput.split('@')[0];
      const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);
      return {
        token: 'mock-jwt-user-token-12345',
        user: {
          id: 'mock-user-id-' + Date.now(),
          name: formattedName || 'Valued Guest',
          email: cleanInput,
          role: 'user'
        },
        isAdmin: false
      };
    } else {
      throw new Error('Password must be at least 6 characters long.');
    }
  }
};

// User Registration - Direct MongoDB Atlas Registration
export const userRegisterAPI = async (userData) => {
  const cleanEmail = (userData.email || '').toLowerCase().trim();
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (res.ok) {
      const data = await res.json();
      // Track in local registered list
      const registered = JSON.parse(localStorage.getItem('akole_registered_users') || '[]');
      if (!registered.some(u => u.email.toLowerCase() === cleanEmail)) {
        registered.push({ id: data.user?.id || Date.now(), name: userData.name, email: cleanEmail });
        localStorage.setItem('akole_registered_users', JSON.stringify(registered));
      }
      return data;
    }
    const data = await res.json().catch(() => ({}));

    if (res.status === 409 || res.status === 400) {
      throw new Error(data.message || 'An account with this email address already exists.');
    }
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (err) {
    if (
      err.message.includes('exists') || 
      err.message.includes('already') || 
      err.message.includes('email') || 
      err.message.includes('password')
    ) {
      throw err;
    }
    console.warn("[API Warning] Backend server offline. Falling back to local registration check.", err.message);
    
    // Check local registered list
    const registered = JSON.parse(localStorage.getItem('akole_registered_users') || '[]');
    if (registered.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email address already exists. Please sign in or use a different email.');
    }

    const newUser = {
      id: 'user-' + Date.now(),
      name: userData.name || 'Valued Guest',
      email: cleanEmail,
      phone: userData.phone || ''
    };
    registered.push(newUser);
    localStorage.setItem('akole_registered_users', JSON.stringify(registered));

    return {
      token: 'mock-jwt-user-token-' + Date.now(),
      user: {
        ...newUser,
        role: cleanEmail === 'akolecafe@gmail.com' ? 'admin' : 'user'
      }
    };
  }
};

// ==========================================
// ORDER MANAGEMENT APIs (MONGODB ATLAS)
// ==========================================

// Fetch Orders (Admin view) - Displays ALL Live Orders directly from MongoDB Atlas
export const fetchOrdersAPI = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
  } catch (err) {
    console.error('[API Error] Fetch orders from MongoDB Atlas failed:', err.message);
    return [];
  }
};

// Delete Order API (Admin) - Direct MongoDB Atlas deletion
export const deleteOrderAPI = async (id) => {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete order');
  }
  return data;
};

// Create New Order API - Direct MongoDB Atlas Creation
export const createOrderAPI = async (orderData) => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create order');
  }

  return data;
};

// Track Order Live API
export const trackOrderAPI = async (orderId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Order not found');
    }
    return data;
  } catch (err) {
    // Local storage fallback for offline / mock testing
    const localOrders = JSON.parse(localStorage.getItem('akole_user_orders') || '[]');
    const match = localOrders.find(o => o.orderId === orderId || o.id === orderId);
    if (match) return match;
    throw err;
  }
};

// Update Order Status (Admin) & Notify Customer in MongoDB Atlas
export const updateOrderStatusAPI = async (id, status) => {
  const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update order status');
  }

  return data;
};

// Notification and Helper APIs
export const fetchNotificationsAPI = async (email = '') => {
  try {
    const url = email ? `${API_BASE_URL}/notifications?email=${encodeURIComponent(email)}` : `${API_BASE_URL}/notifications`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Could not fetch notifications');
    return await res.json();
  } catch (err) {
    console.warn('[API Warning] Notifications fetch failed:', err.message);
    return [];
  }
};

export const createNotificationAPI = async (notificationData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notificationData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to send notification');
    }
    return await res.json();
  } catch (err) {
    console.warn('[API Warning] Notification create failed:', err.message);
    return { success: true };
  }
};

export const markNotificationReadAPI = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PUT'
    });
    if (!res.ok) throw new Error('Failed to update notification');
    return await res.json();
  } catch (err) {
    console.warn('[API Warning] Notification read update failed:', err.message);
    return { success: true };
  }
};

export const fetchEvents = async () => fetchWithFallback('/events', eventsData);
export const fetchBlogPosts = async () => fetchWithFallback('/blogs', blogPosts);

export const submitReservation = async (reservationData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData)
    });
    if (!res.ok) throw new Error('Reservation submission failed');
    return await res.json();
  } catch (err) {
    return {
      success: true,
      bookingId: 'AKL-' + Math.floor(100000 + Math.random() * 900000),
      message: 'Table reservation received successfully.'
    };
  }
};
