
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, Clock, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import PollCard from '@/components/PollCard';
import CreatePollModal from '@/components/CreatePollModal';

interface Poll {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: string;
  timeAgo: string;
  category: string;
  totalVotes: number;
  options: {
    id: string;
    text: string;
    votes: number;
    percentage: number;
  }[];
  hasVoted: boolean;
  userVote?: string;
}

interface FilterOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const Polls: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      title: 'Which programming language should I learn next?',
      description: 'I\'m a beginner looking to expand my skills. What would be most valuable in 2024?',
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timeAgo: '2h ago',
      category: 'Technology',
      totalVotes: 324,
      hasVoted: true,
      userVote: '2',
      options: [
        { id: '1', text: 'Python', votes: 98, percentage: 30.2 },
        { id: '2', text: 'JavaScript', votes: 125, percentage: 38.6 },
        { id: '3', text: 'Rust', votes: 67, percentage: 20.7 },
        { id: '4', text: 'Go', votes: 34, percentage: 10.5 }
      ]
    },
    {
      id: '2',
      title: 'Best work-from-home setup?',
      description: 'Setting up a new home office. What\'s most important for productivity?',
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timeAgo: '4h ago',
      category: 'Lifestyle',
      totalVotes: 189,
      hasVoted: false,
      options: [
        { id: '1', text: 'Standing desk', votes: 56, percentage: 29.6 },
        { id: '2', text: 'Multiple monitors', votes: 78, percentage: 41.3 },
        { id: '3', text: 'Ergonomic chair', votes: 35, percentage: 18.5 },
        { id: '4', text: 'Good lighting', votes: 20, percentage: 10.6 }
      ]
    },
    {
      id: '3',
      title: 'Favorite design tool for UI/UX?',
      description: 'Working on a new project and comparing different design tools.',
      author: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      timeAgo: '6h ago',
      category: 'Design',
      totalVotes: 267,
      hasVoted: false,
      options: [
        { id: '1', text: 'Figma', votes: 156, percentage: 58.4 },
        { id: '2', text: 'Sketch', votes: 45, percentage: 16.9 },
        { id: '3', text: 'Adobe XD', votes: 38, percentage: 14.2 },
        { id: '4', text: 'Framer', votes: 28, percentage: 10.5 }
      ]
    }
  ]);

  const filterOptions: FilterOption[] = [
    { value: 'all', label: 'All Polls', icon: BarChart3 },
    { value: 'trending', label: 'Trending', icon: TrendingUp },
    { value: 'recent', label: 'Recent', icon: Clock },
    { value: 'voted', label: 'My Votes', icon: Users }
  ];

  const handleVote = (pollId: string, optionId: string): void => {
    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId && !poll.hasVoted) {
          const newOptions = poll.options.map(option => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes
          }));
          
          const newTotal = newOptions.reduce((sum, option) => sum + option.votes, 0);
          
          const updatedOptions = newOptions.map(option => ({
            ...option,
            percentage: newTotal > 0 ? (option.votes / newTotal) * 100 : 0
          }));

          return {
            ...poll,
            options: updatedOptions,
            totalVotes: newTotal,
            hasVoted: true,
            userVote: optionId
          };
        }
        return poll;
      })
    );
  };

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poll.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poll.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'voted') {
      return matchesSearch && poll.hasVoted;
    }
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 flex w-full">
      <Sidebar />
      <div className="flex-1 bg-slate-900">
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <BarChart3 className="text-blue-400" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Community Polls</h1>
                  <p className="text-slate-400 text-base font-medium">Share your opinion and see what others think</p>
                </div>
              </div>
              
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all duration-200"
              >
                <Plus size={18} />
                Create Poll
              </Button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search polls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={activeFilter === option.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter(option.value)}
                    className={`flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                      activeFilter === option.value
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                        : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <option.icon size={16} />
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {filteredPolls.map((poll, index) => (
            <PollCard
              key={poll.id}
              poll={poll}
              onVote={handleVote}
              index={index}
            />
          ))}
          
          {filteredPolls.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <BarChart3 className="mx-auto text-slate-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No polls found</h3>
              <p className="text-slate-500">Try adjusting your search or create a new poll!</p>
            </motion.div>
          )}
        </div>
      </div>
      <RightSidebar />
      <FloatingActionButton />
      <CreatePollModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onCreatePoll={(newPoll) => {
          setPolls(prev => [newPoll, ...prev]);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
};

export default Polls;
