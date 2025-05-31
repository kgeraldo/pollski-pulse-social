
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Hash, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrendingTopic {
  id: string;
  hashtag: string;
  posts: number;
  growth: number;
  category: string;
}

const mockTrendingTopics: TrendingTopic[] = [
  { id: '1', hashtag: 'ReactJS', posts: 2451, growth: 12.5, category: 'Technology' },
  { id: '2', hashtag: 'WebDev', posts: 1832, growth: 8.7, category: 'Development' },
  { id: '3', hashtag: 'AI', posts: 3021, growth: 24.3, category: 'Technology' },
  { id: '4', hashtag: 'Design', posts: 1456, growth: 5.2, category: 'Creative' },
  { id: '5', hashtag: 'TypeScript', posts: 987, growth: 15.8, category: 'Development' }
];

const TrendingTopics: React.FC = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white text-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <TrendingUp size={16} className="text-white" />
          </div>
          Trending Now
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTrendingTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-600/20 rounded text-blue-400 text-xs font-bold">
                {index + 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Hash size={14} className="text-slate-400" />
                  <span className="text-white font-medium">{topic.hashtag}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400">{topic.posts.toLocaleString()} posts</span>
                  <Badge variant="secondary" className="text-xs bg-green-600/20 text-green-400 hover:bg-green-600/30">
                    +{topic.growth}%
                  </Badge>
                </div>
              </div>
            </div>
            <ExternalLink size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 p-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          See all trending topics
        </motion.button>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
