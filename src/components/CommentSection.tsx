
import React, { useState } from 'react';
import { MessageCircle, Heart, Reply, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  isExpanded: boolean;
  onToggle: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  isExpanded,
  onToggle
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    console.log(`New comment on post ${postId}:`, newComment);
    setNewComment('');
  };

  const handleLikeComment = (commentId: number) => {
    console.log(`Like comment ${commentId}`);
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ 
    comment, 
    isReply = false 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isReply ? 'ml-12 pt-3' : 'py-4'}`}
    >
      <img
        src={comment.avatar}
        alt={comment.author}
        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-600"
      />
      <div className="flex-1">
        <div className="bg-slate-700/50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white text-sm">{comment.author}</span>
            <span className="text-slate-400 text-xs">{comment.timeAgo}</span>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">{comment.content}</p>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => handleLikeComment(comment.id)}
            className={`flex items-center gap-1 text-xs transition-colors duration-200 ${
              comment.isLiked 
                ? 'text-red-400 hover:text-red-300' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart size={12} className={comment.isLiked ? 'fill-current' : ''} />
            {comment.likes}
          </button>
          
          <button
            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors duration-200"
          >
            <Reply size={12} />
            Reply
          </button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-slate-400 hover:text-white"
          >
            <MoreHorizontal size={12} />
          </Button>
        </div>

        {/* Reply Input */}
        <AnimatePresence>
          {replyTo === comment.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Reply to ${comment.author}...`}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:border-blue-500 focus:outline-none"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Reply
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nested Replies */}
        {comment.replies && comment.replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-slate-700/50 bg-slate-800/30"
        >
          <div className="p-6">
            {/* Comment Input */}
            <div className="flex gap-3 mb-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-600"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                />
                <Button 
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-1">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="mx-auto text-slate-600 mb-2" size={32} />
                <p className="text-slate-400">No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentSection;
