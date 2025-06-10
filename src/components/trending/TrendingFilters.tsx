
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, TrendingUp, Hash, Users, MapPin, Globe2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrendingFiltersProps {
  onFilterChange?: (filters: any) => void;
}

const TrendingFilters: React.FC<TrendingFiltersProps> = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({
    timeRange: '24h',
    category: 'all',
    location: 'global',
    contentType: 'all'
  });

  const categories = [
    { id: 'all', label: 'All Categories', icon: Globe2 },
    { id: 'technology', label: 'Technology', icon: Hash },
    { id: 'business', label: 'Business', icon: TrendingUp },
    { id: 'entertainment', label: 'Entertainment', icon: Users },
    { id: 'sports', label: 'Sports', icon: MapPin },
    { id: 'politics', label: 'Politics', icon: Filter }
  ];

  const timeRanges = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  const handleFilterUpdate = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Filter size={18} />
          Trending Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Time Range */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Time Range</label>
          <div className="flex gap-2 flex-wrap">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                size="sm"
                variant={activeFilters.timeRange === range.value ? "default" : "outline"}
                onClick={() => handleFilterUpdate('timeRange', range.value)}
                className="h-8"
              >
                <Calendar size={12} className="mr-1" />
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Categories</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    size="sm"
                    variant={activeFilters.category === category.id ? "default" : "outline"}
                    onClick={() => handleFilterUpdate('category', category.id)}
                    className="w-full h-9 justify-start"
                  >
                    <Icon size={12} className="mr-2" />
                    <span className="text-xs">{category.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Content Type */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Content Type</label>
          <Select value={activeFilters.contentType} onValueChange={(value) => handleFilterUpdate('contentType', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Content</SelectItem>
              <SelectItem value="posts">Posts</SelectItem>
              <SelectItem value="articles">Articles</SelectItem>
              <SelectItem value="videos">Videos</SelectItem>
              <SelectItem value="discussions">Discussions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {Object.values(activeFilters).some(filter => filter !== 'all' && filter !== 'global') && (
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Active Filters</label>
            <div className="flex gap-1 flex-wrap">
              {Object.entries(activeFilters).map(([key, value]) => {
                if (value === 'all' || value === 'global') return null;
                return (
                  <Badge key={key} variant="secondary" className="text-xs">
                    {value}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingFilters;
