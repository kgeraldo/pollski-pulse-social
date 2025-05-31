
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  isVoted?: 'up' | 'down' | null;
}

interface PostCardProps {
  post: Post;
  index: number;
  onVote: (postId: number, voteType: 'up' | 'down') => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, index, onVote }) => {
  return (
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
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200"
          >
            <MoreHorizontal size={18} />
          </Button>
        </div>

        <p className="text-slate-100 text-base leading-relaxed mb-4 font-medium">
          {post.content}
        </p>

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onVote(post.id, 'up')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                post.isVoted === 'up'
                  ? 'bg-green-600/20 text-green-400 shadow-lg shadow-green-600/10'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-green-400'
              }`}
            >
              <Heart size={16} className={post.isVoted === 'up' ? 'fill-current' : ''} />
              <span className="font-semibold text-sm">{post.votes.up}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onVote(post.id, 'down')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                post.isVoted === 'down'
                  ? 'bg-red-600/20 text-red-400 shadow-lg shadow-red-600/10'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-red-400'
              }`}
            >
              <Heart size={16} className={`transform rotate-180 ${post.isVoted === 'down' ? 'fill-current' : ''}`} />
              <span className="font-semibold text-sm">{post.votes.down}</span>
            </motion.button>
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
