
import React from 'react';
import SkeletonPost from '@/components/ui/skeleton-post';

interface LoadingStatesProps {
  count?: number;
  type?: 'posts' | 'comments' | 'users';
}

const LoadingStates: React.FC<LoadingStatesProps> = ({ count = 3, type = 'posts' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'posts':
        return <SkeletonPost />;
      case 'comments':
        return (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-slate-700 rounded-full animate-pulse" />
              <div className="h-3 w-24 bg-slate-700 rounded animate-pulse" />
            </div>
            <div className="h-4 w-full bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-700 rounded animate-pulse" />
          </div>
        );
      case 'users':
        return (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 flex items-center space-x-3">
            <div className="h-10 w-10 bg-slate-700 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-slate-700 rounded animate-pulse" />
              <div className="h-3 w-20 bg-slate-700 rounded animate-pulse" />
            </div>
          </div>
        );
      default:
        return <SkeletonPost />;
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default LoadingStates;
