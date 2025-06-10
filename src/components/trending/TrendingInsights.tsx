
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Brain, Sparkles, TrendingUp, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Insight {
  id: string;
  type: 'opportunity' | 'recommendation' | 'prediction' | 'warning';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  actionable: boolean;
}

const TrendingInsights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      type: 'opportunity',
      title: 'AI Content Creation Peak',
      description: 'AI-generated content discussions are at an all-time high. Consider creating content about AI tools and workflows.',
      confidence: 94,
      impact: 'high',
      timeframe: 'Next 3 days',
      actionable: true
    },
    {
      id: '2',
      type: 'prediction',
      title: 'React 19 Adoption Wave',
      description: 'Based on current momentum, React 19 discussions will likely increase by 300% next week.',
      confidence: 87,
      impact: 'medium',
      timeframe: 'Next 7 days',
      actionable: true
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Remote Work Content Gap',
      description: 'There\'s a 45% decrease in remote work discussions. This could be an opportunity for thought leadership.',
      confidence: 76,
      impact: 'medium',
      timeframe: 'This week',
      actionable: true
    },
    {
      id: '4',
      type: 'warning',
      title: 'Crypto Sentiment Shift',
      description: 'Cryptocurrency discussions showing negative sentiment trend. Consider adjusting content strategy.',
      confidence: 82,
      impact: 'low',
      timeframe: 'Ongoing',
      actionable: false
    }
  ]);

  useEffect(() => {
    // Simulate updating insights
    const interval = setInterval(() => {
      setInsights(prev => prev.map(insight => ({
        ...insight,
        confidence: Math.max(60, Math.min(99, insight.confidence + (Math.random() * 6 - 3)))
      })));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return Target;
      case 'recommendation': return Lightbulb;
      case 'prediction': return Brain;
      case 'warning': return TrendingUp;
      default: return Sparkles;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-500';
      case 'recommendation': return 'text-blue-500';
      case 'prediction': return 'text-purple-500';
      case 'warning': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-500';
    if (confidence >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="text-purple-500" size={18} />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = getInsightIcon(insight.type);
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg border border-border"
              >
                <div className="flex items-start gap-3">
                  <IconComponent 
                    size={20} 
                    className={`mt-1 ${getInsightColor(insight.type)}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground text-sm">
                        {insight.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs capitalize ${insight.actionable ? 'bg-green-500/20' : 'bg-gray-500/20'}`}
                        >
                          {insight.type}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${getImpactColor(insight.impact)}`} />
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {insight.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Confidence</span>
                        <span className={`font-semibold ${getConfidenceColor(insight.confidence)}`}>
                          {Math.round(insight.confidence)}%
                        </span>
                      </div>
                      <Progress value={insight.confidence} className="h-2" />
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          {insight.timeframe}
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {insight.impact} impact
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {insights.filter(i => i.actionable).length}
            </div>
            <div className="text-xs text-muted-foreground">Actionable</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {Math.round(insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Avg Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {insights.filter(i => i.impact === 'high').length}
            </div>
            <div className="text-xs text-muted-foreground">High Impact</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingInsights;
