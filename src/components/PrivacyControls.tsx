
import React, { useState } from 'react';
import { Lock, Users, Globe, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PrivacyControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyControls: React.FC<PrivacyControlsProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    defaultPostVisibility: 'public',
    allowMentions: 'everyone',
    showActivity: true,
    showOnlineStatus: true,
    allowDirectMessages: true
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Lock size={20} className="text-blue-400" />
            Privacy Controls
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-white font-medium">Default Post Visibility</Label>
            <Select
              value={settings.defaultPostVisibility}
              onValueChange={(value) => setSettings({ ...settings, defaultPostVisibility: value })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="public">
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    Public
                  </div>
                </SelectItem>
                <SelectItem value="followers">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    Followers Only
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center gap-2">
                    <Lock size={16} />
                    Private
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-white font-medium">Who can mention you</Label>
            <Select
              value={settings.allowMentions}
              onValueChange={(value) => setSettings({ ...settings, allowMentions: value })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="followers">Followers Only</SelectItem>
                <SelectItem value="none">No One</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white">Show Activity Status</Label>
              <Switch
                checked={settings.showActivity}
                onCheckedChange={(checked) => setSettings({ ...settings, showActivity: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-white">Show Online Status</Label>
              <Switch
                checked={settings.showOnlineStatus}
                onCheckedChange={(checked) => setSettings({ ...settings, showOnlineStatus: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-white">Allow Direct Messages</Label>
              <Switch
                checked={settings.allowDirectMessages}
                onCheckedChange={(checked) => setSettings({ ...settings, allowDirectMessages: checked })}
              />
            </div>
          </div>

          <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyControls;
