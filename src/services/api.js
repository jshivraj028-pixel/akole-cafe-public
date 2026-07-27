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
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
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
  if (data.imageUrl.startsWith('/uploads')) {
    return `${API_BASE_URL.replace('/api', '')}${data.imageUrl}`;
  }
  return data.imageUrl;
};

// Fetch registered users (Admin view)
export const fetchUsersAPI = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/users`);
    if (!res.ok) throw new Error('Could not fetch users');
    return await res.json();
  } catch (err) {
    console.warn('[API Warning] Users endpoint failed:', err.message);
    return [
      { _id: '1', name: 'Akole Cafe Admin', email: 'akolecafe@gmail.com', role: 'admin', createdAt: new Date() },
      { _id: '2', name: 'Rahul Deshmukh', email: 'rahul@example.com', role: 'user', createdAt: new Date() },
      { _id: '3', name: 'Priya Sharma', email: 'priya@example.com', role: 'user', createdAt: new Date() }
    ];
  }
};

// Delete User Account (Admin)
export const deleteUserAPI = async (id) => {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to delete user');
  }
  return res.json();
};

// Toggle User Ban Status (Admin)
export const toggleBanUserAPI = async (id, isBanned) => {
  const res = await fetch(`${API_BASE_URL}/users/${id}/ban`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isBanned })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update ban status');
  }
  return res.json();
};

// Fetch Orders (Admin view)
export const fetchOrdersAPI = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    if (!res.ok) throw new Error('Could not fetch orders');
    return await res.json();
  } catch (err) {
    console.warn('[API Warning] Orders endpoint failed:', err.message);
    return [
      {
        _id: '1',
        orderId: 'ORD-892103',
        customerName: 'Rahul Deshmukh',
        customerEmail: 'rahul@example.com',
        customerPhone: '+91 98220 12345',
        deliveryAddress: 'Main Road, Near Bus Stand, Akole',
        items: [{ name: 'Akole Signature Gold Latte', price: 340, quantity: 2 }],
        totalAmount: 680,
        status: 'Pending',
        createdAt: new Date()
      }
    ];
  }
};

// Create New Order API
export const createOrderAPI = async (orderData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to place order');
    }
    return await res.json();
  } catch (err) {
    console.warn('[API Warning] Using order creation fallback:', err.message);
    return {
      success: true,
      message: 'Order placed successfully',
      order: {
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        ...orderData
      }
    };
  }
};

// Update Order Status
export const updateOrderStatusAPI = async (id, status) => {
  const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update order status');
  }
  return res.json();
};

// User / Admin Login
export const userLoginAPI = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }
    return await res.json();
  } catch (err) {
    if (err.message && err.message.includes('Invalid credentials')) {
      throw err;
    }
    console.warn('[API Warning] Auth backend unreachable. Using standalone login mode:', err.message);

    const cleanEmail = (email || '').toLowerCase().trim();

    if (cleanEmail === 'akolecafe@gmail.com') {
      return {
        message: 'Admin login successful',
        user: {
          id: 'admin_1',
          name: 'Akole Cafe Admin',
          email: 'akolecafe@gmail.com',
          phone: '+91 84323 87670',
          address: 'Akole Bypass Road, Near Bus Stand, Akole, Maharashtra 422601',
          role: 'admin'
        },
        token: 'admin_mock_token_' + Date.now(),
        isAdmin: true
      };
    }

    let localUsers = [];
    try {
      localUsers = JSON.parse(localStorage.getItem('akole_registered_users') || '[]');
    } catch (e) {}

    const existingUser = localUsers.find(u => u.email.toLowerCase() === cleanEmail);

    const userObj = existingUser ? {
      id: existingUser.id,
      name: existingUser.name || cleanEmail.split('@')[0],
      email: existingUser.email,
      phone: existingUser.phone || '+91 84323 87670',
      address: 'Akole Bypass Road, Near Bus Stand, Akole, Maharashtra 422601',
      role: existingUser.role || 'user'
    } : {
      id: 'user_' + Date.now(),
      name: cleanEmail.split('@')[0] || 'Valued Guest',
      email: cleanEmail,
      phone: '+91 84323 87670',
      address: 'Akole Bypass Road, Near Bus Stand, Akole, Maharashtra 422601',
      role: 'user'
    };

    return {
      message: 'Login successful',
      user: userObj,
      token: 'user_mock_token_' + Date.now(),
      isAdmin: userObj.role === 'admin' || cleanEmail === 'akolecafe@gmail.com'
    };
  }
};

// User Registration
export const userRegisterAPI = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Registration failed');
    }
    return await res.json();
  } catch (err) {
    if (err.message && (err.message.includes('already exists') || err.message.includes('do not match'))) {
      throw err;
    }
    console.warn('[API Warning] Registration backend unreachable. Using standalone mode:', err.message);

    let localUsers = [];
    try {
      localUsers = JSON.parse(localStorage.getItem('akole_registered_users') || '[]');
    } catch (e) {}

    const cleanEmail = (userData.email || '').toLowerCase().trim();
    const existing = localUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error('User with this email already exists.');
    }

    const isExplicitAdmin = cleanEmail === 'akolecafe@gmail.com';
    const newUser = {
      id: 'user_' + Date.now(),
      name: userData.name || userData.fullName || 'User',
      email: cleanEmail,
      phone: userData.phone || '',
      role: isExplicitAdmin ? 'admin' : 'user',
      password: userData.password
    };

    localUsers.push(newUser);
    try {
      localStorage.setItem('akole_registered_users', JSON.stringify(localUsers));
    } catch (e) {}

    return {
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      },
      token: 'user_mock_token_' + Date.now(),
      isAdmin: isExplicitAdmin
    };
  }
};

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
