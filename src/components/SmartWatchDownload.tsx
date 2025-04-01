
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Watch, Smartphone, Download, Clock, Heart, Shield } from 'lucide-react';
import { useSmartWatch } from '@/hooks/useSmartWatch';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';

const SmartWatchDownload: React.FC = () => {
  const { compatibleDevices, devicesLoading } = useSmartWatch();
  const [selectedType, setSelectedType] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'apple':
        return <Watch size={16} className="text-safesphere-info" />;
      case 'samsung':
        return <Watch size={16} className="text-safesphere-purple" />;
      case 'fitbit':
        return <Watch size={16} className="text-safesphere-success" />;
      case 'android':
        return <Smartphone size={16} className="text-safesphere-warning" />;
      default:
        return <Watch size={16} />;
    }
  };

  const handleDownload = (device: any) => {
    window.open(device.downloadUrl, '_blank');
    toast.success("Download initiated", {
      description: `Opening ${device.name} app store.`,
      duration: 3000,
    });
  };

  const filteredDevices = selectedType === 'all' 
    ? compatibleDevices 
    : compatibleDevices?.filter(device => device.type === selectedType);

  return (
    <AnimatedTransition className="glass-card rounded-2xl">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Watch className="mr-2 text-safesphere-info" size={20} />
              SafeSphere for Smartwatches
            </CardTitle>
            <Badge variant="outline" className="bg-safesphere-dark-card/50 border-safesphere-white-muted/20 text-safesphere-white-muted/70">
              New
            </Badge>
          </div>
          <CardDescription>
            Download SafeSphere for your compatible smartwatch to access safety features on the go.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedType}>
            <TabsList className="grid grid-cols-4 mb-4 bg-safesphere-dark-card border border-white/10">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="apple">Apple</TabsTrigger>
              <TabsTrigger value="samsung">Samsung</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <div className="space-y-3">
                {devicesLoading ? (
                  <div className="flex justify-center p-6">
                    <div className="animate-spin">
                      <Clock className="h-6 w-6 text-safesphere-info" />
                    </div>
                  </div>
                ) : filteredDevices?.length ? (
                  filteredDevices.map((device, index) => (
                    <div 
                      key={index}
                      className="bg-safesphere-dark-card border border-white/5 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          device.type === 'apple' ? "bg-safesphere-info/10" :
                          device.type === 'samsung' ? "bg-safesphere-purple/10" :
                          device.type === 'fitbit' ? "bg-safesphere-success/10" :
                          "bg-safesphere-warning/10"
                        )}>
                          {getTypeIcon(device.type)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{device.name}</div>
                          <div className="text-xs text-safesphere-white-muted/60">
                            Min OS: {device.minOSVersion}
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(device)}
                        className="bg-safesphere-dark-hover hover:bg-safesphere-dark-hover/80"
                      >
                        <Download size={14} className="mr-1" /> Download
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 text-safesphere-white-muted/60">
                    No compatible devices found for this filter
                  </div>
                )}
              </div>
            </TabsContent>
            {['apple', 'samsung', 'android'].map(type => (
              <TabsContent key={type} value={type} className="mt-0">
                <div className="space-y-3">
                  {devicesLoading ? (
                    <div className="flex justify-center p-6">
                      <div className="animate-spin">
                        <Clock className="h-6 w-6 text-safesphere-info" />
                      </div>
                    </div>
                  ) : filteredDevices?.length ? (
                    filteredDevices.map((device, index) => (
                      <div 
                        key={index}
                        className="bg-safesphere-dark-card border border-white/5 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            device.type === 'apple' ? "bg-safesphere-info/10" :
                            device.type === 'samsung' ? "bg-safesphere-purple/10" :
                            device.type === 'fitbit' ? "bg-safesphere-success/10" :
                            "bg-safesphere-warning/10"
                          )}>
                            {getTypeIcon(device.type)}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{device.name}</div>
                            <div className="text-xs text-safesphere-white-muted/60">
                              Min OS: {device.minOSVersion}
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleDownload(device)}
                          className="bg-safesphere-dark-hover hover:bg-safesphere-dark-hover/80"
                        >
                          <Download size={14} className="mr-1" /> Download
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-6 text-safesphere-white-muted/60">
                      No compatible devices found for this filter
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Features on your wrist</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-safesphere-dark-card/50 rounded-lg p-3 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={14} className="text-safesphere-info" />
                  <span className="text-xs font-medium">Emergency Alerts</span>
                </div>
                <p className="text-xs text-safesphere-white-muted/60">
                  Get critical safety alerts directly on your wrist
                </p>
              </div>
              <div className="bg-safesphere-dark-card/50 rounded-lg p-3 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={14} className="text-safesphere-red" />
                  <span className="text-xs font-medium">Health Tracking</span>
                </div>
                <p className="text-xs text-safesphere-white-muted/60">
                  Monitor vital signs and health metrics in real-time
                </p>
              </div>
              <div className="bg-safesphere-dark-card/50 rounded-lg p-3 border border-white/5 col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone size={14} className="text-safesphere-success" />
                  <span className="text-xs font-medium">Works without your phone</span>
                </div>
                <p className="text-xs text-safesphere-white-muted/60">
                  SafeSphere smartwatch app continues protecting you even when your phone is not nearby
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedTransition>
  );
};

export default SmartWatchDownload;
