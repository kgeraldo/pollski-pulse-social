
import { useState, useEffect } from 'react';
import { Post } from '@/types';

interface OfflineAction {
  id: string;
  type: 'vote' | 'comment' | 'bookmark';
  postId: number;
  data: any;
  timestamp: number;
}

export const useOfflineSupport = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cachedPosts, setCachedPosts] = useState<Post[]>([]);
  const [queuedActions, setQueuedActions] = useState<OfflineAction[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncQueuedActions();
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load cached data on mount
    loadCachedData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const cachePosts = (posts: Post[]) => {
    setCachedPosts(posts);
    try {
      localStorage.setItem('cachedPosts', JSON.stringify(posts));
    } catch (error) {
      console.error('Failed to cache posts:', error);
    }
  };

  const loadCachedData = () => {
    try {
      const cached = localStorage.getItem('cachedPosts');
      if (cached) {
        setCachedPosts(JSON.parse(cached));
      }

      const queued = localStorage.getItem('queuedActions');
      if (queued) {
        setQueuedActions(JSON.parse(queued));
      }
    } catch (error) {
      console.error('Failed to load cached data:', error);
    }
  };

  const queueAction = (action: Omit<OfflineAction, 'id' | 'timestamp'>) => {
    const newAction: OfflineAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    const updated = [...queuedActions, newAction];
    setQueuedActions(updated);
    
    try {
      localStorage.setItem('queuedActions', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to queue action:', error);
    }
  };

  const syncQueuedActions = async () => {
    if (queuedActions.length === 0) return;

    try {
      // Here you would sync with your backend
      console.log('Syncing queued actions:', queuedActions);
      
      // Clear queue after successful sync
      setQueuedActions([]);
      localStorage.removeItem('queuedActions');
    } catch (error) {
      console.error('Failed to sync queued actions:', error);
    }
  };

  return {
    isOnline,
    cachedPosts,
    cachePosts,
    queueAction,
    queuedActions: queuedActions.length
  };
};
