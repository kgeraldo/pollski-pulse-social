import React, { useState } from 'react';
import { Users, TrendingUp, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedPostCard from './EnhancedPostCard';
import VideoCard from './VideoCard';
import PollCard from './PollCard';
import AuthPages from './AuthPages';
import AdvancedSearchFilter from './AdvancedSearchFilter';
import CreatePostModal from './CreatePostModal';
import EnhancedHeader from './EnhancedHeader';
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
  type?: 'text' | 'video' | 'poll';
  videoUrl?: string;
  thumbnail?: string;
  poll?: {
    question: string;
    description: string;
    totalVotes: number;
    options: Array<{
      id: string;
      text: string;
      votes: number;
      percentage: number;
    }>;
    hasVoted: boolean;
    userVote?: string;
  };
}

interface FilterOption {
  value: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface FilterOptions {
  category: string;
  timeRange: string;
  sortBy: string;
  minRating: number;
  author: string;
  tags: string[];
}

const EnhancedMainFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [createPostType, setCreatePostType] = useState<'text' | 'image' | 'video' | 'poll'>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    category: 'All',
    timeRange: 'All Time',
    sortBy: 'Most Recent',
    minRating: 0,
    author: '',
    tags: []
  });

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
      type: 'text',
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
      type: 'text',
      commentsData: []
    },
    {
      id: 3,
      author: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      timeAgo: '3h ago',
      content: 'Check out this amazing tutorial on building modern React applications! This covers all the latest best practices.',
      votes: { up: 156, down: 12 },
      comments: 34,
      shares: 28,
      category: 'Education',
      tags: ['tutorial', 'react', 'development'],
      isVoted: null,
      isBookmarked: false,
      type: 'video',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=300&fit=crop'
    },
    {
      id: 4,
      author: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timeAgo: '5h ago',
      content: 'Which programming language should I learn next for web development?',
      votes: { up: 67, down: 3 },
      comments: 45,
      shares: 12,
      category: 'Technology',
      tags: ['programming', 'learning', 'career'],
      isVoted: null,
      isBookmarked: false,
      type: 'poll',
      poll: {
        question: 'Best language for modern web development?',
        description: 'Considering job market, learning curve, and future prospects',
        totalVotes: 342,
        options: [
          { id: 'js', text: 'JavaScript/TypeScript', votes: 145, percentage: 42.4 },
          { id: 'py', text: 'Python', votes: 98, percentage: 28.7 },
          { id: 'go', text: 'Go', votes: 67, percentage: 19.6 },
          { id: 'rust', text: 'Rust', votes: 32, percentage: 9.4 }
        ],
        hasVoted: false,
        userVote: undefined
      }
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

  const handlePollVote = (pollId: string, optionId: string): void => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === parseInt(pollId) && post.poll && !post.poll.hasVoted) {
          const updatedOptions = post.poll.options.map(option => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes
          }));

          const newTotalVotes = post.poll.totalVotes + 1;
          const optionsWithPercentage = updatedOptions.map(option => ({
            ...option,
            percentage: (option.votes / newTotalVotes) * 100
          }));

          return {
            ...post,
            poll: {
              ...post.poll,
              options: optionsWithPercentage,
              totalVotes: newTotalVotes,
              hasVoted: true,
              userVote: optionId
            }
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = (type: 'text' | 'image' | 'video' | 'poll') => {
    setCreatePostType(type);
    setShowCreatePost(true);
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

  const renderPostCard = (post: Post, index: number) => {
    if (post.type === 'video') {
      return (
        <VideoCard
          key={post.id}
          post={{
            ...post,
            videoUrl: post.videoUrl!,
            thumbnail: post.thumbnail!
          }}
          onVote={handleVote}
          onBookmark={handleBookmark}
          index={index}
        />
      );
    }
    
    if (post.type === 'poll') {
      return (
        <PollCard
          key={post.id}
          poll={{
            id: post.id.toString(),
            title: post.poll!.question,
            description: post.poll!.description,
            author: post.author,
            avatar: post.avatar,
            timeAgo: post.timeAgo,
            category: post.category,
            totalVotes: post.poll!.totalVotes,
            options: post.poll!.options,
            hasVoted: post.poll!.hasVoted,
            userVote: post.poll!.userVote
          }}
          onVote={handlePollVote}
          index={index}
        />
      );
    }

    return (
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
    );
  };

  return (
    <div className="flex-1 bg-slate-900 min-h-screen">
      <EnhancedHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAdvancedFilter={() => setShowAdvancedFilter(true)}
        onCreatePost={() => handleCreatePost('text')}
        onOpenAuth={() => { setAuthMode('login'); setShowAuth(true); }}
      />

      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4">
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

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-800 rounded-2xl border border-slate-700 p-6"
                  >
                    <div className="animate-pulse">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-700 rounded w-32"></div>
                          <div className="h-3 bg-slate-700 rounded w-20"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-700 rounded"></div>
                        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => renderPostCard(post, index))
            ) : (
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
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showAuth && (
          <AuthPages
            mode={authMode}
            onModeChange={setAuthMode}
            onClose={() => setShowAuth(false)}
          />
        )}
        {showAdvancedFilter && (
          <AdvancedSearchFilter
            isOpen={showAdvancedFilter}
            onClose={() => setShowAdvancedFilter(false)}
            onApplyFilters={setAdvancedFilters}
            currentFilters={advancedFilters}
          />
        )}
        {showCreatePost && (
          <CreatePostModal
            isOpen={showCreatePost}
            onClose={() => setShowCreatePost(false)}
            postType={createPostType}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedMainFeed;
