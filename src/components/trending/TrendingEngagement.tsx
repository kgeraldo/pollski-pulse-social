
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Eye, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface EngagementMetric {
  type: 'likes' | 'comments' | 'shares' | 'bookmarks' | 'views' | 'reactions';
  count: number;
  change: number;
  percentage: number;
}

const TrendingEngagement: React.FC = () => {
  const [metrics, setMetrics] = useState<EngagementMetric[]>([
    { type: 'likes', count: 47823, change: 12, percentage: 85 },
    { type: 'comments', count: 8934, change: 8, percentage: 67 },
    { type: 'shares', count: 15672, change: 23, percentage: 92 },
    { type: 'bookmarks', count: 3245, change: 15, percentage: 45 },
    { type: 'views', count: 234567, change: 5, percentage: 78 },
    { type: 'reactions', count: 12890, change: 18, percentage: 89 }
  ]);

  const [totalEngagement, setTotalEngagement] = useState(98.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        count: metric.count + Math.floor(Math.random() * 10),
        change: Math.max(-5, Math.min(30, metric.change + (Math.random() * 4 - 2))),
        percentage: Math.max(0, Math.min(100, metric.percentage + (Math.random() * 6 - 3)))
      })));
      
      setTotalEngagement(prev => Math.max(90, Math.min(100, prev + (Math.random() * 2 - 1))));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'likes': return Heart;
      case 'comments': return MessageCircle;
      case 'shares': return Share2;
      case 'bookmarks': return Bookmark;
      case 'views': return Eye;
      case 'reactions': return ThumbsUp;
      default: return Heart;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'likes': return 'text-red-500';
      case 'comments': return 'text-blue-500';
      case 'shares': return 'text-green-500';
      case 'bookmarks': return 'text-yellow-500';
      case 'views': return 'text-purple-500';
      case 'reactions': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-2">
            <Heart className="text-red-500" size={18} />
            Live Engagement
          </div>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
            {totalEngagement.toFixed(1)}% Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Engagement Score */}
        <div className="p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Engagement</span>
            <span className="text-lg font-bold text-foreground">{totalEngagement.toFixed(1)}%</span>
          </div>
          <Progress value={totalEngagement} className="h-2" />
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => {
            const Icon = getIcon(metric.type);
            return (
              <motion.div
                key={metric.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-accent/30 rounded-lg border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className={getColor(metric.type)} />
                  <span className="text-xs font-medium text-foreground">
                    {getLabel(metric.type)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      {formatNumber(metric.count)}
                    </span>
                    <span className={`text-xs ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change >= 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                  <Progress value={metric.percentage} className="h-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engagement Trends */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Top Performing Content</h4>
          {[
            { title: 'AI Development Tutorial', engagement: 94 },
            { title: 'React 19 Features', engagement: 87 },
            { title: 'Web3 Discussion', engagement: 76 }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-2 bg-accent/20 rounded"
            >
              <span className="text-xs text-foreground truncate">{item.title}</span>
              <div className="flex items-center gap-2">
                <div className="w-12 bg-muted rounded-full h-1">
                  <div 
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${item.engagement}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground w-8">
                  {item.engagement}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingEngagement;
