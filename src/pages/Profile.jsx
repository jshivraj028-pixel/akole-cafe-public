import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHeart, 
  FiAward, 
  FiShoppingBag, 
  FiUser, 
  FiMapPin, 
  FiClock, 
  FiStar, 
  FiCheck, 
  FiTrash2, 
  FiLogOut, 
  FiPhone, 
  FiMail,
  FiArrowRight
} from 'react-icons/fi';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { fetchOrdersAPI } from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlist, showToast } = useTheme();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('wishlist');
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Load Logged-in user from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('akole_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('akole_token');
    localStorage.removeItem('akole_user');
    localStorage.removeItem('akole_admin_token');
    setCurrentUser(null);
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };

  // Fetch orders for current user
  useEffect(() => {
    if (currentUser && currentUser.email) {
      let isMounted = true;
      setLoadingOrders(true);
      fetchOrdersAPI()
        .then((orders) => {
          if (isMounted && Array.isArray(orders)) {
            const filtered = orders.filter(
              (o) => o.customerEmail?.toLowerCase() === currentUser.email?.toLowerCase()
            );
            setUserOrders(filtered.length > 0 ? filtered : orders);
          }
        })
        .catch((err) => console.error('Error fetching user orders:', err))
        .finally(() => {
          if (isMounted) setLoadingOrders(false);
        });
      return () => { isMounted = false; };
    }
  }, [currentUser]);

  const handleMoveToCart = (item) => {
    addToCart(item);
    showToast(`Added ${item.name} to Cart!`, 'success');
  };

  if (!currentUser) {
    return (
      <>
        <PageBanner
          title="Guest Member Profile"
          subtitle="Sign in to view your orders, loyalty points, and saved favorites"
          bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
        />

        <section className="py-20 bg-secondary text-center">
          <Container>
            <div className="max-w-md mx-auto p-8 rounded-3xl bg-primary text-secondary border border-accent-gold/30 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-gold-gradient text-primary flex items-center justify-center text-3xl mx-auto mb-4 shadow-gold">
                <FiUser />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">No Member Account Found</h2>
              <p className="text-xs text-secondary/70 mb-6 font-light">
                Please sign in to access your profile, order history, and saved wishlist items.
              </p>
              <Button to="/login" variant="gold" size="lg" icon={FiArrowRight}>
                Sign In / Create Account
              </Button>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <PageBanner
        title="Member Profile & Loyalty"
        subtitle="Manage Your VIP Rewards, Saved Favorites, & Order History"
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-secondary">
        <Container>
          {/* User VIP Badge Card */}
          <div className="glass-panel p-8 rounded-3xl border border-accent-gold/40 shadow-2xl bg-primary text-secondary mb-12 relative overflow-hidden">
            <div className="botanical-glow -top-10 -right-10 opacity-40" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5 text-center sm:text-left">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-accent-gold shadow-gold shrink-0"
                />
                <div>
                  <div className="inline-block px-3 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold text-[10px] uppercase font-bold tracking-widest border border-accent-gold/30 mb-1">
                    {currentUser.role === 'admin' ? 'Cafe Administrator' : 'Gold Tier Member'}
                  </div>
                  <h2 className="font-serif text-3xl font-extrabold text-secondary">{currentUser.name}</h2>
                  <p className="text-xs text-secondary/70 font-light mt-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="flex items-center gap-1"><FiMail /> {currentUser.email}</span>
                    {currentUser.phone && <span className="flex items-center gap-1">• <FiPhone /> {currentUser.phone}</span>}
                  </p>
                </div>
              </div>

              {/* Points & Logout Actions */}
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-primary-dark/80 border border-accent-gold/40 text-center sm:text-right shrink-0">
                  <span className="text-[10px] uppercase tracking-widest text-secondary/70 block font-semibold">
                    Available Loyalty Points
                  </span>
                  <span className="font-serif text-3xl font-extrabold text-accent-gold block my-1">
                    500 Gold Points
                  </span>
                  <span className="text-[10px] text-accent-gold/80 block">Worth ₹ 250 on next order</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-3.5 rounded-2xl bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/40 transition-colors flex items-center gap-2 text-xs font-bold shrink-0"
                  title="Sign Out"
                >
                  <FiLogOut className="text-base" /> Logout
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
              <FiClock /> Order History ({userOrders.length})
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

          {/* Tab Content 1: Wishlist */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16 glass-card rounded-3xl border border-accent-gold/20">
                  <FiHeart className="w-12 h-12 text-accent-goldDark mx-auto mb-3 opacity-60" />
                  <h3 className="font-serif text-xl font-bold text-primary mb-1">Your Wishlist is Empty</h3>
                  <p className="text-xs text-dark/70 font-light mb-4">
                    Save your favorite coffee brews and gourmet pizzas to quickly re-order anytime.
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

          {/* Tab Content 2: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              {loadingOrders ? (
                <div className="text-center py-10 font-serif text-sm text-primary/60 animate-pulse">
                  Loading order history...
                </div>
              ) : userOrders.length === 0 ? (
                <div className="text-center py-16 glass-card rounded-3xl border border-accent-gold/20">
                  <FiShoppingBag className="w-12 h-12 text-accent-goldDark mx-auto mb-3 opacity-60" />
                  <h3 className="font-serif text-xl font-bold text-primary mb-1">No Orders Placed Yet</h3>
                  <p className="text-xs text-dark/70 font-light mb-4">
                    Your past culinary & brew orders will appear here once placed.
                  </p>
                  <Button to="/menu" variant="gold" size="md">
                    Order Food Now
                  </Button>
                </div>
              ) : (
                userOrders.map((ord) => (
                  <div key={ord._id || ord.orderId} className="glass-card p-6 rounded-2xl border border-accent-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm font-bold text-primary">{ord.orderId}</span>
                        <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
                          ord.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          ord.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                          ord.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-800' :
                          ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {ord.status || 'Confirmed'}
                        </span>
                      </div>
                      <p className="text-xs text-dark/70">
                        {ord.items && ord.items.map((i) => `${i.name} (${i.quantity})`).join(', ')}
                      </p>
                      <span className="text-[11px] text-dark/50 block mt-1">
                        {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    <span className="font-serif text-xl font-bold text-accent-goldDark">₹{ord.totalAmount}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab Content 3: VIP Perks */}
          {activeTab === 'rewards' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-2xl border border-accent-gold/20 text-center">
                <span className="text-3xl mb-2 block">☕</span>
                <h4 className="font-serif text-lg font-bold text-primary">Free Birthday Brew</h4>
                <p className="text-xs text-dark/70 font-light mt-1">Claim your complimentary gold latte on your birthday month.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-accent-gold/20 text-center">
                <span className="text-3xl mb-2 block">🎟️</span>
                <h4 className="font-serif text-lg font-bold text-primary">15% Off VIP Discount</h4>
                <p className="text-xs text-dark/70 font-light mt-1">Use coupon code <strong className="text-accent-goldDark">AKOLE20</strong> at checkout.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-accent-gold/20 text-center">
                <span className="text-3xl mb-2 block">🌟</span>
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
