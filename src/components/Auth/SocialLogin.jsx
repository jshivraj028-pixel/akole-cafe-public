import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

const SocialLogin = ({ onGoogleLogin, onAppleLogin }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-montserrat">
      <button
        type="button"
        onClick={onGoogleLogin}
        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-[#E5DDD0] dark:border-[#C8A96A]/30 bg-white dark:bg-[#16231B] text-[#1F3A2B] dark:text-[#EAE3D2] text-xs font-semibold hover:bg-[#FAF6EE] dark:hover:bg-[#1E2D23] transition-all shadow-sm"
      >
        <FcGoogle className="w-4 h-4" />
        <span>Google</span>
      </button>

      <button
        type="button"
        onClick={onAppleLogin}
        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-[#E5DDD0] dark:border-[#C8A96A]/30 bg-white dark:bg-[#16231B] text-[#1F3A2B] dark:text-[#EAE3D2] text-xs font-semibold hover:bg-[#FAF6EE] dark:hover:bg-[#1E2D23] transition-all shadow-sm"
      >
        <FaApple className="w-4 h-4 text-black dark:text-white" />
        <span>Apple</span>
      </button>
    </div>
  );
};

export default SocialLogin;
