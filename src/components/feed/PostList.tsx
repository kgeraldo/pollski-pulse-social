
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import { Post, VoteType } from '@/types';
import EnhancedPostCard from '@/components/EnhancedPostCard';
import VideoCard from '@/components/VideoCard';
import PollCard from '@/components/PollCard';

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  onVote: (postId: number, voteType: VoteType) => void;
  onBookmark: (postId: number) => void;
  onToggleComments: (postId: number) => void;
  onCommentSubmit: (postId: number, content: string, parentId?: string) => void;
  onCommentVote: (postId: number, commentId: string, voteType: VoteType) => void;
  onToggleCollapse: (postId: number, commentId: string) => void;
  onPollVote: (pollId: string, optionId: string) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  isLoading,
  onVote,
  onBookmark,
  onToggleComments,
  onCommentSubmit,
  onCommentVote,
  onToggleCollapse,
  onPollVote
}) => {
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
          onVote={onVote}
          onBookmark={onBookmark}
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
          onVote={onPollVote}
          index={index}
        />
      );
    }

    return (
      <EnhancedPostCard
        key={post.id}
        post={post}
        onVote={onVote}
        onBookmark={onBookmark}
        onToggleComments={onToggleComments}
        onCommentSubmit={onCommentSubmit}
        onCommentVote={onCommentVote}
        onToggleCollapse={onToggleCollapse}
        index={index}
      />
    );
  };

  if (isLoading) {
    return (
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
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10"
      >
        <Users className="mx-auto text-slate-600 mb-3" size={40} />
        <h3 className="text-lg font-semibold text-slate-400 mb-1">No posts found</h3>
        <p className="text-slate-500 text-sm">Try adjusting your search or check back later!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {posts.map((post, index) => renderPostCard(post, index))}
      </AnimatePresence>
    </div>
  );
};

export default PostList;
