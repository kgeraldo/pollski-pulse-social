
import { Home, Star, Users, TrendingUp, User, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { isAuthenticated } = useStore();
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart3, label: 'Polls', path: '/polls' },
    { icon: Star, label: 'Ratings', path: '/ratings' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' }
  ];

  const userItems = [
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const mostActive = [
    { name: 'sdfadf', count: '0', color: 'text-blue-400' },
    { name: 'dasd', count: '0', color: 'text-blue-400' },
    { name: 'sdsada', count: '0', color: 'text-blue-400' },
    { name: 'Fitbit Versa 4 Fitness...', count: '0', color: 'text-blue-400' },
    { name: 'World Cup 2024', count: '0', color: 'text-blue-400' }
  ];

  const activeCategories = [
    { name: 'Sports', count: '0', subcount: '0', color: 'text-green-400' },
    { name: 'Politics Inner', count: '0', subcount: '0', color: 'text-green-400' },
    { name: 'Tapeball', count: '0', subcount: '0', color: 'text-green-400' },
    { name: 'Cricket', count: '0', subcount: '0', color: 'text-green-400' },
    { name: 'Street Cricket', count: '0', subcount: '0', color: 'text-green-400' }
  ];

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-slate-800 h-screen overflow-y-auto border-r border-slate-700"
    >
      <div className="p-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
            <BarChart3 className="text-white" size={18} />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Pollski</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1 mb-8">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-400'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-blue-400' : 'group-hover:text-white'} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Auth Section */}
        {!isAuthenticated && (
          <div className="mb-8 p-4 bg-slate-750 rounded-xl border border-slate-600">
            <h3 className="text-white font-semibold mb-2">New to Pollski?</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Join the community for live polls, real-time insights, and personalized watchlists!
            </p>
            <div className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full rounded-lg border-slate-600 text-slate-300 hover:bg-slate-700">
                Login
              </Button>
            </div>
          </div>
        )}

        {/* Most Active */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Most Active</h3>
          <div className="space-y-2">
            {mostActive.map((item, index) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
              >
                <span className="text-slate-300 text-sm font-medium truncate">{item.name}</span>
                <span className="text-blue-400 text-sm font-medium">
                  {item.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Categories */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Active Categories</h3>
          <div className="space-y-2">
            {activeCategories.map((category, index) => (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
              >
                <span className="text-slate-300 text-sm font-medium">{category.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-sm">{category.count}</span>
                  <span className="text-green-400 text-sm">{category.subcount}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Account Section */}
        {isAuthenticated && (
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Account</h3>
            <nav className="space-y-1">
              {userItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400'
                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <item.icon size={18} className={isActive ? 'text-blue-400' : 'group-hover:text-white'} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
