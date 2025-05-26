
import React from 'react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import EnhancedMainFeed from '@/components/EnhancedMainFeed';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-800 flex w-full">
      <Sidebar />
      <EnhancedMainFeed />
      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
