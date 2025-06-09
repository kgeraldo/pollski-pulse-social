
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Hash, Smile, X, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickPostComposerProps {
  onSubmit: (content: string, options: any) => void;
}

const QuickPostComposer: React.FC<QuickPostComposerProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [includeLocation, setIncludeLocation] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    onSubmit(content, {
      privacy,
      includeLocation,
      audience: selectedAudience
    });
    
    setContent('');
    setIsExpanded(false);
    setIncludeLocation(false);
    setSelectedAudience([]);
  };

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: '🌍' },
    { value: 'friends', label: 'Friends', icon: '👥' },
    { value: 'private', label: 'Private', icon: '🔒' }
  ];

  return (
    <motion.div
      layout
      className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4"
    >
      <div className="flex items-start gap-3">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop"
          alt="Your avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's happening?"
            className="w-full bg-transparent text-white placeholder-slate-400 resize-none border-none focus:outline-none text-lg"
            rows={isExpanded ? 3 : 1}
          />
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                {/* Privacy Settings */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Share with:</span>
                  <div className="flex gap-1">
                    {privacyOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPrivacy(option.value as any)}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${
                          privacy === option.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        <span className="mr-1">{option.icon}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Options */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-transparent hover:bg-slate-700 text-slate-400 hover:text-blue-400 h-8 w-8 p-0"
                    >
                      <Image size={16} />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-transparent hover:bg-slate-700 text-slate-400 hover:text-purple-400 h-8 w-8 p-0"
                    >
                      <Video size={16} />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-transparent hover:bg-slate-700 text-slate-400 hover:text-green-400 h-8 w-8 p-0"
                    >
                      <Hash size={16} />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-transparent hover:bg-slate-700 text-slate-400 hover:text-yellow-400 h-8 w-8 p-0"
                    >
                      <Smile size={16} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIncludeLocation(!includeLocation)}
                      className={`h-8 w-8 p-0 ${
                        includeLocation
                          ? 'bg-red-600 text-white'
                          : 'bg-transparent hover:bg-slate-700 text-slate-400 hover:text-red-400'
                      }`}
                    >
                      <MapPin size={16} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">
                      {280 - content.length} characters left
                    </span>
                    <Button
                      onClick={() => setIsExpanded(false)}
                      size="sm"
                      className="bg-transparent hover:bg-slate-700 text-slate-400 h-8 w-8 p-0"
                    >
                      <X size={16} />
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!content.trim() || content.length > 280}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 h-8 text-sm font-medium rounded-full"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickPostComposer;
