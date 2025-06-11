
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Users, Activity, Signal, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RealTimeUpdate {
  id: string;
  type: 'spike' | 'new_trend' | 'viral' | 'breaking';
  content: string;
  value: string;
  timestamp: Date;
  source: string;
}

const TrendingRealTime: React.FC = () => {
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const mockUpdates = [
        { type: 'spike', content: 'AI Development trending +340%', value: '+340%', source: 'Twitter' },
        { type: 'viral', content: 'New meme format going viral', value: '2.4M views', source: 'TikTok' },
        { type: 'breaking', content: 'Breaking: Tech conference announced', value: 'Hot', source: 'LinkedIn' },
        { type: 'new_trend', content: 'Emerging: Quantum computing discussions', value: '+89%', source: 'Reddit' }
      ];

      const randomUpdate = mockUpdates[Math.floor(Math.random() * mockUpdates.length)];
      const newUpdate: RealTimeUpdate = {
        id: Date.now().toString(),
        type: randomUpdate.type as any,
        content: randomUpdate.content,
        value: randomUpdate.value,
        timestamp: new Date(),
        source: randomUpdate.source
      };

      setUpdates(prev => [newUpdate, ...prev.slice(0, 9)]);
      setUpdateCount(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getUpdateColor = (type: string) => {
    switch (type) {
      case 'spike': return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'viral': return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
      case 'breaking': return 'bg-red-500/20 border-red-500/30 text-red-400';
      default: return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'spike': return TrendingUp;
      case 'viral': return Zap;
      case 'breaking': return Signal;
      default: return Activity;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-xs text-muted-foreground">
                {isConnected ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>
            <Wifi className="text-blue-500" size={18} />
            Real-Time Feed
          </div>
          <Badge variant="secondary">
            {updateCount} updates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-blue-500" />
            <span className="text-sm text-foreground">Live Connections</span>
          </div>
          <span className="text-sm font-bold text-foreground">2,847</span>
        </div>

        {/* Real-time Updates */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {updates.map((update, index) => {
              const IconComponent = getUpdateIcon(update.type);
              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-lg border ${getUpdateColor(update.type)}`}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent size={16} className="mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-1">
                        {update.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {update.value}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {update.source}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {update.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {updates.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Activity size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Waiting for live updates...</p>
          </div>
        )}

        <Button 
          variant="outline" 
          className="w-full" 
          size="sm"
          onClick={() => setIsConnected(!isConnected)}
        >
          {isConnected ? 'Pause' : 'Resume'} Live Feed
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingRealTime;
