
import { useState } from 'react';
import { Plus, Video, Photo, BarChart3, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { icon: Video, label: 'Video', color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
    { icon: Photo, label: 'Photo', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
    { icon: BarChart3, label: 'Poll', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
    { icon: FileText, label: 'Post', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col gap-3 mb-4"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`w-12 h-12 rounded-full ${action.color} ${action.hoverColor} flex items-center justify-center text-white shadow-lg transition-all duration-200 transform hover:scale-110`}
                onClick={() => console.log(`Create ${action.label}`)}
              >
                <action.icon size={20} />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-200"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={24} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
