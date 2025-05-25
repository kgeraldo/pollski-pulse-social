
import { useState } from 'react';
import { ArrowUp, ArrowDown, Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

const MainFeed = () => {
  const { activeFilter, setActiveFilter, sortOrder, setSortOrder, posts } = useStore();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const filters = ['All', 'Poll', 'Rating', 'Video', 'Post'];

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="flex-1 bg-slate-800 min-h-screen">
      {/* Filter Bar */}
      <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 text-slate-400 hover:text-white"
          >
            {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="p-4 space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden"
          >
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">{post.user.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{post.user.name}</span>
                    <span className="text-slate-500 text-sm">•</span>
                    <span className="text-slate-500 text-sm">{post.timestamp}</span>
                  </div>
                  <span className="text-slate-400 text-sm">{post.category}</span>
                </div>
              </div>
              <span className="text-slate-500 text-sm">Uncategorized</span>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <p className="text-white mb-4">{post.content}</p>
              
              {/* Media */}
              {post.media && (
                <div className="relative rounded-lg overflow-hidden mb-4">
                  {post.type === 'video' ? (
                    <div className="relative">
                      <img
                        src={post.media}
                        alt="Video thumbnail"
                        className="w-full h-64 object-cover"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-40 transition-colors">
                        <Play size={48} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <img
                      src={post.media}
                      alt="Post media"
                      className="w-full h-64 object-cover"
                    />
                  )}
                </div>
              )}

              {/* Poll */}
              {post.poll && (
                <div className="mb-4 p-4 bg-slate-800 rounded-lg">
                  <h4 className="text-white font-medium mb-3">{post.poll.question}</h4>
                  <div className="space-y-2">
                    {post.poll.options.map((option, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span>{option.text}</span>
                          <span className="text-slate-400">{option.votes} votes</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reactions */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-700">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    likedPosts.has(post.id)
                      ? 'text-red-400'
                      : 'text-slate-400 hover:text-red-400'
                  }`}
                >
                  <Heart size={16} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                  <span>{post.reactions.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                  <MessageCircle size={16} />
                  <span>{post.reactions.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
                  <Share2 size={16} />
                  <span>{post.reactions.shares}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MainFeed;
