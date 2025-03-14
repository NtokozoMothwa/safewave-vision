
import { AlertCircle, Map, AlertTriangle, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';

interface Alert {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'health' | 'safety' | 'environment';
  priority: 'low' | 'medium' | 'high';
  read: boolean;
}

const alerts: Alert[] = [
  {
    id: '1',
    title: 'High Heart Rate Detected',
    description: 'Your heart rate reached 120 BPM during rest.',
    time: '10 min ago',
    type: 'health',
    priority: 'medium',
    read: false
  },
  {
    id: '2',
    title: 'Outside Safe Zone',
    description: 'You\'ve left your designated safe area.',
    time: '25 min ago',
    type: 'safety',
    priority: 'high',
    read: false
  },
  {
    id: '3',
    title: 'Air Quality Warning',
    description: 'Poor air quality detected in your current location.',
    time: '1 hour ago',
    type: 'environment',
    priority: 'medium',
    read: true
  }
];

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'health':
      return <AlertCircle size={18} className="text-safesphere-red" />;
    case 'safety':
      return <Map size={18} className="text-safesphere-warning" />;
    case 'environment':
      return <Wind size={18} className="text-safesphere-info" />;
    default:
      return <AlertTriangle size={18} className="text-safesphere-warning" />;
  }
};

const getPriorityClasses = (priority: Alert['priority']) => {
  switch (priority) {
    case 'low':
      return 'border-l-safesphere-info';
    case 'medium':
      return 'border-l-safesphere-warning';
    case 'high':
      return 'border-l-safesphere-red';
    default:
      return 'border-l-safesphere-info';
  }
};

const AlertsPanel: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Alerts & Notifications</h2>
        <button className="text-xs px-2.5 py-1 rounded-full bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover">
          Clear All
        </button>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <AnimatedTransition 
            key={alert.id} 
            direction="right" 
            delay={0.1 * index}
            className={cn(
              "glass-panel rounded-lg p-3 border-l-4",
              getPriorityClasses(alert.priority),
              !alert.read && "border-white/10"
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{alert.title}</h3>
                  <p className="text-xs mt-1 text-safesphere-white-muted/60">{alert.description}</p>
                </div>
              </div>
              <div className="text-[10px] text-safesphere-white-muted/40">{alert.time}</div>
            </div>
          </AnimatedTransition>
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <button className="text-xs text-safesphere-white-muted/60 hover:text-safesphere-white transition-colors">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default AlertsPanel;
