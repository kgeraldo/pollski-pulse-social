
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortAsc, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookmarkSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const BookmarkSearch: React.FC<BookmarkSearchProps> = ({
  onSearch,
  onFilterChange,
  onSortChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All', count: 24 },
    { id: 'articles', label: 'Articles', count: 12 },
    { id: 'videos', label: 'Videos', count: 6 },
    { id: 'tools', label: 'Tools', count: 4 },
    { id: 'tutorials', label: 'Tutorials', count: 8 }
  ];

  const tags = ['React', 'TypeScript', 'Design', 'AI', 'Frontend', 'Backend'];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          type="text"
          placeholder="Search your bookmarks..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-card border-border"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
          <Button size="sm" variant="ghost">
            <Filter size={16} />
          </Button>
          <Button size="sm" variant="ghost">
            <SortAsc size={16} />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            size="sm"
            variant={activeFilter === filter.id ? "default" : "outline"}
            onClick={() => handleFilterClick(filter.id)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            {filter.label}
            <Badge variant="secondary" className="text-xs">
              {filter.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Popular Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <Tag size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Popular tags:</span>
        {tags.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSearch(`#${tag}`)}
            className="text-xs bg-accent hover:bg-accent/80 text-accent-foreground px-2 py-1 rounded-full transition-colors"
          >
            #{tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BookmarkSearch;
