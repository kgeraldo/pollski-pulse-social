
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Filter, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import TrendingContent from '@/components/TrendingContent';
import LiveTrendingIndicator from '@/components/trending/LiveTrendingIndicator';
import TrendingMap from '@/components/trending/TrendingMap';
import TrendingAnalytics from '@/components/trending/TrendingAnalytics';
import TrendingFilters from '@/components/trending/TrendingFilters';
import TrendingSentiment from '@/components/trending/TrendingSentiment';
import TrendingPredictions from '@/components/trending/TrendingPredictions';
import TrendingDashboard from '@/components/trending/TrendingDashboard';
import TrendingHashtags from '@/components/trending/TrendingHashtags';
import TrendingInfluencers from '@/components/trending/TrendingInfluencers';
import TrendingNews from '@/components/trending/TrendingNews';
import TrendingStats from '@/components/trending/TrendingStats';
import { Button } from '@/components/ui/button';

const Trending = () => {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      <div className="flex-1 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto p-6"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Trending</h1>
                  <p className="text-muted-foreground">What's happening right now</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Clock size={16} className="mr-2" />
                  Real-time
                </Button>
              </div>
            </div>

            {/* Live Trending Indicator */}
            <LiveTrendingIndicator />

            {/* Enhanced Real-time Stats */}
            <TrendingStats />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-4 space-y-6">
              <TrendingContent />
            </div>
            
            {/* Middle Column - Analytics & Interactive Features */}
            <div className="lg:col-span-5 space-y-6">
              <TrendingFilters />
              <TrendingDashboard />
              <TrendingNews />
              <TrendingMap />
            </div>
            
            {/* Right Column - Insights & Social Features */}
            <div className="lg:col-span-3 space-y-6">
              <TrendingHashtags />
              <TrendingInfluencers />
              <TrendingAnalytics />
              <TrendingSentiment />
              <TrendingPredictions />
            </div>
          </div>
        </motion.div>
      </div>

      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Trending;
