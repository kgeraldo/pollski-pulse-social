
import Sidebar from '@/components/Sidebar';
import EnhancedMainFeed from '@/components/EnhancedMainFeed';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';

const Index = () => {
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
