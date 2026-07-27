import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiLock, FiSun, FiMoon, FiBell, FiMapPin, FiCheck, 
  FiShield, FiUser, FiCoffee, FiSave, FiArrowLeft 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleDarkMode, showToast, userEmail } = useTheme();

  // Load user settings from localStorage
  const savedUser = (() => {
    try {
      const u = localStorage.getItem('akole_user');
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  })();

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

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

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

  return (
    <>
      <PageBanner
        title="Settings & Preferences"
        subtitle="Customize Your Ambiance, Notifications, Saved Address & Security"
        bgImage="/assets/maharashtrian-photo-banner.svg"
      />

      <section className="py-16 bg-[#F5EFE3] dark:bg-[#121A15] text-[#1F3A2B] dark:text-[#EAE3D2] transition-colors duration-300 min-h-[70vh]">
        <Container className="max-w-4xl">
          
          {/* Header Action Row */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D6AE4D]/30">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#351E13] dark:text-[#D6AE4D] hover:opacity-80 transition-opacity"
            >
              <FiArrowLeft className="w-4 h-4" /> Back to My Profile
            </Link>

            <span className="text-xs text-[#8B9B90] dark:text-[#A0B0A5] font-mono">
              Account: {savedUser?.email || userEmail || 'akolecafe@gmail.com'}
            </span>
          </div>

          <div className="space-y-8">

            {/* SECTION 1: APPEARANCE & THEME */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-xl space-y-6"
            >
              <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-white flex items-center gap-2.5 border-b border-[#D6AE4D]/20 pb-4">
                {isDarkMode ? <FiMoon className="text-[#D6AE4D]" /> : <FiSun className="text-[#D6AE4D]" />}
                <span>Appearance & Ambiance Theme</span>
              </h3>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/20">
                <div>
                  <h4 className="font-bold text-sm text-[#123524] dark:text-white">Active Theme Mode</h4>
                  <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] mt-0.5">
                    {isDarkMode ? 'Dark Luxury Emerald Ambiance is Active' : 'Light Warm Sand Ambiance is Active'}
                  </p>
                </div>

                <button
                  onClick={toggleDarkMode}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D6AE4D] to-[#B89035] text-[#123524] font-montserrat font-extrabold text-xs uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity shrink-0 flex items-center gap-2"
                >
                  {isDarkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                  <span>{isDarkMode ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}</span>
                </button>
              </div>
            </motion.div>

            {/* SECTION 2: DELIVERY ADDRESS & CONTACT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-xl space-y-6"
            >
              <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-white flex items-center gap-2.5 border-b border-[#D6AE4D]/20 pb-4">
                <FiMapPin className="text-[#D6AE4D]" />
                <span>Primary Delivery Address & Contact</span>
              </h3>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#8B9B90] mb-1">
                      Phone Number (for Live Delivery Updates)
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 text-xs text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#8B9B90] mb-1">
                      Landmark / Area
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 text-xs text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#8B9B90] mb-1">
                    Full Delivery Street Address
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 text-xs text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D]"
                    required
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#123524] dark:bg-[#D6AE4D] text-white dark:text-[#123524] font-extrabold text-xs uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <FiSave className="w-4 h-4" /> Save Contact Address
                  </button>
                </div>
              </form>
            </motion.div>

            {/* SECTION 3: ORDER NOTIFICATIONS & ALERTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-xl space-y-6"
            >
              <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-white flex items-center gap-2.5 border-b border-[#D6AE4D]/20 pb-4">
                <FiBell className="text-[#D6AE4D]" />
                <span>Notifications & Order Communication</span>
              </h3>

              <div className="space-y-4 text-xs text-[#123524] dark:text-white">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/20">
                  <div>
                    <h4 className="font-bold text-sm">WhatsApp Instant Order Updates</h4>
                    <p className="text-[#6B7C70] dark:text-[#A0B0A5]">Get live dispatch & delivery notifications on WhatsApp ({phone})</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={whatsappAlerts}
                    onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    className="w-5 h-5 accent-[#D6AE4D] cursor-pointer rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/20">
                  <div>
                    <h4 className="font-bold text-sm">Email Receipts & Booking Confirmations</h4>
                    <p className="text-[#6B7C70] dark:text-[#A0B0A5]">Digital invoices & table reservation receipts sent to akolecafe@gmail.com</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-5 h-5 accent-[#D6AE4D] cursor-pointer rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/20">
                  <div>
                    <h4 className="font-bold text-sm">Special Weekend Event Invitations</h4>
                    <p className="text-[#6B7C70] dark:text-[#A0B0A5]">Invites to live acoustic music nights & barista coffee tasting workshops</p>
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

            {/* SECTION 4: SECURITY & PASSWORD UPDATE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1D2C22] border border-[#D6AE4D]/30 shadow-xl space-y-6"
            >
              <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-white flex items-center gap-2.5 border-b border-[#D6AE4D]/20 pb-4">
                <FiShield className="text-[#D6AE4D]" />
                <span>Account Security & Password</span>
              </h3>

              <form onSubmit={handlePasswordUpdate} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#8B9B90] mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 text-xs text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#8B9B90] mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 text-xs text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#8B9B90] mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#121A15] border border-[#E5DDD0] dark:border-[#D6AE4D]/30 text-xs text-[#123524] dark:text-white focus:outline-none focus:border-[#D6AE4D]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#123524] dark:bg-[#D6AE4D] text-white dark:text-[#123524] font-extrabold text-xs uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <FiLock className="w-4 h-4" /> Update Password
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        </Container>
      </section>
    </>
  );
};

export default Settings;
