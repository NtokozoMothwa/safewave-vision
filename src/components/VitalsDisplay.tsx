import { useState, useEffect } from 'react';
import { ActivitySquare, Droplet, Heart, Thermometer, AlertTriangle } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { toast } from 'sonner';

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

const detectAnomaly = (metric: string, value: number, history: number[]): {
  isAnomaly: boolean;
  severity: 'warning' | 'danger' | null;
  message: string | null;
} => {
  if (history.length < 5) {
    return { isAnomaly: false, severity: null, message: null };
  }

  const mean = history.reduce((sum, val) => sum + val, 0) / history.length;
  const stdDev = Math.sqrt(
    history.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / history.length
  );

  const zScore = Math.abs((value - mean) / (stdDev || 1));

  switch (metric) {
    case 'heartRate':
      if (value > 100 && zScore > 2) {
        return {
          isAnomaly: true,
          severity: value > 120 ? 'danger' : 'warning',
          message: `Unusually high heart rate detected (${value} BPM)`
        };
      } else if (value < 60 && zScore > 2) {
        return {
          isAnomaly: true,
          severity: value < 50 ? 'danger' : 'warning',
          message: `Unusually low heart rate detected (${value} BPM)`
        };
      }
      break;
    
    case 'oxygenLevel':
      if (value < 95) {
        return {
          isAnomaly: true,
          severity: value < 90 ? 'danger' : 'warning',
          message: `Low oxygen saturation detected (${value}%)`
        };
      }
      break;
    
    case 'temperature':
      if (value > 37.5 && zScore > 1.5) {
        return {
          isAnomaly: true,
          severity: value > 38.0 ? 'danger' : 'warning',
          message: `Elevated body temperature detected (${value}°C)`
        };
      } else if (value < 36.0 && zScore > 1.5) {
        return {
          isAnomaly: true,
          severity: value < 35.5 ? 'danger' : 'warning',
          message: `Low body temperature detected (${value}°C)`
        };
      }
      break;
    
    case 'stressLevel':
      if (value === 3) {
        return {
          isAnomaly: true,
          severity: 'warning',
          message: 'Elevated stress levels detected'
        };
      }
      break;
  }

  return { isAnomaly: false, severity: null, message: null };
};

const VitalsDisplay: React.FC = () => {
  const { toast: useToastNotify } = useToast();
  
  const [heartRateHistory, setHeartRateHistory] = useState<number[]>([]);
  const [oxygenHistory, setOxygenHistory] = useState<number[]>([]);
  const [temperatureHistory, setTemperatureHistory] = useState<number[]>([]);
  const [stressHistory, setStressHistory] = useState<number[]>([]);
  
  const [heartRate, setHeartRate] = useState<{ 
    value: string; 
    status: 'normal' | 'warning' | 'danger'; 
    trend: 'up' | 'down' | 'stable' 
  }>({ 
    value: "72", 
    status: "normal", 
    trend: "stable" 
  });
  
  const [oxygenLevel, setOxygenLevel] = useState<{
    value: string;
    status: 'normal' | 'warning' | 'danger';
    trend: 'up' | 'down' | 'stable'
  }>({
    value: "98",
    status: "normal",
    trend: "stable"
  });
  
  const [temperature, setTemperature] = useState<{
    value: string;
    status: 'normal' | 'warning' | 'danger';
    trend: 'up' | 'down' | 'stable'
  }>({
    value: "36.5",
    status: "normal",
    trend: "stable"
  });
  
  const [stressLevel, setStressLevel] = useState<{
    value: string;
    rawValue: number;
    status: 'normal' | 'warning' | 'danger';
    trend: 'up' | 'down' | 'stable'
  }>({
    value: "Medium",
    rawValue: 2,
    status: "warning",
    trend: "up"
  });

  const checkEmergencyCondition = (
    hr: { value: string; status: string },
    o2: { value: string; status: string },
    temp: { value: string; status: string },
    stress: { value: string; status: string; rawValue: number }
  ) => {
    const dangerCount = 
      (hr.status === 'danger' ? 1 : 0) + 
      (o2.status === 'danger' ? 1 : 0) + 
      (temp.status === 'danger' ? 1 : 0) + 
      (stress.status === 'danger' ? 1 : 0);
    
    const criticalHr = parseInt(hr.value) > 140 || parseInt(hr.value) < 40;
    const criticalO2 = parseInt(o2.value) < 85;
    const criticalTemp = parseFloat(temp.value) > 39.5 || parseFloat(temp.value) < 35;
    
    if (criticalHr || criticalO2 || criticalTemp || dangerCount >= 2) {
      useToastNotify({
        title: "EMERGENCY ALERT",
        description: "Multiple critical health indicators detected. Emergency contacts will be notified.",
        variant: "destructive",
      });
      
      toast.error("Emergency Services Alert", {
        description: "Your emergency contacts are being notified of your health status.",
        duration: 10000,
      });
      
      console.log("EMERGENCY: Contacting emergency services and designated contacts");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const baseHrValue = parseInt(heartRate.value);
      const hrChange = Math.floor(Math.random() * 5) - 2;
      const newHrValue = Math.max(45, Math.min(160, baseHrValue + hrChange));
      
      const newHrHistory = [...heartRateHistory, newHrValue].slice(-20);
      setHeartRateHistory(newHrHistory);
      
      const hrAnomaly = detectAnomaly('heartRate', newHrValue, newHrHistory);
      
      let newHrStatus: 'normal' | 'warning' | 'danger' = 'normal';
      if (hrAnomaly.isAnomaly && hrAnomaly.severity) {
        newHrStatus = hrAnomaly.severity;
      } else {
        if (newHrValue > 100) {
          newHrStatus = 'danger';
        } else if (newHrValue > 90) {
          newHrStatus = 'warning';
        }
      }
      
      let newHrTrend: 'up' | 'down' | 'stable' = 'stable';
      if (newHrValue > baseHrValue) {
        newHrTrend = 'up';
      } else if (newHrValue < baseHrValue) {
        newHrTrend = 'down';
      }
      
      if (hrAnomaly.isAnomaly && hrAnomaly.message && newHrStatus === 'danger' && heartRate.status !== 'danger') {
        toast.error(hrAnomaly.message, {
          description: "Consider resting and monitoring your heart rate.",
        });
      } else if (newHrStatus === "danger" && heartRate.status !== "danger") {
        useToastNotify({
          description: `Your heart rate is elevated at ${newHrValue} BPM`,
          variant: "destructive",
        });
      }
      
      setHeartRate({ 
        value: newHrValue.toString(), 
        status: newHrStatus, 
        trend: newHrTrend 
      });
      
      if (Math.random() > 0.7) {
        const baseO2Value = parseInt(oxygenLevel.value);
        const o2Change = Math.random() > 0.7 ? -1 : Math.random() > 0.8 ? -2 : 1;
        const newO2Value = Math.max(80, Math.min(100, baseO2Value + o2Change));
        
        const newO2History = [...oxygenHistory, newO2Value].slice(-20);
        setOxygenHistory(newO2History);
        
        const o2Anomaly = detectAnomaly('oxygenLevel', newO2Value, newO2History);
        
        let newO2Status: 'normal' | 'warning' | 'danger' = 'normal';
        if (o2Anomaly.isAnomaly && o2Anomaly.severity) {
          newO2Status = o2Anomaly.severity;
        } else {
          if (newO2Value < 90) {
            newO2Status = 'danger';
          } else if (newO2Value < 95) {
            newO2Status = 'warning';
          }
        }
        
        let newO2Trend: 'up' | 'down' | 'stable' = 'stable';
        if (newO2Value > baseO2Value) {
          newO2Trend = 'up';
        } else if (newO2Value < baseO2Value) {
          newO2Trend = 'down';
        }
        
        if (o2Anomaly.isAnomaly && o2Anomaly.message && newO2Status === 'danger' && oxygenLevel.status !== 'danger') {
          toast.error(o2Anomaly.message, {
            description: "Please get to fresh air and consider medical assistance if this persists.",
          });
        }
        
        setOxygenLevel({ 
          value: newO2Value.toString(), 
          status: newO2Status, 
          trend: newO2Trend 
        });
      }
      
      if (Math.random() > 0.8) {
        const baseTempValue = parseFloat(temperature.value);
        const tempChange = (Math.random() - 0.5) * 0.2;
        const newTempValue = Math.max(35, Math.min(40, baseTempValue + tempChange)).toFixed(1);
        
        const newTempHistory = [...temperatureHistory, parseFloat(newTempValue)].slice(-20);
        setTemperatureHistory(newTempHistory);
        
        const tempAnomaly = detectAnomaly('temperature', parseFloat(newTempValue), newTempHistory);
        
        let newTempStatus: 'normal' | 'warning' | 'danger' = 'normal';
        if (tempAnomaly.isAnomaly && tempAnomaly.severity) {
          newTempStatus = tempAnomaly.severity;
        } else {
          if (parseFloat(newTempValue) > 37.5) {
            newTempStatus = 'danger';
          } else if (parseFloat(newTempValue) > 37.0) {
            newTempStatus = 'warning';
          }
        }
        
        let newTempTrend: 'up' | 'down' | 'stable' = 'stable';
        if (parseFloat(newTempValue) > baseTempValue) {
          newTempTrend = 'up';
        } else if (parseFloat(newTempValue) < baseTempValue) {
          newTempTrend = 'down';
        }
        
        if (tempAnomaly.isAnomaly && tempAnomaly.message && newTempStatus === 'danger' && temperature.status !== 'danger') {
          toast.error(tempAnomaly.message, {
            description: "Please rest and consider taking appropriate medication.",
          });
        }
        
        setTemperature({ 
          value: newTempValue, 
          status: newTempStatus, 
          trend: newTempTrend 
        });
      }
      
      if (Math.random() > 0.9) {
        const stressOptions = ["Low", "Medium", "High"];
        const stressValues = [1, 2, 3];
        const stressIndex = Math.floor(Math.random() * 3);
        const newStressValue = stressOptions[stressIndex];
        const newStressRawValue = stressValues[stressIndex];
        
        const newStressHistory = [...stressHistory, newStressRawValue].slice(-20);
        setStressHistory(newStressHistory);
        
        const stressAnomaly = detectAnomaly('stressLevel', newStressRawValue, newStressHistory);
        
        let newStressStatus: 'normal' | 'warning' | 'danger';
        if (stressAnomaly.isAnomaly && stressAnomaly.severity) {
          newStressStatus = stressAnomaly.severity;
        } else {
          if (newStressValue === "High") {
            newStressStatus = 'danger';
          } else if (newStressValue === "Medium") {
            newStressStatus = 'warning';
          } else {
            newStressStatus = 'normal';
          }
        }
        
        let newStressTrend: 'up' | 'down' | 'stable';
        const currentIndex = stressOptions.indexOf(stressLevel.value);
        if (stressIndex > currentIndex) {
          newStressTrend = 'up';
        } else if (stressIndex < currentIndex) {
          newStressTrend = 'down';
        } else {
          newStressTrend = 'stable';
        }
        
        if (newStressStatus === 'danger' && stressLevel.status !== 'danger') {
          toast.warning("High Stress Detected", {
            description: "Consider taking a break or practicing breathing exercises.",
          });
        }
        
        setStressLevel({ 
          value: newStressValue, 
          rawValue: newStressRawValue,
          status: newStressStatus, 
          trend: newStressTrend 
        });
      }
      
      checkEmergencyCondition(
        { value: heartRate.value, status: heartRate.status },
        { value: oxygenLevel.value, status: oxygenLevel.status },
        { value: temperature.value, status: temperature.status },
        { value: stressLevel.value, status: stressLevel.status, rawValue: stressLevel.rawValue }
      );
      
    }, 3000);
    
    return () => clearInterval(interval);
  }, [heartRate, oxygenLevel, temperature, stressLevel, heartRateHistory, oxygenHistory, temperatureHistory, stressHistory, useToastNotify]);

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
