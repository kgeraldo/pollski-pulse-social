
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FilterOptions, PostType, AuthMode } from '@/types';
import { usePosts } from '@/hooks/usePosts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { filterPosts, getInitialPosts } from '@/utils/postUtils';
import AuthPages from './AuthPages';
import AdvancedSearchFilter from './AdvancedSearchFilter';
import CreatePostModal from './CreatePostModal';
import EnhancedHeader from './EnhancedHeader';
import PostFilters from './feed/PostFilters';
import PostList from './feed/PostList';
import LoadingStates from './LoadingStates';
import EmptyState from './EmptyState';
import BackToTopButton from './BackToTopButton';
import PullToRefresh from './PullToRefresh';
import ReportModal from './ReportModal';
import PrivacyControls from './PrivacyControls';
import StoriesCarousel from './StoriesCarousel';

const EnhancedMainFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [createPostType, setCreatePostType] = useState<PostType>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showPrivacyControls, setShowPrivacyControls] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    category: 'All',
    timeRange: 'All Time',
    sortBy: 'Most Recent',
    minRating: 0,
    author: '',
    tags: []
  });

  const { isOnline, cachePosts, queueAction } = useOfflineSupport();

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

  // Mock stories data
  const storyUsers = [
    {
      id: '1',
      name: 'Sarah Kim',
      username: '@sarahkim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      hasStory: true,
      isViewed: false,
      storyCount: 3
    },
    {
      id: '2',
      name: 'David Rodriguez',
      username: '@davidr',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      hasStory: true,
      isViewed: true,
      storyCount: 1
    },
    {
      id: '3',
      name: 'Emily Chen',
      username: '@emilyc',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      hasStory: true,
      isViewed: false,
      storyCount: 2
    },
    {
      id: '4',
      name: 'Mike Johnson',
      username: '@mikej',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      hasStory: true,
      isViewed: true,
      storyCount: 1
    }
  ];

  const loadMorePosts = async () => {
    setIsLoading(true);
    // Simulate loading more posts
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const { isFetching } = useInfiniteScroll({
    fetchMore: loadMorePosts,
    hasMore,
    isLoading,
    threshold: 100
  });

  const handleCreatePost = (type: PostType) => {
    setCreatePostType(type);
    setShowCreatePost(true);
  };

  const handleReport = (reason: string, details: string) => {
    console.log('Report submitted:', { reason, details });
  };

  const filteredPosts = filterPosts(posts, searchQuery, activeFilter);

  // Cache posts when online
  React.useEffect(() => {
    if (isOnline && posts.length > 0) {
      cachePosts(posts);
    }
  }, [posts, isOnline, cachePosts]);

  return (
    <div className="flex-1 bg-slate-900 min-h-screen">
      <EnhancedHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAdvancedFilter={() => setShowAdvancedFilter(true)}
        onCreatePost={() => handleCreatePost('text')}
        onOpenAuth={() => { setAuthMode('login'); setShowAuth(true); }}
      />

      {!isOnline && (
        <div className="bg-yellow-600/20 border-yellow-600/30 text-yellow-200 p-3 text-center text-sm">
          You're offline. Viewing cached content.
        </div>
      )}

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="max-w-2xl mx-auto p-4">
          {/* Stories Carousel */}
          <StoriesCarousel
            users={storyUsers}
            onCreateStory={() => handleCreatePost('image')}
            onViewStory={(userId) => console.log('View story for user:', userId)}
          />

          <PostFilters 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          {isLoading && filteredPosts.length === 0 ? (
            <LoadingStates count={4} type="posts" />
          ) : filteredPosts.length === 0 ? (
            <EmptyState
              type={searchQuery ? 'search' : 'posts'}
              title={searchQuery ? 'No posts found' : undefined}
              description={searchQuery ? `No results for "${searchQuery}". Try different keywords or check your spelling.` : undefined}
              actionLabel={searchQuery ? 'Clear Search' : 'Create Post'}
              onAction={searchQuery ? () => setSearchQuery('') : () => handleCreatePost('text')}
            />
          ) : (
            <>
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
              
              {isFetching && hasMore && (
                <div className="mt-4">
                  <LoadingStates count={2} type="posts" />
                </div>
              )}
            </>
          )}
        </div>
      </PullToRefresh>

      <BackToTopButton />

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
        {showReportModal && (
          <ReportModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            onSubmit={handleReport}
            type="post"
          />
        )}
        {showPrivacyControls && (
          <PrivacyControls
            isOpen={showPrivacyControls}
            onClose={() => setShowPrivacyControls(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedMainFeed;
