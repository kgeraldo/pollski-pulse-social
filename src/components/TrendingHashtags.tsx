
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Hash } from 'lucide-react';

interface HashtagTrend {
  tag: string;
  posts: number;
  change: number;
  category: string;
}

const TrendingHashtags: React.FC = () => {
  const trends: HashtagTrend[] = [
    { tag: 'react19', posts: 1247, change: 23, category: 'Technology' },
    { tag: 'ai', posts: 2156, change: 18, category: 'Technology' },
    { tag: 'frontend', posts: 892, change: 31, category: 'Development' },
    { tag: 'design', posts: 1534, change: 12, category: 'Design' },
    { tag: 'startup', posts: 743, change: 8, category: 'Business' },
    { tag: 'productivity', posts: 621, change: 15, category: 'Lifestyle' }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-green-400" />
        <h3 className="text-white font-semibold text-lg">Trending Hashtags</h3>
      </div>
      
      <div className="space-y-3">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.tag}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600/20 rounded-lg text-blue-400">
                <span className="text-xs font-bold">#{index + 1}</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Hash size={14} className="text-slate-400" />
                  <span className="text-white font-medium group-hover:text-blue-300 transition-colors">
                    {trend.tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-400 text-xs">{formatNumber(trend.posts)} posts</span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-slate-400 text-xs">{trend.category}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <TrendingUp size={12} className="text-green-400" />
              <span className="text-green-400 text-xs font-semibold">+{trend.change}%</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="w-full mt-4 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors py-2 rounded-lg hover:bg-slate-700/30"
      >
        View all trends →
      </motion.button>
    </div>
  );
};

export default TrendingHashtags;
