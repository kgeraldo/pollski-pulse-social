
import React, { useState } from 'react';
import { X, Image, Video, BarChart3, Smile, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from './RichTextEditor';

interface PostCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  postType?: 'text' | 'image' | 'video' | 'poll';
}

const PostCreator: React.FC<PostCreatorProps> = ({
  isOpen,
  onClose,
  postType = 'text'
}) => {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const categories = [
    'General', 'Technology', 'Work', 'AI', 'Entertainment', 
    'Sports', 'Politics', 'Education', 'Health', 'Travel'
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    console.log('Creating post:', {
      content,
      category: selectedCategory,
      tags,
      type: postType
    });
    
    onClose();
    setContent('');
    setTags([]);
    setSelectedCategory('General');
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  {postType === 'image' && <Image className="text-blue-400" size={20} />}
                  {postType === 'video' && <Video className="text-blue-400" size={20} />}
                  {postType === 'poll' && <BarChart3 className="text-blue-400" size={20} />}
                  {postType === 'text' && <Smile className="text-blue-400" size={20} />}
                </div>
                <h2 className="text-xl font-bold text-white">
                  Create {postType === 'text' ? 'Post' : postType.charAt(0).toUpperCase() + postType.slice(1)}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              {/* Rich Text Editor */}
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="What's on your mind?"
              />

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30"
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button
                    onClick={handleAddTag}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Media Upload (for image/video posts) */}
              {(postType === 'image' || postType === 'video') && (
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    {postType === 'image' ? (
                      <Image className="text-slate-400" size={32} />
                    ) : (
                      <Video className="text-slate-400" size={32} />
                    )}
                    <p className="text-slate-400">
                      Drop your {postType} here or click to browse
                    </p>
                    <Button variant="outline" className="border-slate-600 text-slate-300">
                      Choose File
                    </Button>
                  </div>
                </div>
              )}

              {/* Poll Creator */}
              {postType === 'poll' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Poll Question
                    </label>
                    <input
                      type="text"
                      placeholder="Ask a question..."
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Options
                    </label>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <input
                          key={i}
                          type="text"
                          placeholder={`Option ${i}`}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">
                  {content.length}/280 characters
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  Post
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostCreator;
