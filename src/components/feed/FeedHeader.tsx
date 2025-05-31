
import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface FeedHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterOptions: FilterOption[] = [
  { value: 'all', label: 'All Posts', icon: Users },
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'recent', label: 'Recent', icon: Clock }
];

const FeedHeader: React.FC<FeedHeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange
}) => {
  return (
    <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-6 z-10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-white mb-1">Community Feed</h1>
          <p className="text-slate-400 text-sm font-medium">Share your thoughts and connect with others</p>
        </motion.div>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <Input
              type="text"
              placeholder="Search posts and users..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={activeFilter === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange(option.value)}
                className={`flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                  activeFilter === option.value
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                }`}
              >
                <option.icon size={16} />
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedHeader;
