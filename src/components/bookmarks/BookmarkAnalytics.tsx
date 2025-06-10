
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Star, TrendingUp, Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BookmarkAnalytics: React.FC = () => {
  const readingStats = [
    { period: 'This Week', articles: 12, time: '4.2h', completion: 85 },
    { period: 'Last Week', articles: 8, time: '3.1h', completion: 78 },
    { period: 'This Month', articles: 45, time: '16.8h', completion: 82 }
  ];

  const categoryBreakdown = [
    { name: 'Technology', count: 12, color: 'bg-blue-500', percentage: 40 },
    { name: 'Design', count: 8, color: 'bg-purple-500', percentage: 27 },
    { name: 'Business', count: 6, color: 'bg-green-500', percentage: 20 },
    { name: 'Others', count: 4, color: 'bg-orange-500', percentage: 13 }
  ];

  const recentActivity = [
    { action: 'Bookmarked', item: 'React 19 Migration Guide', time: '2h ago', type: 'article' },
    { action: 'Read', item: 'TypeScript Best Practices', time: '4h ago', type: 'article' },
    { action: 'Organized', item: 'Frontend Resources', time: '6h ago', type: 'collection' },
    { action: 'Shared', item: 'Design Systems Guide', time: '1d ago', type: 'article' }
  ];

  return (
    <div className="space-y-6">
      {/* Reading Statistics */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="text-blue-500" size={20} />
            Reading Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {readingStats.map((stat, index) => (
              <motion.div
                key={stat.period}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
              >
                <div>
                  <div className="text-sm font-medium text-foreground">{stat.period}</div>
                  <div className="text-xs text-muted-foreground">{stat.articles} articles read</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{stat.time}</div>
                  <div className="text-xs text-green-500">{stat.completion}% completion</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Tag className="text-purple-500" size={20} />
            Category Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categoryBreakdown.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category.count} items</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <motion.div
                      className={`h-full rounded-full ${category.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    />
                  </div>
                </div>
                <span className="text-xs font-medium text-foreground">{category.percentage}%</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Clock className="text-green-500" size={20} />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 hover:bg-accent/30 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {activity.action}
                  </Badge>
                  <span className="text-sm text-foreground">{activity.item}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookmarkAnalytics;
