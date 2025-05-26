
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, TrendingUp, Clock, Users, Search, LucideIcon, ThumbsUp, ThumbsDown, Bookmark, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import CommentSection from './CommentSection';
import PostCreator from './PostCreator';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

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
  comments: Comment[];
  shares: number;
  category: string;
  isVoted?: 'up' | 'down' | null;
  tags?: string[];
  isBookmarked?: boolean;
}

interface FilterOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

const MainFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timeAgo: '2h ago',
      content: 'What do you think about the new React 19 features? The new compiler looks promising for performance optimization.',
      votes: { up: 124, down: 8 },
      comments: [
        {
          id: 1,
          author: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=32&h=32&fit=crop',
          timeAgo: '1h ago',
          content: 'The compiler optimizations are game-changing! No more manual memoization in most cases.',
          likes: 12,
          isLiked: false,
          replies: [
            {
              id: 2,
              author: 'Mike Rodriguez',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop',
              timeAgo: '45m ago',
              content: 'Exactly! It will make React development so much more productive.',
              likes: 5,
              isLiked: true
            }
          ]
        }
      ],
      shares: 5,
      category: 'Technology',
      isVoted: null,
      tags: ['React', 'JavaScript', 'Web Development'],
      isBookmarked: false
    },
    {
      id: 2,
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timeAgo: '4h ago',
      content: 'Should remote work be the standard for tech companies? Let\'s discuss the pros and cons.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=300&fit=crop',
      votes: { up: 89, down: 12 },
      comments: [],
      shares: 8,
      category: 'Work',
      isVoted: 'up',
      tags: ['Remote Work', 'Career', 'Productivity'],
      isBookmarked: true
    }
  ]);

  const filterOptions: FilterOption[] = [
    { value: 'all', label: 'All Posts', icon: Users },
    { value: 'trending', label: 'Trending', icon: TrendingUp },
    { value: 'recent', label: 'Recent', icon: Clock }
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

  const toggleComments = (postId: number): void => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const getVotePercentage = (post: Post): { upPercentage: number; downPercentage: number } => {
    const total = post.votes.up + post.votes.down;
    if (total === 0) return { upPercentage: 0, downPercentage: 0 };
    
    return {
      upPercentage: Math.round((post.votes.up / total) * 100),
      downPercentage: Math.round((post.votes.down / total) * 100)
    };
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="flex-1 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-6 z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Community Feed</h1>
                <p className="text-slate-400 text-sm font-medium">Share your thoughts and connect with others</p>
              </div>
              <Button
                onClick={() => setShowPostCreator(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Post
              </Button>
            </div>
          </motion.div>

          {/* Enhanced Search and Filters */}
          <div className="space-y-4">
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

      {/* Posts */}
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <AnimatePresence mode="wait">
          {filteredPosts.map((post, index) => {
            const { upPercentage, downPercentage } = getVotePercentage(post);
            const isCommentsExpanded = expandedComments.has(post.id);
            
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-slate-800 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 overflow-hidden group hover:shadow-xl hover:shadow-black/20"
              >
                {/* Post Header */}
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
                            : 'text-slate-400 hover:text-white'
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

                  {/* Post Content */}
                  <p className="text-slate-100 text-base leading-relaxed mb-4 font-medium">
                    {post.content}
                  </p>

                  {/* Tags */}
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-semibold border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

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

                {/* Enhanced Voting System with Percentages */}
                <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote(post.id, 'up')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                          post.isVoted === 'up'
                            ? 'bg-green-600/20 text-green-400 shadow-lg shadow-green-600/10'
                            : 'text-slate-400 hover:bg-slate-700 hover:text-green-400'
                        }`}
                      >
                        <ThumbsUp size={16} className={post.isVoted === 'up' ? 'fill-current' : ''} />
                        <span className="font-semibold text-sm">{post.votes.up}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote(post.id, 'down')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                          post.isVoted === 'down'
                            ? 'bg-red-600/20 text-red-400 shadow-lg shadow-red-600/10'
                            : 'text-slate-400 hover:bg-slate-700 hover:text-red-400'
                        }`}
                      >
                        <ThumbsDown size={16} className={post.isVoted === 'down' ? 'fill-current' : ''} />
                        <span className="font-semibold text-sm">{post.votes.down}</span>
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleComments(post.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                          isCommentsExpanded
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'text-slate-400 hover:bg-slate-700 hover:text-blue-400'
                        }`}
                      >
                        <MessageCircle size={16} />
                        <span className="font-semibold text-sm">{post.comments.length}</span>
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

                  {/* Vote Percentage Bar */}
                  {(post.votes.up > 0 || post.votes.down > 0) && (
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div className="h-full flex">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${upPercentage}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="bg-green-500 h-full"
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${downPercentage}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="bg-red-500 h-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Comments Section */}
                <CommentSection
                  postId={post.id}
                  comments={post.comments}
                  isExpanded={isCommentsExpanded}
                  onToggle={() => toggleComments(post.id)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Post Creator Modal */}
      <PostCreator
        isOpen={showPostCreator}
        onClose={() => setShowPostCreator(false)}
      />
    </div>
  );
};

export default MainFeed;
