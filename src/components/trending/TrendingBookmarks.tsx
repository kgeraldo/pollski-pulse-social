
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkPlus, BookmarkMinus, Star, Tag, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface BookmarkedTrend {
  id: string;
  name: string;
  category: string;
  bookmarkedAt: string;
  peakValue: number;
  currentValue: number;
  tags: string[];
  favorite: boolean;
}

const TrendingBookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkedTrend[]>([
    {
      id: '1',
      name: 'AI Development',
      category: 'Technology',
      bookmarkedAt: '2h ago',
      peakValue: 15420,
      currentValue: 14890,
      tags: ['tech', 'ai', 'development'],
      favorite: true
    },
    {
      id: '2',
      name: 'React 19',
      category: 'Programming',
      bookmarkedAt: '1d ago',
      peakValue: 8934,
      currentValue: 9200,
      tags: ['react', 'frontend', 'web'],
      favorite: false
    },
    {
      id: '3',
      name: 'Climate Tech',
      category: 'Environment',
      bookmarkedAt: '3d ago',
      peakValue: 6543,
      currentValue: 5890,
      tags: ['climate', 'sustainability'],
      favorite: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || bookmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setBookmarks(prev => 
      prev.map(bookmark => 
        bookmark.id === id ? { ...bookmark, favorite: !bookmark.favorite } : bookmark
      )
    );
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const getChangePercentage = (current: number, peak: number) => {
    return Math.round(((current - peak) / peak) * 100);
  };

  const categories = ['all', ...Array.from(new Set(bookmarks.map(b => b.category)))];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bookmark className="text-purple-500" size={18} />
          Saved Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="space-y-2">
          <Input
            placeholder="Search saved trends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm"
          />
          <div className="flex gap-1 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="h-7 text-xs capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Bookmarks List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredBookmarks.map((bookmark, index) => {
            const changePercent = getChangePercentage(bookmark.currentValue, bookmark.peakValue);
            return (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-accent/30 rounded-lg border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground text-sm">{bookmark.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0"
                        onClick={() => toggleFavorite(bookmark.id)}
                      >
                        <Star
                          size={12}
                          className={bookmark.favorite ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}
                        />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">{bookmark.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={10} />
                        {bookmark.bookmarkedAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      {bookmark.tags.map(tag => (
                        <div key={tag} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Tag size={8} />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBookmark(bookmark.id)}
                    className="h-6 w-6 p-0"
                  >
                    <BookmarkMinus size={12} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-muted-foreground">Peak Value</div>
                    <div className="font-semibold text-foreground">{bookmark.peakValue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Current</div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-foreground">{bookmark.currentValue.toLocaleString()}</span>
                      <span className={`text-xs ${changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ({changePercent >= 0 ? '+' : ''}{changePercent}%)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredBookmarks.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Bookmark size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No saved trends found</p>
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full">
          <BookmarkPlus size={12} className="mr-2" />
          Add Current Trend
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingBookmarks;
