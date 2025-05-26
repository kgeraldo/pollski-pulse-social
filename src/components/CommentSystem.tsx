
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle, Award, Flag, Share, MoreHorizontal, Reply, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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

interface CommentSystemProps {
  postId: number;
  comments: Comment[];
  onCommentSubmit: (content: string, parentId?: string) => void;
  onCommentVote: (commentId: string, voteType: 'up' | 'down') => void;
  onToggleCollapse: (commentId: string) => void;
}

const CommentItem: React.FC<{
  comment: Comment;
  onVote: (commentId: string, voteType: 'up' | 'down') => void;
  onToggleCollapse: (commentId: string) => void;
  onReply: (parentId: string, content: string) => void;
}> = ({ comment, onVote, onToggleCollapse, onReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setShowReplyBox(false);
    }
  };

  const getIndentationStyle = (depth: number) => ({
    marginLeft: `${Math.min(depth * 16, 80)}px`,
    borderLeft: depth > 0 ? '1px solid rgba(71, 85, 105, 0.24)' : 'none',
    paddingLeft: depth > 0 ? '10px' : '0'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-3"
      style={getIndentationStyle(comment.depth)}
    >
      <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40 hover:border-slate-600/40 transition-colors">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={comment.avatar}
              alt={comment.author}
              className="w-6 h-6 rounded-full object-cover"
            />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-white font-medium">{comment.author}</span>
              {comment.isAwarded && (
                <Award className="text-yellow-400" size={11} />
              )}
              <span className="text-slate-400">•</span>
              <span className="text-slate-400">{comment.timeAgo}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleCollapse(comment.id)}
                className="text-slate-400 hover:text-white p-0.5 h-auto"
              >
                {comment.isCollapsed ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
                <span className="ml-0.5 text-xs">{comment.replies.length}</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white p-0.5 h-auto"
            >
              <MoreHorizontal size={12} />
            </Button>
          </div>
        </div>

        {/* Comment Content */}
        <div className="mb-2">
          <p className="text-slate-200 text-xs leading-relaxed">{comment.content}</p>
        </div>

        {/* Comment Actions */}
        <div className="flex items-center gap-0.5">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onVote(comment.id, 'up')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-160 text-xs ${
              comment.isVoted === 'up'
                ? 'bg-green-600/16 text-green-400 shadow-sm shadow-green-600/8'
                : 'text-slate-400 hover:bg-slate-700 hover:text-green-400'
            }`}
          >
            <ArrowUp size={11} className={comment.isVoted === 'up' ? 'fill-current' : ''} />
            <span className="font-semibold">{comment.votes.up}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onVote(comment.id, 'down')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-160 text-xs ${
              comment.isVoted === 'down'
                ? 'bg-red-600/16 text-red-400 shadow-sm shadow-red-600/8'
                : 'text-slate-400 hover:bg-slate-700 hover:text-red-400'
            }`}
          >
            <ArrowDown size={11} className={comment.isVoted === 'down' ? 'fill-current' : ''} />
            <span className="font-semibold">{comment.votes.down}</span>
          </motion.button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="text-slate-400 hover:text-blue-400 transition-colors ml-1"
          >
            <Reply size={11} />
            <span className="ml-1 text-xs">Reply</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-purple-400 transition-colors"
          >
            <Share size={11} />
            <span className="ml-1 text-xs">Share</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-red-400 transition-colors"
          >
            <Flag size={11} />
          </Button>
        </div>

        {/* Reply Box */}
        <AnimatePresence>
          {showReplyBox && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-slate-700/40"
            >
              <div className="space-y-2">
                <Textarea
                  placeholder="What are your thoughts?"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[64px] text-xs"
                />
                <div className="flex gap-1.5">
                  <Button
                    size="sm"
                    onClick={handleReplySubmit}
                    disabled={!replyContent.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7"
                  >
                    Reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowReplyBox(false);
                      setReplyContent('');
                    }}
                    className="text-slate-400 hover:text-white text-xs h-7"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nested Replies */}
      <AnimatePresence>
        {!comment.isCollapsed && comment.replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2"
          >
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onVote={onVote}
                onToggleCollapse={onToggleCollapse}
                onReply={onReply}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CommentSystem: React.FC<CommentSystemProps> = ({
  postId,
  comments,
  onCommentSubmit,
  onCommentVote,
  onToggleCollapse
}) => {
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'best' | 'top' | 'new' | 'controversial'>('best');

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onCommentSubmit(newComment);
      setNewComment('');
    }
  };

  const handleReply = (parentId: string, content: string) => {
    onCommentSubmit(content, parentId);
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'top':
        return (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down);
      case 'new':
        return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
      case 'controversial':
        const aControversy = Math.min(a.votes.up, a.votes.down);
        const bControversy = Math.min(b.votes.up, b.votes.down);
        return bControversy - aControversy;
      default: // 'best'
        const aScore = a.votes.up - a.votes.down;
        const bScore = b.votes.up - b.votes.down;
        return bScore - aScore;
    }
  });

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      {/* Comments Header */}
      <div className="p-4 border-b border-slate-700/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <MessageCircle className="text-blue-400" size={16} />
            <h3 className="text-white font-semibold text-sm">
              {comments.length} Comments
            </h3>
          </div>
          
          {/* Sort Options */}
          <div className="flex gap-1">
            {['best', 'top', 'new', 'controversial'].map((option) => (
              <Button
                key={option}
                variant={sortBy === option ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy(option as any)}
                className={`text-xs capitalize h-7 ${
                  sortBy === option
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* New Comment Box */}
        <div className="space-y-2">
          <Textarea
            placeholder="Join the conversation..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[80px] text-sm"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
            >
              Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="p-4">
        <AnimatePresence>
          {sortedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onVote={onCommentVote}
              onToggleCollapse={onToggleCollapse}
              onReply={handleReply}
            />
          ))}
        </AnimatePresence>
        
        {comments.length === 0 && (
          <div className="text-center py-6">
            <MessageCircle className="mx-auto text-slate-600 mb-2" size={24} />
            <p className="text-slate-400 text-xs">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSystem;
