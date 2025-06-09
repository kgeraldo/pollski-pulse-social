
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Activity {
  id: string;
  type: 'message' | 'join' | 'event' | 'achievement';
  user: string;
  avatar: string;
  action: string;
  community: string;
  timeAgo: string;
}

const CommunityActivity: React.FC = () => {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'message',
      user: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      action: 'started a discussion about React 19 features',
      community: 'React Developers',
      timeAgo: '2m ago'
    },
    {
      id: '2',
      type: 'join',
      user: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      action: 'joined the community',
      community: 'Frontend Masters',
      timeAgo: '5m ago'
    },
    {
      id: '3',
      type: 'event',
      user: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      action: 'created an event: "TypeScript Workshop"',
      community: 'Web Developers',
      timeAgo: '12m ago'
    },
    {
      id: '4',
      type: 'achievement',
      user: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      action: 'became a community moderator',
      community: 'UI/UX Designers',
      timeAgo: '15m ago'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'join': return Users;
      case 'event': return Calendar;
      case 'achievement': return Star;
      default: return MessageSquare;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-400';
      case 'join': return 'text-green-400';
      case 'event': return 'text-purple-400';
      case 'achievement': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <Icon className={`${getIconColor(activity.type)} mt-0.5`} size={14} />
                  <div>
                    <span className="text-foreground font-medium">{activity.user}</span>
                    <span className="text-muted-foreground"> {activity.action}</span>
                    <span className="text-primary"> in {activity.community}</span>
                  </div>
                </div>
                <div className="text-muted-foreground text-xs mt-1">{activity.timeAgo}</div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CommunityActivity;
