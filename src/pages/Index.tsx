
import Sidebar from '@/components/Sidebar';
import MainFeed from '@/components/MainFeed';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-800 flex w-full">
      <Sidebar />
      <MainFeed />
      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
