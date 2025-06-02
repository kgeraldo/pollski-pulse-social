
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Calendar, User, Hash, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  isOpen,
  onClose,
  onApplyFilters
}) => {
  const [activeFilters, setActiveFilters] = useState({
    contentType: 'all',
    dateRange: 'all',
    sortBy: 'recent'
  });

  const contentTypes = [
    { id: 'all', label: 'All Content', icon: FileText },
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'users', label: 'People', icon: User },
    { id: 'hashtags', label: 'Hashtags', icon: Hash }
  ];

  const dateRanges = [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'relevant', label: 'Most Relevant' }
  ];

  const handleApply = () => {
    onApplyFilters(activeFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 mb-6">
            <Filter size={20} className="text-blue-400" />
            <h2 className="text-white font-semibold text-lg">Search Filters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-white font-medium mb-3">Content Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveFilters(prev => ({ ...prev, contentType: type.id }))}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                      activeFilters.contentType === type.id
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <type.icon size={14} />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-3">Date Range</h3>
              <div className="space-y-2">
                {dateRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setActiveFilters(prev => ({ ...prev, dateRange: range.id }))}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                      activeFilters.dateRange === range.id
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Calendar size={14} />
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-3">Sort By</h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveFilters(prev => ({ ...prev, sortBy: option.id }))}
                    className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                      activeFilters.sortBy === option.id
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchFilters;
