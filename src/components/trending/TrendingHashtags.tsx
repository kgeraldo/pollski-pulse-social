
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hash, TrendingUp, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HashtagData {
  id: string;
  tag: string;
  posts: number;
  growth: number;
  category: string;
  trending: boolean;
}

const TrendingHashtags: React.FC = () => {
  const [hashtags, setHashtags] = useState<HashtagData[]>([
    {
      id: '1',
      tag: 'AI2024',
      posts: 15420,
      growth: 234,
      category: 'Technology',
      trending: true
    },
    {
      id: '2',
      tag: 'ReactNext',
      posts: 8934,
      growth: 156,
      category: 'Development',
      trending: true
    },
    {
      id: '3',
      tag: 'WebDev',
      posts: 12675,
      growth: 89,
      category: 'Programming',
      trending: false
    },
    {
      id: '4',
      tag: 'OpenSource',
      posts: 6543,
      growth: 67,
      category: 'Community',
      trending: true
    },
    {
      id: '5',
      tag: 'MachineLearning',
      posts: 9876,
      growth: 123,
      category: 'AI',
      trending: true
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHashtags(prev => 
        prev.map(hashtag => ({
          ...hashtag,
          posts: hashtag.posts + Math.floor(Math.random() * 10),
          growth: hashtag.growth + Math.floor(Math.random() * 5 - 2)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Hash className="text-blue-500" size={18} />
          Trending Hashtags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {hashtags.map((hashtag, index) => (
            <motion.div
              key={hashtag.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Hash size={16} className="text-blue-500" />
                  {hashtag.trending && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-foreground">#{hashtag.tag}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatNumber(hashtag.posts)} posts</span>
                    <Badge variant="secondary" className="text-xs">
                      {hashtag.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp size={12} />
                  +{hashtag.growth}
                </div>
                {hashtag.trending && <Zap size={14} className="text-yellow-500" />}
              </div>
            </motion.div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4" size="sm">
          View All Hashtags
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingHashtags;
