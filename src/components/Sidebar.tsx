
import { Home, Star, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';

const Sidebar = () => {
  const { isAuthenticated } = useStore();

  const navigationItems = [
    { icon: Home, label: 'Home', isActive: true },
    { icon: Star, label: 'Ratings' },
    { icon: Users, label: 'Community' },
    { icon: TrendingUp, label: 'Trending' }
  ];

  const mostActive = [
    { name: 'seFood', count: 4.8 },
    { name: 'dexd', count: 4.6 },
    { name: 'debunk', count: 4.5 }
  ];

  const activeCategories = [
    { name: 'Sports', count: 9.8, color: 'text-green-400' },
    { name: 'Politics Hack', count: 9.4, color: 'text-blue-400' },
    { name: 'Tactical', count: 9.3, color: 'text-purple-400' },
    { name: 'Cricket', count: 8.9, color: 'text-yellow-400' },
    { name: 'Outer Cricket', count: 8.7, color: 'text-red-400' }
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen overflow-y-auto border-r border-slate-700">
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-white font-bold text-xl">Pollski</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                item.isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Auth Section */}
        {!isAuthenticated && (
          <div className="mb-8 p-4 bg-slate-800 rounded-lg">
            <h3 className="text-white font-semibold mb-2">New to Pollski?</h3>
            <p className="text-slate-400 text-sm mb-4">
              Join the community for the polls, real-time insights, and personalized feed filters.
            </p>
            <div className="space-y-2">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                Login
              </Button>
            </div>
          </div>
        )}

        {/* Most Active */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">MOST ACTIVE</h3>
          <div className="space-y-3">
            {mostActive.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-slate-300">{item.name}</span>
                <span className="text-green-400 font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">ACTIVE CATEGORIES</h3>
          <div className="space-y-3">
            {activeCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <span className="text-slate-300">{category.name}</span>
                <span className={`font-semibold ${category.color}`}>{category.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
