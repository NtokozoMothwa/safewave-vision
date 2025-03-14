
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import VitalsDisplay from './VitalsDisplay';
import AlertsPanel from './AlertsPanel';
import PanicButton from './PanicButton';
import AIInsights from './AIInsights';

const Dashboard: React.FC = () => {
  return (
    <AnimatedTransition className="max-w-7xl mx-auto">
      <div className="px-4 pt-20 pb-10">
        <AnimatedTransition direction="up" className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-safesphere-white-muted/60 mt-2">
            Monitor your health metrics and safety status in real-time
          </p>
        </AnimatedTransition>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Health Vitals</h2>
            <Link 
              to="/health-history" 
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover"
            >
              <BarChart3 size={14} /> View History
            </Link>
          </div>
          <VitalsDisplay />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AIInsights />
          <AlertsPanel />
        </div>
        
        <div className="mb-6">
          <PanicButton />
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;
