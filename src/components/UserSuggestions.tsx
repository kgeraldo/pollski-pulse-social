
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified: boolean;
  mutualConnections: number;
}

const UserSuggestions: React.FC = () => {
  const [followedUsers, setFollowedUsers] = React.useState<Set<string>>(new Set());

  const suggestedUsers: User[] = [
    {
      id: '1',
      name: 'Alex Chen',
      username: '@alexchen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      isVerified: true,
      mutualConnections: 5
    },
    {
      id: '2',
      name: 'Sarah Kim',
      username: '@sarahkim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      isVerified: false,
      mutualConnections: 3
    },
    {
      id: '3',
      name: 'David Rodriguez',
      username: '@davidr',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      isVerified: true,
      mutualConnections: 8
    }
  ];

  const handleFollow = (userId: string) => {
    setFollowedUsers(prev => new Set([...prev, userId]));
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
      <h3 className="text-white font-semibold text-lg mb-4">Suggested for you</h3>
      <div className="space-y-3">
        {suggestedUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-white font-medium text-sm truncate">{user.name}</span>
                {user.isVerified && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check size={8} className="text-white" />
                  </div>
                )}
              </div>
              <div className="text-slate-400 text-xs">{user.username}</div>
              <div className="text-slate-500 text-xs">{user.mutualConnections} mutual connections</div>
            </div>
            <Button
              size="sm"
              onClick={() => handleFollow(user.id)}
              disabled={followedUsers.has(user.id)}
              className={`h-7 px-3 text-xs ${
                followedUsers.has(user.id)
                  ? 'bg-green-600/20 text-green-400 border-green-500/30'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {followedUsers.has(user.id) ? (
                <>
                  <Check size={12} className="mr-1" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus size={12} className="mr-1" />
                  Follow
                </>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
      <Button
        variant="ghost"
        className="w-full mt-4 text-blue-400 hover:text-blue-300 text-sm"
      >
        See more suggestions
      </Button>
    </div>
  );
};

export default UserSuggestions;
