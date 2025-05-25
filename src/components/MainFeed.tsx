
import { useState } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Share2, Play, Pause, Volume2, VolumeX, CheckCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const MainFeed = () => {
  const { activeFilter, setActiveFilter, sortOrder, setSortOrder, posts } = useStore();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const [votes, setVotes] = useState<Record<string, number>>({});

  const filters = ['All', 'Poll', 'Rating', 'Video', 'Ascending', 'Descending'];

  const handleVote = (postId: string, direction: 'up' | 'down') => {
    setVotes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (direction === 'up' ? 1 : -1)
    }));
  };

  const toggleVideo = (postId: string) => {
    setPlayingVideo(prev => prev === postId ? null : postId);
  };

  const toggleMute = (postId: string) => {
    setMutedVideos(prev => {
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
      {/* Header with Search */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 p-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <span className="text-slate-400">Categories</span>
              <span className="text-slate-400">Ratings</span>
              <Button className="bg-blue-600 hover:bg-blue-700">Create Poll</Button>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (filter === 'Ascending' || filter === 'Descending') {
                    setSortOrder(filter.toLowerCase() as 'asc' | 'desc');
                  } else {
                    setActiveFilter(filter);
                  }
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === filter || sortOrder === filter.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-all duration-300"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {post.user.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{post.user.name}</span>
                      {post.user.verified && (
                        <CheckCircle className="text-blue-500" size={16} />
                      )}
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-500 text-sm">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <span className="text-slate-400 text-sm bg-slate-700 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="flex">
                {/* Voting Column */}
                <div className="flex flex-col items-center justify-start p-4 bg-slate-850 border-r border-slate-700">
                  <button
                    onClick={() => handleVote(post.id, 'up')}
                    className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-700 rounded transition-colors"
                  >
                    <ChevronUp size={20} />
                  </button>
                  <span className="text-white font-medium py-1">
                    {votes[post.id] || 0}
                  </span>
                  <button
                    onClick={() => handleVote(post.id, 'down')}
                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors"
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>

                {/* Content Column */}
                <div className="flex-1 p-4">
                  <p className="text-white mb-4 leading-relaxed">{post.content}</p>
                  
                  {/* Media */}
                  {post.media && (
                    <div className="relative rounded-lg overflow-hidden mb-4 group">
                      {post.type === 'video' ? (
                        <div className="relative">
                          <img
                            src={post.media}
                            alt="Video thumbnail"
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleVideo(post.id)}
                              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-200"
                            >
                              {playingVideo === post.id ? (
                                <Pause size={24} className="text-white" />
                              ) : (
                                <Play size={24} className="text-white ml-1" />
                              )}
                            </motion.button>
                          </div>
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
                    <div className="mb-4 p-4 bg-slate-750 rounded-lg border border-slate-600">
                      <h4 className="text-white font-semibold mb-3">{post.poll.question}</h4>
                      <div className="space-y-2">
                        {post.poll.options.map((option, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-all duration-200"
                          >
                            <div className="flex justify-between items-center">
                              <span>{option.text}</span>
                              <span className="text-slate-400 text-sm">
                                {option.votes} votes
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 text-slate-400">
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                      <MessageSquare size={18} />
                      <span>{post.reactions.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                      <Share2 size={18} />
                      <span>{post.reactions.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainFeed;
