import React from 'react';

const Container = ({ children, className = '', fluid = false }) => {
  return (
    <div
      className={`${
        fluid 
          ? 'w-full px-3 sm:px-6 lg:px-8' 
          : 'w-full max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
