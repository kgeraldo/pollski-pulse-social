
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Laugh, ThumbsUp, Angry, Sad, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type ReactionType = 'like' | 'love' | 'laugh' | 'angry' | 'sad';

interface Reaction {
  type: ReactionType;
  count: number;
  users: string[];
  hasReacted: boolean;
}

interface EnhancedReactionsProps {
  postId: number;
  reactions: Reaction[];
  onReact: (postId: number, reactionType: ReactionType) => void;
}

const reactionConfig = {
  like: { icon: ThumbsUp, color: 'text-blue-500', bgColor: 'bg-blue-500/10', emoji: '👍' },
  love: { icon: Heart, color: 'text-red-500', bgColor: 'bg-red-500/10', emoji: '❤️' },
  laugh: { icon: Laugh, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', emoji: '😂' },
  angry: { icon: Angry, color: 'text-orange-500', bgColor: 'bg-orange-500/10', emoji: '😠' },
  sad: { icon: Sad, color: 'text-purple-500', bgColor: 'bg-purple-500/10', emoji: '😢' }
};

const EnhancedReactions: React.FC<EnhancedReactionsProps> = ({
  postId,
  reactions,
  onReact
}) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showWhoReacted, setShowWhoReacted] = useState<ReactionType | null>(null);

  const totalReactions = reactions.reduce((sum, reaction) => sum + reaction.count, 0);
  const userReaction = reactions.find(r => r.hasReacted);

  const handleQuickReact = () => {
    onReact(postId, 'like');
  };

  const handleReactionSelect = (reactionType: ReactionType) => {
    onReact(postId, reactionType);
    setShowReactionPicker(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Quick Like Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleQuickReact}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 text-xs ${
          userReaction?.type === 'like'
            ? 'bg-blue-500/20 text-blue-400 shadow-sm'
            : 'text-slate-400 hover:bg-slate-700 hover:text-blue-400'
        }`}
      >
        <Heart 
          size={13} 
          className={userReaction?.type === 'like' ? 'fill-current' : ''} 
        />
        <span className="font-semibold">
          {reactions.find(r => r.type === 'like')?.count || 0}
        </span>
      </motion.button>

      {/* Reaction Picker */}
      <Popover open={showReactionPicker} onOpenChange={setShowReactionPicker}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white h-7 px-2"
          >
            <span className="text-lg">😀</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 bg-slate-800 border-slate-700">
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(reactionConfig).map(([type, config]) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleReactionSelect(type as ReactionType)}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <span className="text-2xl">{config.emoji}</span>
                <span className="text-xs text-slate-400 capitalize">{type}</span>
              </motion.button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Reaction Summary */}
      {totalReactions > 0 && (
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            {reactions
              .filter(r => r.count > 0)
              .slice(0, 3)
              .map((reaction) => {
                const config = reactionConfig[reaction.type];
                return (
                  <Popover 
                    key={reaction.type}
                    open={showWhoReacted === reaction.type} 
                    onOpenChange={(open) => setShowWhoReacted(open ? reaction.type : null)}
                  >
                    <PopoverTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-800 ${config.bgColor} relative z-0`}
                      >
                        <span className="text-xs">{config.emoji}</span>
                      </motion.button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-slate-800 border-slate-700">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
                          <span className="text-lg">{config.emoji}</span>
                          <span className="font-semibold text-white capitalize">{reaction.type}</span>
                          <span className="text-slate-400 text-sm">({reaction.count})</span>
                        </div>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {reaction.users.slice(0, 10).map((user, index) => (
                            <div key={index} className="text-sm text-slate-300">
                              {user}
                            </div>
                          ))}
                          {reaction.users.length > 10 && (
                            <div className="text-xs text-slate-400">
                              and {reaction.users.length - 10} others
                            </div>
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              })}
          </div>
          <span className="text-xs text-slate-400 ml-1">
            {totalReactions}
          </span>
        </div>
      )}
    </div>
  );
};

export default EnhancedReactions;
