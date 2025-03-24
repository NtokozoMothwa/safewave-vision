
import { useEffect, useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { useSystemHealth } from '@/hooks/useSystemHealth';
import AnimatedTransition from './AnimatedTransition';

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
    <AnimatedTransition className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">API Status</h2>
        <div className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full ${getStatusColor(displayHealth.status)}`}>
          {getStatusIcon(displayHealth.status)}
          <span>{displayHealth.status === 'healthy' ? 'All Systems Operational' : 
                displayHealth.status === 'degraded' ? 'Performance Issues' : 'Critical Outage'}</span>
        </div>
      </div>
      
      {isLoading && <p className="text-safesphere-white-muted/60 text-sm">Loading system status...</p>}
      
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
          Error loading system status: {error instanceof Error ? error.message : String(error)}
        </div>
      )}
      
      {!isLoading && !error && (
        <>
          <div className="mb-4">
            <p className="text-safesphere-white-muted/60 text-sm">{displayHealth.message}</p>
            <p className="text-safesphere-white-muted/40 text-xs mt-1">
              Last updated: {new Date(displayHealth.lastChecked).toLocaleTimeString()}
            </p>
          </div>
          
          <div className="mb-3">
            <h3 className="text-md font-medium mb-2">Service Status</h3>
            <div className="divide-y divide-safesphere-dark-hover">
              {displayHealth.services.map((service, index) => (
                <div key={index} className="py-2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(service.status)}
                    <span className="text-sm">{service.name}</span>
                  </div>
                  <div className="text-xs text-safesphere-white-muted/60">
                    {service.responseTime}ms
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button className="text-xs px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover">
              View Full Status Report
            </button>
          </div>
        </>
      )}
    </AnimatedTransition>
  );
};

export default ApiStatus;
