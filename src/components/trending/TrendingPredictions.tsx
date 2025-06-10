
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Clock, Target, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const TrendingPredictions: React.FC = () => {
  const predictions = [
    {
      id: '1',
      topic: 'AI Code Assistants',
      confidence: 92,
      timeframe: '2-4 hours',
      currentMentions: 234,
      predictedPeak: 1200,
      category: 'Technology',
      riskLevel: 'low'
    },
    {
      id: '2',
      topic: 'Sustainable Energy',
      confidence: 78,
      timeframe: '6-8 hours',
      currentMentions: 156,
      predictedPeak: 800,
      category: 'Environment',
      riskLevel: 'medium'
    },
    {
      id: '3',
      topic: 'Remote Work Tools',
      confidence: 65,
      timeframe: '12-24 hours',
      currentMentions: 89,
      predictedPeak: 450,
      category: 'Business',
      riskLevel: 'high'
    }
  ];

  const trendingSignals = [
    { signal: 'Hashtag Velocity', strength: 85, status: 'rising' },
    { signal: 'Influencer Mentions', strength: 73, status: 'stable' },
    { signal: 'Geographic Spread', strength: 91, status: 'rising' },
    { signal: 'Engagement Rate', strength: 67, status: 'declining' }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'rising': return TrendingUp;
      case 'declining': return AlertTriangle;
      default: return Target;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="text-purple-500" size={18} />
          AI Predictions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Predictions */}
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-accent/30 rounded-lg border border-border"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{prediction.topic}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{prediction.category}</Badge>
                    <span className={`text-xs font-medium ${getRiskColor(prediction.riskLevel)}`}>
                      {prediction.riskLevel} risk
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-foreground">{prediction.confidence}%</div>
                  <div className="text-xs text-muted-foreground">confidence</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-muted-foreground">Current</div>
                  <div className="font-semibold text-foreground">{prediction.currentMentions} mentions</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Predicted Peak</div>
                  <div className="font-semibold text-foreground">{prediction.predictedPeak} mentions</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Expected in {prediction.timeframe}</span>
                  <Zap size={12} className="text-yellow-500" />
                </div>
                <Progress value={prediction.confidence} className="h-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trending Signals */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Target size={14} />
            Trending Signals
          </h3>
          <div className="space-y-3">
            {trendingSignals.map((signal, index) => {
              const StatusIcon = getStatusIcon(signal.status);
              return (
                <motion.div
                  key={signal.signal}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <StatusIcon size={12} className={
                      signal.status === 'rising' ? 'text-green-500' :
                      signal.status === 'declining' ? 'text-red-500' : 'text-yellow-500'
                    } />
                    <span className="text-sm text-foreground">{signal.signal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${signal.strength}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground w-8">{signal.strength}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={14} className="text-purple-400" />
            <span className="text-sm font-medium text-foreground">AI Insight</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Technology trends are showing strong momentum. Expect increased activity around AI topics in the next 6 hours based on current engagement patterns.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingPredictions;
