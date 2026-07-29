import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  onClick,
  variant = 'gold', // 'gold', 'primary', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  type = 'button',
  icon: Icon,
  disabled = false,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium tracking-wider transition-all duration-300 rounded-xl overflow-hidden focus:outline-none cursor-pointer glossy-button";
  
  const variants = {
    gold: "bg-gradient-to-r from-[#C8A96A] via-[#E8CE8E] to-[#B08E48] text-[#123524] font-bold tracking-wider shadow-[0_4px_18px_rgba(200,169,106,0.3)] hover:shadow-[0_6px_25px_rgba(200,169,106,0.45)] hover:brightness-105 active:scale-[0.98] border border-[#F0D89E]/60",
    primary: "bg-[#123524] text-[#D6AE4D] border border-[#D6AE4D]/40 hover:bg-[#1A4330] hover:border-[#D6AE4D] shadow-lg hover:scale-[1.02]",
    outline: "border-2 border-[#D6AE4D] text-[#D6AE4D] hover:bg-[#D6AE4D] hover:text-[#123524] font-bold transition-all",
    ghost: "text-[#EAE3D2] hover:text-[#D6AE4D] hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm uppercase",
    lg: "px-8 py-4 text-base uppercase font-semibold",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </>
  );

  if (to) {
    return (
      <motion.div whileTap={{ scale: 0.96 }} className="inline-block">
        <Link to={to} className={`group ${combinedClasses}`} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      className={`group ${combinedClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
