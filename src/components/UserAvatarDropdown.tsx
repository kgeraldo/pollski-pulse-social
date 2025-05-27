import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, Crown, HelpCircle, Moon, Sun, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User as UserType } from '@/types';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  action: () => void;
  isPro?: boolean;
}

interface UserAvatarDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({ 
  isOpen, 
  onClose, 
  onOpenAuth 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const user: UserType = {
    name: 'Guest User',
    email: 'guest@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
    isLoggedIn: false,
    isPro: false
  };

  const menuItems: MenuItem[] = [
    { icon: User, label: 'Profile', action: () => console.log('Profile') },
    { icon: Settings, label: 'Settings', action: () => console.log('Settings') },
    { icon: Crown, label: 'Upgrade to Pro', action: () => console.log('Upgrade'), isPro: true },
    { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="absolute top-full right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50"
        >
          {user.isLoggedIn ? (
            <>
              <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-blue-500/30"
                    />
                    {user.isPro && (
                      <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                        <Crown size={10} className="text-yellow-900" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{user.name}</h3>
                    <p className="text-sm text-slate-400 truncate">{user.email}</p>
                    {user.isPro && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full mt-1">
                        <Crown size={10} />
                        Pro Member
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => { item.action(); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-xl transition-all duration-200 ${
                      item.isPro 
                        ? 'text-yellow-400 hover:bg-yellow-500/10' 
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <item.icon size={16} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}

                <div className="border-t border-slate-700 mt-2 pt-2">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-200"
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    <span className="font-medium">
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </button>

                  <button
                    onClick={() => { console.log('Logout'); onClose(); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                  >
                    <LogOut size={16} />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-white mb-1">Welcome to Community</h3>
                <p className="text-sm text-slate-400">Sign in to unlock all features</p>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={() => { onOpenAuth(); onClose(); }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => { onOpenAuth(); onClose(); }}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Create Account
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserAvatarDropdown;
