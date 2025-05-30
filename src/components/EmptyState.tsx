
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'posts' | 'search' | 'notifications' | 'following';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction
}) => {
  const getConfig = () => {
    switch (type) {
      case 'posts':
        return {
          icon: Plus,
          defaultTitle: 'No posts yet',
          defaultDescription: 'Be the first to share something with the community',
          defaultActionLabel: 'Create Post',
          gradient: 'from-blue-500 to-purple-600'
        };
      case 'search':
        return {
          icon: Search,
          defaultTitle: 'No results found',
          defaultDescription: 'Try adjusting your search terms or filters',
          defaultActionLabel: 'Clear Search',
          gradient: 'from-green-500 to-blue-600'
        };
      case 'notifications':
        return {
          icon: Bell,
          defaultTitle: 'No notifications',
          defaultDescription: 'You\'re all caught up! Check back later for updates',
          defaultActionLabel: null,
          gradient: 'from-orange-500 to-red-600'
        };
      case 'following':
        return {
          icon: Users,
          defaultTitle: 'Not following anyone',
          defaultDescription: 'Discover and follow users to see their posts here',
          defaultActionLabel: 'Find Users',
          gradient: 'from-purple-500 to-pink-600'
        };
      default:
        return {
          icon: Plus,
          defaultTitle: 'Nothing here yet',
          defaultDescription: 'Be the first to add some content',
          defaultActionLabel: 'Get Started',
          gradient: 'from-blue-500 to-purple-600'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-16 px-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
      >
        <Icon className="text-white" size={24} />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-xl font-semibold text-white mb-3"
      >
        {title || config.defaultTitle}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed"
      >
        {description || config.defaultDescription}
      </motion.p>

      {(actionLabel || config.defaultActionLabel) && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Button
            onClick={onAction}
            className={`bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl`}
          >
            {actionLabel || config.defaultActionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
