
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Share2, MessageCircle, Heart } from 'lucide-react';

interface PostStatsProps {
  views: number;
  shares: number;
  comments: number;
  likes: number;
  isCompact?: boolean;
}

const PostStats: React.FC<PostStatsProps> = ({
  views,
  shares,
  comments,
  likes,
  isCompact = false
}) => {
  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const stats = [
    { icon: Eye, count: views, label: 'Views', color: 'text-slate-400' },
    { icon: Heart, count: likes, label: 'Likes', color: 'text-red-400' },
    { icon: MessageCircle, count: comments, label: 'Comments', color: 'text-blue-400' },
    { icon: Share2, count: shares, label: 'Shares', color: 'text-green-400' }
  ];

  if (isCompact) {
    return (
      <div className="flex items-center gap-4 text-xs text-slate-400">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex items-center gap-1"
          >
            <stat.icon size={12} className={stat.color} />
            <span>{formatCount(stat.count)}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="text-center cursor-pointer group"
        >
          <div className={`w-8 h-8 mx-auto mb-1 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-slate-600 transition-colors ${stat.color}`}>
            <stat.icon size={14} />
          </div>
          <div className="text-white font-semibold text-sm">
            {formatCount(stat.count)}
          </div>
          <div className="text-slate-400 text-xs">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PostStats;
