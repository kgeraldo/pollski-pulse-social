
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Crown, Star, MessageCircle, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  isPrivate: boolean;
  avatar: string;
  banner?: string;
  tags: string[];
  lastActivity: string;
  moderators: string[];
  isJoined: boolean;
  isVerified?: boolean;
}

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  groupId: string;
  groupName: string;
  attendees: number;
  isOnline: boolean;
}

const CommunityGroups: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const communityGroups: CommunityGroup[] = [
    {
      id: '1',
      name: 'React Developers',
      description: 'A community for React developers to share knowledge, tips, and best practices.',
      memberCount: 12400,
      category: 'Technology',
      isPrivate: false,
      avatar: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop',
      banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=200&fit=crop',
      tags: ['react', 'javascript', 'frontend'],
      lastActivity: '2 hours ago',
      moderators: ['Alex Johnson', 'Sarah Chen'],
      isJoined: true,
      isVerified: true
    },
    {
      id: '2',
      name: 'UI/UX Designers',
      description: 'Share your designs, get feedback, and learn from other designers.',
      memberCount: 8900,
      category: 'Design',
      isPrivate: false,
      avatar: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop',
      banner: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=200&fit=crop',
      tags: ['design', 'ui', 'ux'],
      lastActivity: '1 hour ago',
      moderators: ['Mike Rodriguez'],
      isJoined: false,
      isVerified: true
    },
    {
      id: '3',
      name: 'Startup Founders',
      description: 'Connect with fellow entrepreneurs and share your startup journey.',
      memberCount: 5600,
      category: 'Business',
      isPrivate: true,
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      tags: ['startup', 'business', 'entrepreneurship'],
      lastActivity: '30 minutes ago',
      moderators: ['Emma Davis'],
      isJoined: false
    }
  ];

  const upcomingEvents: CommunityEvent[] = [
    {
      id: '1',
      title: 'React 19 Features Workshop',
      date: '2024-01-15',
      time: '2:00 PM EST',
      location: 'Online',
      groupId: '1',
      groupName: 'React Developers',
      attendees: 234,
      isOnline: true
    },
    {
      id: '2',
      title: 'Design System Meetup',
      date: '2024-01-18',
      time: '6:00 PM EST',
      location: 'San Francisco, CA',
      groupId: '2',
      groupName: 'UI/UX Designers',
      attendees: 89,
      isOnline: false
    }
  ];

  const categories = ['all', 'technology', 'design', 'business', 'lifestyle', 'education'];

  const filteredGroups = communityGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           group.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatMemberCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          Create Community
        </Button>
      </div>

      <Tabs defaultValue="groups" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-4">
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {group.banner && (
                    <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url(${group.banner})` }}>
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{group.name}</h3>
                          {group.isVerified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          {group.isPrivate && (
                            <Badge variant="secondary" className="text-xs">Private</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {group.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {formatMemberCount(group.memberCount)} members
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle size={14} />
                            Active {group.lastActivity}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {group.category}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {group.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Crown size={14} className="text-yellow-500" />
                            <span className="text-sm text-muted-foreground">
                              Moderated by {group.moderators.join(', ')}
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            variant={group.isJoined ? "outline" : "default"}
                          >
                            {group.isJoined ? 'Joined' : 'Join'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>{event.location}</span>
                            {event.isOnline && (
                              <Badge variant="secondary" className="text-xs">Online</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={14} />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs mb-4">
                          {event.groupName}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm">
                          Attend
                        </Button>
                        <Button size="sm" variant="outline">
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-groups" className="space-y-4">
          <div className="grid gap-4">
            {communityGroups.filter(group => group.isJoined).map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatMemberCount(group.memberCount)} members • Active {group.lastActivity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Leave
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityGroups;
