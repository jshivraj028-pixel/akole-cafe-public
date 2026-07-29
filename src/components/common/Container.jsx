import React from 'react';

const Container = ({ children, className = '', fluid = false }) => {
  return (
    <div
      className={`${
        fluid 
          ? 'w-full px-4 sm:px-6 lg:px-8' 
          : 'container-responsive'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
