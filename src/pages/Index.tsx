
import React from 'react';
import Sidebar from '@/components/Sidebar';
import EnhancedRightSidebar from '@/components/EnhancedRightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import EnhancedMainFeed from '@/components/EnhancedMainFeed';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex w-full">
      <Sidebar />
      <EnhancedMainFeed />
      <EnhancedRightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
