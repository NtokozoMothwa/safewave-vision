
import { useState, useEffect } from 'react';
import { ActivitySquare, Droplet, Heart, Thermometer } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

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
      className={cn("vital-card p-4 relative", 
        status === 'warning' && "border-safesphere-warning/30",
        status === 'danger' && "border-safesphere-danger/30"
      )}
    >
      {status === 'danger' && (
        <div className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safesphere-danger opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-safesphere-danger"></span>
        </div>
      )}
      
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
          <div className={cn("text-2xl font-semibold", 
            status === 'warning' && "text-safesphere-warning",
            status === 'danger' && "text-safesphere-danger animate-pulse"
          )}>
            {value}
          </div>
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
  const { toast } = useToast();
  const [heartRate, setHeartRate] = useState({ value: "72", status: "normal", trend: "stable" as const });
  const [oxygenLevel, setOxygenLevel] = useState({ value: "98", status: "normal", trend: "stable" as const });
  const [temperature, setTemperature] = useState({ value: "36.5", status: "normal", trend: "stable" as const });
  const [stressLevel, setStressLevel] = useState({ value: "Medium", status: "warning" as const, trend: "up" as const });

  // Simulate changing vitals for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      // Random heart rate changes
      const newHrValue = Math.floor(Math.random() * 15) + 65;
      const newHrStatus = 
        newHrValue > 100 ? "danger" : 
        newHrValue > 90 ? "warning" : "normal";
      const newHrTrend = 
        newHrValue > parseInt(heartRate.value) ? "up" : 
        newHrValue < parseInt(heartRate.value) ? "down" : "stable";
      
      if (newHrStatus === "danger" && heartRate.status !== "danger") {
        toast({
          title: "High Heart Rate Alert",
          description: `Your heart rate is elevated at ${newHrValue} BPM`,
          variant: "destructive",
        });
      }
      
      setHeartRate({ value: newHrValue.toString(), status: newHrStatus as any, trend: newHrTrend as any });
      
      // Random oxygen changes (less frequent)
      if (Math.random() > 0.7) {
        const newO2Value = Math.floor(Math.random() * 5) + 95;
        const newO2Status = newO2Value < 95 ? "warning" : "normal";
        const newO2Trend = 
          newO2Value > parseInt(oxygenLevel.value) ? "up" : 
          newO2Value < parseInt(oxygenLevel.value) ? "down" : "stable";
        
        setOxygenLevel({ value: newO2Value.toString(), status: newO2Status as any, trend: newO2Trend as any });
      }
      
      // Random temperature changes (less frequent)
      if (Math.random() > 0.8) {
        const newTempValue = (Math.random() * 1.5 + 36).toFixed(1);
        const newTempStatus = 
          parseFloat(newTempValue) > 37.5 ? "danger" : 
          parseFloat(newTempValue) > 37.0 ? "warning" : "normal";
        const newTempTrend = 
          parseFloat(newTempValue) > parseFloat(temperature.value) ? "up" : 
          parseFloat(newTempValue) < parseFloat(temperature.value) ? "down" : "stable";
        
        setTemperature({ value: newTempValue, status: newTempStatus as any, trend: newTempTrend as any });
      }
      
      // Random stress level changes (less frequent)
      if (Math.random() > 0.9) {
        const stressOptions = ["Low", "Medium", "High"];
        const stressIndex = Math.floor(Math.random() * 3);
        const newStressValue = stressOptions[stressIndex];
        const newStressStatus = 
          newStressValue === "High" ? "danger" : 
          newStressValue === "Medium" ? "warning" : "normal";
        const newStressTrend = 
          stressIndex > stressOptions.indexOf(stressLevel.value) ? "up" : 
          stressIndex < stressOptions.indexOf(stressLevel.value) ? "down" : "stable";
        
        setStressLevel({ value: newStressValue, status: newStressStatus as any, trend: newStressTrend as any });
      }
    }, 3000); // Update every 3 seconds
    
    return () => clearInterval(interval);
  }, [heartRate, oxygenLevel, temperature, stressLevel, toast]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <VitalCard 
        title="Heart Rate"
        value={heartRate.value}
        unit="BPM"
        icon={<Heart size={16} className="text-safesphere-red" />}
        status={heartRate.status}
        trend={heartRate.trend}
        delay={0.1}
      />
      
      <VitalCard 
        title="SpO2"
        value={oxygenLevel.value}
        unit="%"
        icon={<Droplet size={16} className="text-safesphere-info" />}
        status={oxygenLevel.status}
        trend={oxygenLevel.trend}
        delay={0.2}
      />
      
      <VitalCard 
        title="Temperature"
        value={temperature.value}
        unit="°C"
        icon={<Thermometer size={16} className="text-safesphere-success" />}
        status={temperature.status}
        trend={temperature.trend}
        delay={0.3}
      />
      
      <VitalCard 
        title="Stress Level"
        value={stressLevel.value}
        unit=""
        icon={<ActivitySquare size={16} className="text-safesphere-warning" />}
        status={stressLevel.status}
        trend={stressLevel.trend}
        delay={0.4}
      />
    </div>
  );
};

export default VitalsDisplay;
