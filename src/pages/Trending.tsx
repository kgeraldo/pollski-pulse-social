
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

            {/* Enhanced Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">2,847</div>
                <div className="text-sm text-muted-foreground">Trending Topics</div>
                <div className="text-xs text-green-500 mt-1">+12% today</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">156K</div>
                <div className="text-sm text-muted-foreground">Active Discussions</div>
                <div className="text-xs text-blue-500 mt-1">Live updates</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">89%</div>
                <div className="text-sm text-muted-foreground">Engagement Rate</div>
                <div className="text-xs text-green-500 mt-1">+5% vs yesterday</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">127</div>
                <div className="text-sm text-muted-foreground">Countries Active</div>
                <div className="text-xs text-purple-500 mt-1">Global reach</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <TrendingContent />
            </div>
            
            {/* Middle Column - Analytics & Filters */}
            <div className="lg:col-span-2 space-y-6">
              <TrendingFilters />
              <TrendingDashboard />
              <TrendingMap />
            </div>
            
            {/* Right Column - Insights & Predictions */}
            <div className="lg:col-span-1 space-y-6">
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
