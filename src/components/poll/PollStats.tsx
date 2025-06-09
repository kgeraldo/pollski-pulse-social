
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, Clock } from 'lucide-react';

interface PollStatsProps {
  totalPolls: number;
  totalVotes: number;
  activeToday: number;
  participationRate: number;
}

const PollStats: React.FC<PollStatsProps> = ({
  totalPolls,
  totalVotes,
  activeToday,
  participationRate
}) => {
  const stats = [
    {
      icon: BarChart3,
      label: 'Total Polls',
      value: totalPolls.toLocaleString(),
      color: 'text-blue-400'
    },
    {
      icon: Users,
      label: 'Total Votes',
      value: totalVotes.toLocaleString(),
      color: 'text-green-400'
    },
    {
      icon: Clock,
      label: 'Active Today',
      value: activeToday.toString(),
      color: 'text-yellow-400'
    },
    {
      icon: TrendingUp,
      label: 'Participation',
      value: `${participationRate}%`,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center"
        >
          <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
          <div className="text-white font-bold text-lg">{stat.value}</div>
          <div className="text-slate-400 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default PollStats;
