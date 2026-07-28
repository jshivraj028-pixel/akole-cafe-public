import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/common/Container';
import PageBanner from '../components/common/PageBanner';
import Button from '../components/common/Button';
import logoEmblem from '../assets/logo-emblem.png';
import goldHeartLogo from '../assets/gold-heart-logo.png';
import { 
  fetchMenuItems, 
  createProductAPI, 
  updateProductAPI, 
  deleteProductAPI, 
  fetchUsersAPI, 
  deleteUserAPI,
  toggleBanUserAPI,
  fetchOrdersAPI,
  updateOrderStatusAPI,
  deleteOrderAPI,
  createNotificationAPI,
  userLoginAPI, 
  uploadImageAPI 
} from '../services/api';
import { menuCategories } from '../data/menu';
import { 
  FiPlus, 
  FiEdit3, 
  FiTrash2, 
  FiUsers, 
  FiPackage, 
  FiStar, 
  FiSearch, 
  FiUpload, 
  FiX, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiLock,
  FiLogOut,
  FiRefreshCw,
  FiShoppingBag,
  FiClock,
  FiTruck,
  FiCheck,
  FiSlash,
  FiToggleLeft,
  FiToggleRight,
  FiChevronLeft,
  FiChevronRight,
  FiAward,
  FiZap,
  FiGlobe,
  FiGift,
  FiTag,
  FiMail,
  FiEye,
  FiEyeOff,
  FiShield,
  FiKey
} from 'react-icons/fi';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('akole_admin_token') ? true : false;
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'users' | 'orders'
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'hot-coffee',
    description: '',
    price: '',
    rating: 4.8,
    image: '',
    prepTime: '10 mins',
    calories: '200 kcal',
    isBestseller: false,
    isActive: true,
    tags: ''
  });

  // Notification Toast
  const [toast, setToast] = useState(null);

  // Audit Activity History State
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [historyFilterType, setHistoryFilterType] = useState('ALL');
  const [activityLogs, setActivityLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('akole_admin_activity_logs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'LOG-INIT-1',
        timestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        actionType: 'SYSTEM',
        actionLabel: 'System Live',
        targetItem: 'Akole Cafe Database',
        details: 'Admin console connected live to MongoDB Cloud Database',
        badgeColor: 'bg-[#D6AE4D]/20 text-[#D6AE4D] border-[#D6AE4D]/40',
        adminEmail: 'akolecafe@gmail.com'
      }
    ];
  });

  const logActivity = (actionType, actionLabel, targetItem, details, badgeColor = 'bg-[#D6AE4D]/20 text-[#D6AE4D] border-[#D6AE4D]/40') => {
    const newEntry = {
      id: 'LOG-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      actionType,
      actionLabel,
      targetItem,
      details,
      badgeColor,
      adminEmail: localStorage.getItem('akole_admin_email') || 'akolecafe@gmail.com'
    };

    setActivityLogs(prev => {
      const updated = [newEntry, ...prev].slice(0, 150);
      try {
        localStorage.setItem('akole_admin_activity_logs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearActivityLogs = () => {
    if (!window.confirm('Are you sure you want to clear all activity history logs?')) return;
    setActivityLogs([]);
    try {
      localStorage.removeItem('akole_admin_activity_logs');
    } catch (e) {}
    showToast('Activity logs cleared successfully');
  };

  const filteredActivityLogs = activityLogs.filter(log => {
    const query = historySearchQuery.toLowerCase();
    const matchesSearch = 
      (log.targetItem || '').toLowerCase().includes(query) ||
      (log.details || '').toLowerCase().includes(query) ||
      (log.actionLabel || '').toLowerCase().includes(query) ||
      (log.adminEmail || '').toLowerCase().includes(query);
    
    if (historyFilterType === 'ALL') return matchesSearch;
    return matchesSearch && log.actionType === historyFilterType;
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const [productData, userData, orderData] = await Promise.all([
        fetchMenuItems('all'),
        fetchUsersAPI(),
        fetchOrdersAPI()
      ]);
      setProducts(productData || []);
      setUsers(userData || []);
      setOrders(orderData || []);
    } catch (err) {
      if (!isSilent) showToast('Error loading database items: ' + err.message, 'error');
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
      const interval = setInterval(() => {
        loadData(true);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  // Login handler with Executive Validation
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    // Executive Client-Side Validation
    const cleanEmail = adminEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail) {
      setLoginError('Admin email address is required.');
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setLoginError('Invalid email format. E.g. admin@akolecafe.com');
      return;
    }

    if (!adminPassword) {
      setLoginError('Password is required.');
      return;
    }

    if (adminPassword.length < 6) {
      setLoginError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoggingIn(true);

    try {
      const data = await userLoginAPI(cleanEmail, adminPassword);
      if (data.isAdmin || cleanEmail === 'akolecafe@gmail.com') {
        localStorage.setItem('akole_admin_token', data.token);
        localStorage.setItem('akole_admin_email', cleanEmail);
        setIsLoggedIn(true);
        showToast('Welcome back, Administrator!');
        logActivity('SYSTEM', 'Admin Login', cleanEmail, 'Successfully authenticated into Admin Control Console', 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40');
      } else {
        setLoginError('Access denied. Administrator privileges required.');
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid admin credentials. Please check your email and password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('akole_admin_token');
    setIsLoggedIn(false);
    showToast('Logged out successfully');
  };

  // Open modal for Create or Edit
  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'hot-coffee',
      description: '',
      price: '',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
      prepTime: '10 mins',
      calories: '200 kcal',
      isBestseller: false,
      isActive: true,
      tags: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      category: product.category || 'hot-coffee',
      description: product.description || '',
      price: product.price || '',
      rating: product.rating || 4.8,
      image: product.image || '',
      prepTime: product.prepTime || '10 mins',
      calories: product.calories || '200 kcal',
      isBestseller: Boolean(product.isBestseller),
      isActive: product.isActive !== undefined ? Boolean(product.isActive) : true,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags || '')
    });
    setIsModalOpen(true);
  };

  // Upload image handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const imageUrl = await uploadImageAPI(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast('Failed to upload image: ' + err.message, 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Toggle Product Active / Non-Active
  const handleToggleActive = async (product) => {
    try {
      const newStatus = !product.isActive;
      await updateProductAPI(product._id || product.id, { isActive: newStatus });
      showToast(`Product "${product.name}" is now ${newStatus ? 'Active' : 'Non-Active'}`);
      logActivity('TOGGLE', 'Status Toggled', product.name, `Product status changed to ${newStatus ? 'Active 🟢' : 'Hidden 🔴'}`, 'bg-blue-500/20 text-blue-300 border-blue-500/40');
      loadData();
    } catch (err) {
      showToast('Failed to toggle status: ' + err.message, 'error');
    }
  };

  // Submit Product Form (Create / Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
    };

    try {
      if (editingProduct) {
        const updated = await updateProductAPI(editingProduct._id || editingProduct.id, payload);
        
        if (editingProduct.price !== Number(formData.price)) {
          await createNotificationAPI({
            userEmail: 'ALL',
            title: `Price Alert: ${updated.name}`,
            message: `Price for "${updated.name}" has been updated to ₹${updated.price}!`,
            type: 'price_change'
          });
        }

        showToast(`Product "${updated.name}" updated & price alert sent!`);
        logActivity('UPDATE', 'Product Updated', updated.name, `Updated product details & set price to ₹${updated.price}`, 'bg-amber-500/20 text-amber-300 border-amber-500/40');
      } else {
        const created = await createProductAPI(payload);

        await createNotificationAPI({
          userEmail: 'ALL',
          title: `New Arrival: ${created.name}`,
          message: `Check out our new artisanal menu item "${created.name}" for ₹${created.price}!`,
          type: 'price_change'
        });

        showToast(`Product "${created.name}" created & announcement sent!`);
        logActivity('CREATE', 'Product Created', created.name, `Created new product in category "${created.category}" for ₹${created.price}`, 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40');
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  // Delete product
  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deleteProductAPI(id);
      showToast(`Product "${name}" deleted from database.`);
      logActivity('DELETE', 'Product Deleted', name, `Permanently deleted product (ID: ${id})`, 'bg-red-500/20 text-red-300 border-red-500/40');
      loadData();
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  // Change Order Status & Send Automatic Live Notification
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatusAPI(orderId, newStatus);
      
      const targetOrder = orders.find(o => (o._id === orderId || o.id === orderId || o.orderId === orderId));
      if (targetOrder && targetOrder.customerEmail) {
        await createNotificationAPI({
          userEmail: targetOrder.customerEmail,
          title: `Order Status: ${newStatus}`,
          message: `Your Order #${targetOrder.orderId || orderId} status has been updated to "${newStatus}".`,
          type: 'order_update',
          orderId: targetOrder.orderId || orderId
        });
      }

      showToast(`Order status updated to "${newStatus}" & notification sent!`);
      logActivity('ORDER_UPDATE', 'Order Status', `Order #${String(orderId).slice(-6)}`, `Status updated to "${newStatus}"`, 'bg-purple-500/20 text-purple-300 border-purple-500/40');
      loadData();
    } catch (err) {
      showToast('Failed to update status: ' + err.message, 'error');
    }
  };

  // Delete Order permanently
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to delete order #${orderId}?`)) return;
    try {
      await deleteOrderAPI(orderId);
      showToast(`Order #${orderId} deleted successfully.`);
      logActivity('ORDER_DELETE', 'Order Deleted', `Order #${String(orderId).slice(-6)}`, 'Permanently deleted customer order', 'bg-red-500/20 text-red-300 border-red-500/40');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to delete order', 'error');
    }
  };

  // User Management Actions (Ban, Delete, Send Discount)
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discountUser, setDiscountUser] = useState(null);
  const [discountCode, setDiscountCode] = useState('AKOLE25');
  const [discountMsg, setDiscountMsg] = useState('Enjoy an exclusive 25% discount on your next cafe order!');

  const handleToggleUserBan = async (user) => {
    if (user.email === 'akolecafe@gmail.com') {
      showToast('Main Administrator cannot be banned', 'error');
      return;
    }
    try {
      const newBanState = !user.isBanned;
      setUsers(prev => prev.map(u => (u._id === user._id || u.email === user.email) ? { ...u, isBanned: newBanState } : u));
      await toggleBanUserAPI(user._id || user.id, newBanState);
      window.dispatchEvent(new CustomEvent('akole_user_banned', {
        detail: { email: user.email, id: user._id || user.id, isBanned: newBanState }
      }));
      showToast(`User "${user.name}" is now ${newBanState ? 'Banned' : 'Active'}`);
      logActivity('USER_ACTION', newBanState ? 'User Banned' : 'User Unbanned', user.name, `Account status changed to ${newBanState ? 'Banned 🚫' : 'Active 🟢'}`, 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40');
      loadData(true);
    } catch (err) {
      showToast('Failed to update ban status: ' + err.message, 'error');
    }
  };

  const handleDeleteUser = async (id, name, email) => {
    if (email === 'akolecafe@gmail.com') {
      showToast('Main Administrator cannot be deleted', 'error');
      return;
    }
    if (!window.confirm(`Are you sure you want to permanently delete user "${name}"?`)) return;
    try {
      setUsers(prev => prev.filter(u => u._id !== id && u.id !== id && u.email !== email));
      await deleteUserAPI(id);
      window.dispatchEvent(new CustomEvent('akole_user_banned', {
        detail: { email: email, id: id, isDeleted: true }
      }));
      showToast(`User account "${name}" deleted successfully.`);
      logActivity('USER_ACTION', 'User Account Deleted', name, `Deleted customer account (${email})`, 'bg-red-500/20 text-red-300 border-red-500/40');
      loadData(true);
    } catch (err) {
      showToast('Delete user failed: ' + err.message, 'error');
    }
  };

  const openDiscountModal = (user) => {
    setDiscountUser(user);
    setDiscountCode('SPECIAL20');
    setDiscountMsg(`Hi ${user.name}! Enjoy an exclusive 20% discount on your next order.`);
    setIsDiscountModalOpen(true);
  };

  const handleSendDiscountSubmit = async (e) => {
    e.preventDefault();
    if (!discountUser) return;
    try {
      await createNotificationAPI({
        userEmail: discountUser.email,
        title: `Special Member Discount: ${discountCode}`,
        message: discountMsg,
        type: 'custom_admin'
      });
      showToast(`Discount coupon sent directly to ${discountUser.name}!`);
      logActivity('DISCOUNT', 'Discount Sent', discountUser.name, `Sent coupon "${discountCode}" to ${discountUser.email}`, 'bg-amber-500/20 text-amber-300 border-amber-500/40');
      setIsDiscountModalOpen(false);
    } catch (err) {
      showToast('Failed to send discount: ' + err.message, 'error');
    }
  };

  // Custom Direct Notification to Specific User
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [targetNotifUser, setTargetNotifUser] = useState(null);
  const [customNotifTitle, setCustomNotifTitle] = useState('');
  const [customNotifMsg, setCustomNotifMsg] = useState('');

  const openNotifModal = (user) => {
    setTargetNotifUser(user);
    setCustomNotifTitle(`Message from Akole Cafe Admin`);
    setCustomNotifMsg(`Hi ${user.name}, thank you for visiting Akole Cafe!`);
    setIsNotifModalOpen(true);
  };

  const handleSendCustomNotifSubmit = async (e) => {
    e.preventDefault();
    if (!targetNotifUser || !customNotifTitle || !customNotifMsg) return;
    try {
      await createNotificationAPI({
        userEmail: targetNotifUser.email,
        title: customNotifTitle,
        message: customNotifMsg,
        type: 'custom_admin'
      });
      showToast(`Notification sent directly to ${targetNotifUser.name}!`, 'success');
      setIsNotifModalOpen(false);
    } catch (err) {
      showToast('Failed to send notification: ' + err.message, 'error');
    }
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    let matchesSearch = true;
    if (searchQuery && searchQuery.trim()) {
      const terms = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
      const text = `${p.name || ''} ${p.description || ''} ${p.category || ''} ${Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '')}`.toLowerCase();
      matchesSearch = terms.every(t => text.includes(t));
    }
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Filter users (Instant search for teammate & user accounts)
  const filteredUsers = users.filter(u => {
    if (!searchQuery || !searchQuery.trim()) return true;
    const terms = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const text = `${u.name || ''} ${u.email || ''} ${u.phone || ''} ${u.role || ''}`.toLowerCase();
    return terms.every(t => text.includes(t));
  });

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen bg-[#070D09] text-[#EAE3D2] flex items-center justify-center p-4 overflow-hidden">
        {/* Subtle Background Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#D6AE4D]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[360px] mx-auto p-6 rounded-2xl bg-[#111A14]/95 border border-[#D6AE4D]/30 backdrop-blur-xl shadow-2xl shadow-black/90">
          {/* Header Logo & Title */}
          <div className="flex flex-col items-center text-center mb-6">
            {/* Executive Admin Crest Badge */}
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E2E23] via-[#122017] to-[#0A120D] border border-[#D6AE4D]/50 flex items-center justify-center shadow-xl shadow-[#D6AE4D]/15 mb-3 group hover:border-[#D6AE4D] transition-all">
              <FiShield className="w-7 h-7 text-[#D6AE4D] stroke-[1.8] group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#D6AE4D] text-[#0A140E] flex items-center justify-center text-[10px] font-black shadow-md">
                ★
              </span>
            </div>
            
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D6AE4D] mb-1 font-sans">
              Akole Cafe • Executive
            </span>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              Admin Console Access
            </h2>
            
            <p className="text-[11px] text-[#A0B0A5] mt-1 font-sans font-medium">
              Enter administrator credentials to unlock control center
            </p>
          </div>

          {/* Error Notification */}
          {loginError && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-2.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-[11px] flex items-center gap-2 shadow-sm"
            >
              <FiAlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="font-medium">{loginError}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Admin Email Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#D6AE4D] mb-1">
                Admin Email *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6AE4D]/70 w-3.5 h-3.5" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0A100C] border border-[#D6AE4D]/30 text-white placeholder-[#708075] focus:outline-none focus:border-[#D6AE4D] text-xs font-medium transition-all shadow-inner"
                  placeholder="Enter admin email address..."
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#D6AE4D] mb-1">
                Password *
              </label>
              <div className="relative">
                <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6AE4D]/70 w-3.5 h-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className={`w-full pl-9 pr-9 py-2 rounded-lg bg-[#0A100C] border border-[#D6AE4D]/30 text-white placeholder-[#708075] focus:outline-none focus:border-[#D6AE4D] text-xs font-medium transition-all shadow-inner ${
                    !showPassword ? 'font-mono tracking-[0.25em] text-[#D6AE4D] font-bold' : 'font-sans'
                  }`}
                  placeholder="Enter password..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0B0A5] hover:text-[#D6AE4D] transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-3.5 h-3.5" /> : <FiEye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Executive Metallic Gold Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E6C265] via-[#D6AE4D] to-[#B89035] hover:from-[#F3D685] hover:via-[#E6C265] hover:to-[#C99D3B] text-[#0A140E] font-extrabold uppercase tracking-[0.15em] text-xs shadow-lg shadow-[#D6AE4D]/25 border border-[#FFF3C4]/40 hover:shadow-xl hover:shadow-[#D6AE4D]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoggingIn ? (
                  <>
                    <FiRefreshCw className="w-4 h-4 animate-spin text-[#0A140E]" /> Authenticating...
                  </>
                ) : (
                  <>
                    <FiLock className="w-4 h-4 stroke-[2.2] text-[#0A140E] group-hover:scale-110 transition-transform" /> 
                    <span>AUTHENTICATE ACCESS</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 pt-3 border-t border-[#D6AE4D]/15 text-center">
            <p className="text-[10px] text-[#A0B0A5] font-medium tracking-wide flex items-center justify-center gap-1">
              <FiShield className="w-3 h-3 text-[#D6AE4D]" /> 256-Bit Encrypted Admin Console
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1510] text-[#EAE3D2]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-xl border flex items-center gap-3 shadow-2xl backdrop-blur-xl ${
              toast.type === 'error' 
                ? 'bg-red-950/90 border-red-500 text-white' 
                : 'bg-emerald-950/90 border-emerald-500 text-white'
            }`}
          >
            {toast.type === 'error' ? <FiAlertCircle className="text-xl" /> : <FiCheckCircle className="text-xl" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-8 bg-[#0D1510]">
        <Container>
          {/* Top Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#D6AE4D]/20">
            <div className="py-2">
              <h1 
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide block"
                style={{ lineHeight: '1.25', margin: '0 0 8px 0' }}
              >
                Akole Cafe Management Console
              </h1>
              
              {/* Executive Glass Capsule Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#16231B] border border-[#D6AE4D]/40 shadow-lg backdrop-blur-md mt-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-bold text-[#EAE3D2] tracking-wider uppercase font-sans">
                  Live Connected to <span className="text-[#D6AE4D]">MongoDB Cloud DB</span>
                </span>
              </div>
            </div>

            {/* Executive Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={loadData}
                className="px-4 py-2.5 rounded-xl bg-[#16231B] border border-[#D6AE4D]/30 text-[#EAE3D2] hover:bg-[#D6AE4D] hover:text-[#123524] hover:border-[#D6AE4D] hover:scale-105 active:scale-95 text-xs font-bold flex items-center gap-2 transition-all duration-200 shadow-lg group"
                title="Refresh Live Data"
              >
                <FiRefreshCw className={`w-4 h-4 text-[#D6AE4D] group-hover:text-[#123524] ${loading ? 'animate-spin' : ''}`} /> Refresh Data
              </button>
              
              <button
                onClick={() => window.location.href = '/home'}
                className="px-4 py-2.5 rounded-xl bg-[#D6AE4D]/15 border border-[#D6AE4D]/40 text-[#D6AE4D] hover:bg-[#D6AE4D] hover:text-[#123524] hover:scale-105 active:scale-95 text-xs font-bold flex items-center gap-2 transition-all duration-200 shadow-lg"
                title="View Main Website"
              >
                <FiGlobe className="w-4 h-4" /> View Main Website
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:scale-105 active:scale-95 text-xs font-bold flex items-center gap-2 transition-all duration-200 shadow-lg"
                title="Exit Session"
              >
                <FiLogOut className="w-4 h-4" /> Exit Session
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Card 1: Total Products */}
            <div 
              onClick={() => {
                setActiveTab('products');
                setSelectedCategory('all');
                setSearchQuery('');
                showToast('Viewing All Products');
              }}
              className="p-6 rounded-2xl bg-[#16231B] border border-[#D6AE4D]/30 backdrop-blur-md flex items-center gap-4 shadow-lg hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D6AE4D]/10 hover:border-[#D6AE4D] transition-all duration-300 cursor-pointer group"
              title="Click to view All Products"
            >
              <div className="w-14 h-14 rounded-xl bg-[#D6AE4D]/20 text-[#D6AE4D] flex items-center justify-center text-2xl border border-[#D6AE4D]/40 shrink-0 group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                <FiPackage />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A0B0A5] font-semibold">Total Products</p>
                <h3 className="font-sans text-3xl font-extrabold text-[#EAE3D2] mt-0.5">{products.length}</h3>
                <span className="text-[10px] text-emerald-400 font-bold">
                  {products.filter(p => p.isActive !== false).length} Active • Click to Open
                </span>
              </div>
            </div>

            {/* Card 2: Total Orders */}
            <div 
              onClick={() => {
                setActiveTab('orders');
                showToast('Viewing Live Customer Orders');
              }}
              className="p-6 rounded-2xl bg-[#16231B] border border-[#D6AE4D]/30 backdrop-blur-md flex items-center gap-4 shadow-lg hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D6AE4D]/10 hover:border-[#D6AE4D] transition-all duration-300 cursor-pointer group"
              title="Click to view Live Orders"
            >
              <div className="w-14 h-14 rounded-xl bg-[#D6AE4D]/20 text-[#D6AE4D] flex items-center justify-center text-2xl border border-[#D6AE4D]/40 shrink-0 group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                <FiShoppingBag />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A0B0A5] font-semibold">Total Orders</p>
                <h3 className="font-sans text-3xl font-extrabold text-[#EAE3D2] mt-0.5">{orders.length}</h3>
                <span className="text-[10px] text-amber-400 font-bold">
                  {orders.filter(o => o.status === 'Pending').length} Pending • Click to Open
                </span>
              </div>
            </div>

            {/* Card 3: Registered Users */}
            <div 
              onClick={() => {
                setActiveTab('users');
                showToast('Viewing Registered Customers');
              }}
              className="p-6 rounded-2xl bg-[#16231B] border border-[#D6AE4D]/30 backdrop-blur-md flex items-center gap-4 shadow-lg hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D6AE4D]/10 hover:border-[#D6AE4D] transition-all duration-300 cursor-pointer group"
              title="Click to view Registered Users"
            >
              <div className="w-14 h-14 rounded-xl bg-[#D6AE4D]/20 text-[#D6AE4D] flex items-center justify-center text-2xl border border-[#D6AE4D]/40 shrink-0 group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                <FiUsers />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A0B0A5] font-semibold">Registered Users</p>
                <h3 className="font-sans text-3xl font-extrabold text-[#EAE3D2] mt-0.5">{users.length}</h3>
                <span className="text-[10px] text-[#D6AE4D] font-bold">
                  Click to View Users
                </span>
              </div>
            </div>

            {/* Card 4: Bestseller Items */}
            <div 
              onClick={() => {
                setActiveTab('products');
                setSelectedCategory('all');
                setSearchQuery('bestseller');
                showToast('Filtering Bestseller Products');
              }}
              className="p-6 rounded-2xl bg-[#16231B] border border-[#D6AE4D]/30 backdrop-blur-md flex items-center gap-4 shadow-lg hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D6AE4D]/10 hover:border-[#D6AE4D] transition-all duration-300 cursor-pointer group"
              title="Click to filter Bestseller Products"
            >
              <div className="w-14 h-14 rounded-xl bg-[#D6AE4D]/20 text-[#D6AE4D] flex items-center justify-center text-2xl border border-[#D6AE4D]/40 shrink-0 group-hover:bg-[#D6AE4D] group-hover:text-[#123524] transition-all">
                <FiStar />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A0B0A5] font-semibold">Bestseller Items</p>
                <h3 className="font-sans text-3xl font-extrabold text-[#EAE3D2] mt-0.5">
                  {products.filter(p => p.isBestseller).length}
                </h3>
                <span className="text-[10px] text-amber-400 font-bold">
                  Click to Filter Bestsellers
                </span>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-[#D6AE4D]/20 mb-8 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-3 font-sans font-bold text-xs tracking-wider flex items-center gap-2 border-b-2 shrink-0 transition-all rounded-t-xl ${
                activeTab === 'products'
                  ? 'border-[#D6AE4D] text-[#D6AE4D] bg-[#16231B]'
                  : 'border-transparent text-[#A0B0A5] hover:text-[#EAE3D2] hover:bg-[#16231B]/40'
              }`}
            >
              <FiPackage className="w-4 h-4" /> Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-3 font-sans font-bold text-xs tracking-wider flex items-center gap-2 border-b-2 shrink-0 transition-all rounded-t-xl ${
                activeTab === 'orders'
                  ? 'border-[#D6AE4D] text-[#D6AE4D] bg-[#16231B]'
                  : 'border-transparent text-[#A0B0A5] hover:text-[#EAE3D2] hover:bg-[#16231B]/40'
              }`}
            >
              <FiShoppingBag className="w-4 h-4" /> Live Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-5 py-3 font-sans font-bold text-xs tracking-wider flex items-center gap-2 border-b-2 shrink-0 transition-all rounded-t-xl ${
                activeTab === 'users'
                  ? 'border-[#D6AE4D] text-[#D6AE4D] bg-[#16231B]'
                  : 'border-transparent text-[#A0B0A5] hover:text-[#EAE3D2] hover:bg-[#16231B]/40'
              }`}
            >
              <FiUsers className="w-4 h-4" /> Registered Customers ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-5 py-3 font-sans font-bold text-xs tracking-wider flex items-center gap-2 border-b-2 shrink-0 transition-all rounded-t-xl ${
                activeTab === 'history'
                  ? 'border-[#D6AE4D] text-[#D6AE4D] bg-[#16231B]'
                  : 'border-transparent text-[#A0B0A5] hover:text-[#EAE3D2] hover:bg-[#16231B]/40'
              }`}
            >
              <FiClock className="w-4 h-4" /> Activity History ({activityLogs.length})
            </button>
          </div>

          {/* TAB 1: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div>
              {/* Actions & Filters */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6AE4D]" />
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#16231B] border border-[#D6AE4D]/30 text-xs text-[#EAE3D2] placeholder-gray-400 focus:outline-none focus:border-[#D6AE4D] shadow-sm"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-[#16231B] border border-[#D6AE4D]/30 text-xs font-semibold text-[#EAE3D2] focus:outline-none focus:border-[#D6AE4D] cursor-pointer shadow-sm"
                  >
                    <option value="all" className="bg-[#121A15] text-[#EAE3D2]">All Categories</option>
                    {menuCategories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id} className="bg-[#121A15] text-[#EAE3D2]">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Button onClick={openCreateModal} variant="gold" size="sm" icon={FiPlus}>
                  Add New Product
                </Button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#D6AE4D]/30 bg-[#16231B] backdrop-blur-md shadow-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#D6AE4D]/30 bg-[#0F1712] uppercase tracking-widest text-[#D6AE4D] font-bold">
                      <th className="p-4">Item</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Bestseller</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-accent-gold/10">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-secondary/60 font-medium">
                          No products matching filters. Click "Add New Product" to create one.
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map((p) => (
                        <tr key={p._id || p.id} className="hover:bg-secondary/10 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 object-cover rounded-lg border border-accent-gold/20 shadow-sm"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80';
                                }}
                              />
                              <div>
                                <div className="font-serif font-bold text-sm text-secondary flex items-center gap-2">
                                  {p.name}
                                  {p.isVeg === false ? (
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-white shrink-0" title="Non-Veg" />
                                  ) : (
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white shrink-0" title="Pure Veg" />
                                  )}
                                </div>
                                <div className="text-secondary/60 text-[11px] line-clamp-1 max-w-xs">{p.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 uppercase text-accent-gold/90 font-bold tracking-wider text-[10px]">{p.category}</td>
                          <td className="p-4 font-bold text-sm text-secondary">₹{p.price}</td>
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleActive(p)}
                              className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all ${
                                p.isActive !== false
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-red-500/20 text-red-300 border border-red-500/40'
                              }`}
                              title="Click to toggle Active / Non-active status"
                            >
                              {p.isActive !== false ? <FiCheck className="w-3 h-3 text-emerald-400" /> : <FiSlash className="w-3 h-3 text-red-400" />}
                              {p.isActive !== false ? 'Active' : 'Hidden'}
                            </button>
                          </td>
                          <td className="p-4">
                            {p.isBestseller ? (
                              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 flex items-center gap-1.5 text-[10px] uppercase tracking-wider w-max">
                                <FiAward className="w-3 h-3 text-amber-400" />
                                Bestseller
                              </span>
                            ) : (
                              <span className="text-secondary/40 text-[11px]">Standard</span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditModal(p)}
                                className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 transition-colors"
                                title="Edit Product"
                              >
                                <FiEdit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p._id || p.id, p.name)}
                                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors"
                                title="Delete Product"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* High-Level Responsive Pagination Controls Bar */}
              {filteredProducts.length > 0 && (
                <div className="w-full mt-6 p-4 rounded-2xl border border-[#D6AE4D]/30 bg-[#16231B] shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#A0B0A5] font-medium text-center md:text-left">
                    Showing <span className="font-bold text-[#D6AE4D]">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                    <span className="font-bold text-[#D6AE4D]">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of{' '}
                    <span className="font-bold text-[#D6AE4D]">{filteredProducts.length}</span> items
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-xl bg-[#0F1712] border border-[#D6AE4D]/30 text-xs font-bold text-[#EAE3D2] hover:bg-[#D6AE4D] hover:text-[#123524] transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 shrink-0"
                    >
                      <FiChevronLeft className="w-4 h-4" /> Prev
                    </button>

                    {/* Responsive Page Numbers Pills */}
                    <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none py-1 no-scrollbar">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, idx) => {
                        let pageNum = idx + 1;
                        if (totalPages > 5 && currentPage > 3) {
                          pageNum = currentPage - 2 + idx;
                          if (pageNum > totalPages) pageNum = totalPages - (4 - idx);
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all shrink-0 ${
                              currentPage === pageNum
                                ? 'bg-[#D6AE4D] text-[#123524] shadow-md scale-105 border border-[#D6AE4D]'
                                : 'bg-[#0F1712] text-[#A0B0A5] hover:bg-[#1C2C22] hover:text-[#EAE3D2] border border-transparent'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-xl bg-[#0F1712] border border-[#D6AE4D]/30 text-xs font-bold text-[#EAE3D2] hover:bg-[#D6AE4D] hover:text-[#123524] transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 shrink-0"
                    >
                      Next <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="overflow-x-auto rounded-2xl border border-accent-gold/20 bg-secondary/5 backdrop-blur-md shadow-luxury">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-accent-gold/20 bg-secondary/10 uppercase tracking-widest text-accent-gold">
                    <th className="p-4">Order ID & Date</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status & Update</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-gold/10">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-secondary/60">
                        No orders recorded in database.
                      </td>
                    </tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o._id || o.orderId || o.id} className="hover:bg-secondary/10 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-accent-gold">{o.orderId || o._id}</div>
                          <div className="text-[11px] text-secondary/50">
                            {o.createdAt ? new Date(o.createdAt).toLocaleString() : 'Recent'}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-secondary">{o.customerName}</div>
                          <div className="text-[11px] text-secondary/60">{o.customerEmail || o.customerPhone}</div>
                          <div className="text-[10px] text-secondary/40 line-clamp-1 max-w-xs">{o.deliveryAddress}</div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {o.items && o.items.map((item, idx) => (
                              <div key={idx} className="text-secondary/80 text-[11px]">
                                • {item.name} <span className="text-accent-gold font-bold">x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-sm text-secondary">₹{o.totalAmount}</td>
                        <td className="p-4">
                          <select
                            value={o.status || 'Pending'}
                            onChange={(e) => handleOrderStatusChange(o._id || o.orderId || o.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                              o.status === 'Pending' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                              o.status === 'Confirmed' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                              o.status === 'Out for Delivery' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
                              o.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                              'bg-red-500/20 text-red-300 border-red-500/40'
                            }`}
                          >
                            <option value="Pending" className="bg-primary text-secondary">Pending</option>
                            <option value="Confirmed" className="bg-primary text-secondary">Confirmed</option>
                            <option value="Out for Delivery" className="bg-primary text-secondary">Out for Delivery</option>
                            <option value="Delivered" className="bg-primary text-secondary">Delivered</option>
                            <option value="Cancelled" className="bg-primary text-secondary">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteOrder(o._id || o.orderId || o.id)}
                            title="Delete Order Permanently"
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-all hover:scale-105"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: REGISTERED USERS LIST */}
          {activeTab === 'users' && (
            <div className="overflow-x-auto rounded-2xl border border-accent-gold/20 bg-secondary/5 backdrop-blur-md shadow-luxury">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-accent-gold/20 bg-secondary/10 uppercase tracking-widest text-accent-gold">
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-gold/10">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-secondary/60">
                        No registered users found in database.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u._id || u.email} className="hover:bg-secondary/10 transition-colors">
                        <td className="p-4 font-bold flex items-center gap-3 text-secondary">
                          <img 
                            src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'} 
                            alt={u.name} 
                            className="w-8 h-8 rounded-full border border-accent-gold/30"
                          />
                          {u.name}
                        </td>
                        <td className="p-4 text-secondary/80">{u.email}</td>
                        <td className="p-4 text-secondary/60">{u.phone || 'N/A'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${
                            u.email === 'akolecafe@gmail.com' || u.role === 'admin'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          }`}>
                            {u.email === 'akolecafe@gmail.com' ? 'admin' : (u.role || 'user')}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border flex items-center gap-1 w-max ${
                            u.isBanned
                              ? 'bg-red-500/20 text-red-300 border-red-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}>
                            {u.isBanned ? <FiLock className="w-3 h-3 text-red-400" /> : <FiCheckCircle className="w-3 h-3 text-emerald-400" />}
                            {u.isBanned ? 'Banned' : 'Active'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Send Direct Custom Notification Button */}
                            <button
                              onClick={() => openNotifModal(u)}
                              className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 hover:bg-blue-500 hover:text-white transition-all text-[11px] font-bold flex items-center gap-1"
                              title="Send direct message notification to this user"
                            >
                              <FiCheck className="w-3 h-3" /> Notify
                            </button>

                            {/* Send Discount Coupon Button */}
                            <button
                              onClick={() => openDiscountModal(u)}
                              className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-primary transition-all text-[11px] font-bold flex items-center gap-1.5 shadow-sm"
                              title="Send direct discount coupon to this user"
                            >
                              <FiGift className="w-3.5 h-3.5" /> Discount
                            </button>

                            {/* Ban / Unban Toggle Button */}
                            {u.email !== 'akolecafe@gmail.com' && (
                              <button
                                onClick={() => handleToggleUserBan(u)}
                                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
                                  u.isBanned
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500 hover:text-white'
                                    : 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500 hover:text-white'
                                }`}
                                title={u.isBanned ? 'Unban user' : 'Ban user from logging in'}
                              >
                                {u.isBanned ? (
                                  <>
                                    <FiCheckCircle className="w-3.5 h-3.5" /> Unban
                                  </>
                                ) : (
                                  <>
                                    <FiSlash className="w-3.5 h-3.5" /> Ban
                                  </>
                                )}
                              </button>
                            )}

                            {/* Delete User Button */}
                            {u.email !== 'akolecafe@gmail.com' && (
                              <button
                                onClick={() => handleDeleteUser(u._id || u.id, u.name, u.email)}
                                className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                                title="Permanently delete user account"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: AUDIT ACTIVITY HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Actions & Filters Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-[#D6AE4D]/30 bg-[#16231B] shadow-xl">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full sm:w-64">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6AE4D]" />
                    <input
                      type="text"
                      placeholder="Search activity logs..."
                      value={historySearchQuery}
                      onChange={(e) => setHistorySearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0F1712] border border-[#D6AE4D]/30 text-xs text-[#EAE3D2] placeholder-gray-400 focus:outline-none focus:border-[#D6AE4D]"
                    />
                  </div>

                  <select
                    value={historyFilterType}
                    onChange={(e) => setHistoryFilterType(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-[#0F1712] border border-[#D6AE4D]/30 text-xs font-semibold text-[#EAE3D2] focus:outline-none focus:border-[#D6AE4D] cursor-pointer"
                  >
                    <option value="ALL" className="bg-[#121A15]">All Actions ({activityLogs.length})</option>
                    <option value="CREATE" className="bg-[#121A15]">Product Created</option>
                    <option value="UPDATE" className="bg-[#121A15]">Product Updated</option>
                    <option value="TOGGLE" className="bg-[#121A15]">Status Toggled</option>
                    <option value="DELETE" className="bg-[#121A15]">Items Deleted</option>
                    <option value="ORDER_UPDATE" className="bg-[#121A15]">Orders Activity</option>
                    <option value="USER_ACTION" className="bg-[#121A15]">Users Activity</option>
                    <option value="DISCOUNT" className="bg-[#121A15]">Discounts Sent</option>
                  </select>
                </div>

                <button
                  onClick={clearActivityLogs}
                  className="px-4 py-2.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all text-xs font-bold flex items-center gap-2"
                  title="Clear all activity history logs"
                >
                  <FiTrash2 className="w-4 h-4" /> Clear Logs
                </button>
              </div>

              {/* Activity Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#D6AE4D]/20 bg-[#16231B] shadow-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#D6AE4D]/20 bg-[#0F1712] uppercase tracking-widest text-[#D6AE4D] font-bold">
                      <th className="p-4">Timestamp & Admin</th>
                      <th className="p-4">Action Type</th>
                      <th className="p-4">Target Item</th>
                      <th className="p-4">Details & Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D6AE4D]/10 text-[#EAE3D2]">
                    {filteredActivityLogs.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-gray-400 font-medium">
                          No activity history entries found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredActivityLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#1C2C22] transition-colors">
                          <td className="p-4 font-mono">
                            <div className="font-bold text-[#EAE3D2]">{log.formattedDate}</div>
                            <div className="text-[10px] text-[#A0B0A5]">{log.adminEmail || 'akolecafe@gmail.com'}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${log.badgeColor || 'bg-[#D6AE4D]/20 text-[#D6AE4D] border-[#D6AE4D]/40'}`}>
                              {log.actionLabel || log.actionType}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-white">
                            {log.targetItem}
                          </td>
                          <td className="p-4 text-xs text-[#A0B0A5] font-medium max-w-xs sm:max-w-md">
                            {log.details}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Container>

        {/* DISCOUNT COUPON MODAL */}
        <AnimatePresence>
          {isDiscountModalOpen && discountUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDiscountModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative z-10 w-full max-w-md bg-primary border border-accent-gold/40 rounded-3xl p-6 sm:p-8 text-secondary shadow-2xl"
              >
                <button
                  onClick={() => setIsDiscountModalOpen(false)}
                  className="absolute top-4 right-4 text-secondary/60 hover:text-accent-gold"
                >
                  <FiX className="w-6 h-6" />
                </button>

                <form onSubmit={handleSendDiscountSubmit} className="space-y-4 text-xs">
                  <div className="text-center mb-4">
                    <span className="text-xs uppercase tracking-widest text-accent-gold block font-semibold mb-1">
                      USER SPECIAL OFFER
                    </span>
                    <h3 className="font-serif text-xl font-bold text-secondary">
                      Send Discount to {discountUser.name}
                    </h3>
                    <p className="text-[11px] text-secondary/60">{discountUser.email}</p>
                  </div>

                  <div>
                    <label className="block text-accent-gold mb-1 font-medium uppercase tracking-wider">
                      Coupon Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                      className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary focus:outline-none focus:border-accent-gold uppercase font-mono font-bold"
                      placeholder="AKOLE25"
                    />
                  </div>

                  <div>
                    <label className="block text-accent-gold mb-1 font-medium uppercase tracking-wider">
                      Notification Message *
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={discountMsg}
                      onChange={(e) => setDiscountMsg(e.target.value)}
                      className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary focus:outline-none focus:border-accent-gold"
                      placeholder="Enter custom discount details..."
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" icon={FiGift} className="w-full mt-3">
                    Send Discount Notification
                  </Button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* DIRECT NOTIFICATION MODAL */}
        <AnimatePresence>
          {isNotifModalOpen && targetNotifUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsNotifModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative z-10 w-full max-w-md bg-primary border border-accent-gold/40 rounded-3xl p-6 sm:p-8 text-secondary shadow-2xl"
              >
                <button
                  onClick={() => setIsNotifModalOpen(false)}
                  className="absolute top-4 right-4 text-secondary/60 hover:text-accent-gold"
                >
                  <FiX className="w-6 h-6" />
                </button>

                <form onSubmit={handleSendCustomNotifSubmit} className="space-y-4 text-xs">
                  <div className="text-center mb-4">
                    <span className="text-xs uppercase tracking-widest text-accent-gold block font-semibold mb-1">
                      DIRECT CUSTOM NOTIFICATION
                    </span>
                    <h3 className="font-serif text-xl font-bold text-secondary">
                      Send Message to {targetNotifUser.name}
                    </h3>
                    <p className="text-[11px] text-secondary/60">{targetNotifUser.email}</p>
                  </div>

                  <div>
                    <label className="block text-accent-gold mb-1 font-medium uppercase tracking-wider">
                      Notification Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={customNotifTitle}
                      onChange={(e) => setCustomNotifTitle(e.target.value)}
                      className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary focus:outline-none focus:border-accent-gold font-bold"
                      placeholder="Message from Akole Cafe Admin"
                    />
                  </div>

                  <div>
                    <label className="block text-accent-gold mb-1 font-medium uppercase tracking-wider">
                      Notification Message *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={customNotifMsg}
                      onChange={(e) => setCustomNotifMsg(e.target.value)}
                      className="w-full bg-primary-dark/90 border border-accent-gold/30 rounded-xl py-2.5 px-4 text-xs text-secondary focus:outline-none focus:border-accent-gold leading-relaxed"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full mt-3">
                    Send Direct Notification 📩
                  </Button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* CREATE / EDIT PRODUCT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-primary border border-accent-gold/30 rounded-2xl p-6 text-secondary shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-accent-gold/20 mb-4">
                <h3 className="font-serif text-xl font-bold text-accent-gold">
                  {editingProduct ? 'Edit Product' : 'Create New Product'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="p-2 rounded-full hover:bg-secondary/10 text-secondary/70 hover:text-secondary"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-accent-gold mb-1 font-medium">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-secondary/10 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                      placeholder="e.g. Royal Cardamom Cappuccino"
                    />
                  </div>

                  <div>
                    <label className="block text-accent-gold mb-1 font-medium">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-secondary/10 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                    >
                      {menuCategories.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-primary text-secondary">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-accent-gold mb-1 font-medium">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-secondary/10 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                      placeholder="290"
                    />
                  </div>

                  <div>
                    <label className="block text-accent-gold mb-1 font-medium">Prep Time</label>
                    <input
                      type="text"
                      value={formData.prepTime}
                      onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-secondary/10 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                      placeholder="8 mins"
                    />
                  </div>

                  <div>
                    <label className="block text-accent-gold mb-1 font-medium">Calories</label>
                    <input
                      type="text"
                      value={formData.calories}
                      onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-secondary/10 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                      placeholder="180 kcal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-accent-gold mb-1 font-medium">Description *</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-secondary/10 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                    placeholder="Enter description of taste, ingredients, craftsmanship..."
                  />
                </div>

                {/* Photo Upload & Preview */}
                <div>
                  <label className="block text-accent-gold mb-1 font-medium">Product Image URL / File Upload</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-secondary/10 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <label className="cursor-pointer px-4 py-2.5 rounded-lg bg-gold-gradient text-primary font-bold text-xs flex items-center gap-2 shrink-0">
                      <FiUpload /> {uploadingImage ? 'Uploading...' : 'Upload Photo'}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-2 flex items-center gap-3">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-16 h-16 object-cover rounded-lg border border-accent-gold/30" 
                      />
                      <span className="text-[11px] text-secondary/60">Image Preview Ready</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 pt-4">
                    <input
                      type="checkbox"
                      id="isBestseller"
                      checked={formData.isBestseller}
                      onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                      className="w-4 h-4 rounded border-accent-gold text-accent-gold focus:ring-accent-gold accent-amber-500"
                    />
                    <label htmlFor="isBestseller" className="text-secondary font-medium cursor-pointer">
                      Mark as Featured Bestseller 🔥
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 rounded border-accent-gold text-accent-gold focus:ring-accent-gold accent-emerald-500"
                    />
                    <label htmlFor="isActive" className="text-secondary font-medium cursor-pointer">
                      Product Active / In Stock ✅
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-accent-gold/20">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="gold" size="sm">
                    {editingProduct ? 'Update Product' : 'Save Product'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
