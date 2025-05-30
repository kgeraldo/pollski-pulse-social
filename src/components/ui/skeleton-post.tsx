
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const SkeletonPost: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-4"
    >
      {/* Header */}
      <div className="flex items-start space-x-3">
        <Skeleton className="h-10 w-10 rounded-full bg-slate-700" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32 bg-slate-700" />
          <Skeleton className="h-3 w-20 bg-slate-700" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-slate-700" />
        <Skeleton className="h-4 w-3/4 bg-slate-700" />
        <Skeleton className="h-4 w-1/2 bg-slate-700" />
      </div>

      {/* Image placeholder */}
      <Skeleton className="h-48 w-full bg-slate-700 rounded-lg" />

      {/* Actions */}
      <div className="flex items-center space-x-6">
        <Skeleton className="h-8 w-16 bg-slate-700" />
        <Skeleton className="h-8 w-16 bg-slate-700" />
        <Skeleton className="h-8 w-16 bg-slate-700" />
      </div>
    </motion.div>
  );
};

export default SkeletonPost;
