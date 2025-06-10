
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, Activity, Zap, Globe, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TrendingDashboard: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState('engagement');

  const realTimeMetrics = [
    { label: 'Posts/Min', value: 247, trend: '+12%', icon: Activity },
    { label: 'Active Users', value: '12.4K', trend: '+8%', icon: Users },
    { label: 'Viral Posts', value: 23, trend: '+156%', icon: Zap },
    { label: 'Global Reach', value: '89%', trend: '+3%', icon: Globe }
  ];

  const engagementData = [
    { time: '00:00', likes: 45, shares: 23, comments: 12 },
    { time: '06:00', likes: 89, shares: 34, comments: 28 },
    { time: '12:00', likes: 156, shares: 67, comments: 45 },
    { time: '18:00', likes: 203, shares: 89, comments: 67 },
    { time: '23:59', likes: 178, shares: 76, comments: 54 }
  ];

  const topCategories = [
    { name: 'Technology', percentage: 34, count: 1847 },
    { name: 'Entertainment', percentage: 28, count: 1523 },
    { name: 'Sports', percentage: 18, count: 978 },
    { name: 'Politics', percentage: 12, count: 652 },
    { name: 'Business', percentage: 8, count: 435 }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="text-blue-500" size={18} />
          Trending Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeMetric} onValueChange={setActiveMetric} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="realtime">Real-time</TabsTrigger>
          </TabsList>

          <TabsContent value="engagement" className="space-y-4">
            <div className="space-y-3">
              {engagementData.map((data, index) => (
                <motion.div
                  key={data.time}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
                >
                  <div className="text-sm font-medium text-foreground">{data.time}</div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-muted-foreground">{data.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-muted-foreground">{data.shares} shares</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground">{data.comments} comments</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="space-y-3">
              {topCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
                >
                  <div>
                    <div className="text-sm font-medium text-foreground">{category.name}</div>
                    <div className="text-xs text-muted-foreground">{category.count.toLocaleString()} posts</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <motion.div
                        className="h-2 bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-10">{category.percentage}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {realTimeMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-accent/30 rounded-lg text-center"
                  >
                    <Icon className="mx-auto mb-2 text-blue-500" size={16} />
                    <div className="text-lg font-bold text-foreground">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                    <div className="text-xs text-green-500 mt-1">{metric.trend}</div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrendingDashboard;
