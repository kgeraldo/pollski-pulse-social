
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Eye, Clock, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const TrendingAnalytics: React.FC = () => {
  const analytics = [
    {
      metric: 'Viral Coefficient',
      value: '2.4x',
      change: '+12%',
      description: 'Average shares per post',
      progress: 85,
      color: 'bg-blue-500'
    },
    {
      metric: 'Engagement Rate',
      value: '89%',
      change: '+5%',
      description: 'User interaction rate',
      progress: 89,
      color: 'bg-green-500'
    },
    {
      metric: 'Peak Activity',
      value: '2-4 PM',
      change: '+23%',
      description: 'Daily high traffic',
      progress: 67,
      color: 'bg-orange-500'
    },
    {
      metric: 'Global Reach',
      value: '127 countries',
      change: '+8%',
      description: 'Worldwide presence',
      progress: 92,
      color: 'bg-purple-500'
    }
  ];

  const timeData = [
    { time: '6AM', value: 15 },
    { time: '9AM', value: 45 },
    { time: '12PM', value: 78 },
    { time: '3PM', value: 95 },
    { time: '6PM', value: 67 },
    { time: '9PM', value: 43 },
    { time: '12AM', value: 22 }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-2 gap-4">
        {analytics.map((item, index) => (
          <motion.div
            key={item.metric}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-muted-foreground">{item.metric}</h3>
                  <span className="text-xs text-green-500 font-medium">{item.change}</span>
                </div>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-foreground">{item.value}</div>
                  <Progress value={item.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity Timeline */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Clock size={18} />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeData.map((item, index) => (
              <div key={item.time} className="flex items-center gap-3">
                <div className="w-12 text-sm text-muted-foreground">{item.time}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-10">{item.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingAnalytics;
