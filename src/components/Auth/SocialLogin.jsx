import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

const SocialLogin = ({ onGoogleLogin, onAppleLogin }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-montserrat">
      <button
        type="button"
        onClick={onGoogleLogin}
        className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-full border-2 border-white bg-white/80 hover:bg-white backdrop-blur-2xl text-[#1E2621] text-xs font-bold transition-all shadow-md cursor-pointer"
      >
        <FcGoogle className="w-4.5 h-4.5" />
        <span>Google</span>
      </button>

      <button
        type="button"
        onClick={onAppleLogin}
        className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-full border-2 border-white bg-white/80 hover:bg-white backdrop-blur-2xl text-[#1E2621] text-xs font-bold transition-all shadow-md cursor-pointer"
      >
        <FaApple className="w-4.5 h-4.5 text-[#1E2621]" />
        <span>Apple</span>
      </button>
    </div>
  );
};

export default SocialLogin;
