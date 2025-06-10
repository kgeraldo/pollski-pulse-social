
import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Clock, Eye, MessageSquare, Share } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  author: string;
  timeAgo: string;
  views: number;
  comments: number;
  category: string;
  image?: string;
  trending: boolean;
}

const TrendingNews: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'New React 19 Features Transform Development',
      summary: 'Latest React release introduces revolutionary features that are changing how developers build applications.',
      source: 'Tech Daily',
      author: 'Sarah Kim',
      timeAgo: '2h ago',
      views: 12400,
      comments: 89,
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=120&fit=crop',
      trending: true
    },
    {
      id: '2',
      title: 'AI Breakthrough in Web Development',
      summary: 'Machine learning models now assist developers in writing more efficient code automatically.',
      source: 'Developer News',
      author: 'Mike Chen',
      timeAgo: '4h ago',
      views: 8900,
      comments: 56,
      category: 'AI',
      trending: true
    },
    {
      id: '3',
      title: 'Remote Work Trends Shaping 2024',
      summary: 'New study reveals how remote work culture is evolving and impacting productivity.',
      source: 'Work Insights',
      author: 'Emma Davis',
      timeAgo: '6h ago',
      views: 6700,
      comments: 34,
      category: 'Business',
      trending: false
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Newspaper className="text-purple-500" size={18} />
          Trending News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-border rounded-lg p-4 hover:bg-accent/30 transition-colors cursor-pointer"
            >
              <div className="flex gap-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm leading-tight">
                      {item.title}
                    </h3>
                    {item.trending && (
                      <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                        Trending
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.source}</span>
                      <span>•</span>
                      <span>{item.author}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={10} />
                        {item.timeAgo}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        {formatNumber(item.views)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        {item.comments}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 px-2">
                      <Share size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4" size="sm">
          Read More News
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingNews;
