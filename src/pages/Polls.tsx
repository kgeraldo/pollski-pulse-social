
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import PollCard from '@/components/PollCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Clock, Users, BarChart3 } from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface Poll {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: string;
  timeAgo: string;
  category: string;
  totalVotes: number;
  options: PollOption[];
  hasVoted: boolean;
  userVote?: string;
}

interface FilterOption {
  value: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const Polls: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      title: 'What\'s your favorite programming language?',
      description: 'Help us understand the community preferences for programming languages in 2024.',
      author: 'TechSurvey',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timeAgo: '2h ago',
      category: 'Technology',
      totalVotes: 1247,
      hasVoted: false,
      options: [
        { id: 'js', text: 'JavaScript', votes: 523, percentage: 41.9 },
        { id: 'py', text: 'Python', votes: 412, percentage: 33.0 },
        { id: 'ts', text: 'TypeScript', votes: 201, percentage: 16.1 },
        { id: 'go', text: 'Go', votes: 111, percentage: 8.9 }
      ]
    },
    {
      id: '2',
      title: 'Best time for remote work?',
      description: 'When do you feel most productive while working from home?',
      author: 'WorkLife',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timeAgo: '5h ago',
      category: 'Lifestyle',
      totalVotes: 892,
      hasVoted: true,
      userVote: 'morning',
      options: [
        { id: 'morning', text: 'Morning (6-12 PM)', votes: 445, percentage: 49.9 },
        { id: 'afternoon', text: 'Afternoon (12-6 PM)', votes: 267, percentage: 29.9 },
        { id: 'evening', text: 'Evening (6-10 PM)', votes: 134, percentage: 15.0 },
        { id: 'night', text: 'Night (10 PM+)', votes: 46, percentage: 5.2 }
      ]
    }
  ]);

  const filterOptions: FilterOption[] = [
    { value: 'all', label: 'All Polls', icon: BarChart3 },
    { value: 'trending', label: 'Trending', icon: TrendingUp },
    { value: 'recent', label: 'Recent', icon: Clock },
    { value: 'participated', label: 'Participated', icon: Users }
  ];

  const handleVote = (pollId: string, optionId: string): void => {
    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId && !poll.hasVoted) {
          const updatedOptions = poll.options.map(option => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes
          }));
          
          const newTotalVotes = poll.totalVotes + 1;
          const optionsWithPercentage = updatedOptions.map(option => ({
            ...option,
            percentage: (option.votes / newTotalVotes) * 100
          }));

          return {
            ...poll,
            hasVoted: true,
            userVote: optionId,
            totalVotes: newTotalVotes,
            options: optionsWithPercentage
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
    
    if (activeFilter === 'participated') {
      return matchesSearch && poll.hasVoted;
    }
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-800 flex w-full">
      <Sidebar />
      
      <div className="flex-1 bg-slate-900 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-6 z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-2xl font-bold text-white mb-1">Community Polls</h1>
              <p className="text-slate-400 text-sm font-medium">Vote and see what the community thinks</p>
            </motion.div>

            {/* Search and Filters */}
            <div className="mt-6 space-y-4">
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
          </div>
        </div>

        {/* Polls */}
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          <AnimatePresence mode="wait">
            {filteredPolls.map((poll, index) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onVote={handleVote}
                index={index}
              />
            ))}
          </AnimatePresence>
          
          {filteredPolls.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <BarChart3 className="mx-auto text-slate-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No polls found</h3>
              <p className="text-slate-500">Try adjusting your search or check back later!</p>
            </motion.div>
          )}
        </div>
      </div>

      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Polls;
