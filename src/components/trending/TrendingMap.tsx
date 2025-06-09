
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrendingLocation {
  id: string;
  country: string;
  city: string;
  trend: string;
  posts: number;
  growth: number;
}

const TrendingMap: React.FC = () => {
  const locations: TrendingLocation[] = [
    { id: '1', country: 'USA', city: 'San Francisco', trend: 'React 19', posts: 1247, growth: 23 },
    { id: '2', country: 'UK', city: 'London', trend: 'TypeScript', posts: 892, growth: 18 },
    { id: '3', country: 'Germany', city: 'Berlin', trend: 'AI Tools', posts: 634, growth: 31 },
    { id: '4', country: 'Japan', city: 'Tokyo', trend: 'Design Systems', posts: 521, growth: 15 },
    { id: '5', country: 'Canada', city: 'Toronto', trend: 'Remote Work', posts: 445, growth: 12 }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Globe size={20} className="text-blue-400" />
          Global Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-slate-400" />
              <div>
                <div className="text-white font-medium">{location.city}, {location.country}</div>
                <div className="text-slate-400 text-sm">#{location.trend}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-sm font-medium">{location.posts.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-green-400 text-xs">
                <TrendingUp size={10} />
                +{location.growth}%
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingMap;
