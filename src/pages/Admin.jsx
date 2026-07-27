import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/common/Container';
import PageBanner from '../components/common/PageBanner';
import Button from '../components/common/Button';
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
  FiToggleRight
} from 'react-icons/fi';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('akole_admin_token') ? true : false;
  });
  const [adminEmail, setAdminEmail] = useState('akolecafe@gmail.com');
  const [adminPassword, setAdminPassword] = useState('Akolecafe2007');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'users' | 'orders'
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const data = await userLoginAPI(adminEmail, adminPassword);
      if (data.isAdmin || adminEmail.toLowerCase() === 'akolecafe@gmail.com') {
        localStorage.setItem('akole_admin_token', data.token);
        setIsLoggedIn(true);
        showToast('Welcome back, Admin!');
      } else {
        setLoginError('Access denied. Administrator privileges required.');
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid admin credentials');
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
            title: `🔥 Price Alert: ${updated.name}`,
            message: `Price for "${updated.name}" has been updated to ₹${updated.price}!`,
            type: 'price_change'
          });
        }

        showToast(`Product "${updated.name}" updated & price alert sent!`);
      } else {
        const created = await createProductAPI(payload);

        await createNotificationAPI({
          userEmail: 'ALL',
          title: `✨ New Arrival: ${created.name}`,
          message: `Check out our new artisanal menu item "${created.name}" for ₹${created.price}!`,
          type: 'price_change'
        });

        showToast(`Product "${created.name}" created & announcement sent!`);
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
        let statusEmoji = newStatus === 'Confirmed' ? '👍' : newStatus === 'Out for Delivery' ? '🛵' : newStatus === 'Delivered' ? '✅' : '❌';
        await createNotificationAPI({
          userEmail: targetOrder.customerEmail,
          title: `Order Status: ${newStatus} ${statusEmoji}`,
          message: `Your Order #${targetOrder.orderId || orderId} status has been updated to "${newStatus}".`,
          type: 'order_update',
          orderId: targetOrder.orderId || orderId
        });
      }

      showToast(`Order status updated to "${newStatus}" & notification sent!`);
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
      showToast(`User "${user.name}" is now ${newBanState ? 'Banned 🚫' : 'Active ✅'}`);
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
      showToast(`User account "${name}" deleted successfully.`);
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
        title: `🎁 Special Member Discount: ${discountCode}`,
        message: discountMsg,
        type: 'custom_admin'
      });
      showToast(`Discount coupon sent directly to ${discountUser.name}!`);
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

  // Filter users (Instant search for teammate & user accounts)
  const filteredUsers = users.filter(u => {
    if (!searchQuery || !searchQuery.trim()) return true;
    const terms = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const text = `${u.name || ''} ${u.email || ''} ${u.phone || ''} ${u.role || ''}`.toLowerCase();
    return terms.every(t => text.includes(t));
  });

  if (!isLoggedIn) {
    return (
      <>
        <PageBanner 
          title="Admin Control Center" 
          subtitle="Management Portal for Akole Cafe Products & Orders"
          bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
        />

        <section className="py-20 bg-primary text-secondary flex items-center justify-center min-h-[60vh]">
          <Container>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto p-8 rounded-2xl bg-secondary/10 border border-accent-gold/30 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gold-gradient text-primary flex items-center justify-center text-2xl mb-3 shadow-gold">
                  <FiLock />
                </div>
                <h2 className="font-serif text-2xl font-bold text-secondary">Admin Authorization</h2>
                <p className="text-sm text-secondary/70 mt-1">Please enter administrator credentials to proceed</p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <FiAlertCircle />
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-accent-gold mb-1">
                    Admin Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-primary/80 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold text-xs"
                    placeholder="akolecafe@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-accent-gold mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-primary/80 border border-accent-gold/20 text-secondary focus:outline-none focus:border-accent-gold text-xs"
                    placeholder="••••••••"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gold-gradient text-primary font-bold uppercase tracking-wider text-xs shadow-gold hover:opacity-90 transition-opacity"
                  >
                    Authenticate Access
                  </button>
                </div>
              </form>
            </motion.div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <PageBanner 
        title="Admin Control Center" 
        subtitle="Manage MongoDB Cloud Database • Active Products • Live Orders • Users"
        bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-xl border flex items-center gap-3 shadow-2xl backdrop-blur-xl ${
              toast.type === 'error' 
                ? 'bg-red-900/90 border-red-500 text-white' 
                : 'bg-emerald-900/90 border-emerald-500 text-white'
            }`}
          >
            {toast.type === 'error' ? <FiAlertCircle className="text-xl" /> : <FiCheckCircle className="text-xl" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-12 bg-primary text-secondary min-h-screen">
        <Container>
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-accent-gold/20">
            <div>
              <h1 className="font-serif text-3xl font-bold text-secondary">Akole Cafe Management Console</h1>
              <p className="text-xs text-accent-gold tracking-widest uppercase mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Connected to MongoDB Atlas Cloud Database
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                className="px-4 py-2 rounded-lg bg-secondary/10 border border-accent-gold/20 text-secondary hover:text-accent-gold text-xs flex items-center gap-2 transition-colors"
                title="Refresh Live Data"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh Data
              </button>
              <button
                onClick={() => window.location.href = '/home'}
                className="px-4 py-2 rounded-lg bg-accent-gold/20 border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/30 text-xs flex items-center gap-2 transition-colors"
                title="View Main Website"
              >
                🌐 View Main Website
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 text-xs flex items-center gap-2 transition-colors"
              >
                <FiLogOut /> Exit Session
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-secondary/10 border border-accent-gold/20 backdrop-blur-md flex items-center gap-4 shadow-luxury">
              <div className="w-14 h-14 rounded-xl bg-gold-gradient/20 text-accent-gold flex items-center justify-center text-2xl border border-accent-gold/30">
                <FiPackage />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-secondary/60">Total Products</p>
                <h3 className="font-serif text-3xl font-bold text-secondary">{products.length}</h3>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  {products.filter(p => p.isActive !== false).length} Active
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/10 border border-accent-gold/20 backdrop-blur-md flex items-center gap-4 shadow-luxury">
              <div className="w-14 h-14 rounded-xl bg-gold-gradient/20 text-accent-gold flex items-center justify-center text-2xl border border-accent-gold/30">
                <FiShoppingBag />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-secondary/60">Total Orders</p>
                <h3 className="font-serif text-3xl font-bold text-secondary">{orders.length}</h3>
                <span className="text-[10px] text-amber-400 font-semibold">
                  {orders.filter(o => o.status === 'Pending').length} Pending
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/10 border border-accent-gold/20 backdrop-blur-md flex items-center gap-4 shadow-luxury">
              <div className="w-14 h-14 rounded-xl bg-gold-gradient/20 text-accent-gold flex items-center justify-center text-2xl border border-accent-gold/30">
                <FiUsers />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-secondary/60">Registered Users</p>
                <h3 className="font-serif text-3xl font-bold text-secondary">{users.length}</h3>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/10 border border-accent-gold/20 backdrop-blur-md flex items-center gap-4 shadow-luxury">
              <div className="w-14 h-14 rounded-xl bg-gold-gradient/20 text-accent-gold flex items-center justify-center text-2xl border border-accent-gold/30">
                <FiStar />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-secondary/60">Bestseller Items</p>
                <h3 className="font-serif text-3xl font-bold text-secondary">
                  {products.filter(p => p.isBestseller).length}
                </h3>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-accent-gold/20 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-serif font-bold text-sm tracking-wider flex items-center gap-2 border-b-2 shrink-0 transition-all ${
                activeTab === 'products'
                  ? 'border-accent-gold text-accent-gold'
                  : 'border-transparent text-secondary/60 hover:text-secondary'
              }`}
            >
              <FiPackage /> Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-serif font-bold text-sm tracking-wider flex items-center gap-2 border-b-2 shrink-0 transition-all ${
                activeTab === 'orders'
                  ? 'border-accent-gold text-accent-gold'
                  : 'border-transparent text-secondary/60 hover:text-secondary'
              }`}
            >
              <FiShoppingBag /> Live Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-serif font-bold text-sm tracking-wider flex items-center gap-2 border-b-2 shrink-0 transition-all ${
                activeTab === 'users'
                  ? 'border-accent-gold text-accent-gold'
                  : 'border-transparent text-secondary/60 hover:text-secondary'
              }`}
            >
              <FiUsers /> Registered Customers ({users.length})
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
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50" />
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondary/10 border border-accent-gold/20 text-xs text-secondary focus:outline-none focus:border-accent-gold"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-secondary/10 border border-accent-gold/20 text-xs text-secondary focus:outline-none focus:border-accent-gold"
                  >
                    <option value="all" className="bg-primary text-secondary">All Categories</option>
                    {menuCategories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id} className="bg-primary text-secondary">
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
              <div className="overflow-x-auto rounded-2xl border border-accent-gold/20 bg-secondary/5 backdrop-blur-md shadow-luxury">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-accent-gold/20 bg-secondary/10 uppercase tracking-widest text-accent-gold">
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
                        <td colSpan="6" className="p-8 text-center text-secondary/60">
                          No products found. Click "Add New Product" to create one.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p._id || p.id} className="hover:bg-secondary/10 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 object-cover rounded-lg border border-accent-gold/20"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80';
                                }}
                              />
                              <div>
                                <div className="font-serif font-bold text-sm text-secondary">{p.name}</div>
                                <div className="text-secondary/60 text-[11px] line-clamp-1 max-w-xs">{p.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 capitalize text-accent-gold/90 font-medium">{p.category}</td>
                          <td className="p-4 font-bold text-sm">₹{p.price}</td>
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
                              {p.isActive !== false ? <FiCheck /> : <FiSlash />}
                              {p.isActive !== false ? 'Active' : 'Non-Active'}
                            </button>
                          </td>
                          <td className="p-4">
                            {p.isBestseller ? (
                              <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                                Yes 🔥
                              </span>
                            ) : (
                              <span className="text-secondary/40">No</span>
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
                          <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${
                            u.isBanned
                              ? 'bg-red-500/20 text-red-300 border-red-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}>
                            {u.isBanned ? 'Banned 🚫' : 'Active ✅'}
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
                              📩 Notify
                            </button>

                            {/* Send Discount Coupon Button */}
                            <button
                              onClick={() => openDiscountModal(u)}
                              className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-primary transition-all text-[11px] font-bold flex items-center gap-1"
                              title="Send direct discount coupon to this user"
                            >
                              🎁 Discount
                            </button>

                            {/* Ban / Unban Toggle Button */}
                            {u.email !== 'akolecafe@gmail.com' && (
                              <button
                                onClick={() => handleToggleUserBan(u)}
                                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 ${
                                  u.isBanned
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500 hover:text-white'
                                    : 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500 hover:text-white'
                                }`}
                                title={u.isBanned ? 'Unban user' : 'Ban user from logging in'}
                              >
                                {u.isBanned ? 'Unban ✅' : 'Ban 🚫'}
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

                  <Button type="submit" variant="gold" size="lg" className="w-full mt-3">
                    Send Discount Notification 🎁
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
    </>
  );
};

export default Admin;
