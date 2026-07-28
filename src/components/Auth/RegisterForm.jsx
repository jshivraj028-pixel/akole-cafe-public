import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SocialLogin from './SocialLogin';
import Divider from './Divider';
import { userRegisterAPI } from '../../services/api';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { loginUser, showToast } = useTheme();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Password strength logic (0-3)
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score += 1;
    return score;
  };

  const pwdStrength = getPasswordStrength(formData.password);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'fullName') {
      if (!value.trim()) error = 'Full Name is required';
      else if (value.trim().length < 3) error = 'Full Name must be at least 3 characters';
    }

    if (name === 'email') {
      if (!value.trim()) error = 'Email address is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email (e.g. vikram@example.com)';
    }

    if (name === 'phone') {
      if (value && value.trim() && !/^[0-9+\s-]{10,14}$/.test(value.trim())) {
        error = 'Please enter a valid 10-digit phone number';
      }
    }

    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 8) error = 'Password must be at least 8 characters long';
    }

    if (name === 'confirmPassword') {
      if (!value) error = 'Please confirm your password';
      else if (value !== formData.password) error = 'Passwords do not match';
    }

    if (name === 'agreeTerms') {
      if (!value) error = 'You must agree to the Terms & Conditions';
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const err = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }

    if (name === 'password' && touched.confirmPassword) {
      const confirmErr = formData.confirmPassword && val !== formData.confirmPassword ? 'Passwords do not match' : '';
      setErrors((prev) => ({ ...prev, confirmPassword: confirmErr }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, val);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      showToast('Please fix the errors in the form before submitting.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };
      const data = await userRegisterAPI(payload);
      localStorage.setItem('akole_token', data.token);
      localStorage.setItem('akole_user', JSON.stringify(data.user));
      loginUser(formData.email);

      if (data.isAdmin || formData.email.toLowerCase() === 'akolecafe@gmail.com') {
        localStorage.setItem('akole_admin_token', data.token);
        showToast('Admin Account Created! Redirecting to Admin Panel...', 'success');
        navigate('/admin');
      } else {
        showToast('Account created successfully! Welcome to Akole Cafe VIP Club 🎉', 'success');
        navigate('/');
      }
    } catch (err) {
      if (err.message.includes('already exists') || err.message.includes('Email')) {
        setErrors((prev) => ({ ...prev, email: 'Email already exists.' }));
        setTouched((prev) => ({ ...prev, email: true }));
      }
      showToast(err.message || 'Registration failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left w-full" noValidate>
      
      {/* Full Name Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Vikramaditya Shinde"
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/40 dark:bg-[#0F1712]/40 backdrop-blur-xs border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:bg-white/95 dark:focus:bg-[#16231B]/95 focus:ring-4 focus:ring-[#D6AE4D]/15 transition-all duration-300 ${
              touched.fullName && errors.fullName ? 'border-red-500 bg-red-50/20' : touched.fullName && !errors.fullName ? 'border-emerald-500' : 'border-[#D6AE4D]/35 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D]/60'
            }`}
          />
          {touched.fullName && !errors.fullName && (
            <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
          )}
          {touched.fullName && errors.fullName && (
            <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
        </div>
        {touched.fullName && errors.fullName && (
          <p className="text-[10px] text-red-500 font-medium mt-1 flex items-center gap-1">
            <span>{errors.fullName}</span>
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
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

      {/* Phone Number Input (Optional) */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Phone Number <span className="text-gray-400 font-normal lowercase tracking-normal text-[10px]">(optional)</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+91 98765 43210"
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/40 dark:bg-[#0F1712]/40 backdrop-blur-xs border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:bg-white/95 dark:focus:bg-[#16231B]/95 focus:ring-4 focus:ring-[#D6AE4D]/15 transition-all duration-300 ${
              touched.phone && errors.phone ? 'border-red-500 bg-red-50/20' : touched.phone && !errors.phone ? 'border-emerald-500' : 'border-[#D6AE4D]/35 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D]/60'
            }`}
          />
          {touched.phone && !errors.phone && (
            <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
          )}
          {touched.phone && errors.phone && (
            <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
        </div>
        {touched.phone && errors.phone && (
          <p className="text-[10px] text-red-500 font-medium mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Password Input & Strength Bar */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
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

        {/* Live Password Strength Meter */}
        {formData.password && (
          <div className="mt-1.5 space-y-1">
            <div className="flex gap-1 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full flex-1 transition-all ${pwdStrength >= 1 ? (pwdStrength === 1 ? 'bg-red-500' : pwdStrength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'}`} />
              <div className={`h-full flex-1 transition-all ${pwdStrength >= 2 ? (pwdStrength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'}`} />
              <div className={`h-full flex-1 transition-all ${pwdStrength >= 3 ? 'bg-emerald-500' : 'bg-transparent'}`} />
            </div>
            <p className="text-[10px] text-[#8B9B90] font-medium flex justify-between">
              <span>Strength: {pwdStrength === 1 ? 'Weak' : pwdStrength === 2 ? 'Medium' : pwdStrength === 3 ? 'Strong 🔒' : ''}</span>
              <span>(Min 8 chars, 1 number, 1 symbol)</span>
            </p>
          </div>
        )}

        {touched.password && errors.password && (
          <p className="text-[10px] text-red-500 font-medium mt-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/40 dark:bg-[#0F1712]/40 backdrop-blur-xs border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:bg-white/95 dark:focus:bg-[#16231B]/95 focus:ring-4 focus:ring-[#D6AE4D]/15 transition-all duration-300 ${
              touched.confirmPassword && errors.confirmPassword ? 'border-red-500 bg-red-50/20' : touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'border-emerald-500' : 'border-[#D6AE4D]/35 dark:border-[#D6AE4D]/25 hover:border-[#D6AE4D]/60'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B9B90] hover:text-[#D6AE4D]"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="text-[10px] text-red-500 font-medium mt-1">{errors.confirmPassword}</p>
        )}
        {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <Check className="w-3 h-3" /> Passwords match
          </p>
        )}
      </div>

      {/* Terms Custom Checkbox */}
      <div className="pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer select-none text-[#6B7C70] dark:text-[#A0B0A5] hover:text-[#123524] dark:hover:text-white transition-colors group">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            onBlur={handleBlur}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center shrink-0 transform group-hover:scale-105 ${
              formData.agreeTerms
                ? 'bg-gradient-to-br from-[#D6AE4D] to-[#B89035] border-[#D6AE4D] shadow-md shadow-[#D6AE4D]/25 ring-2 ring-[#D6AE4D]/20'
                : touched.agreeTerms && errors.agreeTerms
                ? 'border-red-500 bg-red-50/20'
                : 'bg-white/90 dark:bg-[#16231B] border-[#D6AE4D]/50 group-hover:border-[#D6AE4D]'
            }`}
          >
            {formData.agreeTerms && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 600, damping: 22 }}
              >
                <Check className="w-3.5 h-3.5 stroke-[3.5] text-[#123524]" />
              </motion.div>
            )}
          </div>
          <span className="text-[11px] text-[#123524] dark:text-[#EAE3D2] select-none">
            I agree to the{' '}
            <a
              href="https://www.google.com/policies/terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D6AE4D] font-semibold underline hover:text-[#B89035] transition-colors"
            >
              Terms of Service
            </a>{' '}
            &{' '}
            <a
              href="https://www.google.com/policies/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D6AE4D] font-semibold underline hover:text-[#B89035] transition-colors"
            >
              Privacy Policy
            </a>
          </span>
        </label>
        {touched.agreeTerms && errors.agreeTerms && (
          <p className="text-[10px] text-red-500 font-medium mt-1 pl-7.5">{errors.agreeTerms}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D6AE4D] via-[#F0D588] to-[#B89035] hover:from-[#E5BC58] hover:via-[#FFF3C4] hover:to-[#C99D3B] text-[#0A1A12] font-montserrat font-extrabold text-xs uppercase tracking-[2px] shadow-lg shadow-[#D6AE4D]/25 border border-[#FFF5D6]/35 transition-all duration-300 flex items-center justify-center gap-2 mt-2 cursor-pointer"
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>CREATE ACCOUNT</span>
          </>
        )}
      </button>

      {/* Divider & Social Login */}
      <Divider />
      <SocialLogin />

      {/* Already Have Account Redirect */}
      <p className="text-center text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light pt-2">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#D6AE4D] hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
