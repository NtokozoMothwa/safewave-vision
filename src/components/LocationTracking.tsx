
import { useState, useEffect, useCallback, useMemo } from 'react';
import { MapPin, Navigation, AlertTriangle, Shield, Clock, Settings } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Loading } from './ui/loading';
import { useAppInitialization } from '@/hooks/useAppInitialization';

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
  trusted: boolean; // For trusted locations like home
}

interface LocationEvent {
  timestamp: Date;
  coordinates: Coordinates;
  type: 'zone_exit' | 'zone_enter' | 'emergency';
  zone?: string;
}

const LocationTracking: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [locationHistory, setLocationHistory] = useState<Coordinates[]>([]);
  const [locationEvents, setLocationEvents] = useState<LocationEvent[]>([]);
  const [isTracking, setIsTracking] = useState(true);
  const [trackingAccuracy, setTrackingAccuracy] = useState<'high' | 'medium' | 'low'>('high');
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isLoading, setIsLoading] = useState(true);
  const [safeZones, setSafeZones] = useState<SafeZone[]>([
    {
      id: 'home',
      name: 'Home',
      center: { lat: 34.0522, lng: -118.2437 },
      radius: 100,
      active: true,
      trusted: true
    },
    {
      id: 'work',
      name: 'Workplace',
      center: { lat: 34.0622, lng: -118.2337 },
      radius: 150,
      active: true,
      trusted: true
    },
    {
      id: 'hospital',
      name: 'Hospital',
      center: { lat: 34.0722, lng: -118.2537 },
      radius: 200,
      active: true,
      trusted: true
    },
    {
      id: 'gym',
      name: 'Gym',
      center: { lat: 34.0622, lng: -118.2637 },
      radius: 80,
      active: true,
      trusted: false
    }
  ]);
  
  const [isOutsideSafeZone, setIsOutsideSafeZone] = useState(false);
  const [isOutsideTrustedZone, setIsOutsideTrustedZone] = useState(false);
  const [timeOutsideSafeZone, setTimeOutsideSafeZone] = useState(0);
  const [emergencyModeActive, setEmergencyModeActive] = useState(false);

  // Initialize app data
  useAppInitialization();

  // Calculate distance between two points using Haversine formula - Memoized for performance
  const calculateDistance = useCallback((point1: Coordinates, point2: Coordinates): number => {
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
  }, []);
  
  // Function to check if point is in any active safe zone - Memoized
  const isInActiveSafeZone = useCallback((point: Coordinates): { inZone: boolean; zoneName?: string } => {
    for (const zone of safeZones.filter(z => z.active)) {
      const distance = calculateDistance(point, zone.center);
      if (distance <= zone.radius) {
        return { inZone: true, zoneName: zone.name };
      }
    }
    return { inZone: false };
  }, [safeZones, calculateDistance]);
  
  // Function to check if point is in any trusted safe zone - Memoized
  const isInTrustedZone = useCallback((point: Coordinates): boolean => {
    return safeZones
      .filter(z => z.active && z.trusted)
      .some(zone => {
        const distance = calculateDistance(point, zone.center);
        return distance <= zone.radius;
      });
  }, [safeZones, calculateDistance]);

  // Simulate getting current location with error handling
  useEffect(() => {
    if (!isTracking) return;
    
    // Simulate initial loading
    setIsLoading(true);
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);
    
    // Set initial accuracy randomly for simulation
    const randomAccuracy = Math.random();
    if (randomAccuracy > 0.7) setTrackingAccuracy('high');
    else if (randomAccuracy > 0.3) setTrackingAccuracy('medium');
    else setTrackingAccuracy('low');
    
    // This simulates location updates (in a real app, you'd use the Geolocation API)
    const intervalId = setInterval(() => {
      try {
        // Generate a random location near Los Angeles for simulation
        const randomLat = 34.0522 + (Math.random() - 0.5) * 0.02;
        const randomLng = -118.2437 + (Math.random() - 0.5) * 0.02;
        
        const newLocation = {
          lat: randomLat,
          lng: randomLng
        };
        
        // Decrease battery over time
        setBatteryLevel(prev => Math.max(0, prev - 0.1));
        
        // Update tracking accuracy randomly
        if (Math.random() > 0.9) {
          const newAccuracy = Math.random();
          if (newAccuracy > 0.7) setTrackingAccuracy('high');
          else if (newAccuracy > 0.3) setTrackingAccuracy('medium');
          else setTrackingAccuracy('low');
        }
        
        setCurrentLocation(newLocation);
        setLocationHistory(prev => [...prev.slice(-19), newLocation]);
        
        // Check if the new location is inside any active safe zone
        const safeZoneCheck = isInActiveSafeZone(newLocation);
        const inTrustedZone = isInTrustedZone(newLocation);
        
        // Handle safe zone state changes
        if (!safeZoneCheck.inZone && !isOutsideSafeZone) {
          // Just left safe zone
          setIsOutsideSafeZone(true);
          setTimeOutsideSafeZone(0);
          
          // Add event to history
          setLocationEvents(prev => [
            {
              timestamp: new Date(),
              coordinates: newLocation,
              type: 'zone_exit'
            },
            ...prev.slice(0, 9)
          ]);
          
          // Alert the user that they've left all safe zones
          toast.warning("Safety Alert", {
            description: "You have left all safe zones!",
            action: {
              label: "View",
              onClick: () => console.log("Viewed alert")
            },
          });
        } else if (safeZoneCheck.inZone && isOutsideSafeZone) {
          // Just entered safe zone
          setIsOutsideSafeZone(false);
          setTimeOutsideSafeZone(0);
          
          // Add event to history
          setLocationEvents(prev => [
            {
              timestamp: new Date(),
              coordinates: newLocation,
              type: 'zone_enter',
              zone: safeZoneCheck.zoneName
            },
            ...prev.slice(0, 9)
          ]);
          
          // Alert the user that they've entered a safe zone
          toast.success("Safety Alert", {
            description: `You have entered ${safeZoneCheck.zoneName} safe zone.`,
          });
        }
        
        // Track trusted zone status separately
        if (!inTrustedZone && !isOutsideTrustedZone) {
          setIsOutsideTrustedZone(true);
        } else if (inTrustedZone && isOutsideTrustedZone) {
          setIsOutsideTrustedZone(false);
        }
        
        // If outside safe zone, increment time counter
        if (isOutsideSafeZone) {
          setTimeOutsideSafeZone(prev => prev + 5);
          
          // Trigger extended absence alert
          if (timeOutsideSafeZone === 55) { // Just about to hit 1 minute
            toast.error("Extended Absence Alert", {
              description: "You've been outside safe zones for 1 minute. Emergency contacts will be notified if this continues.",
            });
          }
          
          // Emergency mode for very long absences
          if (timeOutsideSafeZone >= 300 && !emergencyModeActive) { // 5+ minutes outside
            setEmergencyModeActive(true);
            
            // Add emergency event
            setLocationEvents(prev => [
              {
                timestamp: new Date(),
                coordinates: newLocation,
                type: 'emergency'
              },
              ...prev.slice(0, 9)
            ]);
            
            toast.error("EMERGENCY PROTOCOL ACTIVATED", {
              description: "You've been outside safe zones for too long. Emergency contacts have been notified of your location.",
              duration: 10000,
            });
          }
        }
      } catch (error) {
        console.error('Error updating location:', error);
        toast.error('Location tracking error', {
          description: 'Failed to update your location. Retrying...'
        });
      }
    }, 5000); // Update every 5 seconds
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(loadingTimer);
    };
  }, [isTracking, safeZones, isOutsideSafeZone, isOutsideTrustedZone, timeOutsideSafeZone, emergencyModeActive, isInActiveSafeZone, isInTrustedZone]);

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
    
    const zone = safeZones.find(z => z.id === id);
    if (zone) {
      toast(`${zone.active ? "Disabled" : "Enabled"} ${zone.name} safe zone`);
    }
  };
  
  const formatTimeOutside = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const getLocationEventLabel = (event: LocationEvent): string => {
    switch(event.type) {
      case 'zone_enter':
        return `Entered ${event.zone} zone`;
      case 'zone_exit':
        return 'Left safe zone';
      case 'emergency':
        return 'EMERGENCY ALERT';
      default:
        return 'Location event';
    }
  };

  // Memoize safe zones for render performance
  const renderSafeZones = useMemo(() => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {safeZones.map(zone => (
        <div 
          key={zone.id}
          onClick={() => toggleSafeZone(zone.id)}
          className={`p-2 rounded-lg text-xs cursor-pointer transition-colors flex items-center gap-1.5 ${
            zone.active 
              ? zone.trusted 
                ? "bg-safesphere-green/10 text-safesphere-green border border-safesphere-green/20" 
                : "bg-safesphere-info/10 text-safesphere-info border border-safesphere-info/20"
              : "bg-safesphere-dark-hover text-safesphere-white-muted/60 border border-white/5"
          }`}
        >
          <MapPin size={12} />
          <span>{zone.name}</span>
          {zone.trusted && zone.active && (
            <Shield size={10} className="ml-0.5" />
          )}
        </div>
      ))}
    </div>
  ), [safeZones]);

  if (isLoading) {
    return (
      <AnimatedTransition className="glass-card rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Location Tracking</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loading size="md" text="Acquiring location..." />
        </div>
      </AnimatedTransition>
    );
  }

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
          {emergencyModeActive && (
            <div className="px-1.5 py-0.5 rounded-full bg-safesphere-red/10 border border-safesphere-red/20 text-[10px] text-safesphere-red flex items-center animate-pulse">
              <Shield size={10} className="mr-0.5" /> EMERGENCY MODE
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
        
        {/* Location accuracy indicator */}
        <div className="absolute top-2 right-2 bg-safesphere-dark-hover p-2 rounded-md text-xs flex items-center gap-2">
          <div className={cn(
            "h-2 w-2 rounded-full",
            trackingAccuracy === 'high' ? "bg-safesphere-success" :
            trackingAccuracy === 'medium' ? "bg-safesphere-warning" :
            "bg-safesphere-red"
          )}></div>
          <span>
            {trackingAccuracy === 'high' ? "High" :
             trackingAccuracy === 'medium' ? "Medium" :
             "Low"} Accuracy
          </span>
        </div>
        
        {/* Battery and status info */}
        <div className="absolute bottom-2 right-2 bg-safesphere-dark-hover p-2 rounded-md text-xs">
          <div className="flex items-center justify-between mb-1">
            <span>Battery</span>
            <span className={cn(
              batteryLevel > 50 ? "text-safesphere-success" :
              batteryLevel > 20 ? "text-safesphere-warning" :
              "text-safesphere-red"
            )}>{batteryLevel.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-safesphere-dark rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full",
                batteryLevel > 50 ? "bg-safesphere-success" :
                batteryLevel > 20 ? "bg-safesphere-warning" :
                "bg-safesphere-red"
              )}
              style={{ width: `${batteryLevel}%` }}
            ></div>
          </div>
        </div>
        
        {/* Outside safe zone timer */}
        {isOutsideSafeZone && (
          <div className="absolute bottom-2 left-2 bg-safesphere-red/20 border border-safesphere-red/30 p-2 rounded-md text-xs">
            <div className="flex items-center gap-1.5 text-safesphere-red">
              <Clock size={12} />
              <span>Outside safe zone: {formatTimeOutside(timeOutsideSafeZone)}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Safe Zones</h3>
          <Button 
            variant="outline" 
            size="sm"
            className="h-7 px-2 text-xs border-white/10"
          >
            <Settings size={12} className="mr-1" />
            Configure
          </Button>
        </div>
        {renderSafeZones}
      </div>
      
      {locationEvents.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Recent Events</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-1 scrollbar-thin">
            {locationEvents.map((event, index) => (
              <div 
                key={index}
                className={cn(
                  "p-2 rounded-lg flex justify-between items-center text-xs",
                  event.type === 'emergency' 
                    ? "bg-safesphere-red/10 border border-safesphere-red/20" 
                    : event.type === 'zone_enter'
                      ? "bg-safesphere-success/10 border border-safesphere-success/20"
                      : "bg-safesphere-warning/10 border border-safesphere-warning/20"
                )}
              >
                <div className="flex items-center gap-1.5">
                  {event.type === 'emergency' ? (
                    <Shield size={12} className="text-safesphere-red" />
                  ) : event.type === 'zone_enter' ? (
                    <MapPin size={12} className="text-safesphere-success" />
                  ) : (
                    <AlertTriangle size={12} className="text-safesphere-warning" />
                  )}
                  <span>{getLocationEventLabel(event)}</span>
                </div>
                <div className="text-safesphere-white-muted/60">
                  {event.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
