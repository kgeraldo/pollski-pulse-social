
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, MessageCircle, Share, MoreHorizontal, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface Poll {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: string;
  timeAgo: string;
  category: string;
  totalVotes: number;
  options: PollOption[];
  hasVoted: boolean;
  userVote?: string;
}

interface PollCardProps {
  poll: Poll;
  onVote: (pollId: string, optionId: string) => void;
  index: number;
}

const PollCard: React.FC<PollCardProps> = ({ poll, onVote, index }) => {
  const handleVote = (optionId: string): void => {
    if (!poll.hasVoted) {
      onVote(poll.id, optionId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-slate-800 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 overflow-hidden group hover:shadow-xl hover:shadow-black/20"
    >
      {/* Poll Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={poll.avatar}
              alt={poll.author}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-600"
            />
            <div>
              <h3 className="text-white font-semibold text-base">{poll.author}</h3>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">{poll.timeAgo}</span>
                <span className="text-slate-500">•</span>
                <span className="text-blue-400 text-sm font-medium">{poll.category}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200"
          >
            <MoreHorizontal size={18} />
          </Button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2 leading-tight">
            {poll.title}
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            {poll.description}
          </p>
        </div>

        {/* Poll Options */}
        <div className="space-y-3 mb-6">
          {poll.options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: poll.hasVoted ? 1 : 1.02 }}
              whileTap={{ scale: poll.hasVoted ? 1 : 0.98 }}
              onClick={() => handleVote(option.id)}
              disabled={poll.hasVoted}
              className={`w-full p-4 rounded-xl transition-all duration-300 relative overflow-hidden border-2 ${
                poll.hasVoted
                  ? poll.userVote === option.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-700/50'
                  : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 cursor-pointer'
              }`}
            >
              {/* Progress Bar Background */}
              {poll.hasVoted && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${option.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`absolute inset-y-0 left-0 rounded-xl ${
                    poll.userVote === option.id
                      ? 'bg-blue-500/20'
                      : 'bg-slate-600/30'
                  }`}
                />
              )}
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {poll.hasVoted && poll.userVote === option.id && (
                    <CheckCircle className="text-blue-400" size={20} />
                  )}
                  <span className="text-white font-medium text-left">
                    {option.text}
                  </span>
                </div>
                
                {poll.hasVoted && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 font-semibold">
                      {option.percentage.toFixed(1)}%
                    </span>
                    <span className="text-slate-400 text-sm">
                      ({option.votes})
                    </span>
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Poll Stats */}
        <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span>{poll.totalVotes} total votes</span>
          </div>
          {poll.hasVoted && (
            <span className="text-green-400 font-medium">✓ You voted</span>
          )}
        </div>
      </div>

      {/* Poll Actions */}
      <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-blue-400 transition-all duration-200"
            >
              <MessageCircle size={16} />
              <span className="font-semibold text-sm">Discuss</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-purple-400 transition-all duration-200"
            >
              <Share size={16} />
              <span className="font-semibold text-sm">Share</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PollCard;
