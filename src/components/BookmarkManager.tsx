
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Folder, Plus, Search, Filter, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookmarkCollection {
  id: string;
  name: string;
  count: number;
  color: string;
  isDefault?: boolean;
}

interface BookmarkedPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  timestamp: Date;
  collectionId: string;
  preview: string;
  category: string;
}

interface BookmarkManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookmarkManager: React.FC<BookmarkManagerProps> = ({ isOpen, onClose }) => {
  const [activeCollection, setActiveCollection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const collections: BookmarkCollection[] = [
    { id: 'all', name: 'All Bookmarks', count: 24, color: 'blue', isDefault: true },
    { id: 'react', name: 'React Tips', count: 8, color: 'green' },
    { id: 'design', name: 'Design Inspiration', count: 12, color: 'purple' },
    { id: 'productivity', name: 'Productivity', count: 4, color: 'yellow' }
  ];

  const bookmarks: BookmarkedPost[] = [
    {
      id: '1',
      title: 'React 19 New Features You Need to Know',
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      collectionId: 'react',
      preview: 'Exploring the latest React 19 features including the new compiler...',
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Modern UI Design Principles',
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      collectionId: 'design',
      preview: 'Key principles for creating modern, user-friendly interfaces...',
      category: 'Design'
    }
  ];

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection = activeCollection === 'all' || bookmark.collectionId === activeCollection;
    return matchesSearch && matchesCollection;
  });

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    // Add new collection logic here
    setNewCollectionName('');
    setShowNewCollection(false);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 border border-slate-700 rounded-lg w-full max-w-4xl h-[80vh] flex overflow-hidden"
      >
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 border-r border-slate-700 p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <Bookmark size={20} />
              Bookmarks
            </h2>
            <Button
              onClick={onClose}
              size="sm"
              className="bg-transparent hover:bg-slate-700 text-slate-400 h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>

          <div className="space-y-2 mb-4">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setActiveCollection(collection.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  activeCollection === collection.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${collection.color}-500`}></div>
                  <span className="font-medium">{collection.name}</span>
                </div>
                <span className="text-sm opacity-70">{collection.count}</span>
              </button>
            ))}
          </div>

          <Button
            onClick={() => setShowNewCollection(true)}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 justify-start gap-2"
          >
            <Plus size={16} />
            New Collection
          </Button>

          <AnimatePresence>
            {showNewCollection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-2"
              >
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Collection name"
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateCollection}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                  >
                    Create
                  </Button>
                  <Button
                    onClick={() => setShowNewCollection(false)}
                    size="sm"
                    className="bg-slate-700 hover:bg-slate-600 text-slate-300"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bookmarks..."
                  className="w-full bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                size="sm"
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 gap-2"
              >
                <Filter size={16} />
                Filter
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredBookmarks.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark size={48} className="mx-auto text-slate-500 mb-4" />
                <h3 className="text-slate-400 text-lg mb-2">No bookmarks found</h3>
                <p className="text-slate-500">
                  {searchQuery ? 'Try different search terms' : 'Start bookmarking posts to see them here'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredBookmarks.map((bookmark) => (
                  <motion.div
                    key={bookmark.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 cursor-pointer hover:bg-slate-700/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={bookmark.avatar}
                        alt={bookmark.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium mb-1">{bookmark.title}</h3>
                        <p className="text-slate-400 text-sm mb-2 line-clamp-2">{bookmark.preview}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>By {bookmark.author}</span>
                          <span>•</span>
                          <span>{formatTime(bookmark.timestamp)}</span>
                          <span>•</span>
                          <span>{bookmark.category}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-transparent hover:bg-slate-600 text-yellow-400 h-8 w-8 p-0"
                      >
                        <Star size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookmarkManager;
