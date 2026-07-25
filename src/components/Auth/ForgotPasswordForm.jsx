import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Check, Send } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ForgotPasswordForm = () => {
  const { showToast } = useTheme();
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validateEmail = (val) => {
    if (!val.trim()) return 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email (e.g. vikram@example.com)';
    return '';
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (touched) {
      setError(validateEmail(val));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const err = validateEmail(email);
    if (err) {
      setError(err);
      showToast('Please enter a valid registered email.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      showToast(`Password reset link sent to ${email}`, 'success');
    }, 1200);
  };

  return (
    <div className="w-full text-left">
      {isSent ? (
        <div className="space-y-4 text-center py-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#123524] dark:text-white">
            Reset Link Sent!
          </h3>
          <p className="text-xs text-[#6B7C70] dark:text-[#A0B0A5] font-light leading-relaxed">
            We have sent a secure password reset link to <strong className="text-[#123524] dark:text-[#D6AE4D]">{email}</strong>. Please check your inbox or spam folder.
          </p>

          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={() => setIsSent(false)}
              className="w-full py-2.5 rounded-full bg-[#D6AE4D]/15 text-[#123524] dark:text-[#D6AE4D] font-bold text-xs uppercase tracking-wider border border-[#D6AE4D]/30"
            >
              Resend Email
            </button>

            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-[#123524] dark:text-white hover:text-[#D6AE4D]"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-[11px] uppercase tracking-widest font-semibold text-[#123524] dark:text-[#EAE3D2] mb-1">
              Registered Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D6AE4D]" />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
                placeholder="vikram@example.com"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/80 dark:bg-[#16231B] border text-xs text-[#123524] dark:text-[#EAE3D2] placeholder-[#8B9B90] focus:outline-none focus:ring-2 focus:ring-[#D6AE4D]/50 transition-all ${
                  touched && error ? 'border-red-500 bg-red-50/20' : touched && !error ? 'border-emerald-500' : 'border-[#D6AE4D]/30'
                }`}
              />
              {touched && !error && (
                <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              )}
              {touched && error && (
                <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
              )}
            </div>
            {touched && error && (
              <p className="text-[10px] text-red-500 font-medium mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-[#123524] hover:bg-[#D6AE4D] hover:text-[#123524] text-white font-montserrat font-bold text-xs uppercase tracking-[2px] transition-all shadow-md transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>SEND RESET LINK</span>
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#6B7C70] dark:text-[#A0B0A5] hover:text-[#D6AE4D] font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
