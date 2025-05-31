
import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostHeaderProps {
  author: string;
  avatar: string;
  timeAgo: string;
  category: string;
  isBookmarked: boolean;
  onBookmark: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  author,
  avatar,
  timeAgo,
  category,
  isBookmarked,
  onBookmark
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2.5">
        <motion.img
          whileHover={{ scale: 1.04 }}
          src={avatar}
          alt={author}
          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-600"
        />
        <div>
          <h3 className="text-white font-semibold text-sm">{author}</h3>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">{timeAgo}</span>
            <span className="text-slate-500">•</span>
            <span className="text-blue-400 font-medium">{category}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBookmark}
          className={`h-7 w-7 p-0 transition-colors duration-160 ${
            isBookmarked
              ? 'text-yellow-400 hover:text-yellow-300'
              : 'text-slate-400 hover:text-yellow-400'
          }`}
        >
          <Bookmark size={14} className={isBookmarked ? 'fill-current' : ''} />
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
  );
};

export default PostHeader;
