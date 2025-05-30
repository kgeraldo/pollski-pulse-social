
import React from 'react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import BookmarkCollections from '@/components/BookmarkCollections';

const Bookmarks = () => {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      <div className="flex-1 bg-background">
        <BookmarkCollections />
      </div>
      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Bookmarks;
