
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Plus, Search, Filter, Star, Folder, Grid, List, Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BookmarkCollection {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
  isDefault?: boolean;
  createdAt: string;
  lastUpdated: string;
}

interface BookmarkedPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  timestamp: Date;
  collectionId: string;
  preview: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  readTime?: string;
}

const EnhancedBookmarkCollections: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'title'>('recent');

  const collections: BookmarkCollection[] = [
    {
      id: 'all',
      name: 'All Bookmarks',
      description: 'All your saved content',
      count: 24,
      color: 'blue',
      isDefault: true,
      createdAt: '2024-01-01',
      lastUpdated: '2024-01-10'
    },
    {
      id: 'react',
      name: 'React & Frontend',
      description: 'React tips, tutorials, and best practices',
      count: 8,
      color: 'green',
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-09'
    },
    {
      id: 'design',
      name: 'Design Inspiration',
      description: 'UI/UX designs and creative inspiration',
      count: 12,
      color: 'purple',
      createdAt: '2024-01-03',
      lastUpdated: '2024-01-08'
    },
    {
      id: 'productivity',
      name: 'Productivity',
      description: 'Tools and tips for better productivity',
      count: 4,
      color: 'yellow',
      createdAt: '2024-01-07',
      lastUpdated: '2024-01-10'
    }
  ];

  const bookmarks: BookmarkedPost[] = [
    {
      id: '1',
      title: 'React 19 New Features You Need to Know',
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      collectionId: 'react',
      preview: 'Exploring the latest React 19 features including the new compiler, improved hydration, and better performance optimizations...',
      category: 'Technology',
      tags: ['react', 'javascript', 'frontend'],
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Modern UI Design Principles for 2024',
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      collectionId: 'design',
      preview: 'Key principles for creating modern, user-friendly interfaces that provide excellent user experiences and accessibility...',
      category: 'Design',
      tags: ['design', 'ui', 'ux'],
      thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=200&fit=crop',
      readTime: '8 min read'
    },
    {
      id: '3',
      title: 'Productivity Hacks for Developers',
      author: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      collectionId: 'productivity',
      preview: 'Boost your development productivity with these proven techniques, tools, and workflows that successful developers use...',
      category: 'Productivity',
      tags: ['productivity', 'development', 'tools'],
      readTime: '6 min read'
    }
  ];

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCollection = selectedCollection === 'all' || bookmark.collectionId === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'oldest':
        return a.timestamp.getTime() - b.timestamp.getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm"
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={16} />
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
          </Button>
          <Button className="gap-2">
            <Plus size={16} />
            New Collection
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Collections Sidebar */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Collections</h3>
          <div className="space-y-2">
            {collections.map(collection => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedCollection === collection.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${collection.color}-500`} />
                  <div>
                    <div className="font-medium">{collection.name}</div>
                    <div className="text-xs opacity-70">{collection.count} items</div>
                  </div>
                </div>
                <Folder size={16} className="opacity-50" />
              </button>
            ))}
          </div>
        </div>

        {/* Bookmarks Content */}
        <div className="lg:col-span-3">
          {/* Collection Header */}
          {selectedCollection !== 'all' && (
            <div className="mb-6 p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-4 h-4 rounded-full bg-${collections.find(c => c.id === selectedCollection)?.color}-500`} />
                <h2 className="text-xl font-bold text-foreground">
                  {collections.find(c => c.id === selectedCollection)?.name}
                </h2>
              </div>
              <p className="text-muted-foreground">
                {collections.find(c => c.id === selectedCollection)?.description}
              </p>
            </div>
          )}

          {/* Bookmarks Grid/List */}
          {sortedBookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No bookmarks found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try different search terms' : 'Start bookmarking posts to see them here'}
              </p>
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              <AnimatePresence>
                {sortedBookmarks.map((bookmark, index) => (
                  <motion.div
                    key={bookmark.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                      {viewMode === 'grid' && bookmark.thumbnail && (
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={bookmark.thumbnail}
                            alt={bookmark.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="text-xs">
                              {bookmark.category}
                            </Badge>
                          </div>
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className={`flex gap-3 ${viewMode === 'list' ? 'items-start' : 'flex-col'}`}>
                          {viewMode === 'list' && bookmark.thumbnail && (
                            <img
                              src={bookmark.thumbnail}
                              alt={bookmark.title}
                              className="w-20 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                              {bookmark.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {bookmark.preview}
                            </p>
                            <div className="flex items-center gap-3 mb-3">
                              <img
                                src={bookmark.avatar}
                                alt={bookmark.author}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm text-muted-foreground">{bookmark.author}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{formatTime(bookmark.timestamp)}</span>
                              {bookmark.readTime && (
                                <>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">{bookmark.readTime}</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {bookmark.tags.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center gap-1">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Star size={14} />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Tag size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedBookmarkCollections;
