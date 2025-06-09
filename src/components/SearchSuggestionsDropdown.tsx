
import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Hash, Users, Clock } from 'lucide-react';

interface SearchSuggestion {
  id: string;
  type: 'user' | 'hashtag' | 'recent' | 'trending';
  text: string;
  subtitle?: string;
  avatar?: string;
  count?: number;
}

interface SearchSuggestionsDropdownProps {
  query: string;
  isVisible: boolean;
  onSelect: (suggestion: SearchSuggestion) => void;
}

const SearchSuggestionsDropdown: React.FC<SearchSuggestionsDropdownProps> = ({
  query,
  isVisible,
  onSelect
}) => {
  const mockSuggestions: SearchSuggestion[] = [
    {
      id: '1',
      type: 'trending',
      text: 'React 19 features',
      count: 1247
    },
    {
      id: '2',
      type: 'hashtag',
      text: '#webdevelopment',
      count: 892
    },
    {
      id: '3',
      type: 'user',
      text: 'Sarah Chen',
      subtitle: '@sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=40&h=40&fit=crop'
    },
    {
      id: '4',
      type: 'user',
      text: 'Alex Johnson',
      subtitle: '@alexj',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop'
    },
    {
      id: '5',
      type: 'recent',
      text: 'TypeScript best practices'
    },
    {
      id: '6',
      type: 'hashtag',
      text: '#ai',
      count: 2156
    }
  ];

  const filteredSuggestions = mockSuggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(query.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'trending': return TrendingUp;
      case 'hashtag': return Hash;
      case 'user': return Users;
      case 'recent': return Clock;
      default: return Search;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'trending': return 'text-orange-400';
      case 'hashtag': return 'text-blue-400';
      case 'user': return 'text-green-400';
      case 'recent': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  if (!isVisible || query.length < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto"
    >
      {filteredSuggestions.length === 0 ? (
        <div className="p-4 text-center text-slate-400">
          <Search size={24} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No results found for "{query}"</p>
        </div>
      ) : (
        <div className="py-2">
          {query && (
            <div className="px-4 py-2 text-slate-400 text-xs font-medium uppercase tracking-wider border-b border-slate-700/50">
              Search Results
            </div>
          )}
          {filteredSuggestions.map((suggestion) => {
            const Icon = getIcon(suggestion.type);
            return (
              <motion.button
                key={suggestion.id}
                whileHover={{ backgroundColor: 'rgb(51 65 85 / 0.5)' }}
                onClick={() => onSelect(suggestion)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700/50 transition-colors"
              >
                {suggestion.avatar ? (
                  <img
                    src={suggestion.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Icon size={16} className={getIconColor(suggestion.type)} />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm">{suggestion.text}</div>
                  {suggestion.subtitle && (
                    <div className="text-slate-400 text-xs">{suggestion.subtitle}</div>
                  )}
                </div>
                
                {suggestion.count && (
                  <div className="text-slate-400 text-xs">
                    {suggestion.count.toLocaleString()} posts
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default SearchSuggestionsDropdown;
