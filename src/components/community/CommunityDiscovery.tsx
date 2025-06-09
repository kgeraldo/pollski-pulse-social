
import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SuggestedCommunity {
  id: string;
  name: string;
  description: string;
  members: number;
  growth: number;
  category: string;
  featured: boolean;
}

const CommunityDiscovery: React.FC = () => {
  const suggestedCommunities: SuggestedCommunity[] = [
    {
      id: '1',
      name: 'React Innovators',
      description: 'Exploring cutting-edge React patterns and upcoming features',
      members: 2847,
      growth: 23,
      category: 'Technology',
      featured: true
    },
    {
      id: '2',
      name: 'Design Systems Hub',
      description: 'Building scalable and consistent design systems',
      members: 1923,
      growth: 18,
      category: 'Design',
      featured: false
    },
    {
      id: '3',
      name: 'Startup Founders',
      description: 'Connect with fellow entrepreneurs and share insights',
      members: 1456,
      growth: 31,
      category: 'Business',
      featured: true
    },
    {
      id: '4',
      name: 'Remote Work Culture',
      description: 'Tips and strategies for effective remote collaboration',
      members: 987,
      growth: 15,
      category: 'Work',
      featured: false
    }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Star className="text-yellow-500" size={20} />
          Discover Communities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedCommunities.map((community, index) => (
          <motion.div
            key={community.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{community.name}</h3>
                  {community.featured && (
                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-2">{community.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {community.members.toLocaleString()} members
                  </span>
                  <span className="flex items-center gap-1 text-green-500">
                    <TrendingUp size={12} />
                    +{community.growth}% growth
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {community.category}
                  </Badge>
                </div>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                Join
                <ArrowRight size={14} />
              </Button>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommunityDiscovery;
