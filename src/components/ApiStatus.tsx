
import { useEffect, useState } from 'react';
import { Check, X, Clock, Activity, AlertTriangle, Server } from 'lucide-react';
import { useSystemHealth } from '@/hooks/useSystemHealth';
import AnimatedTransition from './AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SystemHealthData {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  message: string;
  lastChecked: string;
  services: {
    name: string;
    status: 'up' | 'down' | 'degraded';
    responseTime: number;
  }[];
}

const ApiStatus = () => {
  const { data: health, isLoading, error } = useSystemHealth();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'up':
        return <Check className="text-green-500" size={18} />;
      case 'degraded':
        return <Clock className="text-amber-500" size={18} />;
      case 'critical':
      case 'down':
        return <X className="text-red-500" size={18} />;
      default:
        return <Clock className="text-amber-500" size={18} />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'up':
        return 'bg-green-500/10 text-green-500';
      case 'degraded':
        return 'bg-amber-500/10 text-amber-500';
      case 'critical':
      case 'down':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-amber-500/10 text-amber-500';
    }
  };
  
  // If we don't have real data yet, use demo data
  const demoHealth: SystemHealthData = {
    status: 'healthy',
    uptime: 99.98,
    message: 'All systems operational',
    lastChecked: new Date().toISOString(),
    services: [
      { name: 'API Gateway', status: 'up', responseTime: 120 },
      { name: 'Auth Service', status: 'up', responseTime: 80 },
      { name: 'Data Storage', status: 'up', responseTime: 190 },
      { name: 'Notification Service', status: 'up', responseTime: 210 }
    ]
  };
  
  const displayHealth = health || demoHealth;
  
  return (
    <Card className="bg-safesphere-dark-card border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Server className="h-5 w-5 text-safesphere-info" />
          System Health Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-safesphere-white-muted/60" />
            <div>
              <div className="text-sm font-medium">System Status</div>
              <p className="text-safesphere-white-muted/60 text-xs">
                Last updated: {new Date(displayHealth.lastChecked).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full ${getStatusColor(displayHealth.status)}`}>
            {getStatusIcon(displayHealth.status)}
            <span className="font-medium">{displayHealth.status === 'healthy' ? 'All Systems Operational' : 
                  displayHealth.status === 'degraded' ? 'Performance Issues' : 'Critical Outage'}</span>
          </div>
        </div>
        
        {isLoading && (
          <div className="h-40 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-safesphere-info"></div>
              <p className="text-safesphere-white-muted/60 text-sm mt-3">Loading system status...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-500 text-sm flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>Error loading system status: {error instanceof Error ? error.message : String(error)}</span>
          </div>
        )}
        
        {!isLoading && !error && (
          <>
            <div className="mb-4 p-3 rounded-lg bg-safesphere-dark-hover">
              <p className="text-safesphere-white/90">{displayHealth.message}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-safesphere-white-muted/60 text-sm">System Uptime</span>
                <span className="text-safesphere-success font-medium">{displayHealth.uptime}%</span>
              </div>
            </div>
            
            <div className="mb-3">
              <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                <Server size={16} className="text-safesphere-white-muted/60" />
                <span>Service Status</span>
              </h3>
              <div className="divide-y divide-safesphere-dark-hover">
                {displayHealth.services.map((service, index) => (
                  <div key={index} className="py-2.5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      <span className="text-sm">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-safesphere-white-muted/60 bg-safesphere-dark px-2 py-1 rounded">
                        {service.responseTime}ms
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Activity size={14} className="text-safesphere-white-muted/40" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-5 flex gap-2">
              <Button variant="outline" className="w-full text-xs px-3 py-2 rounded-lg bg-safesphere-dark border-white/10 text-safesphere-white-muted/60 hover:text-safesphere-white button-hover">
                <Activity size={14} className="mr-1.5" />
                View Metrics
              </Button>
              <Button variant="outline" className="w-full text-xs px-3 py-2 rounded-lg bg-safesphere-dark border-white/10 text-safesphere-white-muted/60 hover:text-safesphere-white button-hover">
                <AlertTriangle size={14} className="mr-1.5" />
                Check Incidents
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiStatus;
