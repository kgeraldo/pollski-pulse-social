
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Share2, MoreHorizontal, Edit3, Camera } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import UserProfile from '@/components/UserProfile';
import EnhancedPostCard from '@/components/EnhancedPostCard';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    id: '1',
    name: 'Alex Johnson',
    username: 'alexjohnson',
    bio: 'Full-stack developer passionate about creating amazing user experiences. Love working with React, TypeScript, and modern web technologies.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    joinDate: 'March 2023',
    followers: 2400,
    following: 892,
    posts: 127,
    likes: 15600,
    isVerified: true,
    isPro: true,
    badges: ['Early Adopter', 'Top Contributor', 'Verified Developer']
  };

  // Mock posts data
  const userPosts = [
    {
      id: 1,
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timeAgo: '2h ago',
      content: 'Just shipped a new feature! The React 19 compiler is incredible for performance optimization.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop',
      votes: { up: 124, down: 8 },
      comments: 23,
      shares: 5,
      category: 'Technology',
      tags: ['react', 'performance', 'webdev'],
      isVoted: null,
      isBookmarked: false,
      showComments: false,
      engagementData: {
        views: 3420,
        likes: 124,
        comments: 23,
        shares: 5,
        reach: 2100,
        engagement_rate: 12,
        peak_hour: '2:00 PM'
      }
    }
  ];

  const handleVote = (postId: number, voteType: 'up' | 'down') => {
    console.log('Vote:', postId, voteType);
  };

  const handleBookmark = (postId: number) => {
    console.log('Bookmark:', postId);
  };

  const handleToggleComments = (postId: number) => {
    console.log('Toggle comments:', postId);
  };

  const handleCommentSubmit = (postId: number, content: string, parentId?: string) => {
    console.log('Comment submit:', postId, content, parentId);
  };

  const handleCommentVote = (postId: number, commentId: string, voteType: 'up' | 'down') => {
    console.log('Comment vote:', postId, commentId, voteType);
  };

  const handleToggleCollapse = (postId: number, commentId: string) => {
    console.log('Toggle collapse:', postId, commentId);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      <div className="flex-1 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Enhanced Profile Header */}
          <div className="relative">
            {/* Banner with edit overlay */}
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-xl overflow-hidden group">
              <img
                src={user.banner}
                alt="Profile banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <Button
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                size="sm"
              >
                <Camera size={16} className="mr-2" />
                Edit Banner
              </Button>
            </div>

            {/* Profile info section */}
            <div className="relative px-6 pb-6 bg-card rounded-b-xl border border-border">
              <div className="flex items-end justify-between -mt-16 mb-4">
                <div className="relative group">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full border-4 border-background object-cover"
                  />
                  <Button
                    className="absolute inset-0 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                    size="sm"
                  >
                    <Camera size={20} />
                  </Button>
                </div>

                <div className="flex items-center gap-3 mt-16">
                  <Button variant="outline" size="sm">
                    <Share2 size={16} className="mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit3 size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              </div>

              {/* User details */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                  {user.isPro && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      PRO
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-1">@{user.username}</p>
                <p className="text-foreground mb-4 text-lg">{user.bio}</p>

                {/* Enhanced badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {user.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-sm">
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Enhanced stats */}
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{user.posts}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors">
                    <div className="text-2xl font-bold text-foreground">{user.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors">
                    <div className="text-2xl font-bold text-foreground">{user.following.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{user.likes.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                </div>
              </div>

              {/* Enhanced tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="replies">Replies</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="likes">Likes</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-6">
                  {userPosts.map((post, index) => (
                    <EnhancedPostCard
                      key={post.id}
                      post={post}
                      index={index}
                      onVote={handleVote}
                      onBookmark={handleBookmark}
                      onToggleComments={handleToggleComments}
                      onCommentSubmit={handleCommentSubmit}
                      onCommentVote={handleCommentVote}
                      onToggleCollapse={handleToggleCollapse}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="replies">
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="text-lg font-medium mb-2">No replies yet</div>
                    <p>Your replies to other posts will appear here</p>
                  </div>
                </TabsContent>

                <TabsContent value="media">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Media grid placeholder */}
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Media</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="likes">
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="text-lg font-medium mb-2">No liked posts</div>
                    <p>Posts you like will appear here</p>
                  </div>
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Profile Views</h3>
                      <div className="text-3xl font-bold text-blue-500">1,234</div>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Engagement Rate</h3>
                      <div className="text-3xl font-bold text-green-500">8.2%</div>
                      <p className="text-sm text-muted-foreground">Average</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>

      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Profile;
