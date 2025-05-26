
import { Star, MoreHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface TopRating {
  title: string;
  rating: number;
  votes: string;
  image: string;
  category: string;
}

interface FollowingUser {
  name: string;
  category: string;
  image: string;
  avatar: string;
}

interface SponsoredAd {
  title: string;
  description: string;
  image: string;
  cta: string;
}

const RightSidebar: React.FC = () => {
  const topRatings: TopRating[] = [
    {
      title: 'Fitbit Versa 4 Fitness',
      rating: 4.4,
      votes: '(4/5)',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      category: 'Tech'
    },
    {
      title: 'Best React Tutorial 2024',
      rating: 4.8,
      votes: '(156/200)',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
      category: 'Education'
    },
    {
      title: 'Modern UI Design Trends',
      rating: 4.6,
      votes: '(89/120)',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=100&h=100&fit=crop',
      category: 'Design'
    }
  ];

  const following: FollowingUser[] = [
    {
      name: 'Alex Johnson',
      category: 'Tech Enthusiast',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      avatar: 'A'
    },
    {
      name: 'Sarah Chen',
      category: 'UX Designer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      avatar: 'S'
    }
  ];

  const sponsoredAds: SponsoredAd[] = [
    {
      title: 'Master React Development in 2024',
      description: 'Learn the latest React patterns, hooks, and best practices. Join thousands of developers who have transformed their careers with our comprehensive course.',
      image: '/lovable-uploads/2d7da0fe-ff1f-4e1c-b877-cc97f42480d1.png',
      cta: 'Start Learning'
    }
  ];

  return (
    <div className="w-80 bg-slate-800 h-screen overflow-y-auto border-l border-slate-700">
      <div className="p-6 space-y-8">
        {/* Top Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Star className="text-yellow-400" size={18} />
              </div>
              <h3 className="text-white font-bold text-lg">Top Ratings</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors duration-200"
            >
              View all →
            </motion.button>
          </div>
          
          <div className="space-y-3">
            {topRatings.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center gap-4 p-4 bg-slate-750 rounded-xl hover:bg-slate-700 transition-all duration-300 cursor-pointer border border-slate-600 hover:border-slate-500 group shadow-lg hover:shadow-xl"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover ring-2 ring-slate-600 group-hover:ring-slate-500 transition-all duration-300"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold mb-1 text-sm leading-tight truncate group-hover:text-blue-100 transition-colors duration-200">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-slate-500'} 
                        />
                      ))}
                    </div>
                    <span className="text-slate-400 text-xs font-medium">{item.votes}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Following */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="text-blue-400" size={18} />
              </div>
              <h3 className="text-white font-bold text-lg">Following</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors duration-200"
            >
              View all →
            </motion.button>
          </div>
          
          <div className="space-y-3">
            {following.map((user, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center gap-4 p-4 bg-slate-750 rounded-xl hover:bg-slate-700 transition-all duration-300 cursor-pointer border border-slate-600 hover:border-slate-500 group shadow-lg hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg group-hover:shadow-xl transition-all duration-300"
                >
                  {user.avatar}
                </motion.div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm group-hover:text-blue-100 transition-colors duration-200">
                    {user.name}
                  </h4>
                  <p className="text-slate-400 text-xs font-medium">{user.category}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Users size={14} className="text-blue-400" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sponsored Ads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="text-slate-400 text-xs mb-4 uppercase tracking-wider font-semibold">Sponsored</div>
          {sponsoredAds.map((ad, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-slate-750 rounded-2xl overflow-hidden border border-slate-600 hover:border-slate-500 transition-all duration-300 group shadow-xl hover:shadow-2xl"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={ad.image}
                alt={ad.title}
                className="w-full h-40 object-cover transition-transform duration-500"
              />
              <div className="p-5">
                <h4 className="text-white font-bold mb-3 leading-tight text-base group-hover:text-blue-100 transition-colors duration-200">
                  {ad.title}
                </h4>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed font-medium">
                  {ad.description}
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {ad.cta} →
                  </Button>
                </motion.div>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-600/50">
                  <span className="text-slate-500 text-xs font-medium">Ad info</span>
                  <span className="text-slate-500 text-xs font-medium">Promote content</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RightSidebar;
