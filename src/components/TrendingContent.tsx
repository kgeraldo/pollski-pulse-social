
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Hash, Users, Eye, Clock, Fire, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TrendingTopic {
  id: string;
  title: string;
  category: string;
  posts: number;
  growth: number;
  timeframe: string;
  hashtag?: string;
}

interface TrendingUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  growth: number;
  verified: boolean;
}

interface TrendingPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  views: number;
  engagementRate: number;
  timeAgo: string;
  category: string;
}

const TrendingContent: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  const trendingTopics: TrendingTopic[] = [
    {
      id: '1',
      title: 'React 19 Release',
      category: 'Technology',
      posts: 1247,
      growth: 89,
      timeframe: '24h',
      hashtag: 'react19'
    },
    {
      id: '2',
      title: 'AI in Web Development',
      category: 'Technology',
      posts: 892,
      growth: 56,
      timeframe: '24h',
      hashtag: 'aiwebdev'
    },
    {
      id: '3',
      title: 'Remote Work Trends',
      category: 'Work',
      posts: 634,
      growth: 34,
      timeframe: '24h',
      hashtag: 'remotework'
    }
  ];

  const trendingUsers: TrendingUser[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      followers: 12400,
      growth: 23,
      verified: true
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      username: 'mikecode',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      followers: 8900,
      growth: 18,
      verified: false
    }
  ];

  const trendingPosts: TrendingPost[] = [
    {
      id: '1',
      title: 'The Future of JavaScript Frameworks',
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      views: 15600,
      engagementRate: 12.4,
      timeAgo: '3h ago',
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Building Scalable React Applications',
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      views: 12300,
      engagementRate: 9.8,
      timeAgo: '5h ago',
      category: 'Development'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Time Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Trending in:</span>
        {(['1h', '24h', '7d', '30d'] as const).map((period) => (
          <Button
            key={period}
            size="sm"
            variant={timeFilter === period ? "default" : "outline"}
            onClick={() => setTimeFilter(period)}
            className="h-8"
          >
            {period}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="topics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{topic.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Hash size={12} />
                            {topic.hashtag}
                          </span>
                          <span>{formatNumber(topic.posts)} posts</span>
                          <Badge variant="secondary" className="text-xs">
                            {topic.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-green-500">
                        <ArrowUp size={14} />
                        {topic.growth}%
                      </div>
                      <Fire size={16} className="text-orange-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          {trendingUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          {user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>@{user.username}</span>
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {formatNumber(user.followers)} followers
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-green-500">
                        <ArrowUp size={14} />
                        {user.growth}%
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          {trendingPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={post.avatar}
                            alt={post.author}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-muted-foreground">by {post.author}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {formatNumber(post.views)} views
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp size={12} />
                            {post.engagementRate}% engagement
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrendingContent;
