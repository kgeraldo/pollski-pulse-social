
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface EnhancedPollProps {
  question: string;
  description?: string;
  options: PollOption[];
  totalVotes: number;
  hasVoted: boolean;
  userVote?: string;
  endsAt?: Date;
  multipleChoice?: boolean;
  onVote: (optionIds: string[]) => void;
}

const EnhancedPoll: React.FC<EnhancedPollProps> = ({
  question,
  description,
  options,
  totalVotes,
  hasVoted,
  userVote,
  endsAt,
  multipleChoice = false,
  onVote
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (endsAt) {
      const updateTimer = () => {
        const now = new Date();
        const timeDiff = endsAt.getTime() - now.getTime();
        
        if (timeDiff <= 0) {
          setTimeRemaining('Poll ended');
          return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeRemaining(`${days}d ${hours}h left`);
        } else if (hours > 0) {
          setTimeRemaining(`${hours}h ${minutes}m left`);
        } else {
          setTimeRemaining(`${minutes}m left`);
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 60000);
      return () => clearInterval(interval);
    }
  }, [endsAt]);

  const handleOptionToggle = (optionId: string) => {
    if (hasVoted) return;

    if (multipleChoice) {
      setSelectedOptions(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleVote = () => {
    if (selectedOptions.length > 0) {
      onVote(selectedOptions);
    }
  };

  const isExpired = endsAt && new Date() > endsAt;
  const canVote = !hasVoted && !isExpired;

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      {/* Poll Header */}
      <div className="mb-4">
        <h3 className="text-white font-semibold text-base mb-1">{question}</h3>
        {description && (
          <p className="text-slate-400 text-sm">{description}</p>
        )}
        
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Users size={12} />
            <span>{totalVotes.toLocaleString()} votes</span>
          </div>
          {multipleChoice && (
            <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded">
              Multiple choice
            </span>
          )}
          {endsAt && (
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span className={isExpired ? 'text-red-400' : ''}>{timeRemaining}</span>
            </div>
          )}
        </div>
      </div>

      {/* Poll Options */}
      <div className="space-y-3 mb-4">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleOptionToggle(option.id)}
            className={`relative overflow-hidden rounded-lg border transition-all duration-200 cursor-pointer ${
              hasVoted || isExpired
                ? 'border-slate-600'
                : selectedOptions.includes(option.id)
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-600 hover:border-slate-500'
            }`}
          >
            {/* Progress Background */}
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
                    selectedOptions.includes(option.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-400'
                  } ${multipleChoice ? 'rounded-sm' : ''}`}>
                    {selectedOptions.includes(option.id) && (
                      <CheckCircle size={12} className="text-white" />
                    )}
                  </div>
                )}
                <span className="text-white font-medium">{option.text}</span>
                {userVote === option.id && (
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
        ))}
      </div>

      {/* Vote Button */}
      {canVote && selectedOptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={handleVote}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Vote ({selectedOptions.length} selected)
          </Button>
        </motion.div>
      )}

      {/* Results Summary */}
      {(hasVoted || isExpired) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-slate-700/50 rounded-lg"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">
              {isExpired ? 'Poll ended' : 'Live results'}
            </span>
            <div className="flex items-center gap-1 text-slate-400">
              <TrendingUp size={12} />
              <span>Updated in real-time</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedPoll;
