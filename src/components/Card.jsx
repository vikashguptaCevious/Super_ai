import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default', 
  hover = true, 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
    glass: 'bg-white/5 backdrop-blur-lg border border-white/10 shadow-glass',
    neumorphic: 'bg-gray-100 dark:bg-gray-800 shadow-neumorphic-light dark:shadow-neumorphic-dark',
    elevated: 'bg-white dark:bg-gray-800 shadow-2xl',
    flat: 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
  };

  const hoverClasses = hover ? 'hover:scale-105 cursor-pointer' : '';
  const cardClasses = `${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`;

  const MotionCard = motion.div;

  return (
    <MotionCard
      className={cardClasses}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </MotionCard>
  );
};

export default Card;
