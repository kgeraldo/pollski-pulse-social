
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RightSidebar = () => {
  const topRatings = [
    {
      title: 'Tesla Vents & Fitness',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      category: 'CGV'
    },
    {
      title: 'FSTN',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
      category: 'CGV'
    },
    {
      title: 'Scirate',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=100&h=100&fit=crop',
      category: 'CCS'
    }
  ];

  const following = [
    {
      name: 'Admin',
      category: 'All category',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
    }
  ];

  const sponsoredAds = [
    {
      title: 'Russia Has Officially Declared US an Enemy State',
      description: 'What does this declaration really mean? How diplomatic officials are reacting to this unprecedented move. The international markets and diplomatic responses moving forward.',
      image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=200&h=120&fit=crop',
      cta: 'Read full article'
    }
  ];

  return (
    <div className="w-80 bg-slate-950 h-screen overflow-y-auto border-l border-slate-800/50">
      <div className="p-6 space-y-8">
        {/* Top Ratings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">Top Ratings</h3>
            <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">View all</button>
          </div>
          <div className="space-y-4">
            {topRatings.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-all duration-200 cursor-pointer border border-slate-800/30 hover:border-slate-700/50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{item.title}</h4>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-semibold text-sm">{item.rating}</span>
                    <span className="text-slate-500 text-sm">• {item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Following */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">Following</h3>
            <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">View all</button>
          </div>
          <div className="space-y-4">
            {following.map((user, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-all duration-200 cursor-pointer border border-slate-800/30">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-medium">{user.name}</h4>
                  <p className="text-slate-400 text-sm">{user.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsored Ads */}
        <div>
          <div className="text-slate-400 text-xs mb-4 uppercase tracking-wider">Sponsored</div>
          {sponsoredAds.map((ad, index) => (
            <div key={index} className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800/30 hover:border-slate-700/50 transition-all duration-200">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h4 className="text-white font-semibold mb-3 leading-tight">{ad.title}</h4>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">{ad.description}</p>
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl font-medium">
                  {ad.cta}
                </Button>
                <div className="text-slate-500 text-xs mt-3 flex items-center gap-1">
                  <span>Ad info</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
