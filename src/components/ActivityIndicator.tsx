
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, TrendingUp, Zap } from 'lucide-react';

interface ActivityStat {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

const ActivityIndicator: React.FC = () => {
  const stats: ActivityStat[] = [
    { icon: Users, label: 'Active Users', value: '1.2k', trend: 'up', color: 'text-green-400' },
    { icon: MessageSquare, label: 'Posts Today', value: '234', trend: 'up', color: 'text-blue-400' },
    { icon: TrendingUp, label: 'Engagement', value: '89%', trend: 'up', color: 'text-purple-400' },
    { icon: Zap, label: 'Server Load', value: 'Low', trend: 'neutral', color: 'text-orange-400' }
  ];

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-slate-800/30 rounded-lg border border-slate-700/50">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center gap-2"
        >
          <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center ${stat.color}`}>
            <stat.icon size={12} />
          </div>
          <div className="text-xs">
            <div className="text-slate-400">{stat.label}</div>
            <div className={`font-semibold ${stat.color}`}>{stat.value}</div>
          </div>
          {stat.trend === 'up' && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityIndicator;
