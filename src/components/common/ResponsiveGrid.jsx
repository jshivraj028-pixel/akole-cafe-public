import React from 'react';

const ResponsiveGrid = ({ 
  children, 
  className = '', 
  size = 'md', // 'xs', 'sm', 'md', 'lg'
  minItemWidth,
  gap
}) => {
  const sizeClasses = {
    xs: 'grid-responsive-xs',
    sm: 'grid-responsive-sm',
    md: 'grid-responsive-md',
    lg: 'grid-responsive-lg'
  };

  const customStyle = minItemWidth ? {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(clamp(180px, 30vw, ${minItemWidth}), 1fr))`,
    gap: gap || 'var(--space-md)'
  } : undefined;

  return (
    <div 
      className={`w-full ${!minItemWidth ? (sizeClasses[size] || sizeClasses.md) : ''} ${className}`}
      style={customStyle}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;
