
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Calendar, Tag, User, TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterOptions {
  category: string;
  timeRange: string;
  sortBy: string;
  minRating: number;
  author: string;
  tags: string[];
}

interface AdvancedSearchFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const categories = ['All', 'Technology', 'Design', 'Business', 'Education', 'Photography', 'Entertainment'];
  const timeRanges = ['All Time', 'Today', 'This Week', 'This Month', 'This Year'];
  const sortOptions = ['Most Recent', 'Most Popular', 'Highest Rated', 'Most Comments'];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      category: 'All',
      timeRange: 'All Time',
      sortBy: 'Most Recent',
      minRating: 0,
      author: '',
      tags: []
    };
    setFilters(resetFilters);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <Filter className="text-blue-400" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Advanced Filters</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-400 hover:text-white h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                  <Tag size={16} />
                  Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilters(prev => ({ ...prev, category }))}
                      className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                        filters.category === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Range */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                  <Calendar size={16} />
                  Time Range
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {timeRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setFilters(prev => ({ ...prev, timeRange: range }))}
                      className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                        filters.timeRange === range
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                  <TrendingUp size={16} />
                  Sort By
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setFilters(prev => ({ ...prev, sortBy: option }))}
                      className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                        filters.sortBy === option
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                  <Star size={16} />
                  Minimum Rating
                </label>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                      className={`p-2 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                        filters.minRating === rating
                          ? 'bg-yellow-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      <Star size={14} className={rating > 0 ? 'fill-current' : ''} />
                      {rating === 0 ? 'Any' : rating}
                    </button>
                  ))}
                </div>
              </div>

              {/* Author Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                  <User size={16} />
                  Author
                </label>
                <Input
                  type="text"
                  placeholder="Search by author name..."
                  value={filters.author}
                  onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-700">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Reset Filters
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedSearchFilter;
