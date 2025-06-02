
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Share2, UserPlus, Star } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'like' | 'comment' | 'share' | 'follow' | 'rating';
  user: string;
  target: string;
  timestamp: Date;
  avatar?: string;
}

const LiveActivity: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'like',
      user: 'Sarah',
      target: 'React Tutorial',
      timestamp: new Date(Date.now() - 30000),
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=32&h=32&fit=crop'
    },
    {
      id: '2',
      type: 'comment',
      user: 'Mike',
      target: 'TypeScript Guide',
      timestamp: new Date(Date.now() - 60000),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop'
    },
    {
      id: '3',
      type: 'follow',
      user: 'Alex',
      target: 'you',
      timestamp: new Date(Date.now() - 120000),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    
    // Simulate real-time activity
    const interval = setInterval(() => {
      const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
      const newActivity = {
        ...randomActivity,
        id: Math.random().toString(),
        timestamp: new Date()
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like': return Heart;
      case 'comment': return MessageSquare;
      case 'share': return Share2;
      case 'follow': return UserPlus;
      case 'rating': return Star;
      default: return Heart;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'like': return 'text-red-400';
      case 'comment': return 'text-blue-400';
      case 'share': return 'text-green-400';
      case 'follow': return 'text-purple-400';
      case 'rating': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'like': return `liked ${activity.target}`;
      case 'comment': return `commented on ${activity.target}`;
      case 'share': return `shared ${activity.target}`;
      case 'follow': return `started following ${activity.target}`;
      case 'rating': return `rated ${activity.target}`;
      default: return `interacted with ${activity.target}`;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="text-white font-semibold text-sm">Live Activity</h3>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
              >
                <img
                  src={activity.avatar}
                  alt={activity.user}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-600"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-300">
                    <span className="font-medium text-white">{activity.user}</span>
                    {' '}
                    <span>{getActivityText(activity)}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {formatTimeAgo(activity.timestamp)}
                  </div>
                </div>
                <div className={`w-5 h-5 ${getActivityColor(activity.type)}`}>
                  <Icon size={16} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveActivity;
