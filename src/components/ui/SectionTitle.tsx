import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  const textAlignment = centered ? 'text-center' : 'text-left';
  
  return (
    <div className={`mb-12 ${textAlignment} ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-serif text-3xl md:text-4xl font-bold text-secondary-500 mb-4"
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-neutral-600 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: centered ? '80px' : '60px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`h-1 bg-primary-500 mt-4 ${centered ? 'mx-auto' : ''}`}
      />
    </div>
  );
};

export default SectionTitle;