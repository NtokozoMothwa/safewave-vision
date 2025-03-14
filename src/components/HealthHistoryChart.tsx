
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';

// Sample data - in a real app, this would come from an API or local storage
const generateSampleData = (days = 7, metric = 'heartRate') => {
  const data = [];
  const now = new Date();
  const baseValues = {
    heartRate: { min: 65, max: 95, normal: { min: 60, max: 100 } },
    oxygenLevel: { min: 95, max: 99, normal: { min: 95, max: 100 } },
    temperature: { min: 36.4, max: 37.2, normal: { min: 36.1, max: 37.2 } },
    stressLevel: { min: 20, max: 70, normal: { min: 0, max: 50 } }
  };

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    let value;
    // Add some randomness to make data look more realistic
    if (metric === 'heartRate') {
      value = Math.floor(Math.random() * (baseValues.heartRate.max - baseValues.heartRate.min) + baseValues.heartRate.min);
    } else if (metric === 'oxygenLevel') {
      value = Math.floor(Math.random() * (baseValues.oxygenLevel.max - baseValues.oxygenLevel.min) + baseValues.oxygenLevel.min);
    } else if (metric === 'temperature') {
      value = (Math.random() * (baseValues.temperature.max - baseValues.temperature.min) + baseValues.temperature.min).toFixed(1);
    } else if (metric === 'stressLevel') {
      value = Math.floor(Math.random() * (baseValues.stressLevel.max - baseValues.stressLevel.min) + baseValues.stressLevel.min);
    }
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Number(value),
      timestamp: date.getTime()
    });
  }
  
  return data;
};

interface HealthHistoryChartProps {
  metric: 'heartRate' | 'oxygenLevel' | 'temperature' | 'stressLevel';
  title: string;
  color: string;
  unit: string;
}

const HealthHistoryChart: React.FC<HealthHistoryChartProps> = ({ 
  metric, 
  title, 
  color, 
  unit 
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Generate sample data based on selected time range
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const data = generateSampleData(days, metric);
  
  // Calculate current, min, max values
  const currentValue = data[data.length - 1].value;
  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));
  
  // Calculate average and trend
  const sum = data.reduce((acc, item) => acc + item.value, 0);
  const average = (sum / data.length).toFixed(1);
  
  // Calculate if trending up or down based on first half vs second half
  const midpoint = Math.floor(data.length / 2);
  const firstHalfAvg = data.slice(0, midpoint).reduce((acc, item) => acc + item.value, 0) / midpoint;
  const secondHalfAvg = data.slice(midpoint).reduce((acc, item) => acc + item.value, 0) / (data.length - midpoint);
  const trend = secondHalfAvg > firstHalfAvg ? 'up' : secondHalfAvg < firstHalfAvg ? 'down' : 'stable';
  
  const getYDomain = () => {
    if (metric === 'heartRate') {
      return [Math.min(minValue, 60) - 5, Math.max(maxValue, 100) + 5];
    } else if (metric === 'oxygenLevel') {
      return [Math.min(minValue, 94) - 1, 100];
    } else if (metric === 'temperature') {
      return [Math.min(minValue, 36) - 0.5, Math.max(maxValue, 37.5) + 0.5];
    } else {
      return [0, 100];
    }
  };
  
  const getStatusColor = () => {
    if (metric === 'heartRate') {
      return currentValue > 100 || currentValue < 60 ? 'text-safesphere-danger' : 'text-safesphere-success';
    } else if (metric === 'oxygenLevel') {
      return currentValue < 95 ? 'text-safesphere-danger' : 'text-safesphere-success';
    } else if (metric === 'temperature') {
      return currentValue > 37.5 || currentValue < 36.0 ? 'text-safesphere-danger' : 'text-safesphere-success';
    } else {
      return currentValue > 50 ? 'text-safesphere-warning' : 'text-safesphere-success';
    }
  };
  
  return (
    <AnimatedTransition delay={0.1} className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title} History</h2>
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-xs px-2.5 py-1.5 rounded-full bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white flex items-center gap-1 button-hover"
          >
            <CalendarDays size={14} />
            {timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            <ChevronDown size={14} className={cn("transition-transform", isDropdownOpen && "rotate-180")} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 bg-safesphere-dark-card border border-white/10 rounded-lg shadow-lg p-1 z-10">
              <button 
                onClick={() => { setTimeRange('7d'); setIsDropdownOpen(false); }}
                className={cn("block w-full text-left px-3 py-1.5 text-xs rounded-md", 
                  timeRange === '7d' ? "bg-safesphere-red text-white" : "hover:bg-safesphere-dark-hover"
                )}
              >
                Last 7 Days
              </button>
              <button 
                onClick={() => { setTimeRange('30d'); setIsDropdownOpen(false); }}
                className={cn("block w-full text-left px-3 py-1.5 text-xs rounded-md", 
                  timeRange === '30d' ? "bg-safesphere-red text-white" : "hover:bg-safesphere-dark-hover"
                )}
              >
                Last 30 Days
              </button>
              <button 
                onClick={() => { setTimeRange('90d'); setIsDropdownOpen(false); }}
                className={cn("block w-full text-left px-3 py-1.5 text-xs rounded-md", 
                  timeRange === '90d' ? "bg-safesphere-red text-white" : "hover:bg-safesphere-dark-hover"
                )}
              >
                Last 90 Days
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="flex gap-4 mb-4 md:mb-0">
          <div className="flex flex-col">
            <span className="text-xs text-safesphere-white-muted/60">Current</span>
            <span className={cn("text-xl font-semibold", getStatusColor())}>
              {currentValue}{unit}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-safesphere-white-muted/60">Average</span>
            <span className="text-xl font-semibold">
              {average}{unit}
            </span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-safesphere-white-muted/60">Min</span>
            <span className="text-xl font-semibold">
              {minValue}{unit}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-safesphere-white-muted/60">Max</span>
            <span className="text-xl font-semibold">
              {maxValue}{unit}
            </span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} 
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              domain={getYDomain()} 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} 
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(18, 18, 18, 0.9)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2} 
              dot={{ r: 4, fill: color, strokeWidth: 1, stroke: 'rgba(0,0,0,0.5)' }}
              activeDot={{ r: 6, fill: color, strokeWidth: 2, stroke: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-3 rounded-lg border border-dashed border-safesphere-white/10 bg-safesphere-dark/30">
        <div className="flex items-center text-xs text-safesphere-white-muted/70">
          <span className="mr-2">Trend:</span>
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
      </div>
    </AnimatedTransition>
  );
};

export default HealthHistoryChart;
