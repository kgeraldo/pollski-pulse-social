
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Share2, Bell, Filter, Download, RefreshCw, Zap, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const TrendingQuickActions: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleBookmarkAll = () => {
    console.log('Bookmarking all trending items...');
  };

  const handleShare = () => {
    console.log('Sharing trending dashboard...');
  };

  const handleExport = () => {
    console.log('Exporting trending data...');
  };

  const quickActions = [
    {
      id: 'bookmark',
      label: 'Bookmark All',
      icon: Bookmark,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20 hover:bg-yellow-500/30',
      action: handleBookmarkAll
    },
    {
      id: 'share',
      label: 'Share Dashboard',
      icon: Share2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20 hover:bg-blue-500/30',
      action: handleShare
    },
    {
      id: 'export',
      label: 'Export Data',
      icon: Download,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20 hover:bg-green-500/30',
      action: handleExport
    },
    {
      id: 'filter',
      label: 'Smart Filter',
      icon: Filter,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20 hover:bg-purple-500/30',
      action: () => console.log('Opening smart filters...')
    }
  ];

  const actionStats = [
    { label: 'Bookmarked', value: 23, icon: Bookmark, color: 'text-yellow-500' },
    { label: 'Shared', value: 8, icon: Share2, color: 'text-blue-500' },
    { label: 'Alerts Set', value: 5, icon: Bell, color: 'text-red-500' }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-2">
            <Zap className="text-orange-500" size={18} />
            Quick Actions
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw 
              size={14} 
              className={isRefreshing ? 'animate-spin' : ''} 
            />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  onClick={action.action}
                  className={`w-full h-16 flex flex-col gap-1 ${action.bgColor} border border-border/50`}
                >
                  <IconComponent size={18} className={action.color} />
                  <span className="text-xs text-foreground">{action.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Action Statistics */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Action Stats</h4>
          {actionStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 bg-accent/30 rounded"
              >
                <div className="flex items-center gap-2">
                  <IconComponent size={14} className={stat.color} />
                  <span className="text-sm text-foreground">{stat.label}</span>
                </div>
                <Badge variant="secondary">{stat.value}</Badge>
              </motion.div>
            );
          })}
        </div>

        {/* Settings Toggles */}
        <div className="space-y-3 pt-2 border-t border-border">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Settings size={14} />
            Quick Settings
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-accent/20 rounded">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-blue-500" />
                <span className="text-sm text-foreground">Push Notifications</span>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between p-2 bg-accent/20 rounded">
              <div className="flex items-center gap-2">
                <RefreshCw size={14} className="text-green-500" />
                <span className="text-sm text-foreground">Auto Refresh</span>
              </div>
              <Switch
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2 p-2 bg-green-500/20 border border-green-500/30 rounded">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-medium">All systems operational</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingQuickActions;
