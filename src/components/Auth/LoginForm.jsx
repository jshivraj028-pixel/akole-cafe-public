import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import RememberMe from './RememberMe';
import Divider from './Divider';
import SocialLogin from './SocialLogin';
import { useTheme } from '../../context/ThemeContext';
import { userLoginAPI } from '../../services/api';

const LoginForm = () => {
  const navigate = useNavigate();
  const { showToast, loginUser } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field, val) => {
    let err = '';
    if (field === 'email') {
      if (!val.trim()) {
        err = 'Email address or username is required';
      }
    }
    if (field === 'password') {
      if (!val) {
        err = 'Password is required';
      }
    }
    return err;
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateField('email', val) }));
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validateField('password', val) }));
    }
  };

  const handleBlur = (field, val) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
  };

  const validateAll = () => {
    const emailErr = validateField('email', email);
    const passwordErr = validateField('password', password);
    setErrors({ email: emailErr, password: passwordErr });
    setTouched({ email: true, password: true });
    return !emailErr && !passwordErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      showToast('Please fix the errors before signing in.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const data = await userLoginAPI(email, password);
      const cleanEmail = (email || '').toLowerCase().trim();
      const savedAvatar = localStorage.getItem(`akole_avatar_${cleanEmail}`);
      const userWithAvatar = {
        ...(data.user || {}),
        avatar: data.user?.avatar || savedAvatar || ''
      };

      localStorage.setItem('akole_token', data.token);
      localStorage.setItem('akole_user', JSON.stringify(userWithAvatar));
      loginUser(email, userWithAvatar);

      if (data.isAdmin || email.toLowerCase() === 'akolecafe@gmail.com') {
        localStorage.setItem('akole_admin_token', data.token);
        showToast('Admin Credentials Verified! Redirecting to Admin Panel...', 'success');
        navigate('/admin');
      } else {
        showToast(`Welcome, ${data.user?.name || 'Valued Guest'}! ☕`, 'success');
        navigate('/');
      }
    } catch (err) {
      showToast(err.message || 'Login failed. Please check email and password.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    showToast(`Redirecting to ${provider} Authentication...`, 'info');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left w-full" noValidate>
      
      {/* Email Address Pill Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
          EMAIL ADDRESS <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('email', email)}
            placeholder="Enter your email address"
            className={`w-full pl-11 pr-10 py-3.5 rounded-full bg-white/90 border-2 text-xs font-bold text-[#1E2621] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#1E2621]/15 transition-all duration-300 shadow-sm ${
              touched.email && errors.email ? 'border-red-500 bg-red-50' : touched.email && !errors.email ? 'border-emerald-500' : 'border-white hover:border-[#1E2621]/30'
            }`}
          />
          {touched.email && !errors.email && (
            <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
          )}
          {touched.email && errors.email && (
            <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
        </div>
        {touched.email && errors.email && (
          <p className="text-[10px] text-red-500 font-bold mt-1 pl-3">{errors.email}</p>
        )}
      </div>

      {/* Password Pill Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
          PASSWORD <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="login-password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur('password', password)}
            placeholder="Enter your password"
            className={`w-full pl-11 pr-10 py-3.5 rounded-full bg-white/90 border-2 text-xs font-bold text-[#1E2621] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#1E2621]/15 transition-all duration-300 shadow-sm ${
              touched.password && errors.password ? 'border-red-500 bg-red-50' : touched.password && !errors.password ? 'border-emerald-500' : 'border-white hover:border-[#1E2621]/30'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer p-0.5"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {touched.password && errors.password && (
          <p className="text-[10px] text-red-500 font-bold mt-1 pl-3">{errors.password}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <RememberMe
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
      />

      {/* FULL TRANSPARENT WHITE GLOSSY GLASS SIGN IN BUTTON WITH BLACK TEXT */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 rounded-full bg-white/80 hover:bg-white border-2 border-white shadow-md backdrop-blur-2xl text-[#1E2621] font-montserrat font-black text-xs uppercase tracking-[2.5px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4.5 h-4.5 animate-spin text-[#1E2621]" />
            <span>SIGNING IN...</span>
          </>
        ) : (
          <span>SIGN IN</span>
        )}
      </motion.button>

      {/* Divider */}
      <Divider text="OR" />

      {/* Social Login */}
      <SocialLogin
        onGoogleLogin={() => handleSocialLogin('Google')}
        onAppleLogin={() => handleSocialLogin('Apple')}
      />

      {/* Create Account Link */}
      <div className="text-center pt-2 text-xs font-montserrat text-[#556B5D]">
        <span>Don't have an account? </span>
        <Link to="/register" className="font-bold text-[#1E2621] hover:underline ml-1">
          Create Account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
