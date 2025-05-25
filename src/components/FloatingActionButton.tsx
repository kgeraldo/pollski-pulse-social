
import { useState } from 'react';
import { Plus, Video, Image, BarChart3, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { icon: Video, label: 'Video', color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
    { icon: Image, label: 'Photo', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
    { icon: BarChart3, label: 'Poll', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
    { icon: FileText, label: 'Post', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
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
                className={`group relative w-14 h-14 rounded-full ${action.color} ${action.hoverColor} flex items-center justify-center text-white shadow-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl`}
                onClick={() => console.log(`Create ${action.label}`)}
              >
                <action.icon size={22} />
                <span className="absolute right-16 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Plus size={26} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
