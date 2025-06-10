
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share, Copy, Download, Link, Image, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const TrendingShare: React.FC = () => {
  const [shareUrl, setShareUrl] = useState('https://app.example.com/trending/ai-trends-2024');
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    { id: 'link', label: 'Share Link', icon: Link, description: 'Copy shareable link' },
    { id: 'image', label: 'Export Image', icon: Image, description: 'Generate visual report' },
    { id: 'data', label: 'Export Data', icon: FileText, description: 'Download CSV/JSON' }
  ];

  const socialPlatforms = [
    { name: 'Twitter', color: 'bg-blue-500', handle: '@twitter' },
    { name: 'LinkedIn', color: 'bg-blue-700', handle: '@linkedin' },
    { name: 'Facebook', color: 'bg-blue-600', handle: '@facebook' },
    { name: 'Reddit', color: 'bg-orange-500', handle: '@reddit' }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateShareText = () => {
    return "Check out these trending insights! AI Development is up 234% in the last 24 hours. #TrendingNow #AI #DataInsights";
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Share className="text-green-500" size={18} />
          Share Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="share" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-4">
            {/* Quick Share URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Share URL</label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  onChange={(e) => setShareUrl(e.target.value)}
                  className="flex-1"
                  readOnly
                />
                <Button
                  size="sm"
                  onClick={copyToClipboard}
                  className={copied ? 'bg-green-600' : ''}
                >
                  <Copy size={12} className="mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Social Media</label>
              <div className="grid grid-cols-2 gap-2">
                {socialPlatforms.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <div className={`w-3 h-3 rounded-full ${platform.color} mr-2`} />
                      {platform.name}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Generated Share Text */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Share Text</label>
              <div className="p-3 bg-accent/30 rounded-lg text-sm text-foreground border">
                {generateShareText()}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-3">
              {shareOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start p-4 h-auto"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className="text-blue-500" />
                        <div className="text-left">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                      <Download size={14} className="ml-auto" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Export Options */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Export Format</label>
              <div className="flex gap-2 flex-wrap">
                {['PNG', 'JPG', 'PDF', 'CSV', 'JSON'].map(format => (
                  <Badge key={format} variant="secondary" className="cursor-pointer hover:bg-accent">
                    {format}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="embed" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Embed Code</label>
              <div className="p-3 bg-accent/30 rounded-lg text-xs font-mono text-foreground border overflow-x-auto">
                {`<iframe src="${shareUrl}/embed" width="100%" height="400" frameborder="0"></iframe>`}
              </div>
              <Button size="sm" onClick={copyToClipboard} className="w-full">
                <Copy size={12} className="mr-2" />
                Copy Embed Code
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Widget Options</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Width</label>
                  <Input placeholder="400px" className="h-8 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Height</label>
                  <Input placeholder="300px" className="h-8 text-xs" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrendingShare;
