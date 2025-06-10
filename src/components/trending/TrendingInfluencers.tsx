
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface InfluencerData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  engagement: number;
  growth: number;
  verified: boolean;
  tier: 'gold' | 'silver' | 'bronze';
}

const TrendingInfluencers: React.FC = () => {
  const influencers: InfluencerData[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      username: 'sarahtech',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      followers: 245000,
      engagement: 8.4,
      growth: 23,
      verified: true,
      tier: 'gold'
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      username: 'alexcodes',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      followers: 189000,
      engagement: 7.2,
      growth: 18,
      verified: true,
      tier: 'silver'
    },
    {
      id: '3',
      name: 'Maya Patel',
      username: 'mayaai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      followers: 156000,
      engagement: 6.8,
      growth: 15,
      verified: false,
      tier: 'bronze'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold': return 'text-yellow-500';
      case 'silver': return 'text-gray-400';
      case 'bronze': return 'text-orange-600';
      default: return 'text-gray-500';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'gold': return Crown;
      case 'silver': return Star;
      case 'bronze': return TrendingUp;
      default: return Users;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Crown className="text-yellow-500" size={18} />
          Top Influencers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {influencers.map((influencer, index) => {
            const TierIcon = getTierIcon(influencer.tier);
            return (
              <motion.div
                key={influencer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={influencer.avatar}
                      alt={influencer.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <TierIcon 
                      size={16} 
                      className={`absolute -top-1 -right-1 ${getTierColor(influencer.tier)} bg-background rounded-full p-1`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{influencer.name}</span>
                      {influencer.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">@{influencer.username}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatNumber(influencer.followers)} followers</span>
                      <span>{influencer.engagement}% engagement</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <TrendingUp size={12} />
                    +{influencer.growth}%
                  </div>
                  <Button size="sm" variant="outline" className="text-xs h-6">
                    Follow
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
        <Button variant="outline" className="w-full mt-4" size="sm">
          Discover More
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingInfluencers;
