
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Key, 
  Globe, 
  Smartphone,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  ChevronRight
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import FloatingActionButton from '@/components/FloatingActionButton';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      mentions: true,
      likes: false,
      follows: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      messagePermissions: 'everyone',
      dataCollection: true
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
      sessionTimeout: '30',
      dataDownload: false
    },
    appearance: {
      theme: 'dark',
      language: 'en',
      fontSize: 'medium',
      reducedMotion: false
    }
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      <div className="flex-1 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto p-6"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User size={20} />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your basic profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Alex" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Johnson" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="alexjohnson" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" defaultValue="Full-stack developer passionate about creating amazing user experiences." />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>Manage your account data and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Download size={20} className="text-blue-500" />
                      <div>
                        <h4 className="font-medium">Download Your Data</h4>
                        <p className="text-sm text-muted-foreground">Export all your posts, comments, and profile data</p>
                      </div>
                    </div>
                    <Button variant="outline">Download</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <Trash2 size={20} className="text-destructive" />
                      <div>
                        <h4 className="font-medium text-destructive">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                    </div>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield size={20} />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Control who can see your information and interact with you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Profile Visibility</h4>
                        <p className="text-sm text-muted-foreground">Who can see your profile</p>
                      </div>
                      <Select
                        value={settings.privacy.profileVisibility}
                        onValueChange={(value) => updateSetting('privacy', 'profileVisibility', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Show Email</h4>
                        <p className="text-sm text-muted-foreground">Display email on profile</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showEmail}
                        onCheckedChange={(checked) => updateSetting('privacy', 'showEmail', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Message Permissions</h4>
                        <p className="text-sm text-muted-foreground">Who can send you messages</p>
                      </div>
                      <Select
                        value={settings.privacy.messagePermissions}
                        onValueChange={(value) => updateSetting('privacy', 'messagePermissions', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyone">Everyone</SelectItem>
                          <SelectItem value="friends">Friends</SelectItem>
                          <SelectItem value="nobody">Nobody</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Collection</h4>
                        <p className="text-sm text-muted-foreground">Allow analytics and usage data collection</p>
                      </div>
                      <Switch
                        checked={settings.privacy.dataCollection}
                        onCheckedChange={(checked) => updateSetting('privacy', 'dataCollection', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell size={20} />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                        <p className="text-sm text-muted-foreground">
                          {key === 'email' && 'Receive notifications via email'}
                          {key === 'push' && 'Receive push notifications'}
                          {key === 'mentions' && 'When someone mentions you'}
                          {key === 'likes' && 'When someone likes your posts'}
                          {key === 'follows' && 'When someone follows you'}
                          {key === 'marketing' && 'Promotional emails and updates'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => updateSetting('notifications', key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key size={20} />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Protect your account with advanced security features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactor}
                        onCheckedChange={(checked) => updateSetting('security', 'twoFactor', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Login Alerts</h4>
                        <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                      </div>
                      <Switch
                        checked={settings.security.loginAlerts}
                        onCheckedChange={(checked) => updateSetting('security', 'loginAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Session Timeout</h4>
                        <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                      </div>
                      <Select
                        value={settings.security.sessionTimeout}
                        onValueChange={(value) => updateSetting('security', 'sessionTimeout', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 min</SelectItem>
                          <SelectItem value="30">30 min</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette size={20} />
                    Appearance Settings
                  </CardTitle>
                  <CardDescription>Customize how the app looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Theme</h4>
                        <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                      </div>
                      <Select
                        value={settings.appearance.theme}
                        onValueChange={(value) => updateSetting('appearance', 'theme', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Language</h4>
                        <p className="text-sm text-muted-foreground">Select your language</p>
                      </div>
                      <Select
                        value={settings.appearance.language}
                        onValueChange={(value) => updateSetting('appearance', 'language', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Font Size</h4>
                        <p className="text-sm text-muted-foreground">Adjust text size</p>
                      </div>
                      <Select
                        value={settings.appearance.fontSize}
                        onValueChange={(value) => updateSetting('appearance', 'fontSize', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Reduced Motion</h4>
                        <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                      </div>
                      <Switch
                        checked={settings.appearance.reducedMotion}
                        onCheckedChange={(checked) => updateSetting('appearance', 'reducedMotion', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <RightSidebar />
      <FloatingActionButton />
    </div>
  );
};

export default Settings;
