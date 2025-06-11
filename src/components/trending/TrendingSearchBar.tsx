
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Clock, Hash, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'trending' | 'recent' | 'hashtag';
  count?: number;
}

const TrendingSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'AI development', 'React 19', 'Web3'
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions: SearchSuggestion[] = [
    { id: '1', text: 'artificial intelligence', type: 'trending', count: 2341 },
    { id: '2', text: 'react development', type: 'trending', count: 1876 },
    { id: '3', text: 'machine learning', type: 'trending', count: 1654 },
    { id: '4', text: '#ai2024', type: 'hashtag', count: 987 },
    { id: '5', text: '#webdev', type: 'hashtag', count: 743 },
    { id: '6', text: 'blockchain technology', type: 'recent' },
    { id: '7', text: 'startup funding', type: 'recent' }
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setRecentSearches(prev => {
        const newRecent = [searchQuery, ...prev.filter(item => item !== searchQuery)].slice(0, 5);
        return newRecent;
      });
      setQuery('');
      setIsActive(false);
      console.log('Searching for:', searchQuery);
    }
  };

  const removeRecentSearch = (searchToRemove: string) => {
    setRecentSearches(prev => prev.filter(item => item !== searchToRemove));
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'trending': return TrendingUp;
      case 'hashtag': return Hash;
      default: return Clock;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'trending': return 'text-green-500';
      case 'hashtag': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Search trending topics, hashtags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          className="pl-10 pr-10 bg-card border-border"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X size={12} />
          </Button>
        )}
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            {/* Recent Searches */}
            {query === '' && recentSearches.length > 0 && (
              <div className="p-3 border-b border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">Recent Searches</h4>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <motion.div
                      key={search}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-2 rounded hover:bg-accent/50 cursor-pointer group"
                      onClick={() => handleSearch(search)}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">{search}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecentSearch(search);
                        }}
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {(query !== '' || recentSearches.length === 0) && (
              <div className="p-3">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  {query ? 'Suggestions' : 'Trending Now'}
                </h4>
                <div className="space-y-1">
                  {(query ? filteredSuggestions : suggestions.slice(0, 6)).map((suggestion, index) => {
                    const IconComponent = getSuggestionIcon(suggestion.type);
                    return (
                      <motion.div
                        key={suggestion.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-2 rounded hover:bg-accent/50 cursor-pointer"
                        onClick={() => handleSearch(suggestion.text)}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent size={14} className={getSuggestionColor(suggestion.type)} />
                          <span className="text-sm text-foreground">{suggestion.text}</span>
                        </div>
                        {suggestion.count && (
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.count >= 1000 
                              ? `${(suggestion.count / 1000).toFixed(1)}K`
                              : suggestion.count
                            }
                          </Badge>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {query && filteredSuggestions.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                <Search size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No suggestions found</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrendingSearchBar;
