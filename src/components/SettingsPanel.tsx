
import { Bell, Bluetooth, Lock, MapPin, Shield, Smartphone, Volume2, Wifi } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';
import { Switch } from '@/components/ui/switch';

interface SettingCategoryProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

const SettingCategory: React.FC<SettingCategoryProps> = ({
  title,
  icon,
  children,
  delay = 0
}) => {
  return (
    <AnimatedTransition delay={delay} className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-safesphere-red">{icon}</div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </AnimatedTransition>
  );
};

interface ToggleSettingProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({
  title,
  description,
  enabled,
  onToggle
}) => {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-safesphere-white-muted/60 mt-0.5">{description}</p>
      </div>
      <Switch 
        checked={enabled} 
        onCheckedChange={onToggle} 
        className={cn(
          enabled ? "bg-safesphere-red" : "bg-safesphere-dark-hover"
        )}
      />
    </div>
  );
};

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    // Privacy settings
    dataCollection: true,
    locationTracking: true,
    anonymousSharing: false,
    
    // Connectivity settings
    bluetooth: true,
    wifi: true,
    mobileData: false,
    
    // Notification settings
    healthAlerts: true,
    safetyAlerts: true,
    environmentAlerts: true,
    batteryAlerts: true
  });
  
  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  return (
    <div className="space-y-6">
      <SettingCategory title="Privacy & Security" icon={<Shield size={18} />} delay={0.1}>
        <ToggleSetting
          title="Health Data Collection"
          description="Allow SafeSphere to collect and analyze your health data"
          enabled={settings.dataCollection}
          onToggle={() => handleToggle('dataCollection')}
        />
        <ToggleSetting
          title="Location Tracking"
          description="Enable location tracking for safety features"
          enabled={settings.locationTracking}
          onToggle={() => handleToggle('locationTracking')}
        />
        <ToggleSetting
          title="Anonymous Data Sharing"
          description="Share anonymized data to improve AI recommendations"
          enabled={settings.anonymousSharing}
          onToggle={() => handleToggle('anonymousSharing')}
        />
        
        <div className="mt-4 p-3 rounded-lg border border-dashed border-safesphere-white/10 bg-safesphere-dark/30">
          <div className="flex items-center text-xs text-safesphere-white-muted/70">
            <Lock size={14} className="mr-2 text-safesphere-warning" />
            Your data is encrypted and secure. SafeSphere prioritizes your privacy.
          </div>
        </div>
      </SettingCategory>
      
      <SettingCategory title="Connectivity" icon={<Wifi size={18} />} delay={0.2}>
        <ToggleSetting
          title="Bluetooth"
          description="Connect to nearby devices and sensors"
          enabled={settings.bluetooth}
          onToggle={() => handleToggle('bluetooth')}
        />
        <ToggleSetting
          title="Wi-Fi"
          description="Connect to wireless networks for data sync"
          enabled={settings.wifi}
          onToggle={() => handleToggle('wifi')}
        />
        <ToggleSetting
          title="Mobile Data"
          description="Use cellular data when Wi-Fi is unavailable"
          enabled={settings.mobileData}
          onToggle={() => handleToggle('mobileData')}
        />
        
        <div className="mt-4 p-3 rounded-lg border border-dashed border-safesphere-white/10 bg-safesphere-dark/30">
          <div className="flex items-center text-xs text-safesphere-white-muted/70">
            <Bluetooth size={14} className="mr-2 text-safesphere-info" />
            <Smartphone size={14} className="mr-2 text-safesphere-info" />
            Connected to SafeSphere Mobile App • Last synced 2 minutes ago
          </div>
        </div>
      </SettingCategory>
      
      <SettingCategory title="Notifications" icon={<Bell size={18} />} delay={0.3}>
        <ToggleSetting
          title="Health Alerts"
          description="Receive alerts for abnormal health readings"
          enabled={settings.healthAlerts}
          onToggle={() => handleToggle('healthAlerts')}
        />
        <ToggleSetting
          title="Safety Alerts"
          description="Receive alerts for potential safety concerns"
          enabled={settings.safetyAlerts}
          onToggle={() => handleToggle('safetyAlerts')}
        />
        <ToggleSetting
          title="Environmental Alerts"
          description="Receive alerts about air quality and hazards"
          enabled={settings.environmentAlerts}
          onToggle={() => handleToggle('environmentAlerts')}
        />
        <ToggleSetting
          title="Battery Alerts"
          description="Receive alerts when battery is low"
          enabled={settings.batteryAlerts}
          onToggle={() => handleToggle('batteryAlerts')}
        />
        
        <div className="mt-4 flex justify-between">
          <button className="px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-xs button-hover">
            Alert Test
          </button>
          <div className="flex items-center gap-2 text-xs text-safesphere-white-muted/70">
            <Volume2 size={14} />
            Sound enabled
          </div>
        </div>
      </SettingCategory>
      
      <SettingCategory title="Geofencing" icon={<MapPin size={18} />} delay={0.4}>
        <div className="bg-safesphere-dark rounded-lg aspect-video overflow-hidden relative mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-safesphere-white-muted/40 text-sm">Map View</p>
          </div>
        </div>
        
        <ToggleSetting
          title="Geofence Alerts"
          description="Receive alerts when you leave safe zones"
          enabled={true}
          onToggle={() => {}}
        />
        
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 rounded-lg bg-safesphere-red text-white text-sm button-hover">
            Set Safe Zones
          </button>
        </div>
      </SettingCategory>
    </div>
  );
};

export default SettingsPanel;
