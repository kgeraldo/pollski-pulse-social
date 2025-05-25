
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
    <div className="flex-1 bg-slate-900 min-h-screen">
      {/* Filter Bar */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 p-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all duration-200"
          >
            {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="font-medium">{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-950 rounded-2xl border border-slate-800/50 overflow-hidden hover:border-slate-700/50 transition-all duration-300 shadow-xl backdrop-blur-sm"
          >
            {/* Post Header */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{post.user.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{post.user.name}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 text-sm">{post.timestamp}</span>
                  </div>
                  <span className="text-slate-400 text-sm">{post.category}</span>
                </div>
              </div>
              <span className="text-slate-500 text-sm bg-slate-800/50 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-6">
              <p className="text-white mb-5 leading-relaxed text-lg">{post.content}</p>
              
              {/* Media */}
              {post.media && (
                <div className="relative rounded-xl overflow-hidden mb-5 group">
                  {post.type === 'video' ? (
                    <div className="relative">
                      <img
                        src={post.media}
                        alt="Video thumbnail"
                        className="w-full h-80 object-cover"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-all duration-300">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Play size={32} className="text-white ml-1" />
                        </div>
                      </button>
                    </div>
                  ) : (
                    <img
                      src={post.media}
                      alt="Post media"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
              )}

              {/* Poll */}
              {post.poll && (
                <div className="mb-5 p-5 bg-slate-800/50 rounded-xl border border-slate-700/30">
                  <h4 className="text-white font-semibold mb-4 text-lg">{post.poll.question}</h4>
                  <div className="space-y-3">
                    {post.poll.options.map((option, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{option.text}</span>
                          <span className="text-slate-400 bg-slate-800/50 px-3 py-1 rounded-lg text-sm">
                            {option.votes} votes
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reactions */}
              <div className="flex items-center gap-8 pt-5 border-t border-slate-800">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    likedPosts.has(post.id)
                      ? 'text-red-400 bg-red-400/10'
                      : 'text-slate-400 hover:text-red-400 hover:bg-red-400/10'
                  }`}
                >
                  <Heart size={18} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                  <span className="font-medium">{post.reactions.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-200">
                  <MessageCircle size={18} />
                  <span className="font-medium">{post.reactions.comments}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-green-400 hover:bg-green-400/10 transition-all duration-200">
                  <Share2 size={18} />
                  <span className="font-medium">{post.reactions.shares}</span>
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
