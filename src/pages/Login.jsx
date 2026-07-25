import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { userLoginAPI, userRegisterAPI } from '../services/api';
import { 
  FiLock, 
  FiMail, 
  FiUser, 
  FiPhone, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiArrowRight, 
  FiShield,
  FiCoffee 
} from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const [isLoginTab, setIsLoginTab] = useState(true);

  // Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const data = await userLoginAPI(loginEmail, loginPassword);
      
      localStorage.setItem('akole_token', data.token);
      localStorage.setItem('akole_user', JSON.stringify(data.user));

      if (data.isAdmin || loginEmail.toLowerCase() === 'akolecafe@gmail.com') {
        localStorage.setItem('akole_admin_token', data.token);
        setSuccessMsg('Admin Credentials Verified! Redirecting to Admin Panel...');
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        setSuccessMsg(`Welcome, ${data.user.name}! Unlocking Akole Cafe Experience...`);
        setTimeout(() => navigate('/home'), 1000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check email and password.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Password and Confirm Password do not match.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        confirmPassword: regConfirmPassword
      };

      const data = await userRegisterAPI(payload);
      
      localStorage.setItem('akole_token', data.token);
      localStorage.setItem('akole_user', JSON.stringify(data.user));

      if (data.isAdmin || regEmail.toLowerCase() === 'akolecafe@gmail.com') {
        localStorage.setItem('akole_admin_token', data.token);
        setSuccessMsg('Admin Account Created! Redirecting to Admin Panel...');
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        setSuccessMsg('Account created successfully! Welcome to Akole Cafe...');
        setTimeout(() => navigate('/home'), 1000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-primary text-secondary overflow-hidden px-4 py-12">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920&q=80')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60" />

      {/* Glow Orbs */}
      <div className="botanical-glow top-1/4 left-1/4 opacity-40 animate-pulse" />
      <div className="botanical-glow bottom-1/4 right-1/4 opacity-40 animate-pulse" />

      <div className="relative z-10 w-full max-w-md">
        {/* Cafe Logo Branding Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold-gradient text-primary flex items-center justify-center text-3xl mb-3 shadow-gold">
            <FiCoffee />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-widest text-secondary">
            AKOLE <span className="text-accent-gold font-light">CAFE</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-accent-gold/80 font-sans mt-1">
            Artisanal Culinary & Arabica Brews
          </p>
        </div>

        {/* Auth Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl bg-secondary/10 border border-accent-gold/30 backdrop-blur-2xl shadow-luxury relative"
        >
          {/* Header Tabs */}
          <div className="flex border-b border-accent-gold/20 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsLoginTab(true);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`w-1/2 py-3 text-center font-serif font-bold text-sm tracking-wider transition-all border-b-2 ${
                isLoginTab
                  ? 'border-accent-gold text-accent-gold'
                  : 'border-transparent text-secondary/60 hover:text-secondary'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLoginTab(false);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`w-1/2 py-3 text-center font-serif font-bold text-sm tracking-wider transition-all border-b-2 ${
                !isLoginTab
                  ? 'border-accent-gold text-accent-gold'
                  : 'border-transparent text-secondary/60 hover:text-secondary'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Toast Notification inside card */}
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-5 p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5"
              >
                <FiAlertCircle className="shrink-0 text-base" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-5 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5"
              >
                <FiCheckCircle className="shrink-0 text-base" />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOGIN FORM */}
          {isLoginTab ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-accent-gold font-medium uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/50 text-base" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-primary/90 border border-accent-gold/25 text-secondary focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="akolecafe@gmail.com or user@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-accent-gold font-medium uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/50 text-base" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-primary/90 border border-accent-gold/25 text-secondary focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-primary font-bold uppercase tracking-widest text-xs shadow-gold hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                  {loading ? 'Authenticating Access...' : 'Sign In & Enter'} <FiArrowRight />
                </button>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-accent-gold font-medium uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/50 text-base" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-primary/90 border border-accent-gold/25 text-secondary focus:outline-none focus:border-accent-gold"
                    placeholder="Rahul Deshmukh"
                  />
                </div>
              </div>

              <div>
                <label className="block text-accent-gold font-medium uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/50 text-base" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-primary/90 border border-accent-gold/25 text-secondary focus:outline-none focus:border-accent-gold"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-accent-gold font-medium uppercase tracking-wider mb-1">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/50 text-base" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-primary/90 border border-accent-gold/25 text-secondary focus:outline-none focus:border-accent-gold"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-accent-gold font-medium uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/50 text-base" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-primary/90 border border-accent-gold/25 text-secondary focus:outline-none focus:border-accent-gold"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-accent-gold font-medium uppercase tracking-wider mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/50 text-base" />
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-primary/90 border border-accent-gold/25 text-secondary focus:outline-none focus:border-accent-gold"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gold-gradient text-primary font-bold uppercase tracking-wider text-xs shadow-gold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {loading ? 'Creating Account...' : 'Create Account'} <FiArrowRight />
                </button>
              </div>
            </form>
          )}
        </motion.div>

        <div className="text-center mt-6">
          <p className="text-[11px] text-secondary/50">
            © 2026 Akole Cafe • Powered by MongoDB Atlas Cloud Infrastructure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
