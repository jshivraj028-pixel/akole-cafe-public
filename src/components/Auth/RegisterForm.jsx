import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SocialLogin from './SocialLogin';
import Divider from './Divider';
import LegalModal from '../common/LegalModal';
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
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'terms' });

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
      loginUser(formData.email, data.user);

      if (data.isAdmin || formData.email.toLowerCase() === 'akolecafe@gmail.com') {
        localStorage.setItem('akole_admin_token', data.token);
        showToast('Admin Account Created! Redirecting to Admin Panel...', 'success');
        navigate('/admin');
      } else {
        showToast('Account created successfully! Welcome to Akole Cafe VIP Club 🎉', 'success');
        navigate('/');
      }
    } catch (err) {
      const msg = err.message || 'Registration failed. Try a different email.';
      if (msg.includes('exists') || msg.includes('already')) {
        setErrors((prev) => ({ ...prev, email: 'An account with this email address already exists. Please sign in.' }));
        setTouched((prev) => ({ ...prev, email: true }));
      }
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left w-full font-montserrat" noValidate>
      
      {/* Full Name Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
          FULL NAME <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            className={`w-full pl-11 pr-10 py-3.5 rounded-full bg-white/90 border-2 text-xs font-bold text-[#1E2621] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#1E2621]/15 transition-all duration-300 shadow-sm ${
              touched.fullName && errors.fullName ? 'border-red-500 bg-red-50' : touched.fullName && !errors.fullName ? 'border-emerald-500' : 'border-white hover:border-[#1E2621]/30'
            }`}
          />
          {touched.fullName && !errors.fullName && (
            <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
          )}
          {touched.fullName && errors.fullName && (
            <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
        </div>
        {touched.fullName && errors.fullName && (
          <p className="text-[10px] text-red-500 font-bold mt-1 pl-3">{errors.fullName}</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
          EMAIL ADDRESS <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
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

      {/* Phone Number Input (Optional) */}
      <div>
        <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
          PHONE NUMBER <span className="text-gray-400 font-normal lowercase tracking-normal text-[10px]">(optional)</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter 10-digit mobile number"
            className={`w-full pl-11 pr-10 py-3.5 rounded-full bg-white/90 border-2 text-xs font-bold text-[#1E2621] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#1E2621]/15 transition-all duration-300 shadow-sm ${
              touched.phone && errors.phone ? 'border-red-500 bg-red-50' : touched.phone && !errors.phone ? 'border-emerald-500' : 'border-white hover:border-[#1E2621]/30'
            }`}
          />
          {touched.phone && !errors.phone && (
            <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
          )}
          {touched.phone && errors.phone && (
            <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
        </div>
        {touched.phone && errors.phone && (
          <p className="text-[10px] text-red-500 font-bold mt-1 pl-3">{errors.phone}</p>
        )}
      </div>

      {/* Password Input & Strength Bar */}
      <div>
        <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
          PASSWORD <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Create a password (min 8 chars)"
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

        {/* Live Password Strength Meter */}
        {formData.password && (
          <div className="mt-1.5 space-y-1 pl-2">
            <div className="flex gap-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full flex-1 transition-all ${pwdStrength >= 1 ? (pwdStrength === 1 ? 'bg-red-500' : pwdStrength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'}`} />
              <div className={`h-full flex-1 transition-all ${pwdStrength >= 2 ? (pwdStrength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'}`} />
              <div className={`h-full flex-1 transition-all ${pwdStrength >= 3 ? 'bg-emerald-500' : 'bg-transparent'}`} />
            </div>
            <p className="text-[10px] text-[#556B5D] font-bold flex justify-between">
              <span>Strength: {pwdStrength === 1 ? 'Weak' : pwdStrength === 2 ? 'Medium' : pwdStrength === 3 ? 'Strong 🔒' : ''}</span>
              <span>(Min 8 chars, 1 number, 1 symbol)</span>
            </p>
          </div>
        )}

        {touched.password && errors.password && (
          <p className="text-[10px] text-red-500 font-bold mt-1 pl-3">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
          CONFIRM PASSWORD <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Re-enter your password"
            className={`w-full pl-11 pr-10 py-3.5 rounded-full bg-white/90 border-2 text-xs font-bold text-[#1E2621] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#1E2621]/15 transition-all duration-300 shadow-sm ${
              touched.confirmPassword && errors.confirmPassword ? 'border-red-500 bg-red-50' : touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'border-emerald-500' : 'border-white hover:border-[#1E2621]/30'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer p-0.5"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="text-[10px] text-red-500 font-bold mt-1 pl-3">{errors.confirmPassword}</p>
        )}
        {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
          <p className="text-[10px] text-emerald-600 font-bold mt-1 pl-3 flex items-center gap-1">
            <Check className="w-3 h-3" /> Passwords match
          </p>
        )}
      </div>

      {/* Terms & Privacy Custom Checkbox Box */}
      <div className="p-3.5 rounded-2xl bg-white/60 backdrop-blur-md border-2 border-white shadow-xs">
        <label className="flex items-start gap-3 cursor-pointer select-none group">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            onBlur={handleBlur}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-md mt-0.5 border-2 transition-all duration-200 flex items-center justify-center shrink-0 transform group-hover:scale-105 ${
              formData.agreeTerms
                ? 'bg-[#18201B] border-[#18201B] shadow-sm'
                : touched.agreeTerms && errors.agreeTerms
                ? 'border-red-500 bg-red-50'
                : 'bg-white border-gray-300 group-hover:border-[#1E2621]'
            }`}
          >
            {formData.agreeTerms && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 600, damping: 22 }}
              >
                <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
              </motion.div>
            )}
          </div>
          <span className="text-xs text-[#1E2621] font-medium leading-relaxed">
            I agree to the{' '}
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLegalModal({ isOpen: true, type: 'terms' });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLegalModal({ isOpen: true, type: 'terms' });
                }
              }}
              className="font-bold text-[#1E2621] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Terms of Service
            </span>{' '}
            &{' '}
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLegalModal({ isOpen: true, type: 'privacy' });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLegalModal({ isOpen: true, type: 'privacy' });
                }
              }}
              className="font-bold text-[#1E2621] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Privacy Policy
            </span>
          </span>
        </label>
        {touched.agreeTerms && errors.agreeTerms && (
          <p className="text-[10px] text-red-500 font-bold mt-1.5 pl-8">{errors.agreeTerms}</p>
        )}
      </div>

      {/* FULL TRANSPARENT WHITE GLOSSY GLASS CREATE ACCOUNT BUTTON */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 rounded-full bg-white/80 hover:bg-white border-2 border-white shadow-md backdrop-blur-2xl text-[#1E2621] font-montserrat font-black text-xs uppercase tracking-[2.5px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
      >
        {isLoading ? (
          <span className="inline-block w-4.5 h-4.5 border-2 border-current border-t-transparent rounded-full animate-spin text-[#1E2621]" />
        ) : (
          <>
            <CheckCircle2 className="w-4.5 h-4.5 text-[#1E2621] stroke-[2.5]" />
            <span>CREATE ACCOUNT</span>
          </>
        )}
      </motion.button>

      {/* Divider & Social Login */}
      <Divider />
      <SocialLogin />

      {/* Already Have Account Redirect */}
      <p className="text-center text-xs text-[#556B5D] font-medium pt-2">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#1E2621] hover:underline">
          Sign In
        </Link>
      </p>

      {/* Legal Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        initialType={legalModal.type}
      />
    </form>
  );
};

export default RegisterForm;
