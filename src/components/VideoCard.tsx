
import React from 'react';
import { motion } from 'framer-motion';
import { Play, MessageCircle, Share, MoreHorizontal, Bookmark, Flag, Tag, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPost {
  id: number;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  videoUrl: string;
  thumbnail: string;
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

interface VideoCardProps {
  post: VideoPost;
  onVote: (postId: number, voteType: 'up' | 'down') => void;
  onBookmark: (postId: number) => void;
  index?: number;
}

const VideoCard: React.FC<VideoCardProps> = ({
  post,
  onVote,
  onBookmark,
  index = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.24, delay: index * 0.04 }}
      className="bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-240 overflow-hidden group hover:shadow-lg hover:shadow-black/16"
    >
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

        <p className="text-slate-100 text-sm leading-relaxed mb-3 font-medium">
          {post.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-700 text-slate-300 text-xs rounded-md font-medium"
            >
              <Tag size={10} />
              #{tag}
            </span>
          ))}
        </div>

        {/* Video */}
        <div className="relative mb-3">
          <video
            controls
            poster={post.thumbnail}
            className="w-full h-48 object-cover rounded-lg"
          >
            <source src={post.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-2 left-2 bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
            <Play size={10} />
            VIDEO
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-slate-700/40 bg-slate-800/40">
        <div className="flex items-center justify-between">
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

          <div className="flex items-center gap-0.5">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-blue-400 transition-all duration-160 text-xs"
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
    </motion.div>
  );
};

export default VideoCard;
