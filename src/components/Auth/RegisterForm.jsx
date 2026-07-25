import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SocialLogin from './SocialLogin';
import Divider from './Divider';

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(formData.email);
      showToast('Account created successfully! Welcome to Akole Cafe VIP Club 🎉', 'success');
      navigate('/');
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left w-full">
      {/* Full Name Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Vikramaditya Shinde"
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#16231B] border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all ${
              errors.fullName ? 'border-red-500' : 'border-[#D6AE4D]/30'
            }`}
          />
        </div>
        {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName}</p>}
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="vikram@example.com"
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#16231B] border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all ${
              errors.email ? 'border-red-500' : 'border-[#D6AE4D]/30'
            }`}
          />
        </div>
        {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* Phone Number Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#16231B] border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all ${
              errors.phone ? 'border-red-500' : 'border-[#D6AE4D]/30'
            }`}
          />
        </div>
        {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/80 dark:bg-[#16231B] border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all ${
              errors.password ? 'border-red-500' : 'border-[#D6AE4D]/30'
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
        {errors.password && <p className="text-[10px] text-red-500 mt-1">{errors.password}</p>}
      </div>

      {/* Confirm Password Input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/80 dark:bg-[#16231B] border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all ${
              errors.confirmPassword ? 'border-red-500' : 'border-[#D6AE4D]/30'
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
        {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-1">{errors.confirmPassword}</p>}
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="agreeTerms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          className="w-4 h-4 rounded accent-[#D6AE4D] cursor-pointer"
        />
        <label htmlFor="agreeTerms" className="text-[11px] text-[#6B7C70] dark:text-[#A0B0A5] cursor-pointer select-none">
          I agree to the <span className="text-[#D6AE4D] font-semibold underline">Terms of Service</span> & <span className="text-[#D6AE4D] font-semibold underline">Privacy Policy</span>
        </label>
      </div>
      {errors.agreeTerms && <p className="text-[10px] text-red-500">{errors.agreeTerms}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-full bg-[#123524] hover:bg-[#D6AE4D] hover:text-[#123524] text-white font-montserrat font-bold text-xs uppercase tracking-[2px] transition-all shadow-md transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
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
