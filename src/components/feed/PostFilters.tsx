
import React from 'react';
import { Users, TrendingUp, Clock, Bookmark, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface PostFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterOptions: FilterOption[] = [
  { value: 'all', label: 'All Posts', icon: Users },
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'recent', label: 'Recent', icon: Clock },
  { value: 'bookmarked', label: 'Bookmarked', icon: Bookmark }
];

const PostFilters: React.FC<PostFiltersProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="mb-4">
      <div className="flex gap-1.5 overflow-x-auto">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={activeFilter === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange(option.value)}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-all duration-160 text-xs h-8 ${
              activeFilter === option.value
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
            }`}
          >
            <option.icon size={12} />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PostFilters;
