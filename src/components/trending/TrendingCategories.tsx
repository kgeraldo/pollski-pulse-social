
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Filter, Plus, X, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TrendingCategory {
  id: string;
  name: string;
  count: number;
  growth: number;
  color: string;
  isCustom: boolean;
  isFollowing: boolean;
}

const TrendingCategories: React.FC = () => {
  const [categories, setCategories] = useState<TrendingCategory[]>([
    { id: '1', name: 'Technology', count: 2341, growth: 23, color: 'blue', isCustom: false, isFollowing: true },
    { id: '2', name: 'AI & ML', count: 1876, growth: 45, color: 'purple', isCustom: false, isFollowing: true },
    { id: '3', name: 'Web Development', count: 1654, growth: 18, color: 'green', isCustom: false, isFollowing: false },
    { id: '4', name: 'Startups', count: 987, growth: 34, color: 'orange', isCustom: false, isFollowing: true },
    { id: '5', name: 'Design', count: 743, growth: 12, color: 'pink', isCustom: false, isFollowing: false }
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleFollow = (id: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, isFollowing: !cat.isFollowing } : cat
    ));
  };

  const addCustomCategory = () => {
    if (newCategory.trim()) {
      const customCategory: TrendingCategory = {
        id: Date.now().toString(),
        name: newCategory.trim(),
        count: 0,
        growth: 0,
        color: 'gray',
        isCustom: true,
        isFollowing: true
      };
      setCategories(prev => [...prev, customCategory]);
      setNewCategory('');
      setShowAddForm(false);
    }
  };

  const removeCustomCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
      green: 'bg-green-500/20 border-green-500/30 text-green-400',
      orange: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
      pink: 'bg-pink-500/20 border-pink-500/30 text-pink-400',
      gray: 'bg-gray-500/20 border-gray-500/30 text-gray-400'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const followingCount = categories.filter(cat => cat.isFollowing).length;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-2">
            <Filter className="text-blue-500" size={18} />
            Trending Categories
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {followingCount} following
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAddForm(!showAddForm)}
              className="h-8 w-8 p-0"
            >
              <Plus size={14} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Custom Category */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 bg-accent/30 rounded-lg border border-border"
          >
            <div className="flex gap-2">
              <Input
                placeholder="Add custom category..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomCategory()}
                className="flex-1"
              />
              <Button size="sm" onClick={addCustomCategory}>
                Add
              </Button>
            </div>
          </motion.div>
        )}

        {/* Categories List */}
        <div className="space-y-2">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                category.isFollowing 
                  ? getColorClasses(category.color)
                  : 'bg-accent/20 border-border hover:bg-accent/30'
              }`}
              onClick={() => toggleFollow(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash size={14} className={category.isFollowing ? '' : 'text-muted-foreground'} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium text-sm ${
                        category.isFollowing ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {category.name}
                      </span>
                      {category.isFollowing && (
                        <Star size={12} className="text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatNumber(category.count)} posts
                      </span>
                      {category.growth > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          +{category.growth}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {category.isCustom && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomCategory(category.id);
                      }}
                      className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                    >
                      <X size={12} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {category.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Follow All Trending
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingCategories;
