
import { motion } from 'framer-motion';
import { TrendingUp, Eye, MessageCircle, Heart, Hash } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';

const Trending = () => {
  const trendingTopics = [
    { tag: '#TechInnovation', posts: 1234, growth: '+25%' },
    { tag: '#DesignTrends', posts: 987, growth: '+18%' },
    { tag: '#StartupLife', posts: 756, growth: '+32%' },
    { tag: '#AI', posts: 2341, growth: '+45%' },
    { tag: '#WebDev', posts: 1876, growth: '+22%' }
  ];

  const trendingPosts = [
    {
      id: 1,
      title: 'The Future of AI in Web Development',
      author: 'Alex Johnson',
      views: 12500,
      likes: 892,
      comments: 67,
      trend: '+120%',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Minimalist Design: Less is More',
      author: 'Sarah Chen',
      views: 9800,
      likes: 654,
      comments: 43,
      trend: '+89%',
      category: 'Design'
    },
    {
      id: 3,
      title: 'Building a Startup from Scratch',
      author: 'Mike Rodriguez',
      views: 8900,
      likes: 543,
      comments: 78,
      trend: '+76%',
      category: 'Business'
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Trending</h1>
            <p className="text-muted-foreground">Discover what's popular in the community right now</p>
          </motion.div>
        </div>

        <div className="p-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Trending Topics */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-foreground mb-6">Trending Topics</h2>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.tag}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card p-4 rounded-xl border border-border hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Hash className="text-primary" size={16} />
                        <span className="font-semibold text-card-foreground">{topic.tag}</span>
                      </div>
                      <span className="text-green-500 text-sm font-semibold">{topic.growth}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{topic.posts.toLocaleString()} posts</p>
                  </motion.div>
                ))}
              </div>

              {/* Trending Stats */}
              <div className="mt-6 bg-card p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Today's Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="text-green-500" size={18} />
                      <span className="text-card-foreground">Total Views</span>
                    </div>
                    <span className="text-xl font-bold text-card-foreground">125K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="text-red-500" size={18} />
                      <span className="text-card-foreground">Total Likes</span>
                    </div>
                    <span className="text-xl font-bold text-card-foreground">8.9K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="text-blue-500" size={18} />
                      <span className="text-card-foreground">Comments</span>
                    </div>
                    <span className="text-xl font-bold text-card-foreground">2.1K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Posts */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-foreground mb-6">Hot Posts</h2>
              <div className="space-y-6">
                {trendingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-card-foreground">{post.title}</h3>
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">by {post.author}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full">
                        <TrendingUp size={14} />
                        <span className="text-sm font-semibold">{post.trend}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span className="text-sm">{post.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span className="text-sm">{post.likes} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        <span className="text-sm">{post.comments} comments</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
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

export default Trending;
