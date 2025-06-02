
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, Heart } from 'lucide-react';

interface ActivityStat {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  trend: number;
}

const ActivityWidget: React.FC = () => {
  const stats: ActivityStat[] = [
    { label: 'Active Users', value: '2.4k', icon: Users, color: 'text-green-400', trend: 12 },
    { label: 'Posts Today', value: '342', icon: MessageSquare, color: 'text-blue-400', trend: 8 },
    { label: 'Total Likes', value: '15.2k', icon: Heart, color: 'text-red-400', trend: 15 },
    { label: 'Trending', value: '89%', icon: TrendingUp, color: 'text-purple-400', trend: 5 }
  ];

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
      <h3 className="text-white font-semibold text-lg mb-4">Activity Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-700/30 rounded-lg p-3 text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <stat.icon size={20} className={stat.color} />
            </div>
            <div className="text-white font-bold text-lg">{stat.value}</div>
            <div className="text-slate-400 text-xs">{stat.label}</div>
            <div className="flex items-center justify-center mt-1">
              <span className="text-green-400 text-xs">+{stat.trend}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityWidget;
