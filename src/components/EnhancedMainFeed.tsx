import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, TrendingUp, Clock, Users, Search, Bookmark, Flag, Tag, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedPostCard from './EnhancedPostCard';
import AuthPages from './AuthPages';
import { LucideProps } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
  votes: {
    up: number;
    down: number;
  };
  isVoted?: 'up' | 'down' | null;
  replies: Comment[];
  isCollapsed: boolean;
  depth: number;
  isAwarded?: boolean;
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
  comments: number;
  shares: number;
  category: string;
  tags: string[];
  isVoted?: 'up' | 'down' | null;
  isBookmarked: boolean;
  showComments?: boolean;
  commentsData?: Comment[];
}

interface FilterOption {
  value: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const EnhancedMainFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
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
      isBookmarked: false,
      showComments: false,
      commentsData: [
        {
          id: 'c1',
          author: 'DevExpert',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
          content: 'The React 19 compiler is a game-changer! It automatically optimizes re-renders without manual memoization.',
          timeAgo: '1h ago',
          votes: { up: 15, down: 2 },
          isVoted: 'up',
          replies: [
            {
              id: 'c1-r1',
              author: 'ReactFan',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
              content: 'Absolutely! No more useMemo and useCallback everywhere.',
              timeAgo: '45m ago',
              votes: { up: 8, down: 0 },
              replies: [],
              isCollapsed: false,
              depth: 1
            }
          ],
          isCollapsed: false,
          depth: 0,
          isAwarded: true
        }
      ]
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
      isBookmarked: true,
      showComments: false,
      commentsData: []
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

  const handleToggleComments = (postId: number): void => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  const handleCommentSubmit = (postId: number, content: string, parentId?: string): void => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      content,
      timeAgo: 'now',
      votes: { up: 1, down: 0 },
      isVoted: 'up',
      replies: [],
      isCollapsed: false,
      depth: parentId ? 1 : 0
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          let updatedComments = [...(post.commentsData || [])];
          
          if (parentId) {
            const addReply = (comments: Comment[]): Comment[] => {
              return comments.map(comment => {
                if (comment.id === parentId) {
                  return {
                    ...comment,
                    replies: [...comment.replies, { ...newComment, depth: comment.depth + 1 }]
                  };
                } else if (comment.replies.length > 0) {
                  return {
                    ...comment,
                    replies: addReply(comment.replies)
                  };
                }
                return comment;
              });
            };
            updatedComments = addReply(updatedComments);
          } else {
            updatedComments.push(newComment);
          }

          return {
            ...post,
            commentsData: updatedComments,
            comments: post.comments + 1
          };
        }
        return post;
      })
    );
  };

  const handleCommentVote = (postId: number, commentId: string, voteType: 'up' | 'down'): void => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updateCommentVote = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
              if (comment.id === commentId) {
                const currentVote = comment.isVoted;
                let newVotes = { ...comment.votes };
                let newVoteState: 'up' | 'down' | null = voteType;

                if (currentVote === 'up') newVotes.up--;
                if (currentVote === 'down') newVotes.down--;

                if (currentVote === voteType) {
                  newVoteState = null;
                } else {
                  if (voteType === 'up') newVotes.up++;
                  if (voteType === 'down') newVotes.down++;
                }

                return { ...comment, votes: newVotes, isVoted: newVoteState };
              } else if (comment.replies.length > 0) {
                return { ...comment, replies: updateCommentVote(comment.replies) };
              }
              return comment;
            });
          };

          return {
            ...post,
            commentsData: updateCommentVote(post.commentsData || [])
          };
        }
        return post;
      })
    );
  };

  const handleToggleCollapse = (postId: number, commentId: string): void => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updateCollapse = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
              if (comment.id === commentId) {
                return { ...comment, isCollapsed: !comment.isCollapsed };
              } else if (comment.replies.length > 0) {
                return { ...comment, replies: updateCollapse(comment.replies) };
              }
              return comment;
            });
          };

          return {
            ...post,
            commentsData: updateCollapse(post.commentsData || [])
          };
        }
        return post;
      })
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
      <div className="sticky top-0 bg-slate-900/96 backdrop-blur-lg border-b border-slate-700 p-4 z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
          >
            <div className="flex items-center justify-between mb-0.5">
              <h1 className="text-xl font-bold text-white">Community Feed</h1>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => { setAuthMode('login'); setShowAuth(true); }}
                  className="bg-slate-700 hover:bg-slate-600 text-white text-xs h-8"
                >
                  <LogIn size={12} className="mr-1.5" />
                  Sign in
                </Button>
                <Button
                  size="sm"
                  onClick={() => { setAuthMode('signup'); setShowAuth(true); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
                >
                  <User size={12} className="mr-1.5" />
                  Sign up
                </Button>
              </div>
            </div>
            <p className="text-slate-400 text-xs font-medium">Share your thoughts and connect with others</p>
          </motion.div>

          <div className="mt-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-slate-400" size={14} />
              <Input
                type="text"
                placeholder="Search posts, users, and tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/16 transition-all duration-160 text-sm h-9"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={activeFilter === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(option.value)}
                  className={`flex items-center gap-1.5 whitespace-nowrap transition-all duration-160 text-xs h-8 ${
                    activeFilter === option.value
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                  }`}
                >
                  <option.icon size={12} />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <AnimatePresence mode="wait">
          {filteredPosts.map((post, index) => (
            <EnhancedPostCard
              key={post.id}
              post={post}
              onVote={handleVote}
              onBookmark={handleBookmark}
              onToggleComments={handleToggleComments}
              onCommentSubmit={handleCommentSubmit}
              onCommentVote={handleCommentVote}
              onToggleCollapse={handleToggleCollapse}
              index={index}
            />
          ))}
        </AnimatePresence>
        
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10"
          >
            <Users className="mx-auto text-slate-600 mb-3" size={40} />
            <h3 className="text-lg font-semibold text-slate-400 mb-1">No posts found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search or check back later!</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showAuth && (
          <AuthPages
            mode={authMode}
            onModeChange={setAuthMode}
            onClose={() => setShowAuth(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedMainFeed;
