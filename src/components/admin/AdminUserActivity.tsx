
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart as LineChartIcon } from 'lucide-react';

interface ActivityData {
  day: string;
  count: number;
}

interface AdminUserActivityProps {
  data: ActivityData[];
  title?: string;
  description?: string;
  color?: string;
}

const AdminUserActivity: React.FC<AdminUserActivityProps> = ({ 
  data, 
  title = "System Activity", 
  description = "Weekly activity metrics",
  color = "#3b82f6" 
}) => {
  return (
    <Card className="bg-safesphere-dark-card border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-safesphere-white flex items-center gap-2">
          <LineChartIcon size={18} className="text-safesphere-info" />
          {title}
        </CardTitle>
        <CardDescription className="text-safesphere-white-muted/60">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="day" 
                tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis 
                tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f1f1f1'
                }}
                labelStyle={{ color: '#f1f1f1' }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke={color} 
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 0, r: 4 }}
                activeDot={{ fill: color, strokeWidth: 0, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserActivity;
