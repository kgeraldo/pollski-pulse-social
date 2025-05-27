
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FilterOptions, PostType, AuthMode } from '@/types';
import { usePosts } from '@/hooks/usePosts';
import { filterPosts, getInitialPosts } from '@/utils/postUtils';
import AuthPages from './AuthPages';
import AdvancedSearchFilter from './AdvancedSearchFilter';
import CreatePostModal from './CreatePostModal';
import EnhancedHeader from './EnhancedHeader';
import PostFilters from './feed/PostFilters';
import PostList from './feed/PostList';

const EnhancedMainFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [createPostType, setCreatePostType] = useState<PostType>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    category: 'All',
    timeRange: 'All Time',
    sortBy: 'Most Recent',
    minRating: 0,
    author: '',
    tags: []
  });

  const {
    posts,
    handleVote,
    handleBookmark,
    handleToggleComments,
    handleCommentSubmit,
    handleCommentVote,
    handleToggleCollapse,
    handlePollVote
  } = usePosts(getInitialPosts());

  const handleCreatePost = (type: PostType) => {
    setCreatePostType(type);
    setShowCreatePost(true);
  };

  const filteredPosts = filterPosts(posts, searchQuery, activeFilter);

  return (
    <div className="flex-1 bg-slate-900 min-h-screen">
      <EnhancedHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAdvancedFilter={() => setShowAdvancedFilter(true)}
        onCreatePost={() => handleCreatePost('text')}
        onOpenAuth={() => { setAuthMode('login'); setShowAuth(true); }}
      />

      <div className="max-w-2xl mx-auto p-4">
        <PostFilters 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />

        <PostList
          posts={filteredPosts}
          isLoading={isLoading}
          onVote={handleVote}
          onBookmark={handleBookmark}
          onToggleComments={handleToggleComments}
          onCommentSubmit={handleCommentSubmit}
          onCommentVote={handleCommentVote}
          onToggleCollapse={handleToggleCollapse}
          onPollVote={handlePollVote}
        />
      </div>

      <AnimatePresence>
        {showAuth && (
          <AuthPages
            mode={authMode}
            onModeChange={setAuthMode}
            onClose={() => setShowAuth(false)}
          />
        )}
        {showAdvancedFilter && (
          <AdvancedSearchFilter
            isOpen={showAdvancedFilter}
            onClose={() => setShowAdvancedFilter(false)}
            onApplyFilters={setAdvancedFilters}
            currentFilters={advancedFilters}
          />
        )}
        {showCreatePost && (
          <CreatePostModal
            isOpen={showCreatePost}
            onClose={() => setShowCreatePost(false)}
            postType={createPostType}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedMainFeed;
