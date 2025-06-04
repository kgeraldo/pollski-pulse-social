
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ActivityWidget from './ActivityWidget';
import UserSuggestions from './UserSuggestions';
import TrendingTopics from './TrendingTopics';
import ProfileCard from './ProfileCard';
import NotificationSystem from './NotificationSystem';
import { Calendar, Settings, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EnhancedRightSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'activity' | 'profile' | 'notifications'>('activity');

  // Mock data
  const mockUser = {
    id: '1',
    name: 'Alex Johnson',
    username: '@alexjohnson',
    bio: 'Frontend Developer | React Enthusiast | Coffee Lover ☕ Building amazing user experiences one component at a time.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop',
    location: 'San Francisco, CA',
    joinedDate: 'March 2023',
    website: 'https://alexjohnson.dev',
    followers: 1247,
    following: 892,
    posts: 156,
    isVerified: true,
    isPremium: true,
    isFollowing: false
  };

  const mockNotifications = [
    {
      id: '1',
      type: 'like' as const,
      title: 'New likes on your post',
      message: 'Sarah and 12 others liked your post about React 19 features',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      isNew: true
    },
    {
      id: '2',
      type: 'follow' as const,
      title: 'New follower',
      message: 'David Rodriguez started following you',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: false,
      isNew: true
    },
    {
      id: '3',
      type: 'comment' as const,
      title: 'New comment',
      message: 'Emily commented on your post: "This is exactly what I was looking for!"',
      timestamp: '2024-01-15T08:45:00Z',
      isRead: true,
      isNew: false
    },
    {
      id: '4',
      type: 'achievement' as const,
      title: 'Achievement unlocked!',
      message: 'You reached 1000 followers! Keep up the great work.',
      timestamp: '2024-01-14T16:20:00Z',
      isRead: true,
      isNew: false
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'React Meetup',
      date: '2024-01-20',
      time: '6:00 PM',
      location: 'Tech Hub SF'
    },
    {
      id: '2',
      title: 'Frontend Workshop',
      date: '2024-01-22',
      time: '2:00 PM',
      location: 'Online'
    }
  ];

  const tabs = [
    { id: 'activity', label: 'Activity', icon: Users },
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ] as const;

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-700 p-4 overflow-y-auto h-screen">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Tab Navigation */}
        <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 h-8 text-xs transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-transparent text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Icon size={12} className="mr-1.5" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeTab === 'activity' && (
            <>
              <ActivityWidget />
              <UserSuggestions />
              <TrendingTopics />
            </>
          )}

          {activeTab === 'profile' && (
            <>
              <ProfileCard
                user={mockUser}
                onFollow={(userId) => console.log('Follow user:', userId)}
                onMessage={(userId) => console.log('Message user:', userId)}
              />
              
              {/* Upcoming Events */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                  <Calendar size={18} />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-700/30 rounded-lg p-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    >
                      <h4 className="text-white font-medium text-sm">{event.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">
                        {event.date} at {event.time}
                      </p>
                      <p className="text-slate-500 text-xs">{event.location}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <NotificationSystem
              notifications={mockNotifications}
              onMarkAsRead={(id) => console.log('Mark as read:', id)}
              onMarkAllAsRead={() => console.log('Mark all as read')}
              onDismiss={(id) => console.log('Dismiss:', id)}
              onClearAll={() => console.log('Clear all notifications')}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnhancedRightSidebar;
