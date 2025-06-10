
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Clock, Star, TrendingUp, Eye, Filter } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import EnhancedBookmarkCollections from '@/components/EnhancedBookmarkCollections';
import BookmarkSearch from '@/components/bookmarks/BookmarkSearch';
import BookmarkAnalytics from '@/components/bookmarks/BookmarkAnalytics';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Bookmarks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    console.log('Filter changed to:', filter);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    console.log('Sort changed to:', sort);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      <div className="flex-1 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto p-6"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Bookmark size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Bookmarks</h1>
                  <p className="text-muted-foreground">Your saved content, organized and searchable</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Advanced Filters
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp size={16} className="mr-2" />
                  Sort by Trending
                </Button>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">24</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Bookmark size={12} />
                  Total Saved
                </div>
                <div className="text-xs text-green-500 mt-1">+3 this week</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">4</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Star size={12} />
                  Collections
                </div>
                <div className="text-xs text-blue-500 mt-1">Organized</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">3</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Clock size={12} />
                  This Week
                </div>
                <div className="text-xs text-purple-500 mt-1">Recent adds</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">18</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Eye size={12} />
                  Articles Read
                </div>
                <div className="text-xs text-green-500 mt-1">75% completion</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">4.2h</div>
                <div className="text-sm text-muted-foreground">Reading Time</div>
                <div className="text-xs text-orange-500 mt-1">This month</div>
              </div>
            </div>

            {/* Search and Filters */}
            <BookmarkSearch
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Main Content with Tabs */}
          <Tabs defaultValue="collections" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="collections">
              <EnhancedBookmarkCollections />
            </TabsContent>

            <TabsContent value="recent">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <EnhancedBookmarkCollections />
                </div>
                <div>
                  <BookmarkAnalytics />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BookmarkAnalytics />
                <div className="space-y-6">
                  {/* Additional analytics components can go here */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Reading Goals</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-500 mb-2">75%</div>
                      <p className="text-sm text-muted-foreground">Monthly reading goal progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Bookmarks;
