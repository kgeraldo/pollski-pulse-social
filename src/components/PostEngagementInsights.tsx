
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, Heart, MessageCircle, Share, Users, Clock } from 'lucide-react';

interface EngagementData {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagement_rate: number;
  peak_hour: string;
}

interface PostEngagementInsightsProps {
  data: EngagementData;
  isExpanded: boolean;
}

const PostEngagementInsights: React.FC<PostEngagementInsightsProps> = ({
  data,
  isExpanded
}) => {
  const insights = [
    {
      icon: Eye,
      label: 'Views',
      value: data.views.toLocaleString(),
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      icon: Heart,
      label: 'Likes',
      value: data.likes.toLocaleString(),
      color: 'text-red-400',
      bg: 'bg-red-400/10'
    },
    {
      icon: MessageCircle,
      label: 'Comments',
      value: data.comments.toLocaleString(),
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    {
      icon: Share,
      label: 'Shares',
      value: data.shares.toLocaleString(),
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    }
  ];

  const metrics = [
    {
      icon: Users,
      label: 'Reach',
      value: `${(data.reach / 1000).toFixed(1)}K`,
      description: 'people reached'
    },
    {
      icon: TrendingUp,
      label: 'Engagement',
      value: `${data.engagement_rate}%`,
      description: 'engagement rate'
    },
    {
      icon: Clock,
      label: 'Peak Hour',
      value: data.peak_hour,
      description: 'most active time'
    }
  ];

  if (!isExpanded) {
    return (
      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Eye size={12} />
          {data.views.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp size={12} />
          {data.engagement_rate}%
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-slate-700/30 rounded-lg p-4 mt-3 border border-slate-600/50"
    >
      <h4 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
        <TrendingUp size={16} className="text-blue-400" />
        Engagement Insights
      </h4>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`${insight.bg} rounded-lg p-3 text-center`}
            >
              <Icon size={16} className={`${insight.color} mx-auto mb-1`} />
              <div className="text-white font-semibold text-sm">{insight.value}</div>
              <div className="text-slate-400 text-xs">{insight.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3"
            >
              <Icon size={18} className="text-slate-400" />
              <div>
                <div className="text-white font-medium text-sm">{metric.value}</div>
                <div className="text-slate-400 text-xs">{metric.description}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PostEngagementInsights;
