
import { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Users, Bell, Database, Settings } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const SecurityControls: React.FC = () => {
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [biometricLock, setBiometricLock] = useState(true);
  const [shareLiveLocation, setShareLiveLocation] = useState(true);
  const [shareHealthData, setShareHealthData] = useState(false);
  const [dataRetention, setDataRetention] = useState(90); // days
  
  const handleToggleEncryption = (enabled: boolean) => {
    setEncryptionEnabled(enabled);
    if (enabled) {
      toast.success("End-to-End Encryption Enabled", {
        description: "Your data is now protected with AES-256 encryption.",
      });
    } else {
      toast.warning("Encryption Disabled", {
        description: "Your data is no longer encrypted. This is not recommended.",
      });
    }
  };
  
  const handleShareModeChange = (shareMode: boolean, type: 'location' | 'health') => {
    if (type === 'location') {
      setShareLiveLocation(shareMode);
      toast.info(shareMode ? "Location Sharing Enabled" : "Location Sharing Disabled", {
        description: shareMode 
          ? "Emergency contacts can now view your live location." 
          : "Your location will not be shared with emergency contacts.",
      });
    } else {
      setShareHealthData(shareMode);
      toast.info(shareMode ? "Health Data Sharing Enabled" : "Health Data Sharing Disabled", {
        description: shareMode 
          ? "Your health information can be accessed by emergency contacts." 
          : "Your health information will remain private.",
      });
    }
  };
  
  const handleDataRetentionChange = (days: number) => {
    setDataRetention(days);
    toast.info("Data Retention Updated", {
      description: `Your data will now be stored for ${days} days.`,
    });
  };
  
  const privacyGroups = [
    {
      id: 'encryption',
      title: 'End-to-End Encryption',
      description: 'All your data is secured with AES-256 encryption.',
      value: encryptionEnabled,
      onChange: (value: boolean) => handleToggleEncryption(value),
      icon: <Lock size={16} className="text-safesphere-success" />
    },
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      description: 'Protect app access with fingerprint or facial recognition.',
      value: biometricLock,
      onChange: (value: boolean) => setBiometricLock(value),
      icon: <Eye size={16} className="text-safesphere-info" />
    },
    {
      id: 'location',
      title: 'Share Live Location',
      description: 'Allow emergency contacts to view your real-time location.',
      value: shareLiveLocation,
      onChange: (value: boolean) => handleShareModeChange(value, 'location'),
      icon: <Users size={16} className="text-safesphere-warning" />
    },
    {
      id: 'health',
      title: 'Share Health Data',
      description: 'Allow emergency contacts to view your health information.',
      value: shareHealthData,
      onChange: (value: boolean) => handleShareModeChange(value, 'health'),
      icon: <Bell size={16} className="text-safesphere-red" />
    }
  ];

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <Shield className="h-5 w-5 text-safesphere-success" />
        <h2 className="text-lg font-semibold">Privacy & Security Controls</h2>
      </div>
      
      <div className="space-y-4">
        {privacyGroups.map((group, index) => (
          <AnimatedTransition 
            key={group.id} 
            direction="up" 
            delay={index * 0.1}
            className="glass-panel rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{group.icon}</div>
                <div>
                  <h3 className="font-medium text-sm flex items-center gap-2">
                    {group.title}
                    {group.id === 'encryption' && !group.value && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-safesphere-danger/20 text-safesphere-danger">
                        NOT RECOMMENDED
                      </span>
                    )}
                  </h3>
                  <p className="text-xs mt-1 text-safesphere-white-muted/60">{group.description}</p>
                </div>
              </div>
              <div>
                <Switch 
                  checked={group.value} 
                  onCheckedChange={group.onChange}
                  className={cn(
                    group.value 
                      ? "bg-safesphere-success" 
                      : "bg-safesphere-dark-hover"
                  )}
                />
              </div>
            </div>
          </AnimatedTransition>
        ))}
        
        <AnimatedTransition direction="up" delay={0.4} className="glass-panel rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <Database size={16} className="text-safesphere-purple" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">Data Retention</h3>
              <p className="text-xs mt-1 mb-4 text-safesphere-white-muted/60">
                Choose how long to store your health and location history.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {[30, 60, 90, 180, 365].map((days) => (
                  <Button
                    key={days}
                    size="sm"
                    variant="outline"
                    className={cn(
                      "text-xs border-white/10",
                      dataRetention === days 
                        ? "bg-safesphere-primary" 
                        : "bg-safesphere-dark-hover"
                    )}
                    onClick={() => handleDataRetentionChange(days)}
                  >
                    {days} days
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition direction="up" delay={0.5} className="text-center mt-4">
          <Button 
            variant="outline" 
            className="bg-safesphere-dark border-white/10 text-xs"
          >
            <Settings size={14} className="mr-1" />
            Advanced Security Settings
          </Button>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default SecurityControls;
