
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

interface DistributionData {
  name: string;
  value: number;
}

interface AdminUserDistributionProps {
  data: DistributionData[];
  title?: string;
  description?: string;
  colors?: string[];
}

const COLORS = ['#10b981', '#8E9196', '#fbbf24', '#3b82f6', '#ec4899', '#8b5cf6'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AdminUserDistribution: React.FC<AdminUserDistributionProps> = ({ 
  data,
  title = "Distribution Chart", 
  description = "Breakdown by category",
  colors = COLORS
}) => {
  return (
    <Card className="bg-safesphere-dark-card border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-safesphere-white flex items-center gap-2">
          <PieChartIcon size={18} className="text-safesphere-warning" />
          {title}
        </CardTitle>
        <CardDescription className="text-safesphere-white-muted/60">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f1f1f1'
                }}
              />
              <Legend 
                formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserDistribution;
