
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Moon, Sun, Volume2, VolumeX, Eye, EyeOff, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface QuickSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickSettingsPanel: React.FC<QuickSettingsPanelProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    soundEffects: true,
    autoPlay: false,
    readReceipts: true,
    onlineStatus: true,
    dataCompression: false
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingsConfig = [
    {
      key: 'darkMode',
      label: 'Dark Mode',
      description: 'Use dark theme across the app',
      icon: settings.darkMode ? Moon : Sun,
      color: 'text-blue-400'
    },
    {
      key: 'notifications',
      label: 'Push Notifications',
      description: 'Receive notifications for new activity',
      icon: settings.notifications ? Volume2 : VolumeX,
      color: 'text-green-400'
    },
    {
      key: 'soundEffects',
      label: 'Sound Effects',
      description: 'Play sounds for interactions',
      icon: Volume2,
      color: 'text-purple-400'
    },
    {
      key: 'autoPlay',
      label: 'Auto-play Videos',
      description: 'Automatically play videos in feed',
      icon: Eye,
      color: 'text-orange-400'
    },
    {
      key: 'readReceipts',
      label: 'Read Receipts',
      description: 'Show when you\'ve read messages',
      icon: settings.readReceipts ? Eye : EyeOff,
      color: 'text-pink-400'
    },
    {
      key: 'onlineStatus',
      label: 'Online Status',
      description: 'Show your online presence',
      icon: settings.onlineStatus ? Globe : Lock,
      color: 'text-cyan-400'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Settings size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">Quick Settings</h2>
                  <p className="text-slate-400 text-sm">Customize your experience</p>
                </div>
              </div>
              <Button
                onClick={onClose}
                className="bg-transparent hover:bg-slate-700 text-slate-400 h-8 w-8 p-0 rounded-full"
              >
                ×
              </Button>
            </div>

            <div className="space-y-4">
              {settingsConfig.map((setting) => {
                const Icon = setting.icon;
                return (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={setting.color} />
                      <div>
                        <h4 className="text-white font-medium text-sm">{setting.label}</h4>
                        <p className="text-slate-400 text-xs">{setting.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings[setting.key as keyof typeof settings]}
                      onCheckedChange={(checked) => updateSetting(setting.key, checked)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                onClick={onClose}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white"
              >
                Done
              </Button>
              <Button
                onClick={() => console.log('Open full settings')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                More Settings
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickSettingsPanel;
