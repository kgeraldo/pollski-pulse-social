
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, TrendingUp, Clock, Users, Search, Bookmark, Flag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import VoteButton from './VoteButton';

interface Post {
  id: number;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  video?: string;
  votes: {
    up: number;
    down: number;
  };
  comments: number;
  shares: number;
  category: string;
  tags: string[];
  isVoted?: 'up' | 'down' | null;
  isBookmarked: boolean;
}

interface FilterOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const EnhancedMainFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timeAgo: '2h ago',
      content: 'What do you think about the new React 19 features? The new compiler looks promising for performance optimization. Would love to hear your thoughts on the upcoming changes!',
      votes: { up: 124, down: 8 },
      comments: 23,
      shares: 5,
      category: 'Technology',
      tags: ['react', 'javascript', 'frontend'],
      isVoted: null,
      isBookmarked: false
    },
    {
      id: 2,
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timeAgo: '4h ago',
      content: 'Should remote work be the standard for tech companies? Let\'s discuss the pros and cons of this growing trend in the industry.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=300&fit=crop',
      votes: { up: 89, down: 12 },
      comments: 45,
      shares: 8,
      category: 'Work',
      tags: ['remote-work', 'productivity', 'work-life-balance'],
      isVoted: 'up',
      isBookmarked: true
    },
    {
      id: 3,
      author: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      timeAgo: '6h ago',
      content: 'The future of AI in web development - what are your thoughts on AI-assisted coding? Are we heading towards a revolution in how we build applications?',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
      votes: { up: 156, down: 23 },
      comments: 67,
      shares: 12,
      category: 'AI',
      tags: ['ai', 'machine-learning', 'coding', 'automation'],
      isVoted: null,
      isBookmarked: false
    }
  ]);

  const filterOptions: FilterOption[] = [
    { value: 'all', label: 'All Posts', icon: Users },
    { value: 'trending', label: 'Trending', icon: TrendingUp },
    { value: 'recent', label: 'Recent', icon: Clock },
    { value: 'bookmarked', label: 'Bookmarked', icon: Bookmark }
  ];

  const handleVote = (postId: number, voteType: 'up' | 'down'): void => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const currentVote = post.isVoted;
          let newVotes = { ...post.votes };
          let newVoteState: 'up' | 'down' | null = voteType;

          if (currentVote === 'up') newVotes.up--;
          if (currentVote === 'down') newVotes.down--;

          if (currentVote === voteType) {
            newVoteState = null;
          } else {
            if (voteType === 'up') newVotes.up++;
            if (voteType === 'down') newVotes.down++;
          }

          return { ...post, votes: newVotes, isVoted: newVoteState };
        }
        return post;
      })
    );
  };

  const handleBookmark = (postId: number): void => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'bookmarked') {
      return matchesSearch && post.isBookmarked;
    }
    
    return matchesSearch;
  });

  return (
    <div className="flex-1 bg-slate-900 min-h-screen">
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-6 z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-white mb-1">Community Feed</h1>
            <p className="text-slate-400 text-sm font-medium">Share your thoughts and connect with others</p>
          </motion.div>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                type="text"
                placeholder="Search posts, users, and tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={activeFilter === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(option.value)}
                  className={`flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                    activeFilter === option.value
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                  }`}
                >
                  <option.icon size={16} />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <AnimatePresence mode="wait">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-slate-800 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 overflow-hidden group hover:shadow-xl hover:shadow-black/20"
            >
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-600"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-base">{post.author}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">{post.timeAgo}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-blue-400 text-sm font-medium">{post.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleBookmark(post.id)}
                      className={`transition-colors duration-200 ${
                        post.isBookmarked
                          ? 'text-yellow-400 hover:text-yellow-300'
                          : 'text-slate-400 hover:text-yellow-400'
                      }`}
                    >
                      <Bookmark size={18} className={post.isBookmarked ? 'fill-current' : ''} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200"
                    >
                      <MoreHorizontal size={18} />
                    </Button>
                  </div>
                </div>

                <p className="text-slate-100 text-base leading-relaxed mb-4 font-medium">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-lg font-medium"
                    >
                      <Tag size={12} />
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Media */}
                {post.image && (
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover rounded-xl mb-4 cursor-pointer transition-transform duration-300"
                  />
                )}

                {post.video && (
                  <video
                    controls
                    className="w-full h-64 object-cover rounded-xl mb-4"
                    poster="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop"
                  >
                    <source src={post.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <VoteButton
                      type="up"
                      count={post.votes.up}
                      isActive={post.isVoted === 'up'}
                      onClick={() => handleVote(post.id, 'up')}
                    />
                    <VoteButton
                      type="down"
                      count={post.votes.down}
                      isActive={post.isVoted === 'down'}
                      onClick={() => handleVote(post.id, 'down')}
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-blue-400 transition-all duration-200"
                    >
                      <MessageCircle size={16} />
                      <span className="font-semibold text-sm">{post.comments}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-purple-400 transition-all duration-200"
                    >
                      <Share size={16} />
                      <span className="font-semibold text-sm">{post.shares}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-all duration-200"
                    >
                      <Flag size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Users className="mx-auto text-slate-600 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No posts found</h3>
            <p className="text-slate-500">Try adjusting your search or check back later!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnhancedMainFeed;
