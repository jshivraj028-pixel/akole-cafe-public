import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiAward, FiShoppingBag, FiUser, FiMapPin, FiClock, FiStar, FiCheck, FiTrash2, FiCoffee, FiTag } from 'react-icons/fi';
import { Crown } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const mockOrders = [
  {
    id: 'ORD-9842',
    date: 'July 20, 2026',
    items: ['Akole Signature Gold Latte (2)', 'Truffle Burrata Pizza (1)'],
    total: 1260,
    status: 'Completed'
  },
  {
    id: 'ORD-8912',
    date: 'July 14, 2026',
    items: ['Venetian Tiramisu (1)', 'Sahyadri Cold Brew (2)'],
    total: 900,
    status: 'Completed'
  }
];

const Profile = () => {
  const { wishlistItems, toggleWishlist, showToast, logoutUser, userEmail } = useTheme();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('wishlist');

  const handleLogout = () => {
    logoutUser();
    showToast('Logged out successfully', 'info');
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    showToast(`Added ${item.name} to Cart!`, 'success');
  };

  return (
    <>
      <PageBanner
        title="Guest Profile & Loyalty"
        subtitle="Manage Your VIP Rewards, Saved Favorites, & Past Orders"
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-secondary">
        <Container>
          {/* User VIP Badge Card */}
          <div className="glass-panel p-8 rounded-3xl border border-accent-gold/40 shadow-2xl bg-primary text-secondary mb-12 relative overflow-hidden">
            <div className="botanical-glow -top-10 -right-10 opacity-40" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5 text-center sm:text-left">
                <div className="w-20 h-20 rounded-full bg-gold-gradient text-primary flex items-center justify-center font-bold text-2xl shadow-gold shrink-0 border-2 border-secondary">
                  <Crown className="w-10 h-10 text-[#351E13]" />
                </div>
                <div>
                  <div className="inline-block px-3 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold text-[10px] uppercase font-bold tracking-widest border border-accent-gold/30 mb-1">
                    Gold Tier Member
                  </div>
                  <h2 className="font-serif text-3xl font-extrabold text-secondary">Vikramaditya Shinde</h2>
                  <p className="text-xs text-secondary/70 font-light mt-0.5">{userEmail || 'vikram@example.com'} • Akole, Maharashtra</p>
                </div>
              </div>

              {/* Points & Logout Card */}
              <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
                <div className="p-4 rounded-2xl bg-primary-dark/80 border border-accent-gold/40 text-center sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-secondary/70 block font-semibold">Available Loyalty Points</span>
                  <span className="font-serif text-3xl font-extrabold text-accent-gold block my-1">500 Gold Points</span>
                  <span className="text-[10px] text-accent-gold/80 block">Worth ₹ 250 on next order</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white font-montserrat font-bold text-[11px] uppercase tracking-wider border border-red-500/40 transition-all"
                >
                  Sign Out / Logout
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-3 border-b border-accent-gold/20 pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'wishlist'
                  ? 'bg-gold-gradient text-primary shadow-gold'
                  : 'bg-primary/40 text-secondary hover:text-accent-gold'
              }`}
            >
              <FiHeart /> Saved Wishlist ({wishlistItems.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-gold-gradient text-primary shadow-gold'
                  : 'bg-primary/40 text-secondary hover:text-accent-gold'
              }`}
            >
              <FiClock /> Order History
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'rewards'
                  ? 'bg-gold-gradient text-primary shadow-gold'
                  : 'bg-primary/40 text-secondary hover:text-accent-gold'
              }`}
            >
              <FiAward /> VIP Perks
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16 glass-card rounded-3xl border border-accent-gold/20">
                  <FiHeart className="w-12 h-12 text-accent-goldDark mx-auto mb-3 opacity-60" />
                  <h3 className="font-serif text-xl font-bold text-primary mb-1">Your Wishlist is Empty</h3>
                  <p className="text-xs text-dark/70 font-light mb-4">Save your favorite coffee brews and gourmet pizzas to quickly re-order anytime.</p>
                  <Button to="/menu" variant="gold" size="md">
                    Explore Menu
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="glass-card rounded-2xl overflow-hidden border border-accent-gold/20 p-4 flex gap-4 items-center justify-between"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-bold text-primary truncate">{item.name}</h4>
                        <span className="font-semibold text-accent-goldDark text-sm">₹{item.price}</span>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="py-1 px-3 rounded-lg bg-gold-gradient text-primary font-bold text-[11px] uppercase tracking-wider flex items-center gap-1"
                          >
                            <FiShoppingBag /> Add
                          </button>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
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

          {activeTab === 'orders' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              {mockOrders.map((ord) => (
                <div key={ord.id} className="glass-card p-6 rounded-2xl border border-accent-gold/20 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm font-bold text-primary">{ord.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-dark/70">{ord.items.join(', ')}</p>
                    <span className="text-[11px] text-dark/50 block mt-1">{ord.date}</span>
                  </div>
                  <span className="font-serif text-lg font-bold text-accent-goldDark">₹{ord.total}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-2xl border border-accent-gold/20 text-center flex flex-col items-center">
                <FiCoffee className="w-10 h-10 text-[#D6AE4D] mb-3" />
                <h4 className="font-serif text-lg font-bold text-primary">Free Birthday Brew</h4>
                <p className="text-xs text-dark/70 font-light mt-1">Claim your complimentary gold latte on your birthday month.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-accent-gold/20 text-center flex flex-col items-center">
                <FiTag className="w-10 h-10 text-[#D6AE4D] mb-3" />
                <h4 className="font-serif text-lg font-bold text-primary">15% Off VIP Discount</h4>
                <p className="text-xs text-dark/70 font-light mt-1">Use coupon code <strong className="text-accent-goldDark">AKOLE20</strong> at checkout.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-accent-gold/20 text-center flex flex-col items-center">
                <FiStar className="w-10 h-10 text-[#D6AE4D] mb-3" />
                <h4 className="font-serif text-lg font-bold text-primary">Priority Table Access</h4>
                <p className="text-xs text-dark/70 font-light mt-1">Skip waiting line on weekend live music evenings.</p>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Profile;
