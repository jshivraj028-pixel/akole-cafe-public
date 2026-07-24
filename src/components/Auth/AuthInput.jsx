import React from 'react';
import { Mail } from 'lucide-react';

const AuthInput = ({ label, id, type = 'text', value, onChange, placeholder, error, required = true }) => {
  return (
    <div className="space-y-1.5 text-left">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-[#C8A96A] font-montserrat">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C8A96A]">
          <Mail className="w-4 h-4 stroke-[1.5]" />
        </div>
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-[#FAF6EE] dark:bg-[#16231B] border ${
            error ? 'border-red-500' : 'border-[#E5DDD0] dark:border-[#C8A96A]/30'
          } rounded-xl py-3 pl-10 pr-4 text-xs font-montserrat text-[#1F3A2B] dark:text-[#EAE3D2] placeholder-[#A0ACA2] focus:outline-none focus:border-[#C8A96A] transition-all`}
        />
      </div>
      {error && <p className="text-[11px] text-red-500 font-montserrat">{error}</p>}
    </div>
  );
};

export default AuthInput;
