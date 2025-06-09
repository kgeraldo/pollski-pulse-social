
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const LiveTrendingIndicator: React.FC = () => {
  const [liveData, setLiveData] = useState({
    activeUsers: 2847,
    newPosts: 156,
    discussions: 23,
    trending: 'React 19'
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        newPosts: prev.newPosts + Math.floor(Math.random() * 3),
        discussions: prev.discussions + Math.floor(Math.random() * 2),
        trending: prev.trending
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-semibold text-sm">LIVE</span>
          </div>
          <Zap className="text-orange-400" size={16} />
          <span className="text-white font-medium">Trending Now</span>
        </div>
        <Badge variant="secondary" className="bg-red-600/20 text-red-300">
          #{liveData.trending}
        </Badge>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <motion.div
            key={liveData.activeUsers}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-white font-bold text-lg"
          >
            {liveData.activeUsers.toLocaleString()}
          </motion.div>
          <div className="text-slate-400 text-xs flex items-center justify-center gap-1">
            <Users size={10} />
            Active Users
          </div>
        </div>
        
        <div className="text-center">
          <motion.div
            key={liveData.newPosts}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-white font-bold text-lg"
          >
            +{liveData.newPosts}
          </motion.div>
          <div className="text-slate-400 text-xs flex items-center justify-center gap-1">
            <TrendingUp size={10} />
            New Posts
          </div>
        </div>
        
        <div className="text-center">
          <motion.div
            key={liveData.discussions}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-white font-bold text-lg"
          >
            {liveData.discussions}
          </motion.div>
          <div className="text-slate-400 text-xs flex items-center justify-center gap-1">
            <MessageSquare size={10} />
            Hot Topics
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveTrendingIndicator;
