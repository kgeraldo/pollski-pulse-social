
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Frown, Meh, Smile, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const TrendingSentiment: React.FC = () => {
  const sentimentData = [
    {
      type: 'Positive',
      percentage: 68,
      count: 2847,
      icon: Smile,
      color: 'text-green-500',
      bgColor: 'bg-green-500'
    },
    {
      type: 'Neutral',
      percentage: 23,
      count: 962,
      icon: Meh,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500'
    },
    {
      type: 'Negative',
      percentage: 9,
      count: 376,
      icon: Frown,
      color: 'text-red-500',
      bgColor: 'bg-red-500'
    }
  ];

  const topEmotions = [
    { emotion: 'Excitement', percentage: 34, trend: '+12%' },
    { emotion: 'Curiosity', percentage: 28, trend: '+8%' },
    { emotion: 'Concern', percentage: 18, trend: '-3%' },
    { emotion: 'Joy', percentage: 20, trend: '+15%' }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Heart className="text-pink-500" size={18} />
          Sentiment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Sentiment */}
        <div className="space-y-4">
          {sentimentData.map((sentiment, index) => {
            const Icon = sentiment.icon;
            return (
              <motion.div
                key={sentiment.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={sentiment.color} size={16} />
                    <span className="text-sm font-medium text-foreground">{sentiment.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">{sentiment.percentage}%</div>
                    <div className="text-xs text-muted-foreground">{sentiment.count.toLocaleString()}</div>
                  </div>
                </div>
                <Progress value={sentiment.percentage} className="h-2" />
              </motion.div>
            );
          })}
        </div>

        {/* Top Emotions */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp size={14} />
            Trending Emotions
          </h3>
          <div className="space-y-3">
            {topEmotions.map((emotion, index) => (
              <motion.div
                key={emotion.emotion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
              >
                <div>
                  <div className="text-sm font-medium text-foreground">{emotion.emotion}</div>
                  <div className="text-xs text-muted-foreground">{emotion.percentage}% of discussions</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium ${
                    emotion.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {emotion.trend}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sentiment Score */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-green-500/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">8.2/10</div>
            <div className="text-sm text-muted-foreground">Overall Sentiment Score</div>
            <div className="text-xs text-green-500 mt-1">↑ +0.3 from yesterday</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingSentiment;
