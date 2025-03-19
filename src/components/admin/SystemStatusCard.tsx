
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemStatusCardProps {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  lastIncident?: string;
}

const SystemStatusCard: React.FC<SystemStatusCardProps> = ({
  name,
  status,
  uptime,
  lastIncident
}) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'operational':
        return {
          icon: <CheckCircle className="h-5 w-5 text-safesphere-success" />,
          label: 'Operational',
          color: 'bg-safesphere-success/10 text-safesphere-success'
        };
      case 'degraded':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-safesphere-warning" />,
          label: 'Degraded',
          color: 'bg-safesphere-warning/10 text-safesphere-warning'
        };
      case 'down':
        return {
          icon: <AlertCircle className="h-5 w-5 text-safesphere-red" />,
          label: 'Down',
          color: 'bg-safesphere-red/10 text-safesphere-red'
        };
      default:
        return {
          icon: <CheckCircle className="h-5 w-5 text-safesphere-success" />,
          label: 'Operational',
          color: 'bg-safesphere-success/10 text-safesphere-success'
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <Card className="bg-safesphere-dark-card border-white/10">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-safesphere-white">{name}</h3>
          <div className={cn("px-2 py-1 rounded-full text-xs flex items-center gap-1.5", statusDetails.color)}>
            {statusDetails.icon}
            <span>{statusDetails.label}</span>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-center text-xs text-safesphere-white-muted/60">
          <div>Uptime: {uptime}</div>
          {lastIncident && (
            <div>Last incident: {lastIncident}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusCard;
