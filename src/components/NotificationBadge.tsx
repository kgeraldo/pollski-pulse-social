
import React from 'react';
import { motion } from 'framer-motion';

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'red' | 'blue' | 'green' | 'orange';
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  maxCount = 99,
  size = 'md',
  color = 'red',
  className = ''
}) => {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  const sizeClasses = {
    sm: 'min-w-4 h-4 text-xs px-1',
    md: 'min-w-5 h-5 text-xs px-1.5',
    lg: 'min-w-6 h-6 text-sm px-2'
  };

  const colorClasses = {
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    orange: 'bg-orange-500 text-white'
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.1 }}
      className={`
        absolute -top-1 -right-1 
        ${sizeClasses[size]} 
        ${colorClasses[color]}
        rounded-full 
        font-bold 
        flex items-center justify-center 
        border-2 border-slate-800
        shadow-lg
        ${className}
      `}
    >
      {displayCount}
    </motion.div>
  );
};

export default NotificationBadge;
