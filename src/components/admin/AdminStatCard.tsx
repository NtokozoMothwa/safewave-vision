
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AdminStatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
}) => {
  return (
    <Card className="bg-safesphere-dark-card border-white/10">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-safesphere-white-muted/60 text-sm">{title}</p>
            <h3 className="text-2xl font-bold text-safesphere-white mt-1">{value}</h3>
          </div>
          <div className="rounded-full bg-safesphere-dark-hover p-2">
            {icon}
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          {trend === 'up' ? (
            <ArrowUpRight size={16} className="text-safesphere-success mr-1" />
          ) : trend === 'down' ? (
            <ArrowDownRight size={16} className="text-safesphere-red mr-1" />
          ) : null}
          
          <span className={
            `text-sm ${
              trend === 'up' 
                ? 'text-safesphere-success' 
                : trend === 'down' 
                  ? 'text-safesphere-red' 
                  : 'text-safesphere-white-muted/60'
            }`
          }>
            {change} from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminStatCard;
