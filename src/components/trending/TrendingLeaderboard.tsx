
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Star, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LeaderboardEntry {
  id: string;
  name: string;
  username: string;
  avatar: string;
  score: number;
  change: number;
  category: string;
  verified: boolean;
}

const TrendingLeaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('creators');
  
  const [creators, setCreators] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'Sarah Tech',
      username: 'sarahtech',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=40&h=40&fit=crop',
      score: 9840,
      change: 23,
      category: 'Technology',
      verified: true
    },
    {
      id: '2',
      name: 'Code Master',
      username: 'codemaster',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
      score: 8920,
      change: 18,
      category: 'Development',
      verified: true
    },
    {
      id: '3',
      name: 'AI Explorer',
      username: 'aiexplorer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
      score: 7650,
      change: 12,
      category: 'AI/ML',
      verified: false
    }
  ]);

  const [topics, setTopics] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'Artificial Intelligence',
      username: 'ai-trends',
      avatar: '🤖',
      score: 15420,
      change: 34,
      category: 'Technology',
      verified: false
    },
    {
      id: '2',
      name: 'React Development',
      username: 'react-dev',
      avatar: '⚛️',
      score: 12340,
      change: 28,
      category: 'Programming',
      verified: false
    },
    {
      id: '3',
      name: 'Web3 & Blockchain',
      username: 'web3-buzz',
      avatar: '🌐',
      score: 9870,
      change: 15,
      category: 'Crypto',
      verified: false
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCreators(prev => prev.map(creator => ({
        ...creator,
        score: creator.score + Math.floor(Math.random() * 10),
        change: Math.max(0, creator.change + Math.floor(Math.random() * 3 - 1))
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="text-yellow-500" size={16} />;
      case 1: return <Medal className="text-gray-400" size={16} />;
      case 2: return <Trophy className="text-orange-600" size={16} />;
      default: return <Star className="text-blue-500" size={16} />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 1: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 2: return 'bg-gradient-to-r from-orange-600/20 to-red-500/20 border-orange-600/30';
      default: return 'bg-accent/30';
    }
  };

  const formatScore = (score: number) => {
    if (score >= 1000000) return `${(score / 1000000).toFixed(1)}M`;
    if (score >= 1000) return `${(score / 1000).toFixed(1)}K`;
    return score.toString();
  };

  const renderLeaderboard = (entries: LeaderboardEntry[]) => (
    <div className="space-y-2">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-3 rounded-lg border transition-all ${getRankColor(index)}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground w-6">
                #{index + 1}
              </span>
              {getRankIcon(index)}
            </div>
            
            <div className="flex items-center gap-2 flex-1">
              {typeof entry.avatar === 'string' && entry.avatar.startsWith('http') ? (
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm">
                  {entry.avatar}
                </div>
              )}
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-sm truncate">
                    {entry.name}
                  </span>
                  {entry.verified && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>@{entry.username}</span>
                  <Badge variant="secondary" className="text-xs">
                    {entry.category}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-foreground">
                {formatScore(entry.score)}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-500">
                <TrendingUp size={10} />
                +{entry.change}%
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Trophy className="text-yellow-500" size={18} />
          Trending Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="creators" className="text-xs">
              <Users size={12} className="mr-1" />
              Creators
            </TabsTrigger>
            <TabsTrigger value="topics" className="text-xs">
              <Star size={12} className="mr-1" />
              Topics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="creators" className="mt-0">
            {renderLeaderboard(creators)}
          </TabsContent>
          
          <TabsContent value="topics" className="mt-0">
            {renderLeaderboard(topics)}
          </TabsContent>
        </Tabs>
        
        <Button variant="outline" className="w-full mt-4" size="sm">
          View Full Leaderboard
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingLeaderboard;
