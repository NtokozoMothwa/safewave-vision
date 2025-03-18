
import { useState, useEffect } from 'react';
import { CloudRain, Thermometer, Wind, AlertTriangle } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EnvironmentCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  status: 'safe' | 'caution' | 'danger';
  delay?: number;
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ 
  title, value, unit, icon, status, delay = 0 
}) => {
  return (
    <AnimatedTransition delay={delay} className="glass-panel p-3 rounded-lg relative">
      <div className="flex justify-between items-start">
        <div className="panel-header text-xs flex items-center gap-1.5">
          {icon}
          <span>{title}</span>
        </div>
        <div className={cn("h-2 w-2 rounded-full", 
          status === 'safe' && "bg-safesphere-success",
          status === 'caution' && "bg-safesphere-warning",
          status === 'danger' && "bg-safesphere-danger"
        )} />
      </div>
      
      <div className="mt-2">
        <div className="flex items-end">
          <div className={cn("text-xl font-medium", 
            status === 'caution' && "text-safesphere-warning",
            status === 'danger' && "text-safesphere-danger"
          )}>
            {value}
          </div>
          <div className="text-xs text-safesphere-white-muted/60 ml-1 mb-0.5">{unit}</div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

const EnvironmentMonitor: React.FC = () => {
  const [temperature, setTemperature] = useState<{
    value: number;
    status: 'safe' | 'caution' | 'danger';
  }>({
    value: 22,
    status: 'safe'
  });
  
  const [humidity, setHumidity] = useState<{
    value: number;
    status: 'safe' | 'caution' | 'danger';
  }>({
    value: 42,
    status: 'safe'
  });
  
  const [airQuality, setAirQuality] = useState<{
    value: number;
    status: 'safe' | 'caution' | 'danger';
  }>({
    value: 35,
    status: 'caution'
  });
  
  const [uvIndex, setUvIndex] = useState<{
    value: number;
    status: 'safe' | 'caution' | 'danger';
  }>({
    value: 6,
    status: 'caution'
  });
  
  // Track previous status values to avoid duplicate alerts
  const [prevTempStatus, setPrevTempStatus] = useState<'safe' | 'caution' | 'danger'>('safe');
  const [prevAirStatus, setPrevAirStatus] = useState<'safe' | 'caution' | 'danger'>('caution');

  // Simulate changing environmental conditions for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      // Random temperature changes
      const newTempValue = Math.floor(Math.random() * 15) + 18; // 18-33°C
      let newTempStatus: 'safe' | 'caution' | 'danger' = 'safe';
      
      if (newTempValue > 30) {
        newTempStatus = 'danger';
      } else if (newTempValue > 27) {
        newTempStatus = 'caution';
      }
      
      if (newTempStatus === "danger" && prevTempStatus !== "danger") {
        toast("Temperature Alert", {
          description: `High temperature detected: ${newTempValue}°C. Stay hydrated.`,
        });
      }
      
      setTemperature({ value: newTempValue, status: newTempStatus });
      setPrevTempStatus(newTempStatus);
      
      // Random humidity changes (less frequent)
      if (Math.random() > 0.7) {
        const newHumidityValue = Math.floor(Math.random() * 60) + 30; // 30-90%
        let newHumidityStatus: 'safe' | 'caution' | 'danger' = 'safe';
        
        if (newHumidityValue > 80) {
          newHumidityStatus = 'danger';
        } else if (newHumidityValue > 70) {
          newHumidityStatus = 'caution';
        }
        
        setHumidity({ value: newHumidityValue, status: newHumidityStatus });
      }
      
      // Random air quality changes (less frequent)
      if (Math.random() > 0.8) {
        const newAqiValue = Math.floor(Math.random() * 150) + 10; // 10-160 AQI
        let newAqiStatus: 'safe' | 'caution' | 'danger' = 'safe';
        
        if (newAqiValue > 100) {
          newAqiStatus = 'danger';
        } else if (newAqiValue > 50) {
          newAqiStatus = 'caution';
        }
        
        if (newAqiStatus === "danger" && prevAirStatus !== "danger") {
          toast("Air Quality Warning", {
            description: `Poor air quality detected (AQI: ${newAqiValue}). Consider wearing a mask.`,
          });
        }
        
        setAirQuality({ value: newAqiValue, status: newAqiStatus });
        setPrevAirStatus(newAqiStatus);
      }
      
      // Random UV Index changes (less frequent)
      if (Math.random() > 0.9) {
        const newUvValue = Math.floor(Math.random() * 11) + 1; // 1-11 UV Index
        let newUvStatus: 'safe' | 'caution' | 'danger' = 'safe';
        
        if (newUvValue > 7) {
          newUvStatus = 'danger';
        } else if (newUvValue > 5) {
          newUvStatus = 'caution';
        }
        
        setUvIndex({ value: newUvValue, status: newUvStatus });
      }
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [prevTempStatus, prevAirStatus]);

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-sm font-medium mb-4">Current Readings</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <EnvironmentCard 
          title="Temperature"
          value={temperature.value}
          unit="°C"
          icon={<Thermometer size={13} className="text-safesphere-info" />}
          status={temperature.status}
          delay={0.1}
        />
        
        <EnvironmentCard 
          title="Humidity"
          value={humidity.value}
          unit="%"
          icon={<CloudRain size={13} className="text-safesphere-success" />}
          status={humidity.status}
          delay={0.2}
        />
        
        <EnvironmentCard 
          title="Air Quality"
          value={airQuality.value}
          unit="AQI"
          icon={<Wind size={13} className="text-safesphere-warning" />}
          status={airQuality.status}
          delay={0.3}
        />
        
        <EnvironmentCard 
          title="UV Index"
          value={uvIndex.value}
          unit=""
          icon={<AlertTriangle size={13} className="text-safesphere-red" />}
          status={uvIndex.status}
          delay={0.4}
        />
      </div>
    </div>
  );
};

export default EnvironmentMonitor;
