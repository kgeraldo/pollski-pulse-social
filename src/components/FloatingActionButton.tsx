
import { useState } from 'react';
import { Plus, Video, Image, BarChart3, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { icon: Video, label: 'Video', color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
    { icon: Image, label: 'Photo', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
    { icon: BarChart3, label: 'Poll', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
    { icon: FileText, label: 'Post', color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600' }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 mb-4"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative w-14 h-14 rounded-full ${action.color} ${action.hoverColor} flex items-center justify-center text-white shadow-xl transition-all duration-300`}
                onClick={() => console.log(`Create ${action.label}`)}
              >
                <action.icon size={22} />
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-16 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap pointer-events-none"
                >
                  {action.label}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 rounded-full flex items-center justify-center text-primary-foreground shadow-xl transition-all duration-300"
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
