
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, TrendingUp, TrendingDown, ArrowRight, Compare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface TrendingItem {
  id: string;
  name: string;
  value: number;
  change: number;
  category: string;
}

const TrendingComparison: React.FC = () => {
  const [selectedTrends, setSelectedTrends] = useState<string[]>(['ai', 'react']);
  
  const trendingItems: TrendingItem[] = [
    { id: 'ai', name: 'Artificial Intelligence', value: 15420, change: 34, category: 'Technology' },
    { id: 'react', name: 'React Development', value: 8934, change: 18, category: 'Programming' },
    { id: 'crypto', name: 'Cryptocurrency', value: 12675, change: -12, category: 'Finance' },
    { id: 'climate', name: 'Climate Change', value: 6543, change: 23, category: 'Environment' },
    { id: 'space', name: 'Space Exploration', value: 9876, change: 45, category: 'Science' }
  ];

  const comparisonData = selectedTrends.map(id => 
    trendingItems.find(item => item.id === id)
  ).filter(Boolean) as TrendingItem[];

  const handleTrendChange = (index: number, value: string) => {
    const newTrends = [...selectedTrends];
    newTrends[index] = value;
    setSelectedTrends(newTrends);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Compare className="text-orange-500" size={18} />
          Trend Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trend Selectors */}
        <div className="grid grid-cols-2 gap-4">
          {selectedTrends.map((selectedId, index) => (
            <div key={index}>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Trend {index + 1}
              </label>
              <Select value={selectedId} onValueChange={(value) => handleTrendChange(index, value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {trendingItems.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {/* Comparison Results */}
        <div className="space-y-3">
          {comparisonData.map((trend, index) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-purple-500'}`} />
                <div>
                  <div className="font-medium text-foreground text-sm">{trend.name}</div>
                  <Badge variant="secondary" className="text-xs mt-1">{trend.category}</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">{trend.value.toLocaleString()}</div>
                <div className={`text-xs flex items-center gap-1 ${
                  trend.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {trend.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(trend.change)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Insights */}
        {comparisonData.length === 2 && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <BarChart size={14} className="text-blue-400" />
              <span className="text-sm font-medium text-foreground">Comparison Insight</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {comparisonData[0].name} has {
                comparisonData[0].value > comparisonData[1].value 
                  ? `${Math.round(((comparisonData[0].value - comparisonData[1].value) / comparisonData[1].value) * 100)}% more`
                  : `${Math.round(((comparisonData[1].value - comparisonData[0].value) / comparisonData[0].value) * 100)}% fewer`
              } mentions than {comparisonData[1].name}.
            </p>
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full">
          <ArrowRight size={12} className="mr-2" />
          View Detailed Analysis
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingComparison;
