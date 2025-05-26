
import { motion } from 'framer-motion';
import { Star, TrendingUp, Award, Users, Trophy, Zap, Heart } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';

interface TopRatedItem {
  id: number;
  title: string;
  rating: number;
  votes: number;
  category: string;
  author: string;
  trend: 'up' | 'down' | 'neutral';
}

interface StatCard {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

const Ratings: React.FC = () => {
  const topRated: TopRatedItem[] = [
    { id: 1, title: 'Best React Tutorial 2024', rating: 4.9, votes: 1234, category: 'Education', author: 'Alex Johnson', trend: 'up' },
    { id: 2, title: 'Amazing Sunset Photography', rating: 4.8, votes: 987, category: 'Photography', author: 'Sarah Chen', trend: 'up' },
    { id: 3, title: 'JavaScript Best Practices', rating: 4.7, votes: 756, category: 'Technology', author: 'Mike Rodriguez', trend: 'neutral' },
    { id: 4, title: 'UI/UX Design Principles', rating: 4.6, votes: 654, category: 'Design', author: 'Emma Wilson', trend: 'up' },
    { id: 5, title: 'Startup Success Stories', rating: 4.5, votes: 543, category: 'Business', author: 'David Kim', trend: 'down' }
  ];

  const stats: StatCard[] = [
    {
      icon: Award,
      title: 'Top Rated',
      value: '4.8',
      subtitle: 'Average rating',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      icon: Users,
      title: 'Total Votes',
      value: '12.5K',
      subtitle: 'Community ratings',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: TrendingUp,
      title: 'Trending',
      value: '+15%',
      subtitle: 'This week',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} className="text-green-400" />;
      case 'down': return <TrendingUp size={14} className="text-red-400 transform rotate-180" />;
      default: return <Zap size={14} className="text-yellow-400" />;
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="text-yellow-400" size={24} />;
    if (index === 1) return <Award className="text-gray-400" size={22} />;
    if (index === 2) return <Star className="text-amber-600" size={20} />;
    return <Heart className="text-pink-400" size={18} />;
  };

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
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <Star className="text-yellow-400" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-white">Top Ratings</h1>
            </div>
            <p className="text-slate-400 text-base font-medium">Discover the highest-rated content in our community</p>
          </motion.div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 ${stat.bgColor} rounded-xl transition-transform duration-300 group-hover:scale-110`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <h3 className="font-bold text-white text-lg group-hover:text-blue-100 transition-colors duration-200">
                    {stat.title}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-white mb-1 group-hover:text-blue-100 transition-colors duration-200">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-sm font-medium">{stat.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-4">
            {topRated.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ x: 8, scale: 1.01 }}
                className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex items-center justify-center"
                      >
                        {getRankIcon(index)}
                      </motion.div>
                      <span className="text-2xl font-bold text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
                        #{index + 1}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-200">
                          {item.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full font-semibold border border-blue-500/30">
                          {item.category}
                        </span>
                        {getTrendIcon(item.trend)}
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (index * 0.1) + (i * 0.05) }}
                              >
                                <Star 
                                  size={16} 
                                  className={i < Math.floor(item.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-500'} 
                                />
                              </motion.div>
                            ))}
                          </div>
                          <span className="font-bold text-white text-lg">{item.rating}</span>
                        </div>
                        
                        <span className="text-slate-400 text-sm font-medium">
                          {item.votes.toLocaleString()} votes
                        </span>
                        
                        <span className="text-slate-500 text-sm">
                          by <span className="text-blue-400 font-medium">{item.author}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Ratings;
