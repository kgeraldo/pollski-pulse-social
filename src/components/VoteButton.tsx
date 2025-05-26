
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp } from 'lucide-react';

interface VoteButtonProps {
  type: 'up' | 'down';
  count: number;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ 
  type, 
  count, 
  isActive, 
  onClick, 
  disabled = false 
}) => {
  const getIcon = () => {
    if (type === 'up') {
      return <Heart size={16} className={isActive ? 'fill-current' : ''} />;
    }
    return <Heart size={16} className={`transform rotate-180 ${isActive ? 'fill-current' : ''}`} />;
  };

  const getColors = () => {
    if (disabled) return 'text-slate-500 cursor-not-allowed';
    
    if (type === 'up') {
      return isActive 
        ? 'bg-green-600/20 text-green-400 shadow-lg shadow-green-600/10'
        : 'text-slate-400 hover:bg-slate-700 hover:text-green-400';
    }
    
    return isActive
      ? 'bg-red-600/20 text-red-400 shadow-lg shadow-red-600/10'
      : 'text-slate-400 hover:bg-slate-700 hover:text-red-400';
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${getColors()}`}
    >
      {getIcon()}
      <motion.span 
        key={count}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3 }}
        className="font-semibold text-sm"
      >
        {count}
      </motion.span>
    </motion.button>
  );
};

export default VoteButton;
