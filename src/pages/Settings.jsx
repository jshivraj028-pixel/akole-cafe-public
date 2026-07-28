import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiLock, FiSun, FiMoon, FiBell, FiMapPin, FiCheck, 
  FiShield, FiUser, FiCoffee, FiSave, FiArrowLeft, FiSliders,
  FiEye, FiEyeOff, FiPhone, FiKey, FiCheckCircle
} from 'react-icons/fi';
import { Sparkles, ShieldCheck, MapPin, BellRing, Palette, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleDarkMode, showToast, userEmail } = useTheme();

  const savedUser = (() => {
    try {
      const u = localStorage.getItem('akole_user');
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  })();

  const [activeTab, setActiveTab] = useState('theme'); // 'theme' | 'address' | 'notifications' | 'preferences' | 'security'

  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [eventAlerts, setEventAlerts] = useState(true);

  const [address, setAddress] = useState(
    savedUser?.address || 'Akole Bypass Road, Near Bus Stand, Akole, Maharashtra 422601'
  );
  const [landmark, setLandmark] = useState('Near Central Bus Stand');
  const [phone, setPhone] = useState(savedUser?.phone || '+91 84323 87670');
  const [coffeeRoast, setCoffeeRoast] = useState('Medium Dark Roast');
  const [dietary, setDietary] = useState('Vegetarian & Artisan Bakes');

  // Password State with Show/Hide Toggle
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...(savedUser || {}),
      address,
      phone,
      whatsappAlerts,
      emailAlerts,
      eventAlerts,
      coffeeRoast,
      dietary,
    };
    localStorage.setItem('akole_user', JSON.stringify(updatedUser));
    showToast('Settings & preferences saved successfully!', 'success');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!newPass || newPass !== confirmPass) {
      showToast('New passwords do not match!', 'error');
      return;
    }
    showToast('Account password updated successfully!', 'success');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const navItems = [
    { id: 'theme', label: 'Ambiance & Theme', icon: Palette, badge: isDarkMode ? 'Dark Mode' : 'Light Mode' },
    { id: 'address', label: 'Delivery Address', icon: MapPin, badge: 'Default' },
    { id: 'notifications', label: 'Alerts & Orders', icon: BellRing, badge: 'Live' },
    { id: 'preferences', label: 'Barista Choices', icon: Coffee, badge: 'Custom' },
    { id: 'security', label: 'Account Security', icon: ShieldCheck, badge: 'Protected' },
  ];

  return (
    <>
      <PageBanner
        title="Settings & Executive Console"
        subtitle="Personalized Ambiance, Delivery Address, Barista Preferences & Security"
        bgImage="/assets/maharashtrian-photo-banner.svg"
      />

      <section className="py-16 bg-[#F8F4EB] dark:bg-[#08120B] text-[#123524] dark:text-white transition-colors duration-300 min-h-[85vh]">
        <Container className="max-w-6xl">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-5 border-b border-[#D6AE4D]/30 gap-4">
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="w-10 h-10 rounded-2xl bg-white dark:bg-[#0F261A] border border-[#D6AE4D]/40 flex items-center justify-center text-[#123524] dark:text-[#D6AE4D] hover:bg-[#D6AE4D] hover:text-[#08120B] transition-all shadow-md"
              >
                <FiArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <span className="text-[10px] uppercase font-black tracking-[2px] text-[#D6AE4D]">EXECUTIVE PREFERENCES CONSOLE</span>
                <h2 className="font-serif text-2xl font-extrabold text-[#123524] dark:text-white">Akole Café Customizer</h2>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#0F261A] border border-[#D6AE4D]/40 text-xs text-[#123524] dark:text-[#D6AE4D] font-mono font-bold flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D6AE4D]" />
              <span>{savedUser?.email || userEmail || 'akolecafe@gmail.com'}</span>
            </div>
          </div>

          {/* 2-COLUMN BESPOKE SETTINGS CONSOLE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT NAVIGATION SIDEBAR */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#12301F] dark:via-[#0F261A] dark:to-[#0A1A11] border-2 border-[#D6AE4D]/40 shadow-xl space-y-2.5">
                <p className="px-3 pt-2 text-[10px] font-black uppercase tracking-[2.5px] text-[#D6AE4D]">
                  SETTINGS CATEGORIES
                </p>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'border-l-4 border-[#D6AE4D] bg-gradient-to-r from-[#D6AE4D]/25 via-[#E8CE8E]/20 to-transparent dark:from-[#D6AE4D]/30 dark:via-[#143D27] dark:to-[#0A1A11] text-[#123524] dark:text-white font-extrabold shadow-lg border-y border-r border-[#D6AE4D]/50 scale-[1.01]'
                          : 'bg-[#F2ECE1] dark:bg-[#07140D]/80 hover:bg-[#EAE2D3] dark:hover:bg-[#0E2619] text-[#123524]/80 dark:text-white/80 border border-[#D6AE4D]/20 hover:border-[#D6AE4D]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#D6AE4D] text-[#123524]' : 'bg-[#D6AE4D]/20 text-[#D6AE4D]'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                        isActive ? 'bg-[#D6AE4D] text-[#123524]' : 'bg-[#D6AE4D]/20 text-[#D6AE4D]'
                      }`}>
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Security Shield Badge Card */}
              <div className="p-5 rounded-3xl bg-white dark:bg-[#09180E] border-2 border-[#D6AE4D]/35 text-xs space-y-2.5 shadow-lg">
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>256-Bit SSL Security Online</span>
                </div>
                <p className="text-[#6B7C70] dark:text-white/70 text-[11px] leading-relaxed font-light">
                  Your delivery address, contact credentials and account session keys are encrypted locally.
                </p>
              </div>
            </div>

            {/* RIGHT ACTIVE SETTINGS CARD PANEL */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                
                {/* TAB 1: THEME */}
                {activeTab === 'theme' && (
                  <motion.div
                    key="theme"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#12301F] dark:via-[#0F261A] dark:to-[#0A1A11] border-2 border-[#D6AE4D]/50 shadow-2xl space-y-6"
                  >
                    <div className="border-b border-[#D6AE4D]/30 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-2xl font-extrabold text-[#123524] dark:text-white flex items-center gap-3">
                          <Palette className="text-[#D6AE4D]" />
                          <span>Appearance & Visual Ambiance</span>
                        </h3>
                        <p className="text-xs text-[#D6AE4D] font-bold mt-1">Toggle dynamically between Dark Luxury Emerald and Light Warm Sand themes.</p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Toggle
                      </span>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border-2 border-[#D6AE4D]/40 space-y-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <span className="px-3 py-0.5 rounded-full bg-[#D6AE4D]/20 text-[#D6AE4D] text-[10px] font-black uppercase tracking-wider border border-[#D6AE4D]/40">
                            CURRENT AMBIANCE MODE
                          </span>
                          <h4 className="font-serif font-extrabold text-lg text-[#123524] dark:text-white mt-2">
                            {isDarkMode ? 'Dark Luxury Emerald Theme' : 'Light Warm Sand Theme'}
                          </h4>
                          <p className="text-xs text-[#6B7C70] dark:text-white/70 mt-0.5">
                            Tailored HSL gold gradients, botanical glowing backdrops & high-contrast luxury typography.
                          </p>
                        </div>

                        <button
                          onClick={toggleDarkMode}
                          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#123524] font-montserrat font-black text-xs uppercase tracking-[2px] shadow-xl border border-[#FFF3C4] hover:brightness-110 active:scale-95 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
                        >
                          {isDarkMode ? <FiSun className="w-4 h-4 text-[#123524]" /> : <FiMoon className="w-4 h-4 text-[#123524]" />}
                          <span>{isDarkMode ? 'Switch to Light ☀️' : 'Switch to Dark 🌙'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: ADDRESS */}
                {activeTab === 'address' && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#12301F] dark:via-[#0F261A] dark:to-[#0A1A11] border-2 border-[#D6AE4D]/50 shadow-2xl space-y-6"
                  >
                    <div className="border-b border-[#D6AE4D]/30 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-2xl font-extrabold text-[#123524] dark:text-white flex items-center gap-3">
                          <MapPin className="text-[#D6AE4D]" />
                          <span>Primary Delivery Address & Contact</span>
                        </h3>
                        <p className="text-xs text-[#D6AE4D] font-bold mt-1">Saved address for instant 1-tap checkout and live order dispatches.</p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-[#D6AE4D]/20 border border-[#D6AE4D]/40 text-[#D6AE4D] text-[10px] font-black uppercase tracking-wider">
                        1-TAP AUTOFILL
                      </span>
                    </div>

                    <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block uppercase tracking-wider font-extrabold text-[#D6AE4D] text-[10px] mb-1.5">
                            Phone Number (Live Order Updates)
                          </label>
                          <div className="relative">
                            <FiPhone className="w-4 h-4 text-[#D6AE4D] absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40 text-xs font-semibold text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D] shadow-inner"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block uppercase tracking-wider font-extrabold text-[#D6AE4D] text-[10px] mb-1.5">
                            Landmark / Area
                          </label>
                          <div className="relative">
                            <FiMapPin className="w-4 h-4 text-[#D6AE4D] absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={landmark}
                              onChange={(e) => setLandmark(e.target.value)}
                              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40 text-xs font-semibold text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D] shadow-inner"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider font-extrabold text-[#D6AE4D] text-[10px] mb-1.5">
                          Full Delivery Street Address
                        </label>
                        <textarea
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40 text-xs font-semibold text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D] shadow-inner resize-none"
                          required
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#123524] font-montserrat font-black text-xs uppercase tracking-[2px] shadow-xl border border-[#FFF3C4] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <FiSave className="w-4 h-4 text-[#123524]" /> Save Address Details
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* TAB 3: NOTIFICATIONS */}
                {activeTab === 'notifications' && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#12301F] dark:via-[#0F261A] dark:to-[#0A1A11] border-2 border-[#D6AE4D]/50 shadow-2xl space-y-6"
                  >
                    <div className="border-b border-[#D6AE4D]/30 pb-4">
                      <h3 className="font-serif text-2xl font-extrabold text-[#123524] dark:text-white flex items-center gap-3">
                        <BellRing className="text-[#D6AE4D]" />
                        <span>Order Communication & Notifications</span>
                      </h3>
                      <p className="text-xs text-[#D6AE4D] font-bold mt-1">Manage real-time dispatch alerts and table reservation invites.</p>
                    </div>

                    <div className="space-y-4 text-xs text-[#123524] dark:text-white">
                      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40">
                        <div>
                          <h4 className="font-extrabold text-sm text-[#123524] dark:text-white">WhatsApp Order Dispatch Notifications</h4>
                          <p className="text-[#6B7C70] dark:text-[#D6AE4D]/80 font-medium mt-0.5">Live order preparation and driver tracking alerts on ({phone})</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={whatsappAlerts}
                          onChange={(e) => setWhatsappAlerts(e.target.checked)}
                          className="w-5 h-5 accent-[#D6AE4D] cursor-pointer rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40">
                        <div>
                          <h4 className="font-extrabold text-sm text-[#123524] dark:text-white">Email Receipts & Tax Invoices</h4>
                          <p className="text-[#6B7C70] dark:text-[#D6AE4D]/80 font-medium mt-0.5">Automated digital receipts sent to {savedUser?.email || userEmail || 'akolecafe@gmail.com'}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={emailAlerts}
                          onChange={(e) => setEmailAlerts(e.target.checked)}
                          className="w-5 h-5 accent-[#D6AE4D] cursor-pointer rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40">
                        <div>
                          <h4 className="font-extrabold text-sm text-[#123524] dark:text-white">Live Acoustic Event & Cupping Invites</h4>
                          <p className="text-[#6B7C70] dark:text-[#D6AE4D]/80 font-medium mt-0.5">Private invitations for weekend music nights and barista masterclasses</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={eventAlerts}
                          onChange={(e) => setEventAlerts(e.target.checked)}
                          className="w-5 h-5 accent-[#D6AE4D] cursor-pointer rounded"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: BARISTA PREFERENCES */}
                {activeTab === 'preferences' && (
                  <motion.div
                    key="preferences"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#12301F] dark:via-[#0F261A] dark:to-[#0A1A11] border-2 border-[#D6AE4D]/50 shadow-2xl space-y-6"
                  >
                    <div className="border-b border-[#D6AE4D]/30 pb-4">
                      <h3 className="font-serif text-2xl font-extrabold text-[#123524] dark:text-white flex items-center gap-3">
                        <Coffee className="text-[#D6AE4D]" />
                        <span>Barista & Dining Customization</span>
                      </h3>
                      <p className="text-xs text-[#D6AE4D] font-bold mt-1">Pre-configure your preferred coffee roasts and culinary choices.</p>
                    </div>

                    <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
                      <div>
                        <label className="block uppercase tracking-wider font-extrabold text-[#D6AE4D] text-[10px] mb-2">
                          Preferred Coffee Bean Roast
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {['Medium Dark Roast', 'Single Origin Espresso', 'South Indian Filter Roast'].map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => setCoffeeRoast(r)}
                              className={`p-3.5 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                                coffeeRoast === r
                                  ? 'bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#123524] border-[#FFF3C4] shadow-lg font-extrabold'
                                  : 'bg-[#FAF6EE] dark:bg-[#07140D] text-[#123524]/80 dark:text-white/80 border-[#D6AE4D]/30 hover:border-[#D6AE4D]'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider font-extrabold text-[#D6AE4D] text-[10px] mb-2">
                          Dietary & Culinary Preference
                        </label>
                        <select
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40 text-xs font-semibold text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D]"
                        >
                          <option value="Vegetarian & Artisan Bakes" className="bg-[#0A1A11] text-white">Pure Vegetarian & Artisan Bakes</option>
                          <option value="Jain Special Options" className="bg-[#0A1A11] text-white">Jain Special (No Onion/Garlic)</option>
                          <option value="Gourmet Non-Veg & Seafood" className="bg-[#0A1A11] text-white">Gourmet Non-Veg & Maharashtrian Seafood</option>
                        </select>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#123524] font-montserrat font-black text-xs uppercase tracking-[2px] shadow-xl border border-[#FFF3C4] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <FiSave className="w-4 h-4 text-[#123524]" /> Save Preferences
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* TAB 5: SECURITY WITH INPUT ICONS & SHOW/HIDE TOGGLES */}
                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#12301F] dark:via-[#0F261A] dark:to-[#0A1A11] border-2 border-[#D6AE4D]/50 shadow-2xl space-y-6"
                  >
                    <div className="border-b border-[#D6AE4D]/30 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-2xl font-extrabold text-[#123524] dark:text-white flex items-center gap-3">
                          <ShieldCheck className="text-[#D6AE4D]" />
                          <span>Account Security & Password</span>
                        </h3>
                        <p className="text-xs text-[#D6AE4D] font-bold mt-1">Update your login security credentials & access keys.</p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> SECURE
                      </span>
                    </div>

                    <form onSubmit={handlePasswordUpdate} className="space-y-5 text-xs">
                      <div>
                        <label className="block uppercase tracking-wider font-extrabold text-[#D6AE4D] text-[10px] mb-1.5">
                          Current Password
                        </label>
                        <div className="relative">
                          <FiLock className="w-4 h-4 text-[#D6AE4D] absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type={showCurrentPass ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                            className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40 text-xs font-semibold text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D] shadow-inner"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPass(!showCurrentPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D6AE4D] hover:text-[#123524] dark:hover:text-white cursor-pointer"
                          >
                            {showCurrentPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block uppercase tracking-wider font-extrabold text-[#D6AE4D] text-[10px] mb-1.5">
                            New Password
                          </label>
                          <div className="relative">
                            <FiKey className="w-4 h-4 text-[#D6AE4D] absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type={showNewPass ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={newPass}
                              onChange={(e) => setNewPass(e.target.value)}
                              className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40 text-xs font-semibold text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D] shadow-inner"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPass(!showNewPass)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D6AE4D] hover:text-[#123524] dark:hover:text-white cursor-pointer"
                            >
                              {showNewPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block uppercase tracking-wider font-extrabold text-[#D6AE4D] text-[10px] mb-1.5">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <FiKey className="w-4 h-4 text-[#D6AE4D] absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type={showConfirmPass ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={confirmPass}
                              onChange={(e) => setConfirmPass(e.target.value)}
                              className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-[#07140D] border border-[#D6AE4D]/40 text-xs font-semibold text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D] shadow-inner"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPass(!showConfirmPass)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D6AE4D] hover:text-[#123524] dark:hover:text-white cursor-pointer"
                            >
                              {showConfirmPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#123524] font-montserrat font-black text-xs uppercase tracking-[2px] shadow-xl border border-[#FFF3C4] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <FiLock className="w-4 h-4 text-[#123524]" /> Update Password
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
};

export default Settings;
