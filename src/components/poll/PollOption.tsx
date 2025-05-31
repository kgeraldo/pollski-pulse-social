
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface PollOptionProps {
  option: {
    id: string;
    text: string;
    votes: number;
    percentage: number;
  };
  index: number;
  hasVoted: boolean;
  isExpired: boolean;
  isSelected: boolean;
  isUserVote: boolean;
  onClick: () => void;
}

const PollOption: React.FC<PollOptionProps> = ({
  option,
  index,
  hasVoted,
  isExpired,
  isSelected,
  isUserVote,
  onClick
}) => {
  const canVote = !hasVoted && !isExpired;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg border transition-all duration-200 cursor-pointer ${
        hasVoted || isExpired
          ? 'border-slate-600'
          : isSelected
          ? 'border-blue-500 bg-blue-500/10'
          : 'border-slate-600 hover:border-slate-500'
      }`}
    >
      {(hasVoted || isExpired) && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${option.percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
        />
      )}

      <div className="relative p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {canVote && (
            <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
              isSelected
                ? 'border-blue-500 bg-blue-500'
                : 'border-slate-400'
            }`}>
              {isSelected && (
                <CheckCircle size={12} className="text-white" />
              )}
            </div>
          )}
          <span className="text-white font-medium">{option.text}</span>
          {isUserVote && (
            <CheckCircle size={16} className="text-green-400" />
          )}
        </div>

        {(hasVoted || isExpired) && (
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-semibold">
              {option.percentage}%
            </span>
            <span className="text-slate-400 text-sm">
              ({option.votes})
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PollOption;
