
import { useState } from 'react';
import Header from '@/components/Header';
import AnimatedTransition from '@/components/AnimatedTransition';
import GeofencingMap from '@/components/GeofencingMap';
import { MapPin, Bell, AlarmClock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface SafeZone {
  id: string;
  name: string;
  address: string;
  radius: number;
  notifications: boolean;
  autoArming: boolean;
}

const GeofencingSettings: React.FC = () => {
  const [safeZones, setSafeZones] = useState<SafeZone[]>([
    {
      id: 'home',
      name: 'Home',
      address: '123 Main St, Los Angeles, CA',
      radius: 300,
      notifications: true,
      autoArming: true
    },
    {
      id: 'work',
      name: 'Workplace',
      address: '456 Business Ave, Los Angeles, CA',
      radius: 200,
      notifications: true,
      autoArming: false
    },
    {
      id: 'hospital',
      name: 'Hospital',
      address: '789 Medical Blvd, Los Angeles, CA',
      radius: 250,
      notifications: false,
      autoArming: false
    }
  ]);
  
  const [selectedZone, setSelectedZone] = useState<string | null>('home');
  
  const toggleNotifications = (id: string) => {
    setSafeZones(prev => 
      prev.map(zone => 
        zone.id === id ? { ...zone, notifications: !zone.notifications } : zone
      )
    );
    
    const zone = safeZones.find(z => z.id === id);
    if (zone) {
      toast.success(
        zone.notifications 
          ? "Notifications disabled" 
          : "Notifications enabled", 
        { description: `for ${zone.name}` }
      );
    }
  };
  
  const toggleAutoArming = (id: string) => {
    setSafeZones(prev => 
      prev.map(zone => 
        zone.id === id ? { ...zone, autoArming: !zone.autoArming } : zone
      )
    );
    
    const zone = safeZones.find(z => z.id === id);
    if (zone) {
      toast.success(
        zone.autoArming 
          ? "Auto-arming disabled" 
          : "Auto-arming enabled", 
        { description: `for ${zone.name}` }
      );
    }
  };
  
  const deleteZone = (id: string) => {
    const zone = safeZones.find(z => z.id === id);
    if (zone) {
      setSafeZones(prev => prev.filter(z => z.id !== id));
      setSelectedZone(safeZones[0]?.id || null);
      toast.success("Zone Deleted", { description: `${zone.name} has been removed` });
    }
  };
  
  const updateRadius = (id: string, newRadius: number) => {
    setSafeZones(prev => 
      prev.map(zone => 
        zone.id === id ? { ...zone, radius: newRadius } : zone
      )
    );
    
    toast.success("Radius Updated", { description: `Safe zone radius is now ${newRadius}m` });
  };

  return (
    <div className="min-h-screen bg-safesphere-darker">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10">
        <AnimatedTransition direction="up" className="mb-8">
          <h1 className="text-3xl font-bold">Geofencing Settings</h1>
          <p className="text-safesphere-white-muted/60 mt-2">
            Manage your safe zones and location-based alerts
          </p>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GeofencingMap />
          </div>
          
          <div className="space-y-6">
            <AnimatedTransition className="glass-card rounded-2xl p-5">
              <h2 className="text-lg font-semibold mb-4">Safe Zone Settings</h2>
              
              <div className="space-y-3 mb-6">
                {safeZones.map(zone => (
                  <div 
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedZone === zone.id 
                        ? "bg-white/10 border border-white/20" 
                        : "bg-safesphere-dark-hover border border-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-safesphere-red mt-0.5" />
                        <div>
                          <h3 className="font-medium text-sm">{zone.name}</h3>
                          <p className="text-xs text-safesphere-white-muted/60 mt-0.5">{zone.address}</p>
                        </div>
                      </div>
                      <div className="text-xs text-safesphere-white-muted/60">
                        {zone.radius}m
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full bg-safesphere-dark-hover hover:bg-safesphere-dark-card"
              >
                Add New Safe Zone
              </Button>
            </AnimatedTransition>
            
            {selectedZone && (
              <AnimatedTransition className="glass-card rounded-2xl p-5">
                <h2 className="text-lg font-semibold mb-4">Edit Safe Zone</h2>
                
                {safeZones.find(z => z.id === selectedZone) && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-safesphere-white-muted/60 block mb-1">Zone Name</label>
                      <input 
                        type="text" 
                        value={safeZones.find(z => z.id === selectedZone)?.name}
                        className="w-full bg-safesphere-dark-hover border border-white/5 rounded-lg p-2 text-sm"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs text-safesphere-white-muted/60 block mb-1">Radius (meters)</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="range" 
                          min="50" 
                          max="500" 
                          step="50"
                          value={safeZones.find(z => z.id === selectedZone)?.radius}
                          onChange={(e) => updateRadius(selectedZone, parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12 text-right">
                          {safeZones.find(z => z.id === selectedZone)?.radius}m
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Bell size={16} className="text-safesphere-warning" />
                        <div>
                          <span className="text-sm">Boundary Notifications</span>
                        </div>
                      </div>
                      <Switch 
                        checked={safeZones.find(z => z.id === selectedZone)?.notifications} 
                        onCheckedChange={() => toggleNotifications(selectedZone)}
                        className={safeZones.find(z => z.id === selectedZone)?.notifications ? "bg-safesphere-red" : ""}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <AlarmClock size={16} className="text-safesphere-info" />
                        <div>
                          <span className="text-sm">Auto-arm on entry</span>
                        </div>
                      </div>
                      <Switch 
                        checked={safeZones.find(z => z.id === selectedZone)?.autoArming} 
                        onCheckedChange={() => toggleAutoArming(selectedZone)}
                        className={safeZones.find(z => z.id === selectedZone)?.autoArming ? "bg-safesphere-success" : ""}
                      />
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full text-safesphere-red hover:text-safesphere-red hover:bg-safesphere-red/10 mt-2"
                      onClick={() => deleteZone(selectedZone)}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Delete Safe Zone
                    </Button>
                  </div>
                )}
              </AnimatedTransition>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeofencingSettings;
