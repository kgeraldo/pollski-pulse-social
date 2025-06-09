
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PollInsightsProps {
  totalPolls: number;
  totalVotes: number;
  activeToday: number;
  participationRate: number;
}

const PollInsights: React.FC<PollInsightsProps> = ({
  totalPolls,
  totalVotes,
  activeToday,
  participationRate
}) => {
  const insights = [
    {
      title: 'Most Active Hour',
      value: '2-3 PM',
      description: 'Peak voting time',
      icon: Clock,
      trend: '+15%',
      color: 'text-blue-400'
    },
    {
      title: 'Top Category',
      value: 'Technology',
      description: 'Most popular polls',
      icon: Award,
      trend: '89 polls',
      color: 'text-green-400'
    },
    {
      title: 'Engagement',
      value: `${participationRate}%`,
      description: 'User participation',
      icon: Users,
      trend: '+8%',
      color: 'text-purple-400'
    },
    {
      title: 'Growth',
      value: '+23%',
      description: 'This week',
      icon: TrendingUp,
      trend: 'vs last week',
      color: 'text-orange-400'
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Poll Insights</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-slate-700/30 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`${insight.color}`} size={16} />
                <span className="text-slate-400 text-sm">{insight.title}</span>
              </div>
              <div className="text-white font-bold text-lg">{insight.value}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{insight.description}</span>
                <span className="text-green-400">{insight.trend}</span>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PollInsights;
