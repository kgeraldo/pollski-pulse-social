
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Heart, MessageCircle, Calendar, MapPin, Link as LinkIcon, Settings, UserPlus, UserMinus, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserProfileProps {
  userId: string;
  isOwnProfile?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, isOwnProfile = false }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const user = {
    id: userId,
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

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="max-w-4xl mx-auto bg-card rounded-xl border border-border overflow-hidden">
      {/* Banner */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <img
          src={user.banner}
          alt="Profile banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        <div className="flex items-end justify-between -mt-16 mb-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-background object-cover"
            />
            {user.isVerified && (
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
            )}
          </motion.div>

          <div className="flex items-center gap-3 mt-16">
            {isOwnProfile ? (
              <Button variant="outline" className="gap-2">
                <Edit3 size={16} />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleFollow}
                  className={`gap-2 ${
                    isFollowing
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus size={16} />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Follow
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <MessageCircle size={16} />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* User Details */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            {user.isPro && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                PRO
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mb-1">@{user.username}</p>
          <p className="text-foreground mb-4">{user.bio}</p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {user.badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon size={14} />
              <span className="text-blue-500 hover:underline cursor-pointer">
                {user.website}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">{user.posts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center cursor-pointer hover:underline">
              <div className="text-xl font-bold text-foreground">{user.followers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center cursor-pointer hover:underline">
              <div className="text-xl font-bold text-foreground">{user.following.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">{user.likes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              User posts will be displayed here
            </div>
          </TabsContent>

          <TabsContent value="replies" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              User replies will be displayed here
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              User media posts will be displayed here
            </div>
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              Liked posts will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
