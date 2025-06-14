import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import PollCard from '@/components/PollCard';
import PollStats from '@/components/poll/PollStats';
import PollCategories from '@/components/poll/PollCategories';
import PollInsights from '@/components/poll/PollInsights';
import PollCreationWizard from '@/components/poll/PollCreationWizard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Clock, Users, BarChart3, Plus, Filter, Zap } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showWizard, setShowWizard] = useState<boolean>(false);
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

  const handleCreatePoll = (newPoll: Poll) => {
    setPolls(prev => [newPoll, ...prev]);
  };

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poll.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poll.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || poll.category.toLowerCase() === selectedCategory;
    
    if (activeFilter === 'participated') {
      return matchesSearch && matchesCategory && poll.hasVoted;
    }
    
    return matchesSearch && matchesCategory;
  });

  const pollStats = {
    totalPolls: polls.length,
    totalVotes: polls.reduce((sum, poll) => sum + poll.totalVotes, 0),
    activeToday: polls.filter(poll => poll.timeAgo.includes('h ago') || poll.timeAgo.includes('min ago')).length,
    participationRate: Math.round((polls.filter(poll => poll.hasVoted).length / polls.length) * 100) || 0
  };

  return (
    <div className="min-h-screen bg-slate-800 flex w-full">
      <Sidebar />
      
      <div className="flex-1 bg-slate-900 min-h-screen">
        {/* Enhanced Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-6 z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Community Polls</h1>
                <p className="text-slate-400 text-sm font-medium">Vote and see what the community thinks</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowWizard(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  <Plus size={16} />
                  Create Poll
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  <Filter size={16} />
                </Button>
              </div>
            </motion.div>

            {/* Enhanced Poll Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{polls.length}</div>
                <div className="text-sm text-slate-400">Active Polls</div>
                <div className="text-xs text-green-400 mt-1">+12 today</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{polls.reduce((sum, poll) => sum + poll.totalVotes, 0).toLocaleString()}</div>
                <div className="text-sm text-slate-400">Total Votes</div>
                <div className="text-xs text-blue-400 mt-1">Real-time</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{polls.filter(poll => poll.timeAgo.includes('h ago') || poll.timeAgo.includes('min ago')).length}</div>
                <div className="text-sm text-slate-400">Active Today</div>
                <div className="text-xs text-purple-400 mt-1">Trending</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{Math.round((polls.filter(poll => poll.hasVoted).length / polls.length) * 100) || 0}%</div>
                <div className="text-sm text-slate-400">Participation</div>
                <div className="text-xs text-green-400 mt-1">Your rate</div>
              </div>
            </div>

            {/* Poll Categories */}
            <div className="mb-4">
              <PollCategories 
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

            {/* Enhanced Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search polls, topics, or creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Zap className="text-slate-400" size={16} />
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {[
                  { value: 'all', label: 'All Polls', icon: BarChart3 },
                  { value: 'trending', label: 'Trending', icon: TrendingUp },
                  { value: 'recent', label: 'Recent', icon: Clock },
                  { value: 'participated', label: 'Participated', icon: Users }
                ].map((option) => (
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

        {/* Main Content */}
        <div className="max-w-4xl mx-auto p-6 flex gap-6">
          {/* Polls */}
          <div className="flex-1 space-y-6">
            <AnimatePresence mode="wait">
              {polls.filter(poll => {
                const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                     poll.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                     poll.author.toLowerCase().includes(searchQuery.toLowerCase());
                
                const matchesCategory = selectedCategory === 'all' || poll.category.toLowerCase() === selectedCategory;
                
                if (activeFilter === 'participated') {
                  return matchesSearch && matchesCategory && poll.hasVoted;
                }
                
                return matchesSearch && matchesCategory;
              }).map((poll, index) => (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  onVote={(pollId, optionId) => {
                    setPolls(prevPolls =>
                      prevPolls.map(p => {
                        if (p.id === pollId && !p.hasVoted) {
                          const updatedOptions = p.options.map(option => ({
                            ...option,
                            votes: option.id === optionId ? option.votes + 1 : option.votes
                          }));
                          
                          const newTotalVotes = p.totalVotes + 1;
                          const optionsWithPercentage = updatedOptions.map(option => ({
                            ...option,
                            percentage: (option.votes / newTotalVotes) * 100
                          }));

                          return {
                            ...p,
                            hasVoted: true,
                            userVote: optionId,
                            totalVotes: newTotalVotes,
                            options: optionsWithPercentage
                          };
                        }
                        return p;
                      })
                    );
                  }}
                  index={index}
                />
              ))}
            </AnimatePresence>
            
            {polls.filter(poll => {
              const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   poll.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   poll.author.toLowerCase().includes(searchQuery.toLowerCase());
              
              const matchesCategory = selectedCategory === 'all' || poll.category.toLowerCase() === selectedCategory;
              
              if (activeFilter === 'participated') {
                return matchesSearch && matchesCategory && poll.hasVoted;
              }
              
              return matchesSearch && matchesCategory;
            }).length === 0 && (
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

          {/* Enhanced Sidebar with Insights */}
          <div className="w-80">
            <PollInsights
              totalPolls={polls.length}
              totalVotes={polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
              activeToday={polls.filter(poll => poll.timeAgo.includes('h ago') || poll.timeAgo.includes('min ago')).length}
              participationRate={Math.round((polls.filter(poll => poll.hasVoted).length / polls.length) * 100) || 0}
            />
          </div>
        </div>

        {/* Poll Creation Wizard */}
        <PollCreationWizard
          isOpen={showWizard}
          onClose={() => setShowWizard(false)}
          onCreatePoll={(newPoll) => setPolls(prev => [newPoll, ...prev])}
        />
      </div>

      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Polls;
