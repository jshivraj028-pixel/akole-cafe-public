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
  const baseStyles = "relative inline-flex items-center justify-center font-medium tracking-wider transition-all duration-300 rounded-xl overflow-hidden focus:outline-none cursor-pointer";
  
  const variants = {
    gold: "bg-gold-gradient text-primary font-semibold shadow-gold hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
    primary: "bg-primary text-secondary border border-accent-gold/30 hover:bg-primary-light hover:border-accent-gold shadow-luxury hover:scale-[1.02]",
    outline: "border-2 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-primary transition-colors",
    ghost: "text-secondary hover:text-accent-gold hover:bg-white/5",
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
