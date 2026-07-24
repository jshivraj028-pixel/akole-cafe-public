import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ label = 'Password', id = 'password', value, onChange, placeholder = '••••••••', error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 text-left">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-[#C8A96A] font-montserrat">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C8A96A]">
          <Lock className="w-4 h-4 stroke-[1.5]" />
        </div>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-[#FAF6EE] dark:bg-[#16231B] border ${
            error ? 'border-red-500' : 'border-[#E5DDD0] dark:border-[#C8A96A]/30'
          } rounded-xl py-3 pl-10 pr-10 text-xs font-montserrat text-[#1F3A2B] dark:text-[#EAE3D2] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A] transition-all`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8B9B90] hover:text-[#C8A96A] transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-4 h-4 stroke-[1.5]" /> : <Eye className="w-4 h-4 stroke-[1.5]" />}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-500 font-montserrat">{error}</p>}
    </div>
  );
};

export default PasswordInput;
