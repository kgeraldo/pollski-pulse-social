
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
    { name: 'Sports', count: 9.8, color: 'text-emerald-400' },
    { name: 'Politics Hack', count: 9.4, color: 'text-blue-400' },
    { name: 'Tactical', count: 9.3, color: 'text-purple-400' },
    { name: 'Cricket', count: 8.9, color: 'text-yellow-400' },
    { name: 'Outer Cricket', count: 8.7, color: 'text-red-400' }
  ];

  return (
    <div className="w-72 bg-slate-950 h-screen overflow-y-auto border-r border-slate-800/50 backdrop-blur-sm">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">Pollski</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-10">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                item.isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Auth Section */}
        {!isAuthenticated && (
          <div className="mb-10 p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50">
            <h3 className="text-white font-semibold mb-2">New to Pollski?</h3>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
              Join the community for polls, real-time insights, and personalized feed filters.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl py-3 font-medium transition-all duration-200">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl py-3 font-medium transition-all duration-200">
                Login
              </Button>
            </div>
          </div>
        )}

        {/* Most Active */}
        <div className="mb-10">
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Most Active</h3>
          <div className="space-y-4">
            {mostActive.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/30 transition-colors duration-200">
                <span className="text-slate-300 font-medium">{item.name}</span>
                <span className="text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-lg text-sm">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Categories */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Active Categories</h3>
          <div className="space-y-4">
            {activeCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/30 transition-colors duration-200">
                <span className="text-slate-300 font-medium">{category.name}</span>
                <span className={`font-bold ${category.color} bg-current/10 px-2 py-1 rounded-lg text-sm`}>
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
