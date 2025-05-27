
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Heart, MessageCircle, UserPlus, TrendingUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'trending' | 'system';
  title: string;
  message: string;
  avatar?: string;
  timeAgo: string;
  isRead: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: 'New Like',
      message: 'Sarah Chen liked your post about React 19',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=40&h=40&fit=crop',
      timeAgo: '2m ago',
      isRead: false
    },
    {
      id: '2',
      type: 'comment',
      title: 'New Comment',
      message: 'Alex Johnson commented on your React post',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
      timeAgo: '5m ago',
      isRead: false
    },
    {
      id: '3',
      type: 'follow',
      title: 'New Follower',
      message: 'Mike Rodriguez started following you',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
      timeAgo: '1h ago',
      isRead: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="text-red-400" size={16} />;
      case 'comment': return <MessageCircle className="text-blue-400" size={16} />;
      case 'follow': return <UserPlus className="text-green-400" size={16} />;
      case 'trending': return <TrendingUp className="text-purple-400" size={16} />;
      default: return <Bell className="text-slate-400" size={16} />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Bell className="text-blue-400" size={20} />
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={markAllAsRead}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    <Check size={14} className="mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white h-8 w-8 p-0"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="mx-auto text-slate-600 mb-2" size={32} />
                  <p className="text-slate-400">No notifications yet</p>
                </div>
              ) : (
                <div className="p-2">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200 ${
                        notification.isRead 
                          ? 'bg-slate-700/50 hover:bg-slate-700' 
                          : 'bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 relative">
                          {notification.avatar ? (
                            <img
                              src={notification.avatar}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                              {getIcon(notification.type)}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1">
                            {getIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-white truncate">
                              {notification.title}
                            </p>
                            <span className="text-xs text-slate-400 ml-2">
                              {notification.timeAgo}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
