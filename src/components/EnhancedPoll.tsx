
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PollHeader from './poll/PollHeader';
import PollOption from './poll/PollOption';

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
      <PollHeader
        question={question}
        description={description}
        totalVotes={totalVotes}
        multipleChoice={multipleChoice}
        timeRemaining={timeRemaining}
        isExpired={!!isExpired}
      />

      <div className="space-y-3 mb-4">
        {options.map((option, index) => (
          <PollOption
            key={option.id}
            option={option}
            index={index}
            hasVoted={hasVoted}
            isExpired={!!isExpired}
            isSelected={selectedOptions.includes(option.id)}
            isUserVote={userVote === option.id}
            onClick={() => handleOptionToggle(option.id)}
          />
        ))}
      </div>

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
