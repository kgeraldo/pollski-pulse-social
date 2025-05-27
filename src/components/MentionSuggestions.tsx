
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { MentionSuggestion } from '@/types/mention';

interface MentionSuggestionsProps {
  suggestions: MentionSuggestion[];
  isVisible: boolean;
  activeIndex: number;
  onSelect: (user: MentionSuggestion) => void;
  position?: { top: number; left: number };
}

const MentionSuggestions: React.FC<MentionSuggestionsProps> = ({
  suggestions,
  isVisible,
  activeIndex,
  onSelect,
  position = { top: 0, left: 0 }
}) => {
  return (
    <AnimatePresence>
      {isVisible && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          className="absolute bg-slate-800 border border-slate-700 rounded-lg shadow-lg shadow-black/20 z-50 min-w-[240px] max-h-[200px] overflow-y-auto"
          style={{
            top: position.top,
            left: position.left
          }}
        >
          <div className="p-2">
            <div className="text-xs text-slate-400 px-2 py-1 border-b border-slate-700 mb-1">
              Mention someone
            </div>
            {suggestions.map((user, index) => (
              <motion.button
                key={user.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(user)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-160 ${
                  index === activeIndex
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-sm truncate">
                      {user.displayName}
                    </span>
                    {user.isVerified && (
                      <Check 
                        size={12} 
                        className={index === activeIndex ? 'text-white' : 'text-blue-400'} 
                      />
                    )}
                  </div>
                  <span className={`text-xs ${
                    index === activeIndex ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    @{user.username}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MentionSuggestions;
