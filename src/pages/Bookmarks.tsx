
import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Clock, Star } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import EnhancedBookmarkCollections from '@/components/EnhancedBookmarkCollections';

const Bookmarks = () => {
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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Bookmark size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Bookmarks</h1>
                <p className="text-muted-foreground">Your saved content, organized and searchable</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">24</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Bookmark size={12} />
                  Total Saved
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">4</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Star size={12} />
                  Collections
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">3</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Clock size={12} />
                  This Week
                </div>
              </div>
            </div>
          </div>

          <EnhancedBookmarkCollections />
        </motion.div>
      </div>

      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Bookmarks;
