import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({
  subtitle,
  title,
  description,
  align = 'center', // 'left', 'center', 'right'
  light = false,
  className = ''
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-12 ${alignmentClasses[align]} ${className}`}>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="h-[1px] w-8 bg-accent-gold inline-block"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-gold">
            {subtitle}
          </span>
          <span className="h-[1px] w-8 bg-accent-gold inline-block"></span>
        </motion.div>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
            light ? 'text-secondary' : 'text-primary'
          }`}
        >
          {title}
        </motion.h2>
      )}

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-base md:text-lg font-light leading-relaxed ${
            light ? 'text-secondary/80' : 'text-dark-lighter'
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
