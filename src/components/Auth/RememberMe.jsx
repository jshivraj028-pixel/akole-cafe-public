import React from 'react';

const RememberMe = ({ rememberMe, setRememberMe, onForgotPassword }) => {
  return (
    <div className="flex items-center justify-between text-xs font-montserrat pt-1">
      <label className="flex items-center gap-2 cursor-pointer select-none text-[#6B7C70] dark:text-[#A0B0A5] hover:text-[#1F3A2B] transition-colors">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-[#E5DDD0] text-[#123524] focus:ring-[#C8A96A] accent-[#123524]"
        />
        <span>Remember Me</span>
      </label>

      <button
        type="button"
        onClick={onForgotPassword}
        className="font-medium text-[#C8A96A] hover:text-[#A68748] transition-colors hover:underline"
      >
        Forgot Password?
      </button>
    </div>
  );
};

export default RememberMe;
