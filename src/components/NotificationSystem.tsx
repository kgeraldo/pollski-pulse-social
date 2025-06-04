
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Heart, MessageCircle, UserPlus, Share2, Trophy, Gift, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'share' | 'achievement' | 'gift' | 'mention';
  title: string;
  message: string;
  avatar?: string;
  timestamp: string;
  isRead: boolean;
  isNew: boolean;
  actionUrl?: string;
  metadata?: {
    postId?: string;
    userId?: string;
    achievementType?: string;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
  onClearAll: () => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onClearAll
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { size: 16, className: 'text-white' };
    
    switch (type) {
      case 'like':
        return <Heart {...iconProps} className="text-red-400" />;
      case 'comment':
        return <MessageCircle {...iconProps} className="text-blue-400" />;
      case 'follow':
        return <UserPlus {...iconProps} className="text-green-400" />;
      case 'share':
        return <Share2 {...iconProps} className="text-purple-400" />;
      case 'achievement':
        return <Trophy {...iconProps} className="text-yellow-400" />;
      case 'gift':
        return <Gift {...iconProps} className="text-pink-400" />;
      case 'mention':
        return <MessageCircle {...iconProps} className="text-orange-400" />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return 'bg-red-600/20';
      case 'comment':
        return 'bg-blue-600/20';
      case 'follow':
        return 'bg-green-600/20';
      case 'share':
        return 'bg-purple-600/20';
      case 'achievement':
        return 'bg-yellow-600/20';
      case 'gift':
        return 'bg-pink-600/20';
      case 'mention':
        return 'bg-orange-600/20';
      default:
        return 'bg-slate-600/20';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.isRead
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg max-h-96 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <Bell size={20} />
            Notifications
            {unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onMarkAllAsRead}
              disabled={unreadCount === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7 px-2"
            >
              Mark all read
            </Button>
            <Button
              size="sm"
              onClick={onClearAll}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs h-7 px-2"
            >
              Clear all
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => setFilter('all')}
            className={`text-xs h-7 px-3 ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            All ({notifications.length})
          </Button>
          <Button
            size="sm"
            onClick={() => setFilter('unread')}
            className={`text-xs h-7 px-3 ${
              filter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Unread ({unreadCount})
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell size={32} className="text-slate-500 mx-auto mb-2" />
              <p className="text-slate-400">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors relative ${
                  !notification.isRead ? 'bg-slate-700/20' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center shrink-0`}>
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      getNotificationIcon(notification.type)
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm mb-1">{notification.title}</h4>
                        <p className="text-slate-300 text-xs leading-relaxed">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-slate-500 text-xs">{formatTimeAgo(notification.timestamp)}</span>
                          {notification.isNew && (
                            <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {!notification.isRead && (
                          <Button
                            size="sm"
                            onClick={() => onMarkAsRead(notification.id)}
                            className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 h-6 w-6 p-0"
                            title="Mark as read"
                          >
                            <Check size={10} />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => onDismiss(notification.id)}
                          className="bg-red-600/20 hover:bg-red-600/30 text-red-400 h-6 w-6 p-0"
                          title="Dismiss"
                        >
                          <X size={10} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {!notification.isRead && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r" />
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationSystem;
