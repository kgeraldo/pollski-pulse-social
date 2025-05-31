
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from 'lucide-react';
import CommentSystem from './CommentSystem';
import EnhancedPoll from './EnhancedPoll';
import PostHeader from './post/PostHeader';
import PostActions from './post/PostActions';
import { useMentions } from '@/hooks/useMentions';
import { ReactionType } from './EnhancedReactions';

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
  type?: 'text' | 'image' | 'video' | 'poll';
  poll?: any;
  reactions?: Array<{
    type: ReactionType;
    count: number;
    users: string[];
    hasReacted: boolean;
  }>;
}

interface EnhancedPostCardProps {
  post: Post;
  onVote: (postId: number, voteType: 'up' | 'down') => void;
  onBookmark: (postId: number) => void;
  onToggleComments: (postId: number) => void;
  onCommentSubmit: (postId: number, content: string, parentId?: string) => void;
  onCommentVote: (postId: number, commentId: string, voteType: 'up' | 'down') => void;
  onToggleCollapse: (postId: number, commentId: string) => void;
  onPollVote?: (postId: number, optionIds: string[]) => void;
  onReact?: (postId: number, reactionType: ReactionType) => void;
  index?: number;
}

const EnhancedPostCard: React.FC<EnhancedPostCardProps> = ({
  post,
  onVote,
  onBookmark,
  onToggleComments,
  onCommentSubmit,
  onCommentVote,
  onToggleCollapse,
  onPollVote,
  onReact,
  index = 0
}) => {
  const { formatTextWithMentions } = useMentions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.24, delay: index * 0.04 }}
      className="space-y-3"
    >
      <div className="bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-240 overflow-hidden group hover:shadow-lg hover:shadow-black/16">
        <div className="p-4 pb-3">
          <PostHeader
            author={post.author}
            avatar={post.avatar}
            timeAgo={post.timeAgo}
            category={post.category}
            isBookmarked={post.isBookmarked}
            onBookmark={() => onBookmark(post.id)}
          />

          <div className="text-slate-100 text-sm leading-relaxed mb-3 font-medium">
            {formatTextWithMentions(post.content)}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-700 text-slate-300 text-xs rounded-md font-medium cursor-pointer hover:bg-slate-600 transition-colors"
              >
                <Tag size={10} />
                #{tag}
              </span>
            ))}
          </div>

          {post.image && (
            <motion.img
              whileHover={{ scale: 1.016 }}
              src={post.image}
              alt="Post content"
              className="w-full h-48 object-cover rounded-lg mb-3 cursor-pointer transition-transform duration-240"
            />
          )}

          {post.video && (
            <video
              controls
              className="w-full h-48 object-cover rounded-lg mb-3"
              poster="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop"
            >
              <source src={post.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {post.type === 'poll' && post.poll && onPollVote && (
            <div className="mb-3">
              <EnhancedPoll
                question={post.poll.question}
                description={post.poll.description}
                options={post.poll.options}
                totalVotes={post.poll.totalVotes}
                hasVoted={post.poll.hasVoted}
                userVote={post.poll.userVote}
                endsAt={post.poll.endsAt}
                multipleChoice={post.poll.multipleChoice}
                onVote={(optionIds) => onPollVote(post.id, optionIds)}
              />
            </div>
          )}
        </div>

        <PostActions
          postId={post.id}
          votes={post.votes}
          comments={post.comments}
          shares={post.shares}
          isVoted={post.isVoted}
          showComments={post.showComments}
          reactions={post.reactions}
          onVote={onVote}
          onToggleComments={onToggleComments}
          onReact={onReact}
        />
      </div>

      <AnimatePresence>
        {post.showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
          >
            <CommentSystem
              postId={post.id}
              comments={post.commentsData || []}
              onCommentSubmit={(content, parentId) => onCommentSubmit(post.id, content, parentId)}
              onCommentVote={(commentId, voteType) => onCommentVote(post.id, commentId, voteType)}
              onToggleCollapse={(commentId) => onToggleCollapse(post.id, commentId)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnhancedPostCard;
