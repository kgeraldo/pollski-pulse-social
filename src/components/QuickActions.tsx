
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Users, Camera, Video, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  action: () => void;
}

interface QuickActionsProps {
  onCreatePost: (type: string) => void;
  onOpenMessages: () => void;
  onOpenCommunity: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onCreatePost,
  onOpenMessages,
  onOpenCommunity
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions: QuickAction[] = [
    {
      id: 'text',
      label: 'Text Post',
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/20',
      action: () => onCreatePost('text')
    },
    {
      id: 'photo',
      label: 'Photo',
      icon: Camera,
      color: 'text-green-400',
      bgColor: 'bg-green-600/20',
      action: () => onCreatePost('image')
    },
    {
      id: 'video',
      label: 'Video',
      icon: Video,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600/20',
      action: () => onCreatePost('video')
    },
    {
      id: 'poll',
      label: 'Poll',
      icon: BarChart3,
      color: 'text-orange-400',
      bgColor: 'bg-orange-600/20',
      action: () => onCreatePost('poll')
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      color: 'text-pink-400',
      bgColor: 'bg-pink-600/20',
      action: onOpenMessages
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-600/20',
      action: onOpenCommunity
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    action.action();
                    setIsExpanded(false);
                  }}
                  className={`w-12 h-12 rounded-full ${action.bgColor} hover:${action.bgColor} border border-slate-600 shadow-lg group`}
                  title={action.label}
                >
                  <action.icon size={18} className={action.color} />
                </Button>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-slate-700 shadow-lg"
                >
                  {action.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg border border-blue-500"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={20} className="text-white" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default QuickActions;
