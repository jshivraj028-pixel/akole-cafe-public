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
      localStorage.setItem('akole_token', data.token);
      localStorage.setItem('akole_user', JSON.stringify(data.user));
      loginUser(email);

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

  const handleForgotPassword = () => {
    showToast('Password reset link sent to your registered email.', 'info');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left w-full" noValidate>
      
      {/* Email Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('email', email)}
            placeholder="vikram@example.com"
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/40 dark:bg-[#0F1712]/40 backdrop-blur-xs border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:bg-white/95 dark:focus:bg-[#16231B]/95 focus:ring-4 focus:ring-[#D6AE4D]/15 transition-all duration-300 ${
              touched.email && errors.email ? 'border-red-500 bg-red-50/20' : touched.email && !errors.email ? 'border-emerald-500' : 'border-[#D6AE4D]/35 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D]/60'
            }`}
          />
          {touched.email && !errors.email && (
            <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
          )}
          {touched.email && errors.email && (
            <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
        </div>
        {touched.email && errors.email && (
          <p className="text-[10px] text-red-500 font-medium mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="login-password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur('password', password)}
            placeholder="••••••••"
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/40 dark:bg-[#0F1712]/40 backdrop-blur-xs border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:bg-white/95 dark:focus:bg-[#16231B]/95 focus:ring-4 focus:ring-[#D6AE4D]/15 transition-all duration-300 ${
              touched.password && errors.password ? 'border-red-500 bg-red-50/20' : touched.password && !errors.password ? 'border-emerald-500' : 'border-[#D6AE4D]/35 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D]/60'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B9B90] hover:text-[#D6AE4D]"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {touched.password && errors.password && (
          <p className="text-[10px] text-red-500 font-medium mt-1">{errors.password}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <RememberMe
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        onForgotPassword={handleForgotPassword}
      />

      {/* Primary Sign In Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] hover:from-[#E5BC58] hover:via-[#FFF3C4] hover:to-[#C99D3B] text-[#0A1A12] font-montserrat font-extrabold text-xs uppercase tracking-[2px] shadow-lg shadow-[#D6AE4D]/25 border border-[#FFF5D6]/35 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#0A1A12]" />
            <span>Signing In...</span>
          </>
        ) : (
          <span>Sign In</span>
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
      <div className="text-center pt-2 text-xs font-montserrat text-[#6B7C70] dark:text-[#A0B0A5]">
        <span>Don't have an account? </span>
        <Link to="/register" className="font-bold text-[#D6AE4D] hover:underline ml-1">
          Create Account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
