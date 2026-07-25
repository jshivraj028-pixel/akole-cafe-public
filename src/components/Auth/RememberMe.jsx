import React from 'react';
import { Link } from 'react-router-dom';

const RememberMe = ({ rememberMe, setRememberMe }) => {
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

      <Link
        to="/forgot-password"
        className="font-medium text-[#D6AE4D] hover:text-[#c59d3c] transition-colors hover:underline text-[11px] uppercase tracking-wider font-semibold"
      >
        FORGOT PASSWORD?
      </Link>
    </div>
  );
};

export default RememberMe;
