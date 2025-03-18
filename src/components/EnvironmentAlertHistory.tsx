
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, CloudRain, Thermometer, Wind, AlertTriangle, Calendar } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Alert {
  id: string;
  type: 'temperature' | 'humidity' | 'air_quality' | 'uv_index';
  value: number;
  unit: string;
  timestamp: string;
  message: string;
  status: 'caution' | 'danger';
}

const mockAlertHistory: Alert[] = [
  {
    id: '1',
    type: 'temperature',
    value: 32,
    unit: '°C',
    timestamp: '2023-09-12 14:30',
    message: 'High temperature detected: 32°C. Stay hydrated.',
    status: 'danger'
  },
  {
    id: '2',
    type: 'air_quality',
    value: 128,
    unit: 'AQI',
    timestamp: '2023-09-11 10:15',
    message: 'Poor air quality detected (AQI: 128). Consider wearing a mask.',
    status: 'danger'
  },
  {
    id: '3',
    type: 'humidity',
    value: 85,
    unit: '%',
    timestamp: '2023-09-10 18:45',
    message: 'High humidity levels (85%). May affect comfort and health.',
    status: 'caution'
  },
  {
    id: '4',
    type: 'uv_index',
    value: 8,
    unit: '',
    timestamp: '2023-09-09 12:20',
    message: 'High UV index (8). Skin protection recommended.',
    status: 'danger'
  },
  {
    id: '5',
    type: 'temperature',
    value: 29,
    unit: '°C',
    timestamp: '2023-09-08 15:10',
    message: 'Elevated temperature: 29°C. Stay cool and hydrated.',
    status: 'caution'
  }
];

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'temperature':
      return <Thermometer size={16} className="text-safesphere-red" />;
    case 'humidity':
      return <CloudRain size={16} className="text-safesphere-info" />;
    case 'air_quality':
      return <Wind size={16} className="text-safesphere-warning" />;
    case 'uv_index':
      return <AlertTriangle size={16} className="text-safesphere-purple" />;
    default:
      return <Bell size={16} className="text-safesphere-white-muted" />;
  }
};

// Mock data for the chart
const generateChartData = (type: Alert['type']) => {
  const data = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    let value;
    switch(type) {
      case 'temperature':
        value = Math.floor(Math.random() * 15) + 18; // 18-33°C
        break;
      case 'humidity':
        value = Math.floor(Math.random() * 60) + 30; // 30-90%
        break;
      case 'air_quality':
        value = Math.floor(Math.random() * 150) + 10; // 10-160 AQI
        break;
      case 'uv_index':
        value = Math.floor(Math.random() * 11) + 1; // 1-11 UV Index
        break;
      default:
        value = 0;
    }
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: value
    });
  }
  
  return data;
};

const EnvironmentAlertHistory: React.FC = () => {
  const [selectedAlertType, setSelectedAlertType] = useState<Alert['type'] | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  
  const handleViewHistory = (type: Alert['type']) => {
    setSelectedAlertType(type);
    setChartData(generateChartData(type));
  };
  
  return (
    <AnimatedTransition className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-safesphere-white-muted/60" />
          <h2 className="text-lg font-semibold">Environmental Alert History</h2>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-white/10"
          onClick={() => setSelectedAlertType(null)}
        >
          {selectedAlertType ? 'Back to Alerts' : 'View All'}
        </Button>
      </div>
      
      {selectedAlertType ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            {getAlertIcon(selectedAlertType)}
            <h3 className="text-sm font-medium">
              {selectedAlertType === 'temperature' && 'Temperature History'}
              {selectedAlertType === 'humidity' && 'Humidity History'}
              {selectedAlertType === 'air_quality' && 'Air Quality History'}
              {selectedAlertType === 'uv_index' && 'UV Index History'}
              {' - Last 30 Days'}
            </h3>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                  tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                  tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(22, 22, 22, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '5px',
                    color: 'white'
                  }}
                  labelStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#82ca9d" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {mockAlertHistory.map((alert) => (
            <div 
              key={alert.id}
              className={cn(
                "glass-panel rounded-lg p-3 border-l-4",
                alert.status === 'danger' ? "border-l-safesphere-danger" : "border-l-safesphere-warning"
              )}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">
                        {alert.value}{alert.unit}
                      </h3>
                      <span className="text-xs text-safesphere-white-muted/60">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-xs mt-1 text-safesphere-white-muted/60">{alert.message}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-safesphere-white-muted/60 hover:text-safesphere-white"
                  onClick={() => handleViewHistory(alert.type)}
                >
                  History
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AnimatedTransition>
  );
};

export default EnvironmentAlertHistory;
