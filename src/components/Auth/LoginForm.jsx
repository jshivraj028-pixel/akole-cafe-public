import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import AuthInput from './AuthInput';
import PasswordInput from './PasswordInput';
import RememberMe from './RememberMe';
import Divider from './Divider';
import SocialLogin from './SocialLogin';
import { useTheme } from '../../context/ThemeContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { showToast, loginUser } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!email) {
      errs.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email format (e.g. vikram@example.com).';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      loginUser(email);
      setIsLoading(false);
      showToast('Welcome to Akole Cafe ☕', 'success');
      navigate('/');
    }, 1200);
  };

  const handleSocialLogin = (provider) => {
    showToast(`Redirecting to ${provider} Authentication...`, 'info');
  };

  const handleForgotPassword = () => {
    showToast('Password reset link sent to your registered email.', 'info');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Email Input */}
      <AuthInput
        label="Email Address"
        id="login-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="vikram@example.com"
        error={errors.email}
      />

      {/* Password Input */}
      <PasswordInput
        label="Password"
        id="login-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        error={errors.password}
      />

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
        className="w-full py-3.5 px-6 rounded-full bg-[#123524] hover:bg-[#C8A96A] text-white hover:text-[#123524] font-montserrat font-bold text-xs uppercase tracking-[2px] shadow-md transition-all duration-300 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
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
        <Link to="/register" className="font-bold text-[#C8A96A] hover:underline ml-1">
          Create Account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
