import React from 'react';
import Container from './Container';

const Section = ({ 
  children, 
  className = '', 
  id, 
  fluid = false,
  size = 'md', // 'sm', 'md', 'lg'
  containerClassName = '' 
}) => {
  const sizeClasses = {
    sm: 'py-6 sm:py-8 md:py-10',
    md: 'section-responsive',
    lg: 'section-responsive-lg'
  };

  return (
    <section 
      id={id} 
      className={`w-full relative overflow-hidden ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <Container fluid={fluid} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};

export default Section;
