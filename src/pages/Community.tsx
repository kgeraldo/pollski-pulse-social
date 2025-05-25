
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Share2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';

const Community = () => {
  const communities = [
    { 
      id: 1, 
      name: 'Tech Enthusiasts', 
      members: 12500, 
      description: 'Discuss the latest in technology and innovation',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      category: 'Technology'
    },
    { 
      id: 2, 
      name: 'Design Collective', 
      members: 8900, 
      description: 'Share and critique design work with fellow creators',
      image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=100&h=100&fit=crop',
      category: 'Design'
    },
    { 
      id: 3, 
      name: 'Startup Founders', 
      members: 6700, 
      description: 'Connect with entrepreneurs and share business insights',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      category: 'Business'
    },
    { 
      id: 4, 
      name: 'Photography Hub', 
      members: 15200, 
      description: 'Showcase your photography and learn new techniques',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop',
      category: 'Photography'
    }
  ];

  const recentActivity = [
    { user: 'Alex Johnson', action: 'joined Tech Enthusiasts', time: '2 minutes ago' },
    { user: 'Sarah Chen', action: 'posted in Design Collective', time: '15 minutes ago' },
    { user: 'Mike Rodriguez', action: 'started a discussion in Startup Founders', time: '1 hour ago' },
    { user: 'Emma Wilson', action: 'shared a photo in Photography Hub', time: '2 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      <div className="flex-1 bg-background">
        <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border p-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Communities</h1>
            <p className="text-muted-foreground">Connect with like-minded people and join discussions</p>
          </motion.div>
        </div>

        <div className="p-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Communities List */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Popular Communities</h2>
              <div className="space-y-4">
                {communities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-card-foreground">{community.name}</h3>
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {community.category}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{community.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users size={16} />
                            <span className="text-sm">{community.members.toLocaleString()} members</span>
                          </div>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <UserPlus size={16} className="mr-1" />
                            Join
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Recent Activity</h2>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary text-sm font-semibold">
                          {activity.user.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-card-foreground text-sm">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-muted-foreground text-xs">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Community Stats */}
              <div className="mt-6 bg-card p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Community Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MessageCircle className="text-blue-500" size={20} />
                      <span className="text-2xl font-bold text-card-foreground">1.2K</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Active discussions</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Heart className="text-red-500" size={20} />
                      <span className="text-2xl font-bold text-card-foreground">5.8K</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Likes today</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Community;
