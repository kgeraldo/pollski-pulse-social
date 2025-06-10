
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, MessageSquare, TrendingUp, Globe, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatItem {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const TrendingStats: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([
    {
      label: 'Active Users',
      value: '24.7K',
      change: '+12%',
      icon: Users,
      color: 'text-blue-500',
      description: 'Currently online'
    },
    {
      label: 'Posts/Hour',
      value: '1,247',
      change: '+8%',
      icon: Activity,
      color: 'text-green-500',
      description: 'New content rate'
    },
    {
      label: 'Discussions',
      value: '89',
      change: '+23%',
      icon: MessageSquare,
      color: 'text-purple-500',
      description: 'Hot topics'
    },
    {
      label: 'Viral Posts',
      value: '156',
      change: '+156%',
      icon: Zap,
      color: 'text-yellow-500',
      description: 'Trending content'
    },
    {
      label: 'Global Reach',
      value: '127',
      change: '+5%',
      icon: Globe,
      color: 'text-indigo-500',
      description: 'Countries active'
    },
    {
      label: 'Growth Rate',
      value: '2.4x',
      change: '+18%',
      icon: TrendingUp,
      color: 'text-red-500',
      description: 'Platform expansion'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        const currentValue = parseFloat(stat.value.replace(/[^\d.]/g, ''));
        const newValue = currentValue + (Math.random() * 10 - 5);
        const formattedValue = stat.value.includes('K') 
          ? `${newValue.toFixed(1)}K`
          : stat.value.includes('x')
          ? `${newValue.toFixed(1)}x`
          : Math.floor(newValue).toString();
        
        return {
          ...stat,
          value: formattedValue
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border hover:bg-accent/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`${stat.color}`} size={20} />
                  <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                </div>
                <div className="space-y-1">
                  <motion.div
                    key={stat.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-foreground"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm font-medium text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TrendingStats;
