
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Plus, FolderPlus, Share, Download, MoreHorizontal, Folder, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Collection {
  id: string;
  name: string;
  description?: string;
  bookmarkCount: number;
  isPublic: boolean;
  color: string;
  createdAt: Date;
}

interface BookmarkItem {
  id: string;
  postId: number;
  title: string;
  author: string;
  content: string;
  image?: string;
  createdAt: Date;
  collections: string[];
}

const BookmarkCollections: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const collections: Collection[] = [
    {
      id: '1',
      name: 'Tech Articles',
      description: 'Best articles about web development and programming',
      bookmarkCount: 24,
      isPublic: true,
      color: 'blue',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Design Inspiration',
      description: 'UI/UX designs that inspire me',
      bookmarkCount: 12,
      isPublic: false,
      color: 'purple',
      createdAt: new Date('2024-02-10')
    },
    {
      id: '3',
      name: 'Career Advice',
      bookmarkCount: 8,
      isPublic: true,
      color: 'green',
      createdAt: new Date('2024-03-05')
    }
  ];

  const bookmarks: BookmarkItem[] = [
    {
      id: '1',
      postId: 1,
      title: 'The Future of React Development',
      author: 'Sarah Chen',
      content: 'React 19 brings amazing new features...',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      createdAt: new Date('2024-03-20'),
      collections: ['1']
    },
    {
      id: '2',
      postId: 2,
      title: 'Modern CSS Techniques',
      author: 'Mike Rodriguez',
      content: 'Container queries and new layout methods...',
      createdAt: new Date('2024-03-18'),
      collections: ['2']
    }
  ];

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      // Add collection logic here
      setNewCollectionName('');
      setShowCreateCollection(false);
    }
  };

  const colorClasses = {
    blue: 'bg-blue-500/20 border-blue-500 text-blue-400',
    purple: 'bg-purple-500/20 border-purple-500 text-purple-400',
    green: 'bg-green-500/20 border-green-500 text-green-400',
    red: 'bg-red-500/20 border-red-500 text-red-400',
    yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Bookmarks</h1>
          <p className="text-slate-400">Organize and manage your saved content</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-800 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List size={16} />
            </Button>
          </div>

          <Dialog open={showCreateCollection} onOpenChange={setShowCreateCollection}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <FolderPlus size={16} />
                New Collection
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Collection</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Collection name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCreateCollection(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateCollection}>
                    Create Collection
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="collections" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="all-bookmarks">All Bookmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="collections">
          {/* Collections Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-800 rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  colorClasses[collection.color as keyof typeof colorClasses]
                }`}
                onClick={() => setSelectedCollection(collection.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      collection.color === 'blue' ? 'bg-blue-500/20' :
                      collection.color === 'purple' ? 'bg-purple-500/20' :
                      collection.color === 'green' ? 'bg-green-500/20' :
                      'bg-slate-700'
                    }`}>
                      <Folder size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{collection.name}</h3>
                      <p className="text-sm text-slate-400">
                        {collection.bookmarkCount} bookmarks
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {collection.isPublic && (
                      <Badge variant="secondary" className="text-xs">
                        Public
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal size={14} />
                    </Button>
                  </div>
                </div>

                {collection.description && (
                  <p className="text-slate-400 text-sm mb-4">{collection.description}</p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Created {collection.createdAt.toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Share size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all-bookmarks">
          {/* All Bookmarks */}
          <div className="space-y-4">
            {bookmarks.map((bookmark, index) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex gap-4">
                  {bookmark.image && (
                    <img
                      src={bookmark.image}
                      alt={bookmark.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{bookmark.title}</h3>
                    <p className="text-slate-400 text-sm mb-2">by {bookmark.author}</p>
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                      {bookmark.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {bookmark.collections.map(collectionId => {
                          const collection = collections.find(c => c.id === collectionId);
                          return collection ? (
                            <Badge key={collectionId} variant="secondary" className="text-xs">
                              {collection.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                      <span className="text-xs text-slate-500">
                        {bookmark.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal size={14} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookmarkCollections;
