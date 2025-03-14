
import { ActivitySquare, Droplet, Heart, ThermometerSnow } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';

interface VitalProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  status: 'normal' | 'warning' | 'danger';
  trend?: 'up' | 'down' | 'stable';
  delay?: number;
}

const VitalCard: React.FC<VitalProps> = ({ 
  title, value, unit, icon, status, trend, delay = 0 
}) => {
  return (
    <AnimatedTransition 
      delay={delay} 
      className={cn("vital-card p-4", 
        status === 'warning' && "border-safesphere-warning/30",
        status === 'danger' && "border-safesphere-danger/30"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="panel-header">
          {icon}
          <span>{title}</span>
        </div>
        <div className={cn("sensor-dot", 
          status === 'warning' && "sensor-dot-warning",
          status === 'danger' && "sensor-dot-danger"
        )} />
      </div>
      
      <div className="mt-3">
        <div className="flex items-end">
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-xs text-safesphere-white-muted/60 ml-1.5 mb-1">{unit}</div>
        </div>
        
        {trend && (
          <div className="text-xs mt-1 flex items-center">
            {trend === 'up' && (
              <span className="text-safesphere-red-light">↑ Increasing</span>
            )}
            {trend === 'down' && (
              <span className="text-safesphere-info">↓ Decreasing</span>
            )}
            {trend === 'stable' && (
              <span className="text-safesphere-success">← Stable</span>
            )}
          </div>
        )}
      </div>
    </AnimatedTransition>
  );
};

const VitalsDisplay: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <VitalCard 
        title="Heart Rate"
        value="72"
        unit="BPM"
        icon={<Heart size={16} className="text-safesphere-red" />}
        status="normal"
        trend="stable"
        delay={0.1}
      />
      
      <VitalCard 
        title="SpO2"
        value="98"
        unit="%"
        icon={<Droplet size={16} className="text-safesphere-info" />}
        status="normal"
        trend="stable"
        delay={0.2}
      />
      
      <VitalCard 
        title="Temperature"
        value="36.5"
        unit="°C"
        icon={<ThermometerSnow size={16} className="text-safesphere-success" />}
        status="normal"
        trend="stable"
        delay={0.3}
      />
      
      <VitalCard 
        title="Stress Level"
        value="Medium"
        unit=""
        icon={<ActivitySquare size={16} className="text-safesphere-warning" />}
        status="warning"
        trend="up"
        delay={0.4}
      />
    </div>
  );
};

export default VitalsDisplay;
