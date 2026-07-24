import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHeart, FiAward, FiShoppingBag, FiUser, FiMapPin, FiClock, 
  FiStar, FiCheck, FiTrash2, FiCoffee, FiTag, FiEdit3, FiLock, 
  FiPhone, FiMail, FiRefreshCw, FiCopy, FiLogOut 
} from 'react-icons/fi';
import { Crown, Sparkles, ShieldCheck } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const initialOrders = [
  {
    id: 'AKL-9842',
    date: 'July 20, 2026',
    items: [
      { name: 'Akole Signature Gold Latte', qty: 2, price: 380 },
      { name: 'Truffle Burrata Pizza', qty: 1, price: 500 }
    ],
    total: 1260,
    status: 'Delivered'
  },
  {
    id: 'AKL-8912',
    date: 'July 14, 2026',
    items: [
      { name: 'Venetian Tiramisu', qty: 1, price: 340 },
      { name: 'Sahyadri Cold Brew', qty: 2, price: 280 }
    ],
    total: 900,
    status: 'Delivered'
  }
];

const Profile = () => {
  const { wishlistItems, toggleWishlist, showToast, logoutUser, userEmail } = useTheme();
  const { addToCart } = useCart();
  
  const [activeTab, setActiveTab] = useState('wishlist');
  const [userName, setUserName] = useState('Vikramaditya Shinde');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userLocation, setUserLocation] = useState('Akole, Maharashtra');
  const [isEditing, setIsEditing] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState('');

  const handleLogout = () => {
    logoutUser();
    showToast('Logged out successfully', 'info');
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    showToast(`Added ${item.name} to Cart!`, 'success');
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    showToast(`Coupon ${code} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedCoupon(''), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Profile information updated successfully!', 'success');
  };

  return (
    <>
      <PageBanner
        title="Guest Profile & Loyalty"
        subtitle="Manage Your VIP Rewards, Saved Favorites, & Past Orders"
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-[#F5EFE3] dark:bg-[#121A15] text-[#1F3A2B] dark:text-[#EAE3D2] transition-colors duration-300">
        <Container>
          
          {/* User VIP Membership Card */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#123524] via-[#1A4330] to-[#0E291C] text-white p-8 sm:p-10 shadow-2xl border border-[#D6AE4D]/40 mb-12">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6AE4D]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              
              {/* Left User Info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D6AE4D] to-[#B89035] text-[#123524] flex items-center justify-center shadow-lg shrink-0 border-4 border-[#123524]">
                  <Crown className="w-12 h-12 text-[#123524]" />
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-[#D6AE4D]/20 text-[#D6AE4D] text-[11px] uppercase font-bold tracking-widest border border-[#D6AE4D]/40">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gold VIP Tier Member</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
                    {userName}
                  </h2>

                  <p className="text-xs sm:text-sm text-white/80 font-light flex items-center justify-center sm:justify-start gap-2">
                    <FiMail className="text-[#D6AE4D]" />
                    <span>{userEmail || 'vikram@example.com'}</span>
                    <span>•</span>
                    <FiMapPin className="text-[#D6AE4D]" />
                    <span>{userLocation}</span>
                  </p>
                </div>
              </div>

              {/* Right Points Card & Logout */}
              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <div className="p-5 rounded-2xl bg-[#0E291C]/90 border border-[#D6AE4D]/40 text-center sm:text-right shadow-inner">
                  <span className="text-[10px] uppercase tracking-[2px] text-white/70 block font-semibold">
                    AVAILABLE VIP POINTS
                  </span>
                  <span className="font-serif text-3xl font-extrabold text-[#D6AE4D] block my-0.5">
                    500 Gold Points
                  </span>
                  <span className="text-[11px] text-[#D6AE4D]/90 block font-light">
                    Worth ₹250 discount on next order
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-montserrat font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <FiEdit3 className="w-4 h-4 text-[#D6AE4D]" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-full bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white font-montserrat font-bold text-xs uppercase tracking-wider border border-red-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Edit Profile Form Collapsible Drawer */}
            <AnimatePresence>
              {isEditing && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSaveProfile}
                  className="mt-8 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-[#123524] border border-[#D6AE4D]/40 text-white text-xs focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-[#123524] border border-[#D6AE4D]/40 text-white text-xs focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">
                      Location / City
                    </label>
                    <input
                      type="text"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-[#123524] border border-[#D6AE4D]/40 text-white text-xs focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-1.5 rounded-full bg-[#D6AE4D] text-[#123524] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#c59d3c]"
                    >
                      Save Changes
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-3 border-b border-[#D6AE4D]/20 pb-4 mb-10 overflow-x-auto">
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'wishlist'
                  ? 'bg-[#D6AE4D] text-[#123524] shadow-md'
                  : 'bg-white/60 dark:bg-[#1D2C22] text-[#123524] dark:text-[#EAE3D2] hover:text-[#D6AE4D]'
              }`}
            >
              <FiHeart /> Saved Favorites ({wishlistItems.length})
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-[#D6AE4D] text-[#123524] shadow-md'
                  : 'bg-white/60 dark:bg-[#1D2C22] text-[#123524] dark:text-[#EAE3D2] hover:text-[#D6AE4D]'
              }`}
            >
              <FiClock /> Order History
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'rewards'
                  ? 'bg-[#D6AE4D] text-[#123524] shadow-md'
                  : 'bg-white/60 dark:bg-[#1D2C22] text-[#123524] dark:text-[#EAE3D2] hover:text-[#D6AE4D]'
              }`}
            >
              <FiAward /> VIP Perks & Offers
            </button>
          </div>

          {/* TAB 1: SAVED WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16 p-8 rounded-3xl bg-white/80 dark:bg-[#1D2C22] border border-[#D6AE4D]/20 max-w-lg mx-auto shadow-sm">
                  <FiHeart className="w-12 h-12 text-[#D6AE4D] mx-auto mb-3 opacity-60" />
                  <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-white mb-1">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light mb-6">
                    Save your favorite artisanal coffee brews and wood-fired pizzas to order anytime.
                  </p>
                  <Button to="/menu" variant="gold" size="md">
                    Explore Menu
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white dark:bg-[#1D2C22] border border-[#D6AE4D]/20 p-4 flex gap-4 items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-bold text-[#123524] dark:text-white truncate">
                          {item.name}
                        </h4>
                        <span className="font-semibold text-[#D6AE4D] text-sm block mt-0.5">
                          ₹{item.price}
                        </span>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="py-1 px-3 rounded-lg bg-[#D6AE4D] hover:bg-[#c59d3c] text-[#123524] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-sm"
                          >
                            <FiShoppingBag /> Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Remove"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              {initialOrders.map((ord) => (
                <div 
                  key={ord.id} 
                  className="rounded-2xl bg-white dark:bg-[#1D2C22] p-6 border border-[#D6AE4D]/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#123524] dark:text-[#D6AE4D]">
                        Order #{ord.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-semibold text-[10px] uppercase tracking-wider">
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light">
                      {ord.items.map((i) => `${i.name} (x${i.qty})`).join(', ')}
                    </div>
                    <span className="text-[11px] text-[#8B9B90] block">
                      Ordered on {ord.date}
                    </span>
                  </div>

                  <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center gap-2">
                    <span className="font-serif text-xl font-bold text-[#123524] dark:text-white">
                      ₹{ord.total}
                    </span>
                    <button
                      onClick={() => showToast(`Re-ordered items from ${ord.id}!`, 'success')}
                      className="px-3 py-1 rounded-full bg-[#123524] dark:bg-[#D6AE4D] text-white dark:text-[#123524] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
                    >
                      <FiRefreshCw className="w-3 h-3" /> Re-Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: VIP PERKS & OFFERS */}
          {activeTab === 'rewards' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              
              <div className="rounded-2xl bg-white dark:bg-[#1D2C22] p-6 border border-[#D6AE4D]/30 text-center flex flex-col items-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#D6AE4D]/15 flex items-center justify-center text-[#D6AE4D] mb-4">
                  <FiCoffee className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#123524] dark:text-white">
                  Free Birthday Brew
                </h4>
                <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light mt-2 mb-4">
                  Enjoy any handcrafted signature gold latte on your birthday month.
                </p>
                <button
                  onClick={() => handleCopyCoupon('BIRTHDAY2026')}
                  className="w-full py-2 rounded-xl bg-[#F5EFE3] dark:bg-[#121A15] text-[#123524] dark:text-[#D6AE4D] font-mono text-xs font-bold flex items-center justify-center gap-2 border border-[#D6AE4D]/40"
                >
                  <FiCopy /> {copiedCoupon === 'BIRTHDAY2026' ? 'COPIED!' : 'BIRTHDAY2026'}
                </button>
              </div>

              <div className="rounded-2xl bg-white dark:bg-[#1D2C22] p-6 border border-[#D6AE4D]/30 text-center flex flex-col items-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#D6AE4D]/15 flex items-center justify-center text-[#D6AE4D] mb-4">
                  <FiTag className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#123524] dark:text-white">
                  15% VIP Discount
                </h4>
                <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light mt-2 mb-4">
                  Get 15% discount on all online orders above ₹500.
                </p>
                <button
                  onClick={() => handleCopyCoupon('AKOLE20')}
                  className="w-full py-2 rounded-xl bg-[#F5EFE3] dark:bg-[#121A15] text-[#123524] dark:text-[#D6AE4D] font-mono text-xs font-bold flex items-center justify-center gap-2 border border-[#D6AE4D]/40"
                >
                  <FiCopy /> {copiedCoupon === 'AKOLE20' ? 'COPIED!' : 'AKOLE20'}
                </button>
              </div>

              <div className="rounded-2xl bg-white dark:bg-[#1D2C22] p-6 border border-[#D6AE4D]/30 text-center flex flex-col items-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#D6AE4D]/15 flex items-center justify-center text-[#D6AE4D] mb-4">
                  <FiStar className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#123524] dark:text-white">
                  Priority Table Reserve
                </h4>
                <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light mt-2 mb-4">
                  Skip waiting lists on weekend live acoustic music evenings.
                </p>
                <Button to="/reserve" variant="gold" size="sm" className="w-full text-xs">
                  Reserve Table
                </Button>
              </div>

            </div>
          )}

        </Container>
      </section>
    </>
  );
};

export default Profile;
