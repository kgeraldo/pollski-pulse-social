
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, TrendingUp, Hash, User } from 'lucide-react';

interface SearchSuggestion {
  id: string;
  type: 'recent' | 'trending' | 'hashtag' | 'user';
  text: string;
  subtitle?: string;
  count?: number;
}

interface SearchSuggestionsProps {
  query: string;
  isVisible: boolean;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

const mockSuggestions: SearchSuggestion[] = [
  { id: '1', type: 'recent', text: 'React hooks tutorial', subtitle: 'Recent search' },
  { id: '2', type: 'trending', text: 'TypeScript best practices', count: 245 },
  { id: '3', type: 'hashtag', text: '#webdev', count: 1200 },
  { id: '4', type: 'user', text: '@sarah_dev', subtitle: 'Sarah Chen' },
  { id: '5', type: 'trending', text: 'JavaScript frameworks 2024', count: 189 },
  { id: '6', type: 'hashtag', text: '#reactjs', count: 850 },
];

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  isVisible,
  onSelect,
  onClose
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 6));
    } else {
      setFilteredSuggestions(mockSuggestions.slice(0, 6));
    }
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'recent': return Clock;
      case 'trending': return TrendingUp;
      case 'hashtag': return Hash;
      case 'user': return User;
      default: return Search;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'recent': return 'text-slate-400';
      case 'trending': return 'text-orange-400';
      case 'hashtag': return 'text-blue-400';
      case 'user': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  if (!isVisible || filteredSuggestions.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden"
      >
        <div className="max-h-80 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => {
            const Icon = getIcon(suggestion.type);
            return (
              <motion.button
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => onSelect(suggestion.text)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left"
              >
                <div className={`w-5 h-5 ${getIconColor(suggestion.type)}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">
                    {suggestion.text}
                  </div>
                  {suggestion.subtitle && (
                    <div className="text-slate-400 text-xs">
                      {suggestion.subtitle}
                    </div>
                  )}
                </div>
                {suggestion.count && (
                  <div className="text-slate-400 text-xs">
                    {suggestion.count.toLocaleString()}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
        
        <div className="border-t border-slate-700 p-3 bg-slate-750">
          <div className="text-slate-400 text-xs text-center">
            Press Enter to search or click a suggestion
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchSuggestions;
