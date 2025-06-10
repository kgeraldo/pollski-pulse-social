
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, TrendingUp } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import CommunityGroups from '@/components/CommunityGroups';
import CommunityActivity from '@/components/community/CommunityActivity';
import CommunityDiscovery from '@/components/community/CommunityDiscovery';
import CommunityInsights from '@/components/community/CommunityInsights';
import { Button } from '@/components/ui/button';

const Community = () => {
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Community</h1>
                  <p className="text-muted-foreground">Connect with like-minded people</p>
                </div>
              </div>
              <Button className="gap-2">
                <Plus size={16} />
                Create Community
              </Button>
            </div>

            {/* Enhanced Community Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">147</div>
                <div className="text-sm text-muted-foreground">Communities</div>
                <div className="text-xs text-green-500 mt-1">+8 this week</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">12.4K</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
                <div className="text-xs text-blue-500 mt-1">+234 new</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">89</div>
                <div className="text-sm text-muted-foreground">Active Events</div>
                <div className="text-xs text-purple-500 mt-1">This month</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">23%</div>
                <div className="text-sm text-muted-foreground">Growth Rate</div>
                <div className="text-xs text-green-500 mt-1">Monthly</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CommunityGroups />
            </div>
            <div className="space-y-6">
              <CommunityActivity />
              <CommunityDiscovery />
            </div>
            <div>
              <CommunityInsights />
            </div>
          </div>
        </motion.div>
      </div>

      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Community;
