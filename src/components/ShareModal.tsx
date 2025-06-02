
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Mail, MessageCircle, ExternalLink, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  postId,
  postTitle
}) => {
  const [copied, setCopied] = useState(false);
  const postUrl = `${window.location.origin}/post/${postId}`;

  const shareOptions = [
    {
      id: 'copy',
      label: 'Copy Link',
      icon: Copy,
      color: 'text-blue-400',
      action: () => handleCopyLink()
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      color: 'text-green-400',
      action: () => handleEmailShare()
    },
    {
      id: 'message',
      label: 'Direct Message',
      icon: MessageCircle,
      color: 'text-purple-400',
      action: () => handleDirectMessage()
    },
    {
      id: 'external',
      label: 'Share Externally',
      icon: ExternalLink,
      color: 'text-orange-400',
      action: () => handleExternalShare()
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this post: ${postTitle}`);
    const body = encodeURIComponent(`I thought you might be interested in this post:\n\n${postTitle}\n\n${postUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    onClose();
  };

  const handleDirectMessage = () => {
    // Implement direct message functionality
    console.log('Opening direct message with post link');
    onClose();
  };

  const handleExternalShare = () => {
    if (navigator.share) {
      navigator.share({
        title: postTitle,
        url: postUrl
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyLink();
    }
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
          className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 mb-6">
            <Share2 size={20} className="text-blue-400" />
            <h2 className="text-white font-semibold text-lg">Share Post</h2>
          </div>

          <div className="space-y-3 mb-6">
            {shareOptions.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={option.action}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                <div className={`w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center ${option.color}`}>
                  {option.id === 'copy' && copied ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <option.icon size={16} />
                  )}
                </div>
                <span className="text-white font-medium">
                  {option.id === 'copy' && copied ? 'Copied!' : option.label}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="border-t border-slate-700 pt-4">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-slate-400 text-xs mb-1">Link to share:</div>
              <div className="text-white text-sm font-mono break-all">{postUrl}</div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full mt-4 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Close
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShareModal;
