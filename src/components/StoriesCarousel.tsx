
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Play } from 'lucide-react';
import StoryViewer from './StoryViewer';

interface StoryUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  hasStory: boolean;
  isViewed: boolean;
  isOwn?: boolean;
  storyCount: number;
}

interface StoriesCarouselProps {
  users: StoryUser[];
  onCreateStory: () => void;
  onViewStory: (userId: string) => void;
}

const StoriesCarousel: React.FC<StoriesCarouselProps> = ({
  users,
  onCreateStory,
  onViewStory
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [showViewer, setShowViewer] = useState(false);

  // Mock stories data for the viewer
  const mockStories = [
    {
      id: '1',
      author: {
        name: 'John Doe',
        username: '@johndoe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
      },
      content: {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop'
      },
      timestamp: '2h ago',
      duration: 5000,
      views: 24,
      likes: 8,
      hasLiked: false
    },
    {
      id: '2',
      author: {
        name: 'John Doe',
        username: '@johndoe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
      },
      content: {
        type: 'text' as const,
        text: 'Having an amazing day! 🌟',
        backgroundColor: '#6366f1'
      },
      timestamp: '1h ago',
      duration: 4000,
      views: 18,
      likes: 12,
      hasLiked: true
    }
  ];

  const handleStoryClick = (userId: string, index: number) => {
    setSelectedStoryIndex(index);
    setShowViewer(true);
    onViewStory(userId);
  };

  const handleNextStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < mockStories.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    }
  };

  const handlePreviousStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  };

  return (
    <>
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {/* Add Story Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateStory}
            className="flex-shrink-0 flex flex-col items-center gap-2 group"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-600 flex items-center justify-center group-hover:from-slate-500 group-hover:to-slate-600 transition-all duration-200">
                <Plus size={20} className="text-slate-300" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-slate-800">
                <Plus size={12} className="text-white" />
              </div>
            </div>
            <span className="text-slate-300 text-xs font-medium">Your Story</span>
          </motion.button>

          {/* User Stories */}
          {users.map((user, index) => (
            <motion.button
              key={user.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStoryClick(user.id, index)}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="relative">
                <div className={`w-16 h-16 rounded-full p-0.5 ${
                  user.hasStory && !user.isViewed
                    ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500'
                    : user.hasStory && user.isViewed
                    ? 'bg-gradient-to-br from-slate-500 to-slate-600'
                    : 'bg-slate-600'
                }`}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover border-2 border-slate-800"
                  />
                </div>
                
                {user.hasStory && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700">
                    <Play size={10} className="text-white ml-0.5" />
                  </div>
                )}
                
                {user.storyCount > 1 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-slate-800">
                    <span className="text-white text-xs font-bold">{user.storyCount}</span>
                  </div>
                )}
              </div>
              
              <span className={`text-xs font-medium max-w-16 truncate ${
                user.hasStory && !user.isViewed ? 'text-white' : 'text-slate-400'
              }`}>
                {user.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Story Viewer */}
      {showViewer && selectedStoryIndex !== null && (
        <StoryViewer
          stories={mockStories}
          currentIndex={selectedStoryIndex}
          isOpen={showViewer}
          onClose={() => setShowViewer(false)}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
          onLike={(storyId) => console.log('Liked story:', storyId)}
          onShare={(storyId) => console.log('Shared story:', storyId)}
        />
      )}
    </>
  );
};

export default StoriesCarousel;
