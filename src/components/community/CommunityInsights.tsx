
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, MessageCircle, UserPlus, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CommunityInsights: React.FC = () => {
  const topContributors = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      contributions: 247,
      badge: 'Top Helper',
      level: 'Expert'
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      contributions: 189,
      badge: 'Active Member',
      level: 'Advanced'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      contributions: 156,
      badge: 'Mentor',
      level: 'Expert'
    }
  ];

  const weeklyHighlights = [
    {
      icon: MessageCircle,
      title: 'Most Discussed',
      value: 'React 19 Features',
      meta: '89 replies',
      color: 'text-blue-500'
    },
    {
      icon: UserPlus,
      title: 'New Members',
      value: '+234',
      meta: 'This week',
      color: 'text-green-500'
    },
    {
      icon: Calendar,
      title: 'Upcoming Event',
      value: 'TypeScript Workshop',
      meta: 'Tomorrow 2PM',
      color: 'text-purple-500'
    },
    {
      icon: Award,
      title: 'Community Goal',
      value: '1000 Members',
      meta: '87% complete',
      color: 'text-orange-500'
    }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Trophy className="text-yellow-500" size={20} />
          Community Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Contributors */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Top Contributors</h3>
          <div className="space-y-3">
            {topContributors.map((contributor, index) => (
              <motion.div
                key={contributor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-accent/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={contributor.avatar} alt={contributor.name} />
                      <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Star size={8} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{contributor.name}</div>
                    <div className="text-xs text-muted-foreground">{contributor.contributions} contributions</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs">
                    {contributor.badge}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">{contributor.level}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weekly Highlights */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Weekly Highlights</h3>
          <div className="grid grid-cols-2 gap-3">
            {weeklyHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-accent/30 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={highlight.color} size={14} />
                    <span className="text-xs text-muted-foreground">{highlight.title}</span>
                  </div>
                  <div className="text-sm font-semibold text-foreground">{highlight.value}</div>
                  <div className="text-xs text-muted-foreground">{highlight.meta}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityInsights;
