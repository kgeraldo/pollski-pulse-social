import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Heart, Smile, ThumbsUp, Flame, Star } from 'lucide-react';

interface Reaction {
  id: string;
  emoji: string;
  label: string;
  count: number;
  hasReacted: boolean;
}

interface QuickReactionsProps {
  postId: number;
  reactions?: Reaction[];
  onReact: (reactionId: string) => void;
}

const defaultReactions: Reaction[] = [
  { id: 'like', emoji: '👍', label: 'Like', count: 0, hasReacted: false },
  { id: 'love', emoji: '❤️', label: 'Love', count: 0, hasReacted: false },
  { id: 'laugh', emoji: '😂', label: 'Laugh', count: 0, hasReacted: false },
  { id: 'wow', emoji: '😮', label: 'Wow', count: 0, hasReacted: false },
  { id: 'fire', emoji: '🔥', label: 'Fire', count: 0, hasReacted: false }
];

const QuickReactions: React.FC<QuickReactionsProps> = ({
  postId,
  reactions = defaultReactions,
  onReact
}) => {
  const [showAll, setShowAll] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const displayedReactions = showAll ? reactions : reactions.slice(0, 3);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <AnimatePresence>
        {displayedReactions.map((reaction, index) => (
          <motion.button
            key={reaction.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onReact(reaction.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              reaction.hasReacted
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600/50 hover:border-slate-500'
            }`}
          >
            <span className="text-sm">{reaction.emoji}</span>
            {reaction.count > 0 && (
              <span className="text-xs">{reaction.count}</span>
            )}
          </motion.button>
        ))}
      </AnimatePresence>

      {reactions.length > 3 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAll(!showAll)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-slate-500 transition-all duration-200"
        >
          <motion.div
            animate={{ rotate: showAll ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus size={14} className="text-slate-400" />
          </motion.div>
        </motion.button>
      )}

      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 mb-2 bg-slate-800 border border-slate-700 rounded-lg p-2 shadow-xl z-50"
          >
            <div className="flex gap-1">
              {reactions.slice(3).map((reaction) => (
                <button
                  key={reaction.id}
                  onClick={() => onReact(reaction.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-700 transition-colors"
                  title={reaction.label}
                >
                  <span className="text-lg">{reaction.emoji}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickReactions;
