
import { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface Coordinates {
  lat: number;
  lng: number;
}

interface SafeZone {
  id: string;
  name: string;
  center: Coordinates;
  radius: number; // in meters
  active: boolean;
}

const LocationTracking: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [locationHistory, setLocationHistory] = useState<Coordinates[]>([]);
  const [isTracking, setIsTracking] = useState(true);
  const [safeZones, setSafeZones] = useState<SafeZone[]>([
    {
      id: 'home',
      name: 'Home',
      center: { lat: 34.0522, lng: -118.2437 },
      radius: 100,
      active: true
    },
    {
      id: 'work',
      name: 'Workplace',
      center: { lat: 34.0622, lng: -118.2337 },
      radius: 150,
      active: true
    },
    {
      id: 'hospital',
      name: 'Hospital',
      center: { lat: 34.0722, lng: -118.2537 },
      radius: 200,
      active: true
    }
  ]);
  
  const [isOutsideSafeZone, setIsOutsideSafeZone] = useState(false);

  // Simulate getting current location
  useEffect(() => {
    if (!isTracking) return;
    
    // This simulates location updates (in a real app, you'd use the Geolocation API)
    const intervalId = setInterval(() => {
      // Generate a random location near Los Angeles for simulation
      const randomLat = 34.0522 + (Math.random() - 0.5) * 0.02;
      const randomLng = -118.2437 + (Math.random() - 0.5) * 0.02;
      
      const newLocation = {
        lat: randomLat,
        lng: randomLng
      };
      
      setCurrentLocation(newLocation);
      setLocationHistory(prev => [...prev.slice(-19), newLocation]);
      
      // Check if the new location is outside all active safe zones
      const outsideAllZones = safeZones
        .filter(zone => zone.active)
        .every(zone => {
          const distance = calculateDistance(newLocation, zone.center);
          return distance > zone.radius;
        });
      
      if (outsideAllZones && !isOutsideSafeZone) {
        setIsOutsideSafeZone(true);
        // Alert the user that they've left all safe zones
        toast.warning("Safety Alert", {
          description: "You have left all safe zones!",
          action: {
            label: "View",
            onClick: () => console.log("Viewed alert")
          },
        });
      } else if (!outsideAllZones && isOutsideSafeZone) {
        setIsOutsideSafeZone(false);
      }
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [isTracking, safeZones, isOutsideSafeZone]);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = point1.lat * Math.PI / 180;
    const φ2 = point2.lat * Math.PI / 180;
    const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
    const Δλ = (point2.lng - point1.lng) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const toggleTracking = () => {
    setIsTracking(prev => !prev);
    toast(isTracking ? "Tracking paused" : "Tracking resumed");
  };

  const toggleSafeZone = (id: string) => {
    setSafeZones(prev => 
      prev.map(zone => 
        zone.id === id ? { ...zone, active: !zone.active } : zone
      )
    );
  };

  return (
    <AnimatedTransition className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Location Tracking</h2>
          {isOutsideSafeZone && (
            <div className="px-1.5 py-0.5 rounded-full bg-safesphere-red/10 border border-safesphere-red/20 text-[10px] text-safesphere-red flex items-center animate-pulse">
              <AlertTriangle size={10} className="mr-0.5" /> OUTSIDE SAFE ZONE
            </div>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleTracking}
          className={isTracking ? "bg-safesphere-red text-white hover:bg-safesphere-red/80" : ""}
        >
          {isTracking ? "Pause Tracking" : "Resume Tracking"}
        </Button>
      </div>
      
      <div className="bg-safesphere-dark-card rounded-lg aspect-video mb-4 relative overflow-hidden">
        {/* This would be replaced with an actual Google Map in a real implementation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-safesphere-white-muted/40 text-sm">Map View</p>
        </div>
        
        {currentLocation && (
          <div className="absolute top-2 left-2 bg-safesphere-dark-hover p-2 rounded-md text-xs">
            <div className="flex items-center gap-2">
              <Navigation size={14} className="text-safesphere-red" />
              <span>
                Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Safe Zones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {safeZones.map(zone => (
            <div 
              key={zone.id}
              onClick={() => toggleSafeZone(zone.id)}
              className={`p-2 rounded-lg text-xs cursor-pointer transition-colors flex items-center gap-1.5 ${
                zone.active 
                  ? "bg-safesphere-green/10 text-safesphere-green border border-safesphere-green/20" 
                  : "bg-safesphere-dark-hover text-safesphere-white-muted/60 border border-white/5"
              }`}
            >
              <MapPin size={12} />
              <span>{zone.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-xs text-safesphere-white-muted/60">
        {isTracking ? (
          <div className="flex items-center">
            <span className="flex h-2 w-2 relative mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safesphere-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-safesphere-green"></span>
            </span>
            Actively tracking location
          </div>
        ) : (
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-safesphere-white-muted/30 mr-2"></span>
            Location tracking paused
          </div>
        )}
      </div>
    </AnimatedTransition>
  );
};

export default LocationTracking;
