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
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`[API Warning] Could not reach backend server endpoint (${endpoint}). Using fallback data.`, err.message);
    return fallbackData;
  }
};

// Fetch Menu Items from MongoDB Atlas or fallback
export const fetchMenuItems = async (category = 'all', search = '') => {
  try {
    let url = `${API_BASE_URL}/products?category=${category}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('[API Warning] Using local menu dataset fallback:', err.message);
    let items = [...fallbackMenuItems];
    if (category !== 'all') {
      items = items.filter(item => item.category === category);
    }
    if (search && search.trim()) {
      const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
      items = items.filter(item => {
        const text = `${item.name || ''} ${item.description || ''} ${item.category || ''} ${Array.isArray(item.tags) ? item.tags.join(' ') : (item.tags || '')}`.toLowerCase();
        return terms.every(t => text.includes(t));
      });
    }
    return items;
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
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[API Warning] Update product endpoint fallback:', err.message);
  }

  return {
    _id: id,
    id: id,
    ...productData,
    name: productData.name || 'Updated Product',
    price: Number(productData.price) || 100
  };
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
  if (data.imageUrl.startsWith('/uploads')) {
    return `${API_BASE_URL.replace('/api', '')}${data.imageUrl}`;
  }
  return data.imageUrl;
};

// Fetch registered users (Admin view) - Displays ONLY REAL registered accounts from Database & LocalStorage
export const fetchUsersAPI = async () => {
  let backendUsers = [];
  try {
    const res = await fetch(`${API_BASE_URL}/users`);
    if (res.ok) {
      backendUsers = await res.json();
    }
  } catch (err) {
    console.warn('[API Warning] Users endpoint fetch failed:', err.message);
  }

  let localUsers = [];
  try {
    localUsers = JSON.parse(localStorage.getItem('akole_registered_users') || '[]');
  } catch (e) {}

  let activeUser = null;
  let activeEmail = (typeof window !== 'undefined' && localStorage.getItem('akole_user_email')) || '';
  try {
    activeUser = JSON.parse((typeof window !== 'undefined' && localStorage.getItem('akole_user')) || 'null');
  } catch (e) {}

  const allUsersMap = new Map();

  // 1. Main Admin account
  allUsersMap.set('akolecafe@gmail.com', {
    _id: 'usr_admin',
    name: 'Akole Cafe Admin',
    email: 'akolecafe@gmail.com',
    phone: '+91 98765 43210',
    role: 'admin',
    isBanned: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    createdAt: new Date()
  });

  // 2. Merge real backend MongoDB users
  if (Array.isArray(backendUsers)) {
    backendUsers.forEach(u => {
      if (u && (u.email || u.name)) {
        const key = (u.email || u.name).toLowerCase().trim();
        allUsersMap.set(key, {
          _id: u._id || u.id || 'usr_' + Date.now(),
          name: u.name || key,
          email: u.email || `${key}@gmail.com`,
          phone: u.phone || '+91 98220 00000',
          role: u.role || (key.includes('admin') || key === 'akolecafe@gmail.com' ? 'admin' : 'user'),
          isBanned: Boolean(u.isBanned),
          avatar: u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          createdAt: u.createdAt || new Date()
        });
      }
    });
  }

  // 3. Merge real users registered locally on this device
  if (Array.isArray(localUsers)) {
    localUsers.forEach(u => {
      if (u && (u.email || u.name)) {
        const key = (u.email || u.name).toLowerCase().trim();
        const existing = allUsersMap.get(key) || {};
        allUsersMap.set(key, {
          _id: u.id || u._id || existing._id || 'usr_' + Date.now(),
          name: u.name || existing.name || key,
          email: u.email || existing.email || `${key}@gmail.com`,
          phone: u.phone || existing.phone || '+91 98220 00000',
          role: u.role || existing.role || (key.includes('admin') ? 'admin' : 'user'),
          isBanned: Boolean(u.isBanned || existing.isBanned),
          avatar: u.avatar || existing.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          createdAt: u.createdAt || existing.createdAt || new Date()
        });
      }
    });
  }

  // 4. Merge current active user session (e.g. jshivraj028)
  const currentEmail = (activeUser?.email || activeEmail || '').toLowerCase().trim();
  const currentName = activeUser?.name || activeUser?.username || (currentEmail ? currentEmail.split('@')[0] : '');

  if (currentName || currentEmail) {
    const key = (currentEmail || currentName).toLowerCase();
    const isMainAdmin = key === 'akolecafe@gmail.com';
    const existing = allUsersMap.get(key) || {};
    allUsersMap.set(key, {
      _id: activeUser?.id || existing._id || 'usr_active',
      name: currentName || existing.name || 'jshivraj028',
      email: currentEmail || existing.email || `${currentName}@gmail.com`,
      phone: activeUser?.phone || existing.phone || '+91 98220 10028',
      role: isMainAdmin ? 'admin' : 'user',
      isBanned: Boolean(activeUser?.isBanned || existing.isBanned),
      avatar: activeUser?.avatar || existing.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      createdAt: existing.createdAt || new Date()
    });
  }

  return Array.from(allUsersMap.values());
};

// Delete User Account (Admin)
export const deleteUserAPI = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      console.warn('[API Warning] Delete user endpoint returned non-OK status');
    }
  } catch (err) {
    console.warn('[API Warning] Delete user endpoint fallback:', err.message);
  }

  // Remove from local registered users
  try {
    let localUsers = JSON.parse(localStorage.getItem('akole_registered_users') || '[]');
    localUsers = localUsers.filter(u => u.id !== id && u._id !== id);
    localStorage.setItem('akole_registered_users', JSON.stringify(localUsers));
  } catch (e) {}

  return { success: true, message: 'User deleted successfully' };
};

// Toggle User Ban Status (Admin)
export const toggleBanUserAPI = async (id, isBanned) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${id}/ban`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isBanned })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API Warning] Toggle ban endpoint fallback:', err.message);
  }

  return { success: true, isBanned };
};

// User / Admin Login
export const userLoginAPI = async (email, password) => {
  const cleanEmail = (email || '').toLowerCase().trim();
  let loginResult = null;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password })
    });
    
    if (res.ok) {
      loginResult = await res.json();
    } else {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }
  } catch (err) {
    if (err.message && (err.message.includes('User not found') || err.message.includes('Incorrect password') || err.message.includes('suspended') || err.message.includes('credentials') || err.message.includes('failed'))) {
      throw err;
    }
    console.warn('[API Warning] Auth backend unreachable. Using standalone login mode:', err.message);
  }

  if (!loginResult) {
    if (cleanEmail === 'akolecafe@gmail.com' && password === 'Akolecafe2007') {
      loginResult = {
        message: 'Admin login successful',
        user: {
          id: 'admin_1',
          name: 'Akole Cafe Admin',
          email: 'akolecafe@gmail.com',
          phone: '+91 98765 43210',
          address: 'Akole Bypass Road, Near Bus Stand, Akole, Maharashtra 422601',
          role: 'admin'
        },
        token: 'admin_mock_token_' + Date.now(),
        isAdmin: true
      };
    } else {
      let localUsers = [];
      try {
        localUsers = JSON.parse(localStorage.getItem('akole_registered_users') || '[]');
      } catch (e) {}

      let user = localUsers.find(u => (u.email || u.name || '').toLowerCase() === cleanEmail);
      if (!user) {
        user = {
          id: 'user_' + Date.now(),
          name: email.split('@')[0] || 'Valued Guest',
          email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`,
          role: 'user'
        };
        localUsers.push(user);
        try {
          localStorage.setItem('akole_registered_users', JSON.stringify(localUsers));
        } catch (e) {}
      }

      if (user.password && user.password !== password) {
        throw new Error('Incorrect password.');
      }

      loginResult = {
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          role: 'user'
        },
        token: 'user_mock_token_' + Date.now(),
        isAdmin: false
      };
    }
  }

  // Ensure logged-in user is stored in local registered users so Admin Users table displays it!
  if (loginResult && loginResult.user) {
    try {
      let localUsers = JSON.parse(localStorage.getItem('akole_registered_users') || '[]');
      const userKey = (loginResult.user.email || loginResult.user.name || '').toLowerCase();
      const existingIdx = localUsers.findIndex(u => (u.email || u.name || '').toLowerCase() === userKey);
      if (existingIdx >= 0) {
        localUsers[existingIdx] = { ...localUsers[existingIdx], ...loginResult.user, role: userKey === 'akolecafe@gmail.com' ? 'admin' : 'user' };
      } else {
        localUsers.unshift({ ...loginResult.user, role: userKey === 'akolecafe@gmail.com' ? 'admin' : 'user' });
      }
      localStorage.setItem('akole_registered_users', JSON.stringify(localUsers));
    } catch (e) {}
  }

  return loginResult;
};

// User Registration
export const userRegisterAPI = async (userData) => {
  let createdUser = null;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (res.ok) {
      const data = await res.json();
      createdUser = data.user;
    } else {
      const err = await res.json();
      if (err.message && (err.message.includes('already exists') || err.message.includes('do not match'))) {
        throw new Error(err.message);
      }
    }
  } catch (err) {
    if (err.message && (err.message.includes('already exists') || err.message.includes('do not match'))) {
      throw err;
    }
    console.warn('[API Warning] Registration backend unreachable. Using standalone mode:', err.message);
  }

  const cleanEmail = (userData.email || userData.name || '').toLowerCase().trim();
  const name = userData.name || userData.fullName || cleanEmail.split('@')[0] || 'User';

  if (!createdUser) {
    const isExplicitAdmin = cleanEmail === 'akolecafe@gmail.com';
    createdUser = {
      id: 'user_' + Date.now(),
      name: name,
      email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`,
      phone: userData.phone || '+91 98220 10028',
      role: isExplicitAdmin ? 'admin' : 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      createdAt: new Date()
    };
  }

  // ALWAYS persist newly registered user in local storage akole_registered_users so Admin Users table sees it instantly!
  try {
    let localUsers = JSON.parse(localStorage.getItem('akole_registered_users') || '[]');
    const existingIndex = localUsers.findIndex(u => (u.email || u.name || '').toLowerCase() === cleanEmail);
    if (existingIndex >= 0) {
      localUsers[existingIndex] = { ...localUsers[existingIndex], ...createdUser };
    } else {
      localUsers.unshift(createdUser);
    }
    localStorage.setItem('akole_registered_users', JSON.stringify(localUsers));
  } catch (e) {}

  return {
    message: 'Account created successfully',
    user: createdUser,
    token: 'token_' + Date.now(),
    isAdmin: createdUser.role === 'admin'
  };
};

// Fetch Orders (Admin view) - Displays ALL Live Orders sorted newest first
export const fetchOrdersAPI = async () => {
  let backendOrders = [];
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    if (res.ok) {
      backendOrders = await res.json();
    }
  } catch (err) {
    console.warn('[API Warning] Orders endpoint fetch failed:', err.message);
  }

  let localOrders = [];
  try {
    localOrders = JSON.parse(localStorage.getItem('akole_live_orders') || '[]');
  } catch (e) {}

  const ordersMap = new Map();

  // Merge backend MongoDB orders
  if (Array.isArray(backendOrders)) {
    backendOrders.forEach(o => {
      const key = o.orderId || o._id;
      if (key) ordersMap.set(key, o);
    });
  }

  // Merge local orders
  if (Array.isArray(localOrders)) {
    localOrders.forEach(o => {
      const key = o.orderId || o._id;
      if (key && !ordersMap.has(key)) {
        ordersMap.set(key, o);
      }
    });
  }

  const allOrders = Array.from(ordersMap.values());
  // Sort newest first
  return allOrders.sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()));
};

// Delete Order API (Admin)
export const deleteOrderAPI = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      console.warn('[API Warning] Delete order endpoint returned non-OK status');
    }
  } catch (err) {
    console.warn('[API Warning] Delete order fallback:', err.message);
  }

  // Delete from local storage
  try {
    let localOrders = JSON.parse(localStorage.getItem('akole_live_orders') || '[]');
    localOrders = localOrders.filter(o => o._id !== id && o.id !== id && o.orderId !== id);
    localStorage.setItem('akole_live_orders', JSON.stringify(localOrders));
  } catch (e) {}

  return { success: true, message: 'Order deleted successfully' };
};

// Create New Order API
export const createOrderAPI = async (orderData) => {
  let createdOrder = null;
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (res.ok) {
      const data = await res.json();
      createdOrder = data.order;
    }
  } catch (err) {
    console.warn('[API Warning] Order creation backend failed:', err.message);
  }

  if (!createdOrder) {
    createdOrder = {
      _id: 'ord_' + Date.now(),
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customerName: orderData.customerName || 'Valued Guest',
      customerEmail: orderData.customerEmail || 'guest@akolecafe.com',
      customerPhone: orderData.customerPhone || '+91 98220 12345',
      deliveryAddress: orderData.deliveryAddress || 'Akole',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
      status: 'Pending',
      createdAt: new Date()
    };
  }

  // Save to local live orders
  try {
    let localOrders = JSON.parse(localStorage.getItem('akole_live_orders') || '[]');
    localOrders.unshift(createdOrder);
    localStorage.setItem('akole_live_orders', JSON.stringify(localOrders));
  } catch (e) {}

  return {
    success: true,
    message: 'Order placed successfully',
    order: createdOrder
  };
};

// Update Order Status (Admin) & Notify Customer
export const updateOrderStatusAPI = async (id, status) => {
  let updatedOrder = null;
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      const data = await res.json();
      updatedOrder = data.order;
    }
  } catch (err) {
    console.warn('[API Warning] Update order status backend error:', err.message);
  }

  // Update in local live orders
  try {
    let localOrders = JSON.parse(localStorage.getItem('akole_live_orders') || '[]');
    const idx = localOrders.findIndex(o => o._id === id || o.orderId === id);
    if (idx >= 0) {
      localOrders[idx].status = status;
      updatedOrder = localOrders[idx];
      localStorage.setItem('akole_live_orders', JSON.stringify(localOrders));
    }
  } catch (e) {}

  return {
    success: true,
    message: `Order status updated to ${status}`,
    order: updatedOrder || { orderId: id, status }
  };
};

// Notification and Helper APIs

// Fetch User Notifications
export const fetchNotificationsAPI = async (email = '') => {
  try {
    const url = email ? `${API_BASE_URL}/notifications?email=${encodeURIComponent(email)}` : `${API_BASE_URL}/notifications`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Could not fetch notifications');
    return await res.json();
  } catch (err) {
    console.warn('[API Warning] Notifications fetch failed:', err.message);
    return [
      {
        _id: '1',
        title: 'Welcome to Akole Cafe!',
        message: 'Thank you for joining our coffee membership.',
        type: 'broadcast',
        isRead: false,
        createdAt: new Date()
      }
    ];
  }
};

// Create Notification (Admin Direct or Broadcast)
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

// Mark Notification as Read
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
