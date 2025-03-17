
import { useState, useEffect } from 'react';
import { Lightbulb, TrendingUp, Brain, Activity, ArrowRight } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface InsightType {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'activity' | 'sleep' | 'nutrition';
  priority: 'low' | 'medium' | 'high';
  recommendation: string;
  timeframe: string;
  isNew: boolean;
}

const PredictiveInsights: React.FC = () => {
  const [insights, setInsights] = useState<InsightType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Simulate fetching AI insights
  useEffect(() => {
    const fetchInsights = () => {
      setLoading(true);
      
      // Simulated API call delay
      setTimeout(() => {
        const mockInsights: InsightType[] = [
          {
            id: '1',
            title: 'Elevated Heart Rate Pattern',
            description: 'Your heart rate has been consistently elevated during rest periods over the past 3 days.',
            category: 'health',
            priority: 'medium',
            recommendation: 'Consider reducing caffeine intake and monitor stress levels. Try deep breathing exercises.',
            timeframe: '3 days',
            isNew: true
          },
          {
            id: '2',
            title: 'Improved Sleep Quality',
            description: 'Your sleep patterns show a 15% improvement in deep sleep duration this week.',
            category: 'sleep',
            priority: 'low',
            recommendation: 'Continue your current sleep hygiene practices, they appear to be working well.',
            timeframe: '1 week',
            isNew: false
          },
          {
            id: '3',
            title: 'Stress Level Correlation',
            description: 'High stress levels correlate with your commute times (8-9AM and 5-6PM).',
            category: 'health',
            priority: 'medium',
            recommendation: 'Try meditation or calming music during your commute periods.',
            timeframe: '2 weeks',
            isNew: true
          },
          {
            id: '4',
            title: 'Hydration Alert',
            description: 'Based on your activity levels and climate conditions, you may be under-hydrated.',
            category: 'nutrition',
            priority: 'high',
            recommendation: 'Increase water intake by approximately 500ml daily, especially before exercise.',
            timeframe: '48 hours',
            isNew: true
          },
          {
            id: '5',
            title: 'Activity Optimization',
            description: 'Your energy levels peak between 10AM-12PM based on heart rate and activity data.',
            category: 'activity',
            priority: 'low',
            recommendation: 'Consider scheduling high-focus work or exercise during this optimal window.',
            timeframe: '30 days',
            isNew: false
          }
        ];
        
        setInsights(mockInsights);
        setLoading(false);
      }, 1500);
    };
    
    fetchInsights();
    
    // Periodically refresh insights
    const intervalId = setInterval(() => {
      if (Math.random() > 0.7) {
        fetchInsights();
      }
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const getCategoryIcon = (category: InsightType['category']) => {
    switch (category) {
      case 'health':
        return <Activity size={18} className="text-safesphere-info" />;
      case 'activity':
        return <TrendingUp size={18} className="text-safesphere-success" />;
      case 'sleep':
        return <Lightbulb size={18} className="text-safesphere-purple" />;
      case 'nutrition':
        return <Lightbulb size={18} className="text-safesphere-warning" />;
      default:
        return <Brain size={18} className="text-safesphere-primary" />;
    }
  };

  const getPriorityClasses = (priority: InsightType['priority']) => {
    switch (priority) {
      case 'low':
        return 'border-l-safesphere-success';
      case 'medium':
        return 'border-l-safesphere-warning';
      case 'high':
        return 'border-l-safesphere-red';
      default:
        return 'border-l-safesphere-info';
    }
  };
  
  const applyInsightFiltering = () => {
    if (selectedCategory === 'all') {
      return insights;
    }
    return insights.filter(insight => insight.category === selectedCategory);
  };

  const markInsightAsRead = (id: string) => {
    setInsights(prevInsights => 
      prevInsights.map(insight => 
        insight.id === id ? { ...insight, isNew: false } : insight
      )
    );
  };

  const applyRecommendation = (insight: InsightType) => {
    toast.success("Recommendation Applied", {
      description: `You've applied the recommendation for "${insight.title}".`,
    });
    
    markInsightAsRead(insight.id);
  };

  const filteredInsights = applyInsightFiltering();

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Predictive Health Insights</h2>
        <div className="text-xs px-2.5 py-1 rounded-full bg-safesphere-dark-hover text-safesphere-white-muted/60">
          <Brain size={14} className="inline mr-1" /> AI Powered
        </div>
      </div>
      
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin">
        <Button
          size="sm"
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          className={cn(
            "text-xs border-white/10",
            selectedCategory === 'all' ? "bg-safesphere-primary" : "bg-safesphere-dark-hover"
          )}
          onClick={() => setSelectedCategory('all')}
        >
          All Insights
        </Button>
        
        <Button
          size="sm"
          variant={selectedCategory === 'health' ? 'default' : 'outline'}
          className={cn(
            "text-xs border-white/10",
            selectedCategory === 'health' ? "bg-safesphere-info" : "bg-safesphere-dark-hover"
          )}
          onClick={() => setSelectedCategory('health')}
        >
          Health
        </Button>
        
        <Button
          size="sm"
          variant={selectedCategory === 'activity' ? 'default' : 'outline'}
          className={cn(
            "text-xs border-white/10",
            selectedCategory === 'activity' ? "bg-safesphere-success" : "bg-safesphere-dark-hover"
          )}
          onClick={() => setSelectedCategory('activity')}
        >
          Activity
        </Button>
        
        <Button
          size="sm"
          variant={selectedCategory === 'sleep' ? 'default' : 'outline'}
          className={cn(
            "text-xs border-white/10",
            selectedCategory === 'sleep' ? "bg-safesphere-purple" : "bg-safesphere-dark-hover"
          )}
          onClick={() => setSelectedCategory('sleep')}
        >
          Sleep
        </Button>
        
        <Button
          size="sm"
          variant={selectedCategory === 'nutrition' ? 'default' : 'outline'}
          className={cn(
            "text-xs border-white/10",
            selectedCategory === 'nutrition' ? "bg-safesphere-warning" : "bg-safesphere-dark-hover"
          )}
          onClick={() => setSelectedCategory('nutrition')}
        >
          Nutrition
        </Button>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-safesphere-primary border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-sm text-safesphere-white-muted/60">Analyzing your health data...</p>
        </div>
      ) : (
        <>
          {filteredInsights.length === 0 ? (
            <div className="text-center py-8">
              <Brain size={32} className="mx-auto mb-2 text-safesphere-white-muted/40" />
              <p className="text-safesphere-white-muted/60">No insights available for this category.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredInsights.map((insight, index) => (
                <AnimatedTransition 
                  key={insight.id} 
                  direction="right" 
                  delay={0.1 * index}
                  className={cn(
                    "glass-panel rounded-lg p-4 border-l-4",
                    getPriorityClasses(insight.priority),
                    insight.isNew && "ring-1 ring-safesphere-primary/30"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(insight.category)}
                      <h3 className="font-medium text-sm">{insight.title}</h3>
                      {insight.isNew && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-safesphere-primary/20 text-safesphere-primary">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-safesphere-white-muted/40">
                      Based on data from past {insight.timeframe}
                    </div>
                  </div>
                  
                  <p className="text-xs mb-2 text-safesphere-white-muted/80">{insight.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <div className="flex-1 text-xs bg-safesphere-dark-hover px-3 py-2 rounded">
                      <strong className="text-safesphere-primary">Recommendation:</strong> {insight.recommendation}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs bg-safesphere-dark border-white/10 whitespace-nowrap"
                      onClick={() => applyRecommendation(insight)}
                    >
                      Apply <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </AnimatedTransition>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PredictiveInsights;
