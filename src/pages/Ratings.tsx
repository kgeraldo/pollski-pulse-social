
import { motion } from 'framer-motion';
import { Star, TrendingUp, Award, Users } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';

const Ratings = () => {
  const topRated = [
    { id: 1, title: 'Best React Tutorial 2024', rating: 4.9, votes: 1234, category: 'Education' },
    { id: 2, title: 'Amazing Sunset Photography', rating: 4.8, votes: 987, category: 'Photography' },
    { id: 3, title: 'JavaScript Best Practices', rating: 4.7, votes: 756, category: 'Technology' },
    { id: 4, title: 'UI/UX Design Principles', rating: 4.6, votes: 654, category: 'Design' },
    { id: 5, title: 'Startup Success Stories', rating: 4.5, votes: 543, category: 'Business' }
  ];

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      <div className="flex-1 bg-background">
        <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border p-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Top Ratings</h1>
            <p className="text-muted-foreground">Discover the highest-rated content in our community</p>
          </motion.div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-yellow-500" size={24} />
                <h3 className="font-semibold text-card-foreground">Top Rated</h3>
              </div>
              <p className="text-2xl font-bold text-card-foreground">4.8</p>
              <p className="text-muted-foreground text-sm">Average rating</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-blue-500" size={24} />
                <h3 className="font-semibold text-card-foreground">Total Votes</h3>
              </div>
              <p className="text-2xl font-bold text-card-foreground">12.5K</p>
              <p className="text-muted-foreground text-sm">Community ratings</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-green-500" size={24} />
                <h3 className="font-semibold text-card-foreground">Trending</h3>
              </div>
              <p className="text-2xl font-bold text-card-foreground">+15%</p>
              <p className="text-muted-foreground text-sm">This week</p>
            </div>
          </motion.div>

          <div className="space-y-4">
            {topRated.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                      <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={16} />
                        <span className="font-semibold text-card-foreground">{item.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">{item.votes} votes</span>
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
