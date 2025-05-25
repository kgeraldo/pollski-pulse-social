
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
    <div className="w-80 bg-slate-900 h-screen overflow-y-auto border-l border-slate-700">
      <div className="p-4 space-y-6">
        {/* Top Ratings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Top Ratings</h3>
            <button className="text-blue-400 text-sm hover:text-blue-300">View all</button>
          </div>
          <div className="space-y-3">
            {topRatings.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium">{item.title}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-xs">{item.rating}</span>
                    <span className="text-slate-500 text-xs">• {item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Following */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Following</h3>
            <button className="text-blue-400 text-sm hover:text-blue-300">View all</button>
          </div>
          <div className="space-y-3">
            {following.map((user, index) => (
              <div key={index} className="flex items-center gap-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white text-sm font-medium">{user.name}</h4>
                  <p className="text-slate-400 text-xs">{user.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsored Ads */}
        <div>
          <div className="text-slate-400 text-xs mb-3">Sponsored</div>
          {sponsoredAds.map((ad, index) => (
            <div key={index} className="bg-slate-800 rounded-lg overflow-hidden">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h4 className="text-white font-medium text-sm mb-2">{ad.title}</h4>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed">{ad.description}</p>
                <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  {ad.cta}
                </Button>
                <div className="text-slate-500 text-xs mt-2 flex items-center gap-1">
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
