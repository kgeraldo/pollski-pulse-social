
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Menu, Bookmark, MessageCircle, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import NotificationBell from './NotificationBell';
import SearchSuggestionsDropdown from './SearchSuggestionsDropdown';
import QuickSettingsPanel from './QuickSettingsPanel';

interface EnhancedHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAdvancedFilter: () => void;
  onCreatePost: () => void;
  onOpenAuth: () => void;
  onOpenBookmarks?: () => void;
  onOpenChat?: () => void;
}

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAdvancedFilter,
  onCreatePost,
  onOpenAuth,
  onOpenBookmarks,
  onOpenChat
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrlKey: true,
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      },
      description: 'Focus search'
    },
    {
      key: 'n',
      ctrlKey: true,
      action: onCreatePost,
      description: 'Create new post'
    },
    {
      key: ',',
      ctrlKey: true,
      action: () => setShowQuickSettings(true),
      description: 'Open quick settings'
    }
  ]);

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
    setShowSearchSuggestions(true);
  };

  const handleSearchBlur = () => {
    setIsSearchExpanded(false);
    // Delay hiding suggestions to allow for selection
    setTimeout(() => setShowSearchSuggestions(false), 150);
  };

  const handleSuggestionSelect = (suggestion: any) => {
    onSearchChange(suggestion.text);
    setShowSearchSuggestions(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h1 className="text-white font-bold text-xl hidden sm:block">Social Hub</h1>
              </motion.div>
            </div>

            {/* Center Section - Enhanced Search */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <motion.div
                  animate={{ width: isSearchExpanded ? '100%' : 'auto' }}
                  className="relative"
                >
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    placeholder="Search posts, users, hashtags... (Ctrl+K)"
                    className="w-full bg-slate-800/50 text-white placeholder-slate-400 pl-10 pr-20 py-2.5 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors z-10"
                    >
                      <X size={16} />
                    </button>
                  )}
                  
                  <Button
                    onClick={onOpenAdvancedFilter}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-slate-700 text-slate-400 hover:text-white h-8 w-8 p-0"
                    title="Advanced filters"
                  >
                    <Filter size={16} />
                  </Button>

                  {/* Search Suggestions */}
                  <SearchSuggestionsDropdown
                    query={searchQuery}
                    isVisible={showSearchSuggestions}
                    onSelect={handleSuggestionSelect}
                  />
                </motion.div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Quick Actions */}
              <div className="hidden md:flex items-center gap-1">
                <Button
                  onClick={onOpenBookmarks}
                  className="bg-transparent hover:bg-slate-700/50 text-slate-300 hover:text-white h-10 w-10 p-0 rounded-full transition-all"
                  title="Bookmarks"
                >
                  <Bookmark size={20} />
                </Button>
                
                <Button
                  onClick={onOpenChat}
                  className="relative bg-transparent hover:bg-slate-700/50 text-slate-300 hover:text-white h-10 w-10 p-0 rounded-full transition-all"
                  title="Messages"
                >
                  <MessageCircle size={20} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </Button>

                <Button
                  onClick={() => setShowQuickSettings(true)}
                  className="bg-transparent hover:bg-slate-700/50 text-slate-300 hover:text-white h-10 w-10 p-0 rounded-full transition-all"
                  title="Quick Settings (Ctrl+,)"
                >
                  <Settings size={20} />
                </Button>

                <NotificationBell />
              </div>

              {/* Create Post Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={onCreatePost}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all"
                  title="Create Post (Ctrl+N)"
                >
                  <Plus size={16} className="mr-2" />
                  <span className="hidden sm:inline">Create</span>
                </Button>
              </motion.div>

              {/* Profile/Menu */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onOpenAuth}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-600 hover:border-blue-500 transition-colors"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.button>

              {/* Mobile Menu Button */}
              <Button
                className="md:hidden bg-transparent hover:bg-slate-700/50 text-slate-300 h-10 w-10 p-0"
                title="Menu"
              >
                <Menu size={20} />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Quick Settings Panel */}
      <QuickSettingsPanel
        isOpen={showQuickSettings}
        onClose={() => setShowQuickSettings(false)}
      />
    </>
  );
};

export default EnhancedHeader;
