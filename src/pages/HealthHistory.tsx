
import Header from '@/components/Header';
import HealthHistoryChart from '@/components/HealthHistoryChart';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Heart, Droplet, Thermometer, ActivitySquare } from 'lucide-react';

const HealthHistory: React.FC = () => {
  return (
    <div className="min-h-screen bg-safesphere-darker">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10">
        <AnimatedTransition direction="up" className="mb-8">
          <h1 className="text-3xl font-bold">Health History</h1>
          <p className="text-safesphere-white-muted/60 mt-2">
            View your health metrics over time and analyze patterns
          </p>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <HealthHistoryChart 
            metric="heartRate" 
            title="Heart Rate" 
            color="#E11D48" 
            unit=" BPM" 
          />
          
          <HealthHistoryChart 
            metric="oxygenLevel" 
            title="Oxygen Level" 
            color="#3B82F6" 
            unit="%" 
          />
          
          <HealthHistoryChart 
            metric="temperature" 
            title="Body Temperature" 
            color="#10B981" 
            unit="°C" 
          />
          
          <HealthHistoryChart 
            metric="stressLevel" 
            title="Stress Level" 
            color="#FBBF24" 
            unit="%" 
          />
        </div>
        
        <div className="glass-card rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Health Insights</h2>
          
          <div className="space-y-4">
            <div className="glass-panel rounded-lg p-4 border-l-4 border-l-safesphere-info">
              <div className="flex gap-3">
                <div className="mt-0.5 text-safesphere-info">
                  <Heart size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Heart Rate Patterns</h3>
                  <p className="text-xs mt-1 text-safesphere-white-muted/60">
                    Your heart rate typically increases between 2PM and 4PM. Consider scheduling relaxation activities during this period.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-4 border-l-4 border-l-safesphere-success">
              <div className="flex gap-3">
                <div className="mt-0.5 text-safesphere-success">
                  <Droplet size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Oxygen Level Trend</h3>
                  <p className="text-xs mt-1 text-safesphere-white-muted/60">
                    Your oxygen saturation remains consistently healthy. Continue your current activity patterns.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-4 border-l-4 border-l-safesphere-red">
              <div className="flex gap-3">
                <div className="mt-0.5 text-safesphere-red">
                  <Thermometer size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Temperature Variations</h3>
                  <p className="text-xs mt-1 text-safesphere-white-muted/60">
                    Your body temperature shows slight elevation during night hours. Consider adjusting your bedroom temperature.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-4 border-l-4 border-l-safesphere-warning">
              <div className="flex gap-3">
                <div className="mt-0.5 text-safesphere-warning">
                  <ActivitySquare size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Stress Pattern Analysis</h3>
                  <p className="text-xs mt-1 text-safesphere-white-muted/60">
                    Your stress levels peak on Mondays and Wednesdays. Consider mindfulness exercises on these days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthHistory;
