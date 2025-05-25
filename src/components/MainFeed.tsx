
import { useState } from 'react';
import { ArrowUp, ArrowDown, Heart, MessageCircle, Share2, Play, Pause, Volume2, VolumeX, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const MainFeed = () => {
  const { activeFilter, setActiveFilter, sortOrder, setSortOrder, posts } = useStore();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());

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
    <div className="flex-1 bg-background min-h-screen">
      {/* Filter Bar */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border p-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent border border-border'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200 border border-border"
          >
            {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="font-medium">{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Posts */}
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Post Header */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center font-bold text-primary-foreground">
                    {post.user.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-card-foreground font-semibold">{post.user.name}</span>
                      {post.user.verified && (
                        <CheckCircle className="text-primary" size={16} />
                      )}
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">{post.category}</span>
                  </div>
                </div>
                <span className="text-muted-foreground text-sm bg-accent px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-6">
                <p className="text-card-foreground mb-5 leading-relaxed text-lg">{post.content}</p>
                
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
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleVideo(post.id)}
                            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-200"
                          >
                            {playingVideo === post.id ? (
                              <Pause size={32} className="text-white" />
                            ) : (
                              <Play size={32} className="text-white ml-1" />
                            )}
                          </motion.button>
                        </div>
                        
                        {/* Video Controls */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleMute(post.id)}
                            className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200"
                          >
                            {mutedVideos.has(post.id) ? (
                              <VolumeX size={18} />
                            ) : (
                              <Volume2 size={18} />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <motion.img
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        src={post.media}
                        alt="Post media"
                        className="w-full h-80 object-cover"
                      />
                    )}
                  </div>
                )}

                {/* Poll */}
                {post.poll && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-5 p-5 bg-accent/50 rounded-xl border border-border"
                  >
                    <h4 className="text-card-foreground font-semibold mb-4 text-lg">{post.poll.question}</h4>
                    <div className="space-y-3">
                      {post.poll.options.map((option, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left p-4 bg-card hover:bg-accent rounded-xl text-card-foreground transition-all duration-200 border border-border"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{option.text}</span>
                            <span className="text-muted-foreground bg-accent px-3 py-1 rounded-lg text-sm">
                              {option.votes} votes
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Reactions */}
                <div className="flex items-center gap-8 pt-5 border-t border-border">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      likedPosts.has(post.id)
                        ? 'text-red-500 bg-red-500/10'
                        : 'text-muted-foreground hover:text-red-500 hover:bg-red-500/10'
                    }`}
                  >
                    <Heart size={18} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                    <span className="font-medium">{post.reactions.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-all duration-200"
                  >
                    <MessageCircle size={18} />
                    <span className="font-medium">{post.reactions.comments}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-green-500 hover:bg-green-500/10 transition-all duration-200"
                  >
                    <Share2 size={18} />
                    <span className="font-medium">{post.reactions.shares}</span>
                  </motion.button>
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
