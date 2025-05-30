
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStart = useRef<number>(0);
  const threshold = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchY = e.touches[0].clientY;
    const distance = touchY - touchStart.current;
    
    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance * 0.5, threshold));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {pullDistance > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 right-0 flex justify-center z-10"
          style={{ transform: `translateY(${pullDistance - 40}px)` }}
        >
          <div className="bg-slate-800 rounded-full p-2 shadow-lg">
            <RotateCcw
              size={20}
              className={`text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </div>
        </motion.div>
      )}
      
      <div style={{ transform: `translateY(${pullDistance}px)` }}>
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
