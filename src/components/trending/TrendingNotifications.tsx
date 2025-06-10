
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, Zap, TrendingUp, Settings, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'spike' | 'new' | 'milestone';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const TrendingNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'spike',
      title: 'AI Trending Spike',
      message: 'AI mentions increased by 234% in the last hour',
      timestamp: '2 min ago',
      read: false
    },
    {
      id: '2',
      type: 'new',
      title: 'New Trending Topic',
      message: 'React 19 is now trending #3',
      timestamp: '15 min ago',
      read: false
    },
    {
      id: '3',
      type: 'milestone',
      title: 'Milestone Reached',
      message: 'WebDev hashtag reached 10K mentions',
      timestamp: '1h ago',
      read: true
    }
  ]);

  const [settings, setSettings] = useState({
    enabled: true,
    spikes: true,
    newTrends: true,
    milestones: false
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'spike': return Zap;
      case 'new': return TrendingUp;
      case 'milestone': return Bell;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'spike': return 'text-yellow-500';
      case 'new': return 'text-blue-500';
      case 'milestone': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  useEffect(() => {
    if (settings.enabled) {
      const interval = setInterval(() => {
        // Simulate new notifications
        if (Math.random() > 0.8) {
          const newNotif: Notification = {
            id: Date.now().toString(),
            type: 'spike',
            title: 'Live Update',
            message: 'New trending activity detected',
            timestamp: 'just now',
            read: false
          };
          setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
        }
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [settings.enabled]);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-2">
            <Bell className="text-blue-500" size={18} />
            Trending Alerts
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
          >
            {settings.enabled ? <Bell size={14} /> : <BellOff size={14} />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Notification Settings */}
        <div className="space-y-3 p-3 bg-accent/30 rounded-lg">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Settings size={14} />
            Alert Settings
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Spike Alerts</span>
              <Switch
                checked={settings.spikes}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, spikes: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">New Trends</span>
              <Switch
                checked={settings.newTrends}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, newTrends: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Milestones</span>
              <Switch
                checked={settings.milestones}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, milestones: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {notifications.map((notification, index) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    notification.read 
                      ? 'bg-accent/20 border-border' 
                      : 'bg-accent/40 border-blue-500/30'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <Icon className={getNotificationColor(notification.type)} size={14} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{notification.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{notification.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">{notification.timestamp}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                    >
                      <X size={10} />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Bell size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingNotifications;
