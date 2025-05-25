
import { Home, Star, Users, TrendingUp, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { isAuthenticated } = useStore();
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Star, label: 'Ratings', path: '/ratings' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' }
  ];

  const userItems = [
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const mostActive = [
    { name: 'TechTalk', count: 4.8, color: 'text-blue-400' },
    { name: 'DesignSpace', count: 4.6, color: 'text-purple-400' },
    { name: 'DevLife', count: 4.5, color: 'text-green-400' }
  ];

  const activeCategories = [
    { name: 'Technology', count: 9.8, color: 'text-blue-400' },
    { name: 'Design', count: 9.4, color: 'text-purple-400' },
    { name: 'Business', count: 9.3, color: 'text-green-400' },
    { name: 'Lifestyle', count: 8.9, color: 'text-yellow-400' },
    { name: 'Entertainment', count: 8.7, color: 'text-red-400' }
  ];

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-72 bg-background border-r border-border h-screen overflow-y-auto"
    >
      <div className="p-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <span className="text-foreground font-bold text-2xl tracking-tight">Pollski</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1 mb-10">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Main Navigation
          </div>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-primary' : 'group-hover:text-accent-foreground'} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Navigation */}
        {isAuthenticated && (
          <nav className="space-y-1 mb-10">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Account
            </div>
            {userItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <item.icon size={18} className={isActive ? 'text-primary' : 'group-hover:text-accent-foreground'} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Auth Section */}
        {!isAuthenticated && (
          <div className="mb-10 p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-card-foreground font-semibold mb-2">Join Pollski</h3>
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
              Connect with the community and share your thoughts through polls and discussions.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full rounded-lg">
                Login
              </Button>
            </div>
          </div>
        )}

        {/* Most Active */}
        <div className="mb-10">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Most Active</h3>
          <div className="space-y-3">
            {mostActive.map((item, index) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors duration-200 cursor-pointer"
              >
                <span className="text-foreground font-medium">{item.name}</span>
                <span className={`font-semibold ${item.color} bg-current/10 px-2 py-1 rounded-md text-sm`}>
                  {item.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Categories */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Categories</h3>
          <div className="space-y-3">
            {activeCategories.map((category, index) => (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors duration-200 cursor-pointer"
              >
                <span className="text-foreground font-medium">{category.name}</span>
                <span className={`font-semibold ${category.color} bg-current/10 px-2 py-1 rounded-md text-sm`}>
                  {category.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
