
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Star, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TrendingTopics from './TrendingTopics';

const EnhancedRightSidebar: React.FC = () => {
  const suggestions = [
    {
      id: 1,
      name: 'Sarah Chen',
      username: '@sarah_dev',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      isVerified: true,
      followers: '2.1k'
    },
    {
      id: 2,
      name: 'Mike Wilson',
      username: '@mike_design',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      isVerified: false,
      followers: '892'
    },
    {
      id: 3,
      name: 'Alex Rivera',
      username: '@alex_code',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      isVerified: true,
      followers: '1.5k'
    }
  ];

  const upcomingEvents = [
    { id: 1, title: 'React Conference 2024', date: 'Dec 15', type: 'Conference' },
    { id: 2, title: 'Web Dev Meetup', date: 'Dec 18', type: 'Meetup' },
    { id: 3, title: 'TypeScript Workshop', date: 'Dec 22', type: 'Workshop' }
  ];

  return (
    <div className="w-80 p-4 bg-slate-900 border-l border-slate-700 overflow-y-auto">
      <div className="space-y-6">
        {/* Trending Topics */}
        <TrendingTopics />

        {/* Suggested Users */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
              Who to Follow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestions.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-600"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-white font-medium text-sm">{user.name}</span>
                      {user.isVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{user.username}</span>
                      <span>•</span>
                      <span>{user.followers} followers</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white h-7 px-3 text-xs"
                >
                  Follow
                </Button>
              </motion.div>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full mt-3 p-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              See more suggestions
            </motion.button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Calendar size={16} className="text-white" />
              </div>
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">{event.date}</span>
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded">
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <Star size={14} className="text-slate-400 hover:text-yellow-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-slate-700">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">142</div>
                <div className="text-xs text-slate-400">Posts Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1.2k</div>
                <div className="text-xs text-slate-400">Total Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">28</div>
                <div className="text-xs text-slate-400">Bookmarks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-xs text-slate-400">Following</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedRightSidebar;
