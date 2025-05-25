
import { Star, MoreHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const RightSidebar = () => {
  const topRatings = [
    {
      title: 'Fitbit Versa 4 Fitness',
      rating: 4.4,
      votes: '(4/5)',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      category: 'Tech'
    },
    {
      title: 'dasd',
      rating: 3.0,
      votes: '(2/5)',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
      category: 'General'
    },
    {
      title: 'sdsada',
      rating: 3.0,
      votes: '(2/5)',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=100&h=100&fit=crop',
      category: 'General'
    }
  ];

  const following = [
    {
      name: 'Admin',
      category: 'No category',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      avatar: 'A'
    }
  ];

  const sponsoredAds = [
    {
      title: 'Russia Has Officially Declared US an Enemy State',
      description: 'What does this declaration really mean? How diplomatic officials are reacting to this unprecedented move. The international markets and diplomatic responses moving forward.',
      image: '/lovable-uploads/2d7da0fe-ff1f-4e1c-b877-cc97f42480d1.png',
      cta: 'Read full article'
    }
  ];

  return (
    <div className="w-80 bg-slate-800 h-screen overflow-y-auto border-l border-slate-700">
      <div className="p-6 space-y-8">
        {/* Top Ratings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={18} />
              <h3 className="text-white font-semibold text-lg">Top Ratings</h3>
            </div>
            <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              View all →
            </button>
          </div>
          <div className="space-y-4">
            {topRatings.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-slate-750 rounded-xl hover:bg-slate-700 transition-all duration-200 cursor-pointer border border-slate-600"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1 text-sm leading-tight">{item.title}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-slate-500'} 
                        />
                      ))}
                    </div>
                    <span className="text-slate-400 text-xs">{item.votes}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-blue-400 text-sm font-medium">0</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Following */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="text-blue-400" size={18} />
              <h3 className="text-white font-semibold text-lg">Following</h3>
            </div>
            <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              View all →
            </button>
          </div>
          <div className="space-y-4">
            {following.map((user, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-slate-750 rounded-xl hover:bg-slate-700 transition-all duration-200 cursor-pointer border border-slate-600"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{user.name}</h4>
                  <p className="text-slate-400 text-sm">{user.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sponsored Ads */}
        <div>
          <div className="text-slate-400 text-xs mb-4 uppercase tracking-wider">Sponsored</div>
          {sponsoredAds.map((ad, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-750 rounded-xl overflow-hidden border border-slate-600 hover:border-slate-500 transition-all duration-200"
            >
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h4 className="text-white font-semibold mb-3 leading-tight">{ad.title}</h4>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">{ad.description}</p>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg font-medium">
                  {ad.cta} ↗
                </Button>
                <div className="text-slate-500 text-xs mt-3 flex items-center gap-1">
                  <span>Ad info</span>
                </div>
                <div className="flex justify-between items-center mt-3 text-slate-500 text-xs">
                  <span>Promote your content</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
