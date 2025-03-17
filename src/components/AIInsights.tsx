
import { BrainCircuit, ChevronRight, Star, Zap, BarChart2, Clock, Sun, Moon, Droplet } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface InsightType {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'stress' | 'sleep' | 'activity' | 'hydration' | 'heart';
  timestamp: Date;
  icon: React.ReactNode;
}

const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState<InsightType[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Generate AI insights based on user's data
  // In a real app, this would pull from actual user data and ML models
  useEffect(() => {
    const categories = ['stress', 'sleep', 'activity', 'hydration', 'heart'];
    const baseInsights: InsightType[] = [
      {
        id: '1',
        title: 'Stress Management',
        description: 'Your stress levels peak between 2-4 PM. Consider short meditation breaks during this period.',
        priority: 'high',
        category: 'stress',
        timestamp: new Date(),
        icon: <BarChart2 size={18} className="text-safesphere-warning" />
      },
      {
        id: '2',
        title: 'Sleep Pattern',
        description: 'Your deep sleep has improved by 12% this week. Maintain your current bedtime routine.',
        priority: 'medium',
        category: 'sleep',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        icon: <Moon size={18} className="text-safesphere-info" />
      },
      {
        id: '3',
        title: 'Activity Suggestion',
        description: 'Based on your vitals, a 20-minute walk would be beneficial now to reduce your stress levels.',
        priority: 'low',
        category: 'activity',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        icon: <Sun size={18} className="text-safesphere-success" />
      },
      {
        id: '4',
        title: 'Hydration Alert',
        description: 'You\'ve consumed less water than usual today. Consider drinking 250ml now.',
        priority: 'medium',
        category: 'hydration',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        icon: <Droplet size={18} className="text-safesphere-info" />
      },
      {
        id: '5',
        title: 'Heart Rate Analysis',
        description: 'Your resting heart rate has been gradually increasing this week. Consider more relaxation activities.',
        priority: 'high',
        category: 'heart',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        icon: <BarChart2 size={18} className="text-safesphere-red" />
      }
    ];
    
    setInsights(baseInsights);
    
    // Simulate new insights being generated
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const priorities = ['high', 'medium', 'low'] as const;
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
        
        let newInsight: InsightType | null = null;
        
        // Generate category specific insights
        switch (randomCategory) {
          case 'stress':
            newInsight = {
              id: Date.now().toString(),
              title: 'Stress Pattern Detected',
              description: 'Your stress levels increase during meetings. Try deep breathing exercises before scheduled calls.',
              priority: randomPriority,
              category: 'stress',
              timestamp: new Date(),
              icon: <BarChart2 size={18} className="text-safesphere-warning" />
            };
            break;
          case 'sleep':
            newInsight = {
              id: Date.now().toString(),
              title: 'Sleep Optimization',
              description: 'Reducing screen time 30 minutes before bed could improve your deep sleep quality by up to 15%.',
              priority: randomPriority,
              category: 'sleep',
              timestamp: new Date(),
              icon: <Moon size={18} className="text-safesphere-info" />
            };
            break;
          case 'activity':
            newInsight = {
              id: Date.now().toString(),
              title: 'Movement Reminder',
              description: 'You\'ve been sedentary for 90 minutes. A short walk would improve circulation and reduce stress.',
              priority: randomPriority,
              category: 'activity',
              timestamp: new Date(),
              icon: <Sun size={18} className="text-safesphere-success" />
            };
            break;
          case 'hydration':
            newInsight = {
              id: Date.now().toString(),
              title: 'Hydration Trend',
              description: 'Your hydration levels drop in the afternoon. Setting a reminder at 2PM could help maintain optimal levels.',
              priority: randomPriority,
              category: 'hydration',
              timestamp: new Date(),
              icon: <Droplet size={18} className="text-safesphere-info" />
            };
            break;
          case 'heart':
            newInsight = {
              id: Date.now().toString(),
              title: 'Heart Rate Variability',
              description: 'Your HRV improves after meditation sessions. Consider adding a 5-minute session in the morning.',
              priority: randomPriority,
              category: 'heart',
              timestamp: new Date(),
              icon: <BarChart2 size={18} className="text-safesphere-red" />
            };
            break;
        }
        
        if (newInsight) {
          setInsights(prev => [newInsight!, ...prev.slice(0, 5)]);
        }
      }
    }, 30000); // Check for new insights every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Get filtered insights
  const filteredInsights = activeFilter
    ? insights.filter(insight => insight.category === activeFilter)
    : insights;
  
  // Format relative time
  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <AnimatedTransition delay={0.2} className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">AI Insights</h2>
          <div className="px-1.5 py-0.5 rounded-full bg-safesphere-red/10 border border-safesphere-red/20 text-[10px] text-safesphere-red flex items-center">
            <Zap size={10} className="mr-0.5" /> LIVE
          </div>
        </div>
        <button className="text-xs flex items-center text-safesphere-white-muted/60 hover:text-safesphere-white transition-colors">
          View All <ChevronRight size={14} />
        </button>
      </div>
      
      {/* Category filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            "text-xs px-2.5 py-1 rounded-full whitespace-nowrap",
            activeFilter === null 
              ? "bg-white/10 text-white" 
              : "bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white"
          )}
        >
          All Insights
        </button>
        <button
          onClick={() => setActiveFilter('stress')}
          className={cn(
            "text-xs px-2.5 py-1 rounded-full whitespace-nowrap",
            activeFilter === 'stress' 
              ? "bg-safesphere-warning/20 text-safesphere-warning border border-safesphere-warning/20" 
              : "bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white"
          )}
        >
          Stress
        </button>
        <button
          onClick={() => setActiveFilter('sleep')}
          className={cn(
            "text-xs px-2.5 py-1 rounded-full whitespace-nowrap",
            activeFilter === 'sleep' 
              ? "bg-safesphere-info/20 text-safesphere-info border border-safesphere-info/20" 
              : "bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white"
          )}
        >
          Sleep
        </button>
        <button
          onClick={() => setActiveFilter('activity')}
          className={cn(
            "text-xs px-2.5 py-1 rounded-full whitespace-nowrap",
            activeFilter === 'activity' 
              ? "bg-safesphere-success/20 text-safesphere-success border border-safesphere-success/20" 
              : "bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white"
          )}
        >
          Activity
        </button>
        <button
          onClick={() => setActiveFilter('hydration')}
          className={cn(
            "text-xs px-2.5 py-1 rounded-full whitespace-nowrap",
            activeFilter === 'hydration' 
              ? "bg-safesphere-info/20 text-safesphere-info border border-safesphere-info/20" 
              : "bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white"
          )}
        >
          Hydration
        </button>
        <button
          onClick={() => setActiveFilter('heart')}
          className={cn(
            "text-xs px-2.5 py-1 rounded-full whitespace-nowrap",
            activeFilter === 'heart' 
              ? "bg-safesphere-red/20 text-safesphere-red border border-safesphere-red/20" 
              : "bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white"
          )}
        >
          Heart Health
        </button>
      </div>
      
      <div className="space-y-3">
        {filteredInsights.map((insight, index) => (
          <AnimatedTransition 
            key={insight.id}
            direction="left"
            delay={0.1 * index}
            className={cn(
              "glass-panel rounded-lg p-3 border-l-4",
              insight.priority === 'high' ? "border-l-safesphere-red" :
              insight.priority === 'medium' ? "border-l-safesphere-warning" :
              "border-l-safesphere-info"
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  {insight.icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm flex items-center">
                    {insight.title}
                    {insight.priority === 'high' && (
                      <Star size={12} className="ml-1.5 text-safesphere-warning" fill="currentColor" />
                    )}
                  </h3>
                  <p className="text-xs mt-1 text-safesphere-white-muted/60">{insight.description}</p>
                </div>
              </div>
              <div className="text-[10px] text-safesphere-white-muted/40 flex items-center">
                <Clock size={10} className="mr-0.5" />
                {getRelativeTime(insight.timestamp)}
              </div>
            </div>
          </AnimatedTransition>
        ))}
        
        {filteredInsights.length === 0 && (
          <div className="text-center py-8 text-safesphere-white-muted/60 text-sm">
            No {activeFilter && `${activeFilter} `}insights available
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 rounded-lg border border-dashed border-safesphere-white/10 bg-safesphere-dark/30">
        <div className="flex items-center text-xs text-safesphere-white-muted/70">
          <BrainCircuit size={14} className="mr-2 text-safesphere-red" />
          SafeSphere AI is continuously analyzing your health patterns to provide personalized insights.
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default AIInsights;
