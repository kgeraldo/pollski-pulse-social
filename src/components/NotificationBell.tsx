
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Heart, MessageSquare, UserPlus, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'achievement' | 'message';
  title: string;
  message: string;
  avatar?: string;
  timestamp: Date;
  isRead: boolean;
  isNew: boolean;
}

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: 'New likes',
      message: 'Sarah and 5 others liked your post',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false,
      isNew: true
    },
    {
      id: '2',
      type: 'follow',
      title: 'New follower',
      message: 'David Rodriguez started following you',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isRead: false,
      isNew: true
    },
    {
      id: '3',
      type: 'comment',
      title: 'New comment',
      message: 'Emily commented on your post',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: true,
      isNew: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return Heart;
      case 'comment': return MessageSquare;
      case 'follow': return UserPlus;
      case 'achievement': return Award;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like': return 'text-red-400';
      case 'comment': return 'text-blue-400';
      case 'follow': return 'text-green-400';
      case 'achievement': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true, isNew: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true, isNew: false })));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-transparent hover:bg-slate-700/50 text-slate-300 h-10 w-10 p-0 rounded-full"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-12 right-0 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-white font-semibold">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    onClick={markAllAsRead}
                    className="text-blue-400 hover:text-blue-300 text-xs bg-transparent hover:bg-slate-700/50 h-auto p-1"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-300 bg-transparent hover:bg-slate-700/50 h-auto p-1"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-80">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-slate-400">
                  <Bell size={40} className="mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer transition-colors ${
                        !notification.isRead ? 'bg-slate-700/20' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full bg-slate-700 ${getIconColor(notification.type)}`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                            {notification.isNew && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm mt-1">{notification.message}</p>
                          <p className="text-slate-500 text-xs mt-1">{formatTime(notification.timestamp)}</p>
                        </div>
                        {notification.avatar && (
                          <img
                            src={notification.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
