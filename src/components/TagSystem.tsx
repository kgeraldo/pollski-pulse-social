
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, TrendingUp, Users, Plus, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tag {
  id: string;
  name: string;
  description?: string;
  postCount: number;
  followerCount: number;
  isFollowing: boolean;
  isTrending: boolean;
  category: string;
  color?: string;
}

interface TagSystemProps {
  onTagSelect?: (tagName: string) => void;
  showFollowButton?: boolean;
}

const TagSystem: React.FC<TagSystemProps> = ({ 
  onTagSelect, 
  showFollowButton = true 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const tags: Tag[] = [
    {
      id: '1',
      name: 'react',
      description: 'A JavaScript library for building user interfaces',
      postCount: 1250,
      followerCount: 3400,
      isFollowing: true,
      isTrending: true,
      category: 'Technology',
      color: 'blue'
    },
    {
      id: '2',
      name: 'typescript',
      description: 'Typed superset of JavaScript',
      postCount: 890,
      followerCount: 2100,
      isFollowing: false,
      isTrending: true,
      category: 'Technology',
      color: 'purple'
    },
    {
      id: '3',
      name: 'design',
      description: 'UI/UX design discussions and inspiration',
      postCount: 2300,
      followerCount: 5600,
      isFollowing: true,
      isTrending: false,
      category: 'Design',
      color: 'pink'
    },
    {
      id: '4',
      name: 'webdev',
      description: 'Web development tips and tutorials',
      postCount: 4500,
      followerCount: 8900,
      isFollowing: false,
      isTrending: true,
      category: 'Technology',
      color: 'green'
    },
    {
      id: '5',
      name: 'career',
      description: 'Career advice and opportunities',
      postCount: 670,
      followerCount: 1200,
      isFollowing: true,
      isTrending: false,
      category: 'Career',
      color: 'orange'
    }
  ];

  const categories = ['all', 'Technology', 'Design', 'Career', 'Business'];

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tag.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tag.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const trendingTags = tags.filter(tag => tag.isTrending).slice(0, 5);
  const followedTags = tags.filter(tag => tag.isFollowing);

  const getColorClasses = (color?: string) => {
    const colorMap = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-slate-600/20 text-slate-400 border-slate-600/30';
  };

  const handleTagFollow = (tagId: string) => {
    // Toggle follow logic here
    console.log('Toggle follow for tag:', tagId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Tags</h1>
        <p className="text-slate-400">Discover and follow topics you're interested in</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-800 border-slate-600 text-white"
        />
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="browse">Browse All</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* All Tags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTags.map((tag, index) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-800 rounded-xl p-4 border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${getColorClasses(tag.color)}`}
                onClick={() => onTagSelect?.(tag.name)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Hash size={20} />
                    <h3 className="font-semibold">{tag.name}</h3>
                    {tag.isTrending && (
                      <TrendingUp size={14} className="text-yellow-400" />
                    )}
                  </div>
                  {showFollowButton && (
                    <Button
                      size="sm"
                      variant={tag.isFollowing ? 'secondary' : 'outline'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTagFollow(tag.id);
                      }}
                      className="h-7 px-2"
                    >
                      {tag.isFollowing ? (
                        <>
                          <X size={12} className="mr-1" />
                          Unfollow
                        </>
                      ) : (
                        <>
                          <Plus size={12} className="mr-1" />
                          Follow
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {tag.description && (
                  <p className="text-sm opacity-80 mb-3 line-clamp-2">{tag.description}</p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span>{tag.postCount.toLocaleString()} posts</span>
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{tag.followerCount.toLocaleString()} followers</span>
                  </div>
                </div>

                <Badge variant="secondary" className="mt-2 text-xs">
                  {tag.category}
                </Badge>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          {/* Trending Tags */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Trending Now</h2>
            {trendingTags.map((tag, index) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-yellow-500/20 rounded-lg">
                      <span className="text-yellow-400 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Hash size={16} className="text-slate-400" />
                        <h3 className="font-semibold text-white">{tag.name}</h3>
                        <TrendingUp size={14} className="text-yellow-400" />
                      </div>
                      <p className="text-sm text-slate-400">{tag.postCount.toLocaleString()} posts today</p>
                    </div>
                  </div>
                  {showFollowButton && (
                    <Button
                      size="sm"
                      variant={tag.isFollowing ? 'secondary' : 'default'}
                      onClick={() => handleTagFollow(tag.id)}
                    >
                      {tag.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following">
          {/* Following Tags */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Tags You Follow</h2>
              <span className="text-slate-400 text-sm">{followedTags.length} tags</span>
            </div>
            
            {followedTags.map((tag, index) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl p-4 border border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <div>
                      <div className="flex items-center gap-2">
                        <Hash size={16} className="text-slate-400" />
                        <h3 className="font-semibold text-white">{tag.name}</h3>
                      </div>
                      <p className="text-sm text-slate-400">{tag.description}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTagFollow(tag.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Unfollow
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TagSystem;
