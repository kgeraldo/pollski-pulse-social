
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Video, BarChart3, FileText, Smile, Hash, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postType: 'text' | 'image' | 'video' | 'poll';
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  postType
}) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const categories = ['General', 'Technology', 'Design', 'Business', 'Education', 'Photography', 'Entertainment'];

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    console.log('Creating post:', { content, category, tags, postType });
    onClose();
  };

  const getIcon = () => {
    switch (postType) {
      case 'image': return <Image size={20} />;
      case 'video': return <Video size={20} />;
      case 'poll': return <BarChart3 size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getTitle = () => {
    switch (postType) {
      case 'image': return 'Share a Photo';
      case 'video': return 'Upload a Video';
      case 'poll': return 'Create a Poll';
      default: return 'Create a Post';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  {getIcon()}
                </div>
                <h2 className="text-xl font-bold text-white">{getTitle()}</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-400 hover:text-white h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Content */}
              <div>
                <label className="text-sm font-semibold text-white mb-3 block">
                  {postType === 'poll' ? 'Poll Question' : 'Content'}
                </label>
                <Textarea
                  placeholder={postType === 'poll' ? 'What would you like to ask?' : 'Share your thoughts...'}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] bg-slate-700 border-slate-600 text-white placeholder-slate-400 resize-none"
                />
              </div>

              {/* Media Upload for Image/Video */}
              {(postType === 'image' || postType === 'video') && (
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block">
                    Upload {postType === 'image' ? 'Image' : 'Video'}
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      {postType === 'image' ? <Image size={32} className="text-slate-400" /> : <Video size={32} className="text-slate-400" />}
                      <p className="text-slate-400">
                        Drag and drop your {postType} here, or <span className="text-blue-400 cursor-pointer">browse</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Poll Options */}
              {postType === 'poll' && (
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block">
                    Poll Options
                  </label>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Input
                        key={i}
                        placeholder={`Option ${i}`}
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-white mb-3 block">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                        category === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-semibold text-white mb-3 block">
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 relative">
                    <Hash className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                      placeholder="Add a tag..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="pl-8 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                  <Button
                    onClick={handleAddTag}
                    size="sm"
                    className="bg-slate-700 hover:bg-slate-600"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md border border-blue-500/30"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-300"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-700">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Send size={16} />
                Publish
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;
