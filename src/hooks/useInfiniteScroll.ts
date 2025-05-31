
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollProps {
  fetchMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  fetchMore,
  hasMore,
  isLoading,
  threshold = 100
}: UseInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const lastFetchTime = useRef(0);
  const minFetchInterval = 1000; // Prevent rapid successive calls

  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastFetchTime.current < minFetchInterval) return;

    if (window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - threshold) {
      if (hasMore && !isLoading && !isFetching) {
        setIsFetching(true);
        lastFetchTime.current = now;
      }
    }
  }, [hasMore, isLoading, isFetching, threshold]);

  useEffect(() => {
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isFetching && hasMore) {
      fetchMore()
        .catch((error) => {
          console.error('Error fetching more data:', error);
        })
        .finally(() => setIsFetching(false));
    }
  }, [isFetching, fetchMore, hasMore]);

  return { isFetching };
};
