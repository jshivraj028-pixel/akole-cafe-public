import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  Send, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { showToast } = useTheme();

  // Step: 1 = Enter Identifier, 2 = Enter OTP, 3 = Reset Password, 4 = Success
  const [step, setStep] = useState(1);

  // Form Fields
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validation & UI state
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  // Timer countdown for OTP resend
  React.useEffect(() => {
    let timer;
    if (step === 2 && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  const isPhone = (val) => /^[6-9]\d{9}$/.test(val.trim());
  const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const validateIdentifier = (val) => {
    const clean = val.trim();
    if (!clean) return 'Email or mobile number is required';
    if (!isPhone(clean) && !isEmail(clean)) {
      return 'Enter a valid email or 10-digit mobile number';
    }
    return '';
  };

  const handleIdentifierSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const err = validateIdentifier(identifier);
    if (err) {
      setError(err);
      showToast(err, 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setResendTimer(30);
      showToast(`Verification code sent to ${identifier}`, 'success');
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      showToast('Please enter the 4-digit code sent to you.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      showToast('OTP verified! Create your new password.', 'success');
    }, 800);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
      showToast('Password reset successfully!', 'success');
    }, 1000);
  };

  return (
    <div className="w-full text-left font-montserrat">
      {/* STEP 1: Enter Email / Phone */}
      {step === 1 && (
        <form onSubmit={handleIdentifierSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
              REGISTERED EMAIL OR PHONE NUMBER <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              {isPhone(identifier) ? (
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
              ) : (
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
              )}
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (touched) setError(validateIdentifier(e.target.value));
                }}
                onBlur={() => {
                  setTouched(true);
                  setError(validateIdentifier(identifier));
                }}
                placeholder="Enter email or 10-digit phone"
                className={`w-full pl-11 pr-10 py-3.5 rounded-full bg-white/90 border-2 text-xs font-bold text-[#1E2621] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#1E2621]/15 transition-all duration-300 shadow-sm ${
                  touched && error ? 'border-red-500 bg-red-50' : touched && !error ? 'border-emerald-500' : 'border-white hover:border-[#1E2621]/30'
                }`}
              />
              {touched && !error && (
                <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
              )}
              {touched && error && (
                <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
              )}
            </div>
            {touched && error && (
              <p className="text-[10px] text-red-500 font-bold mt-1 pl-3">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-full bg-white/80 hover:bg-white border-2 border-white shadow-md backdrop-blur-2xl text-[#1E2621] font-montserrat font-black text-xs uppercase tracking-[2.5px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="inline-block w-4.5 h-4.5 border-2 border-current border-t-transparent rounded-full animate-spin text-[#1E2621]" />
            ) : (
              <>
                <Send className="w-4.5 h-4.5 text-[#1E2621]" />
                <span>SEND VERIFICATION CODE</span>
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#556B5D] hover:text-[#1E2621] font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}

      {/* STEP 2: Enter 4-Digit Verification OTP */}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="space-y-5">
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-white text-[#1E2621] mx-auto flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6 text-[#1E2621]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1E2621]">
              Verify Code
            </h3>
            <p className="text-xs text-[#556B5D] font-medium">
              We sent a 4-digit code to <strong className="text-[#1E2621]">{identifier}</strong>
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 py-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                className="w-12 h-13 text-center text-lg font-black rounded-2xl bg-white border-2 border-white text-[#1E2621] focus:ring-4 focus:ring-[#1E2621]/15 focus:outline-none transition-all shadow-md"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-full bg-white/80 hover:bg-white border-2 border-white shadow-md backdrop-blur-2xl text-[#1E2621] font-montserrat font-black text-xs uppercase tracking-[2.5px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="inline-block w-4.5 h-4.5 border-2 border-current border-t-transparent rounded-full animate-spin text-[#1E2621]" />
            ) : (
              <span>VERIFY & CONTINUE</span>
            )}
          </button>

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#556B5D] hover:text-[#1E2621] font-bold flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Contact</span>
            </button>

            <button
              type="button"
              disabled={resendTimer > 0}
              onClick={() => {
                setResendTimer(30);
                showToast('A new OTP has been sent!', 'info');
              }}
              className={`flex items-center gap-1 font-bold ${
                resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#1E2621] hover:underline cursor-pointer'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Set New Password */}
      {step === 3 && (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
              NEW PASSWORD <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 chars)"
                className="w-full pl-11 pr-10 py-3.5 rounded-full bg-white border-2 border-white text-xs font-bold text-[#1E2621] focus:outline-none focus:ring-4 focus:ring-[#1E2621]/15 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[1.5px] font-black text-[#1E2621] mb-1.5">
              CONFIRM NEW PASSWORD <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1E2621] stroke-[2.2]" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-11 pr-10 py-3.5 rounded-full bg-white border-2 border-white text-xs font-bold text-[#1E2621] focus:outline-none focus:ring-4 focus:ring-[#1E2621]/15 shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-full bg-white/80 hover:bg-white border-2 border-white shadow-md backdrop-blur-2xl text-[#1E2621] font-montserrat font-black text-xs uppercase tracking-[2.5px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] mt-2"
          >
            {isLoading ? (
              <span className="inline-block w-4.5 h-4.5 border-2 border-current border-t-transparent rounded-full animate-spin text-[#1E2621]" />
            ) : (
              <span>UPDATE PASSWORD</span>
            )}
          </button>
        </form>
      )}

      {/* STEP 4: Success Message */}
      {step === 4 && (
        <div className="space-y-4 text-center py-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 border-2 border-white mx-auto flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1E2621]">
            Password Reset Successful!
          </h3>
          <p className="text-xs text-[#556B5D] font-medium leading-relaxed">
            Your Akole Café password has been successfully updated. You can now log in with your new credentials.
          </p>

          <div className="pt-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 px-6 rounded-full bg-[#18201B] text-white hover:bg-black font-black text-xs uppercase tracking-[2.5px] transition-all shadow-md cursor-pointer"
            >
              PROCEED TO SIGN IN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
