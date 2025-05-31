
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Share, Flag, ArrowUp, ArrowDown } from 'lucide-react';
import { ReactionType } from '../EnhancedReactions';
import EnhancedReactions from '../EnhancedReactions';

interface PostActionsProps {
  postId: number;
  votes: { up: number; down: number };
  comments: number;
  shares: number;
  isVoted?: 'up' | 'down' | null;
  showComments?: boolean;
  reactions?: Array<{
    type: ReactionType;
    count: number;
    users: string[];
    hasReacted: boolean;
  }>;
  onVote: (postId: number, voteType: 'up' | 'down') => void;
  onToggleComments: (postId: number) => void;
  onReact?: (postId: number, reactionType: ReactionType) => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  votes,
  comments,
  shares,
  isVoted,
  showComments,
  reactions,
  onVote,
  onToggleComments,
  onReact
}) => {
  const defaultReactions = [
    { type: 'like' as ReactionType, count: votes.up, users: ['User1', 'User2'], hasReacted: isVoted === 'up' },
    { type: 'love' as ReactionType, count: 12, users: ['User3', 'User4'], hasReacted: false },
    { type: 'laugh' as ReactionType, count: 5, users: ['User5'], hasReacted: false },
    { type: 'angry' as ReactionType, count: 2, users: ['User6'], hasReacted: false },
    { type: 'sad' as ReactionType, count: 1, users: ['User7'], hasReacted: false }
  ];

  return (
    <div className="px-4 py-3 border-t border-slate-700/40 bg-slate-800/40">
      <div className="flex items-center justify-between">
        {onReact ? (
          <EnhancedReactions
            postId={postId}
            reactions={reactions || defaultReactions}
            onReact={onReact}
          />
        ) : (
          <div className="flex items-center gap-0.5">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onVote(postId, 'up')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-160 text-xs ${
                isVoted === 'up'
                  ? 'bg-green-600/16 text-green-400 shadow-sm shadow-green-600/8'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-green-400'
              }`}
            >
              <ArrowUp size={13} className={isVoted === 'up' ? 'fill-current' : ''} />
              <span className="font-semibold">{votes.up}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onVote(postId, 'down')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-160 text-xs ${
                isVoted === 'down'
                  ? 'bg-red-600/16 text-red-400 shadow-sm shadow-red-600/8'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-red-400'
              }`}
            >
              <ArrowDown size={13} className={isVoted === 'down' ? 'fill-current' : ''} />
              <span className="font-semibold">{votes.down}</span>
            </motion.button>
          </div>
        )}

        <div className="flex items-center gap-0.5">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onToggleComments(postId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-160 text-xs ${
              showComments
                ? 'bg-blue-600/16 text-blue-400'
                : 'text-slate-400 hover:bg-slate-700 hover:text-blue-400'
            }`}
          >
            <MessageCircle size={13} />
            <span className="font-semibold">{comments}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-purple-400 transition-all duration-160 text-xs"
          >
            <Share size={13} />
            <span className="font-semibold">{shares}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-all duration-160 text-xs"
          >
            <Flag size={13} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
