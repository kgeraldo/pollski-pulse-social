
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Share2, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Story {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: {
    type: 'image' | 'video' | 'text';
    url?: string;
    text?: string;
    backgroundColor?: string;
  };
  timestamp: string;
  duration: number;
  views: number;
  likes: number;
  hasLiked: boolean;
}

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onLike: (storyId: string) => void;
  onShare: (storyId: string) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  onLike,
  onShare
}) => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const currentStory = stories[currentIndex];

  useEffect(() => {
    if (!isOpen || !isPlaying || !currentStory) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (currentStory.duration / 100));
        if (newProgress >= 100) {
          if (currentIndex < stories.length - 1) {
            onNext();
          } else {
            onClose();
          }
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, currentStory, currentIndex, stories.length, onNext, onClose]);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showControls) {
      timer = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showControls]);

  if (!isOpen || !currentStory) return null;

  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width / 3) {
      onPrevious();
    } else if (x > (2 * width) / 3) {
      onNext();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        onMouseMove={() => setShowControls(true)}
      >
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
          {stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          ))}
        </div>

        {/* Story Content */}
        <div
          className="relative w-full h-full max-w-md mx-auto cursor-pointer"
          onClick={handleTap}
        >
          {currentStory.content.type === 'image' && (
            <motion.img
              key={currentStory.id}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={currentStory.content.url}
              alt="Story"
              className="w-full h-full object-cover"
            />
          )}

          {currentStory.content.type === 'video' && (
            <video
              key={currentStory.id}
              src={currentStory.content.url}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop={false}
              onEnded={onNext}
            />
          )}

          {currentStory.content.type === 'text' && (
            <div
              className="w-full h-full flex items-center justify-center p-8"
              style={{
                backgroundColor: currentStory.content.backgroundColor || '#1e293b'
              }}
            >
              <motion.p
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-white text-2xl font-bold text-center leading-relaxed"
              >
                {currentStory.content.text}
              </motion.p>
            </div>
          )}

          {/* Story Header */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-16 left-4 right-4 flex items-center justify-between z-10"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={currentStory.author.avatar}
                    alt={currentStory.author.name}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-sm">{currentStory.author.name}</h3>
                    <p className="text-white/80 text-xs">{currentStory.timestamp}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="bg-black/50 hover:bg-black/70 text-white h-8 w-8 p-0 rounded-full"
                >
                  <X size={16} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Story Footer */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 z-10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLike(currentStory.id);
                      }}
                      className={`bg-black/50 hover:bg-black/70 h-10 w-10 p-0 rounded-full ${
                        currentStory.hasLiked ? 'text-red-400' : 'text-white'
                      }`}
                    >
                      <Heart size={18} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle reply
                      }}
                      className="bg-black/50 hover:bg-black/70 text-white h-10 w-10 p-0 rounded-full"
                    >
                      <MessageCircle size={18} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShare(currentStory.id);
                      }}
                      className="bg-black/50 hover:bg-black/70 text-white h-10 w-10 p-0 rounded-full"
                    >
                      <Share2 size={18} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentStory.content.type === 'video' && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="bg-black/50 hover:bg-black/70 text-white h-8 w-8 p-0 rounded-full"
                      >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      className="bg-black/50 hover:bg-black/70 text-white h-8 w-8 p-0 rounded-full"
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 text-white/80 text-xs">
                  <span>{currentStory.views} views</span>
                  <span>{currentStory.likes} likes</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StoryViewer;
