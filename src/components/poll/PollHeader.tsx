
import React from 'react';
import { Users, Clock } from 'lucide-react';

interface PollHeaderProps {
  question: string;
  description?: string;
  totalVotes: number;
  multipleChoice?: boolean;
  timeRemaining?: string;
  isExpired?: boolean;
}

const PollHeader: React.FC<PollHeaderProps> = ({
  question,
  description,
  totalVotes,
  multipleChoice,
  timeRemaining,
  isExpired
}) => {
  return (
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
        {timeRemaining && (
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span className={isExpired ? 'text-red-400' : ''}>{timeRemaining}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollHeader;
