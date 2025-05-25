
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';

const Settings = () => {
  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      settings: [
        { label: 'Public Profile', description: 'Make your profile visible to others', enabled: true },
        { label: 'Show Email', description: 'Display your email on your profile', enabled: false },
        { label: 'Show Activity', description: 'Show your recent activity', enabled: true }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { label: 'Email Notifications', description: 'Receive notifications via email', enabled: true },
        { label: 'Push Notifications', description: 'Get push notifications on your device', enabled: true },
        { label: 'Comment Replies', description: 'Notify when someone replies to your comments', enabled: true },
        { label: 'New Followers', description: 'Notify when someone follows you', enabled: false }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        { label: 'Two-Factor Authentication', description: 'Add an extra layer of security', enabled: false },
        { label: 'Private Account', description: 'Require approval for new followers', enabled: false },
        { label: 'Data Analytics', description: 'Allow us to collect usage data', enabled: true }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        { label: 'Dark Mode', description: 'Use dark theme', enabled: true },
        { label: 'Compact Layout', description: 'Use a more compact interface', enabled: false },
        { label: 'High Contrast', description: 'Increase contrast for better readability', enabled: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      <div className="flex-1 bg-background">
        <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border p-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
          </motion.div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          <div className="space-y-8">
            {settingsSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                className="bg-card p-6 rounded-xl border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <section.icon className="text-primary" size={24} />
                  <h2 className="text-xl font-semibold text-card-foreground">{section.title}</h2>
                </div>

                <div className="space-y-4">
                  {section.settings.map((setting, index) => (
                    <motion.div
                      key={setting.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: sectionIndex * 0.1 + index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-accent transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-card-foreground">{setting.label}</h3>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Account Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-card p-6 rounded-xl border border-border"
            >
              <h2 className="text-xl font-semibold text-card-foreground mb-6">Account Actions</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Globe size={18} />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <HelpCircle size={18} />
                  Get Help
                </Button>
                <Button variant="destructive" className="w-full justify-start gap-3">
                  <User size={18} />
                  Delete Account
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Settings;
