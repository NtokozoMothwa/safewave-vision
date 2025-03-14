
import { BrainCircuit, ChevronRight, Star, Zap } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';

const insights = [
  {
    id: '1',
    title: 'Stress Management',
    description: 'Your stress levels peak between 2-4 PM. Consider short meditation breaks.',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Sleep Pattern',
    description: 'Your deep sleep has improved by 12% this week.',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Activity Suggestion',
    description: 'Based on your vitals, a 20-minute walk would be beneficial now.',
    priority: 'low',
  }
];

const AIInsights: React.FC = () => {
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
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
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
            <div className="flex gap-3">
              <div className="mt-0.5 text-safesphere-red">
                <BrainCircuit size={18} />
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
          </AnimatedTransition>
        ))}
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
