
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Share, MoreHorizontal, Bookmark, Flag, Tag, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommentSystem from './CommentSystem';
import EnhancedReactions from './EnhancedReactions';
import EnhancedPoll from './EnhancedPoll';
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

  const defaultReactions = [
    { type: 'like' as ReactionType, count: post.votes.up, users: ['User1', 'User2'], hasReacted: post.isVoted === 'up' },
    { type: 'love' as ReactionType, count: 12, users: ['User3', 'User4'], hasReacted: false },
    { type: 'laugh' as ReactionType, count: 5, users: ['User5'], hasReacted: false },
    { type: 'angry' as ReactionType, count: 2, users: ['User6'], hasReacted: false },
    { type: 'sad' as ReactionType, count: 1, users: ['User7'], hasReacted: false }
  ];

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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <motion.img
                whileHover={{ scale: 1.04 }}
                src={post.avatar}
                alt={post.author}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-600"
              />
              <div>
                <h3 className="text-white font-semibold text-sm">{post.author}</h3>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400">{post.timeAgo}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-blue-400 font-medium">{post.category}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBookmark(post.id)}
                className={`h-7 w-7 p-0 transition-colors duration-160 ${
                  post.isBookmarked
                    ? 'text-yellow-400 hover:text-yellow-300'
                    : 'text-slate-400 hover:text-yellow-400'
                }`}
              >
                <Bookmark size={14} className={post.isBookmarked ? 'fill-current' : ''} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-160 h-7 w-7 p-0"
              >
                <MoreHorizontal size={14} />
              </Button>
            </div>
          </div>

          {/* Post Content with Mention Support */}
          <div className="text-slate-100 text-sm leading-relaxed mb-3 font-medium">
            {formatTextWithMentions(post.content)}
          </div>

          {/* Tags */}
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

          {/* Media */}
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

          {/* Enhanced Poll */}
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

        <div className="px-4 py-3 border-t border-slate-700/40 bg-slate-800/40">
          <div className="flex items-center justify-between">
            {/* Enhanced Reactions */}
            {onReact ? (
              <EnhancedReactions
                postId={post.id}
                reactions={post.reactions || defaultReactions}
                onReact={onReact}
              />
            ) : (
              <div className="flex items-center gap-0.5">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onVote(post.id, 'up')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-160 text-xs ${
                    post.isVoted === 'up'
                      ? 'bg-green-600/16 text-green-400 shadow-sm shadow-green-600/8'
                      : 'text-slate-400 hover:bg-slate-700 hover:text-green-400'
                  }`}
                >
                  <ArrowUp size={13} className={post.isVoted === 'up' ? 'fill-current' : ''} />
                  <span className="font-semibold">{post.votes.up}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onVote(post.id, 'down')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-160 text-xs ${
                    post.isVoted === 'down'
                      ? 'bg-red-600/16 text-red-400 shadow-sm shadow-red-600/8'
                      : 'text-slate-400 hover:bg-slate-700 hover:text-red-400'
                  }`}
                >
                  <ArrowDown size={13} className={post.isVoted === 'down' ? 'fill-current' : ''} />
                  <span className="font-semibold">{post.votes.down}</span>
                </motion.button>
              </div>
            )}

            <div className="flex items-center gap-0.5">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onToggleComments(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-160 text-xs ${
                  post.showComments
                    ? 'bg-blue-600/16 text-blue-400'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-blue-400'
                }`}
              >
                <MessageCircle size={13} />
                <span className="font-semibold">{post.comments}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-purple-400 transition-all duration-160 text-xs"
              >
                <Share size={13} />
                <span className="font-semibold">{post.shares}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-all duration-160 text-xs"
              >
                <Flag size={13} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
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
