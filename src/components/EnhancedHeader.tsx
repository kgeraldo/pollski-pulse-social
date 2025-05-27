
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Plus, User, LogIn, Filter, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NotificationCenter from './NotificationCenter';
import UserAvatarDropdown from './UserAvatarDropdown';

interface EnhancedHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAdvancedFilter: () => void;
  onCreatePost: () => void;
  onOpenAuth: () => void;
}

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAdvancedFilter,
  onCreatePost,
  onOpenAuth
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const unreadNotifications = 3;

  return (
    <>
      <div className="sticky top-0 bg-slate-900/96 backdrop-blur-lg border-b border-slate-700 p-4 z-40">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="text-white" size={16} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Community</h1>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-slate-400">1.2k online</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={onCreatePost}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 shadow-lg shadow-blue-600/25"
                >
                  <Plus size={12} className="mr-1.5" />
                  Create
                </Button>
                
                <div className="relative">
                  <Button
                    size="sm"
                    onClick={() => setShowNotifications(true)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 h-8 w-8 p-0 relative"
                  >
                    <Bell size={12} />
                    {unreadNotifications > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {unreadNotifications > 9 ? '9+' : unreadNotifications}
                        </span>
                      </div>
                    )}
                  </Button>
                </div>

                <div className="relative">
                  <Button
                    size="sm"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 h-8 w-8 p-0"
                  >
                    <User size={12} />
                  </Button>
                  
                  <UserAvatarDropdown
                    isOpen={showUserDropdown}
                    onClose={() => setShowUserDropdown(false)}
                    onOpenAuth={onOpenAuth}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-slate-400" size={14} />
                  <Input
                    type="text"
                    placeholder="Search posts, users, and topics..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`pl-8 bg-slate-800 border-slate-600 text-white placeholder-slate-400 transition-all duration-200 text-sm h-9 ${
                      isSearchFocused 
                        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10' 
                        : 'focus:border-blue-500 focus:ring-blue-500/16'
                    }`}
                  />
                  {isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 p-2"
                    >
                      <div className="text-xs text-slate-400 mb-2">Recent searches</div>
                      <div className="space-y-1">
                        {['React 19', 'TypeScript tips', 'Web development'].map((term) => (
                          <button
                            key={term}
                            onClick={() => onSearchChange(term)}
                            className="w-full text-left px-2 py-1 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={onOpenAdvancedFilter}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 h-9 px-3"
                >
                  <Filter size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};

export default EnhancedHeader;
