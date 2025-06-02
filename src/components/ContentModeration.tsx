
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, Eye, EyeOff, Flag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModerationAction {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  severity: 'low' | 'medium' | 'high';
  action: () => void;
}

interface ContentModerationProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  contentType: 'post' | 'comment' | 'user';
}

const ContentModeration: React.FC<ContentModerationProps> = ({
  isOpen,
  onClose,
  postId,
  contentType
}) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const moderationActions: ModerationAction[] = [
    {
      id: 'hide',
      label: 'Hide Content',
      icon: EyeOff,
      color: 'text-yellow-400',
      severity: 'low',
      action: () => handleModerationAction('hide')
    },
    {
      id: 'flag',
      label: 'Flag for Review',
      icon: Flag,
      color: 'text-orange-400',
      severity: 'medium',
      action: () => handleModerationAction('flag')
    },
    {
      id: 'warn',
      label: 'Issue Warning',
      icon: AlertTriangle,
      color: 'text-red-400',
      severity: 'medium',
      action: () => handleModerationAction('warn')
    },
    {
      id: 'remove',
      label: 'Remove Content',
      icon: Trash2,
      color: 'text-red-500',
      severity: 'high',
      action: () => handleModerationAction('remove')
    }
  ];

  const violationReasons = [
    'Spam or unwanted content',
    'Harassment or bullying',
    'Hate speech',
    'Violence or dangerous organizations',
    'Intellectual property violation',
    'Nudity or sexual activity',
    'False information',
    'Other (specify below)'
  ];

  const handleModerationAction = (actionId: string) => {
    console.log(`Moderation action: ${actionId} on ${contentType} ${postId}`, { reason });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield size={20} className="text-blue-400" />
            <h2 className="text-white font-semibold text-lg">Content Moderation</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-white font-medium mb-3">Select Action</h3>
              <div className="space-y-2">
                {moderationActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selectedAction === action.id
                        ? 'bg-blue-600/20 border border-blue-500/30'
                        : 'bg-slate-700/50 hover:bg-slate-700'
                    }`}
                  >
                    <action.icon size={16} className={action.color} />
                    <span className="text-white font-medium">{action.label}</span>
                    <span className={`ml-auto text-xs px-2 py-1 rounded ${
                      action.severity === 'low' ? 'bg-yellow-600/20 text-yellow-400' :
                      action.severity === 'medium' ? 'bg-orange-600/20 text-orange-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {action.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedAction && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-white font-medium mb-3">Reason for Action</h3>
                  <div className="space-y-2">
                    {violationReasons.map((violationReason) => (
                      <label
                        key={violationReason}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={violationReason}
                          onChange={(e) => setReason(e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-slate-300 text-sm">{violationReason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {reason === 'Other (specify below)' && (
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Additional Details
                    </label>
                    <textarea
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none"
                      rows={3}
                      placeholder="Please provide additional details..."
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={() => selectedAction && moderationActions.find(a => a.id === selectedAction)?.action()}
              disabled={!selectedAction || !reason}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
            >
              Take Action
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContentModeration;
