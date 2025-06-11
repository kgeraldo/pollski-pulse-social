
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, TrendingUp, Zap, X, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface TrendingAlert {
  id: string;
  type: 'spike' | 'decline' | 'new' | 'viral';
  title: string;
  description: string;
  value: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

const TrendingAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<TrendingAlert[]>([
    {
      id: '1',
      type: 'spike',
      title: 'AI Development Surging',
      description: 'Mentions increased by 234% in the last hour',
      value: '+234%',
      timestamp: '2 min ago',
      priority: 'high',
      read: false
    },
    {
      id: '2',
      type: 'viral',
      title: 'New Viral Hashtag',
      description: '#ReactNext trending globally',
      value: '15.2K posts',
      timestamp: '5 min ago',
      priority: 'high',
      read: false
    },
    {
      id: '3',
      type: 'new',
      title: 'Emerging Topic',
      description: 'Quantum Computing gaining traction',
      value: '+89 mentions',
      timestamp: '12 min ago',
      priority: 'medium',
      read: true
    }
  ]);

  const [alertSettings, setAlertSettings] = useState({
    spikes: true,
    viral: true,
    newTopics: true,
    declines: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new alerts
      if (Math.random() > 0.8) {
        const newAlert: TrendingAlert = {
          id: Date.now().toString(),
          type: ['spike', 'viral', 'new'][Math.floor(Math.random() * 3)] as any,
          title: ['Machine Learning Spike', 'Crypto Rally', 'New Framework'][Math.floor(Math.random() * 3)],
          description: 'Real-time trending activity detected',
          value: `+${Math.floor(Math.random() * 200)}%`,
          timestamp: 'Just now',
          priority: 'medium',
          read: false
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'spike': return TrendingUp;
      case 'viral': return Zap;
      case 'new': return Bell;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'spike': return 'text-green-500';
      case 'viral': return 'text-yellow-500';
      case 'new': return 'text-blue-500';
      default: return 'text-red-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-2">
            <Bell className="text-blue-500" size={18} />
            Smart Alerts
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Settings size={14} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Alert Settings */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-accent/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Spikes</span>
            <Switch 
              checked={alertSettings.spikes}
              onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, spikes: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Viral</span>
            <Switch 
              checked={alertSettings.viral}
              onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, viral: checked }))}
            />
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {alerts.map((alert, index) => {
              const IconComponent = getAlertIcon(alert.type);
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all group ${
                    alert.read ? 'bg-accent/20' : getPriorityColor(alert.priority)
                  } ${!alert.read ? 'shadow-sm' : ''}`}
                  onClick={() => markAsRead(alert.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <IconComponent 
                        size={16} 
                        className={`mt-0.5 ${getAlertColor(alert.type)}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm font-medium ${alert.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {alert.title}
                          </h4>
                          {!alert.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {alert.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {alert.value}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissAlert(alert.id);
                      }}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Bell size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No alerts at the moment</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingAlerts;
