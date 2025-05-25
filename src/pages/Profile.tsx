
import { motion } from 'framer-motion';
import { User, Edit3, Calendar, MapPin, Link as LinkIcon, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';

const Profile = () => {
  const userStats = [
    { label: 'Posts', value: '127' },
    { label: 'Followers', value: '2.4K' },
    { label: 'Following', value: '892' },
    { label: 'Likes', value: '15.6K' }
  ];

  const recentPosts = [
    {
      id: 1,
      content: 'Just finished an amazing project using React and TypeScript! The developer experience is incredible.',
      timestamp: '2 hours ago',
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      content: 'What are your thoughts on the latest design trends? I\'m particularly interested in minimalism.',
      timestamp: '1 day ago',
      likes: 89,
      comments: 23
    },
    {
      id: 3,
      content: 'Sharing some insights from my startup journey. It\'s been challenging but incredibly rewarding!',
      timestamp: '3 days ago',
      likes: 156,
      comments: 34
    }
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
            <p className="text-muted-foreground">Manage your account and view your activity</p>
          </motion.div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-8 rounded-xl border border-border mb-8"
          >
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-3xl">AJ</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-card-foreground">Alex Johnson</h2>
                    <p className="text-muted-foreground">@alexjohnson</p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Edit3 size={16} />
                    Edit Profile
                  </Button>
                </div>
                
                <p className="text-card-foreground mb-4 leading-relaxed">
                  Full-stack developer passionate about creating amazing user experiences. 
                  Love working with React, TypeScript, and modern web technologies.
                </p>
                
                <div className="flex items-center gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>Joined March 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon size={16} />
                    <span>alexjohnson.dev</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
              {userStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">Recent Posts</h3>
            <div className="space-y-6">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border"
                >
                  <p className="text-card-foreground mb-4 leading-relaxed">{post.content}</p>
                  <div className="flex items-center justify-between text-muted-foreground text-sm">
                    <span>{post.timestamp}</span>
                    <div className="flex items-center gap-4">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Profile;
