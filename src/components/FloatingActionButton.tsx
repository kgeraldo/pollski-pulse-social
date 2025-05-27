
import { useState } from 'react';
import { Plus, Video, Image, BarChart3, FileText, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreatePostModal from './CreatePostModal';

interface ActionItem {
  icon: LucideIcon;
  label: string;
  color: string;
  hoverColor: string;
  shadowColor: string;
  type: 'text' | 'image' | 'video' | 'poll';
}

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [createPostType, setCreatePostType] = useState<'text' | 'image' | 'video' | 'poll'>('text');

  const actions: ActionItem[] = [
    { 
      icon: Video, 
      label: 'Video', 
      color: 'bg-gradient-to-r from-red-500 to-red-600', 
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      shadowColor: 'shadow-red-500/25',
      type: 'video'
    },
    { 
      icon: Image, 
      label: 'Photo', 
      color: 'bg-gradient-to-r from-green-500 to-green-600', 
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      shadowColor: 'shadow-green-500/25',
      type: 'image'
    },
    { 
      icon: BarChart3, 
      label: 'Poll', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600', 
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      shadowColor: 'shadow-blue-500/25',
      type: 'poll'
    },
    { 
      icon: FileText, 
      label: 'Post', 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600', 
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      shadowColor: 'shadow-purple-500/25',
      type: 'text'
    }
  ];

  const handleActionClick = (action: ActionItem): void => {
    setCreatePostType(action.type);
    setShowCreatePost(true);
    setIsExpanded(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-3 mb-4"
            >
              {actions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    className="relative group"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, x: -8 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 rounded-2xl ${action.color} ${action.hoverColor} flex items-center justify-center text-white shadow-xl ${action.shadowColor} transition-all duration-300 backdrop-blur-md border border-white/10`}
                      onClick={() => handleActionClick(action)}
                    >
                      <IconComponent size={22} />
                    </motion.button>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.8 }}
                      whileHover={{ opacity: 1, x: 0, scale: 1 }}
                      className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap pointer-events-none border border-slate-700 shadow-xl"
                    >
                      {action.label}
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-900/95 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-600/25 transition-all duration-300 backdrop-blur-md border border-white/10"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Plus size={26} strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {showCreatePost && (
          <CreatePostModal
            isOpen={showCreatePost}
            onClose={() => setShowCreatePost(false)}
            postType={createPostType}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActionButton;
