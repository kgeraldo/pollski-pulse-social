
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

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
      return <ArrowUp size={13} className={isActive ? 'fill-current' : ''} />;
    }
    return <ArrowDown size={13} className={isActive ? 'fill-current' : ''} />;
  };

  const getColors = () => {
    if (disabled) return 'text-slate-500 cursor-not-allowed';
    
    if (type === 'up') {
      return isActive 
        ? 'bg-green-600/16 text-green-400 shadow-sm shadow-green-600/8'
        : 'text-slate-400 hover:bg-slate-700 hover:text-green-400';
    }
    
    return isActive
      ? 'bg-red-600/16 text-red-400 shadow-sm shadow-red-600/8'
      : 'text-slate-400 hover:bg-slate-700 hover:text-red-400';
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.04 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-160 text-xs ${getColors()}`}
    >
      {getIcon()}
      <motion.span 
        key={count}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.16, 1] }}
        transition={{ duration: 0.24 }}
        className="font-semibold"
      >
        {count}
      </motion.span>
    </motion.button>
  );
};

export default VoteButton;
