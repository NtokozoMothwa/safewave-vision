
import { useState, useEffect } from 'react';
import { Plus, Minus, MapPin, Navigation } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Coordinates {
  lat: number;
  lng: number;
}

interface SafeZone {
  id: string;
  name: string;
  center: Coordinates;
  radius: number; // in meters
  color: string;
}

const GeofencingMap: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates>({ lat: 34.0522, lng: -118.2437 });
  const [zoom, setZoom] = useState(14);
  const [safeZones, setSafeZones] = useState<SafeZone[]>([
    {
      id: 'home',
      name: 'Home',
      center: { lat: 34.0522, lng: -118.2437 },
      radius: 300,
      color: '#10B981' // Green
    },
    {
      id: 'work',
      name: 'Workplace',
      center: { lat: 34.0622, lng: -118.2337 },
      radius: 200,
      color: '#3B82F6' // Blue
    }
  ]);
  
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isAddingZone, setIsAddingZone] = useState(false);
  
  useEffect(() => {
    // Simulate location updates (in a real app, you'd use the Geolocation API)
    const intervalId = setInterval(() => {
      // Generate a random location near Los Angeles for simulation
      const randomLat = 34.0522 + (Math.random() - 0.5) * 0.02;
      const randomLng = -118.2437 + (Math.random() - 0.5) * 0.02;
      
      setCurrentLocation({
        lat: randomLat,
        lng: randomLng
      });
      
      // Check if the new location is outside all safe zones
      const outsideAllZones = safeZones.every(zone => {
        const distance = calculateDistance({ lat: randomLat, lng: randomLng }, zone.center);
        return distance > zone.radius;
      });
      
      if (outsideAllZones) {
        // Alert the user that they've left all safe zones
        toast.warning("Geofence Alert", {
          description: "You have left all safe zones!",
        });
      }
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [safeZones]);

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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 1, 10));
  };

  const selectZone = (id: string) => {
    setSelectedZone(id);
    const zone = safeZones.find(zone => zone.id === id);
    if (zone) {
      toast.info(`Selected ${zone.name}`, {
        description: `Radius: ${zone.radius}m`,
      });
    }
  };

  const addNewSafeZone = () => {
    const newZone = {
      id: `zone-${Date.now()}`,
      name: `Safe Zone ${safeZones.length + 1}`,
      center: { ...currentLocation },
      radius: 250,
      color: getRandomColor()
    };
    
    setSafeZones(prev => [...prev, newZone]);
    setSelectedZone(newZone.id);
    setIsAddingZone(false);
    
    toast.success("Safe Zone Added", {
      description: `Created new safe zone at your current location.`,
    });
  };

  const getRandomColor = () => {
    const colors = ['#E11D48', '#10B981', '#3B82F6', '#FBBF24', '#8B5CF6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <AnimatedTransition className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Geofencing Map</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsAddingZone(true)}
            disabled={isAddingZone}
          >
            Add Safe Zone
          </Button>
        </div>
      </div>
      
      <div className="bg-safesphere-dark-card rounded-lg aspect-video mb-4 relative overflow-hidden">
        {/* This would be replaced with an actual Google Map in a real implementation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-safesphere-white-muted/40 text-sm">Interactive Map View</p>
          
          {/* Current location indicator */}
          <div className="absolute h-4 w-4 bg-safesphere-red rounded-full animate-pulse">
            <div className="absolute inset-0 rounded-full bg-safesphere-red/30 animate-ping"></div>
          </div>
          
          {/* Illustrative safe zones (in a real app, these would be drawn on the map) */}
          {safeZones.map(zone => (
            <div 
              key={zone.id}
              className={`absolute rounded-full border-2 ${
                selectedZone === zone.id ? 'border-white' : 'border-dashed border-white/30'
              }`}
              style={{
                borderColor: zone.color,
                width: `${zone.radius / 10}px`,
                height: `${zone.radius / 10}px`,
                transform: 'translate(-50%, -50%)',
                opacity: 0.5,
                backgroundColor: `${zone.color}30`
              }}
              onClick={() => selectZone(zone.id)}
            ></div>
          ))}
        </div>
        
        {/* Map controls */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button 
            className="bg-safesphere-dark-hover w-8 h-8 rounded-md flex items-center justify-center hover:bg-safesphere-dark-card"
            onClick={handleZoomIn}
          >
            <Plus size={16} />
          </button>
          <button 
            className="bg-safesphere-dark-hover w-8 h-8 rounded-md flex items-center justify-center hover:bg-safesphere-dark-card"
            onClick={handleZoomOut}
          >
            <Minus size={16} />
          </button>
        </div>
        
        {/* Location info */}
        <div className="absolute bottom-2 left-2 bg-safesphere-dark-hover p-2 rounded-md text-xs">
          <div className="flex items-center gap-2">
            <Navigation size={14} className="text-safesphere-red" />
            <span>
              Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
            </span>
          </div>
        </div>
        
        {/* Zoom level indicator */}
        <div className="absolute bottom-2 right-2 bg-safesphere-dark-hover px-2 py-1 rounded-md text-xs">
          Zoom: {zoom}
        </div>
      </div>
      
      {/* Safe zones list */}
      <div>
        <h3 className="text-sm font-medium mb-2">Safe Zones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {safeZones.map(zone => (
            <div 
              key={zone.id}
              onClick={() => selectZone(zone.id)}
              className={`p-2 rounded-lg text-xs cursor-pointer transition-colors flex items-center justify-between ${
                selectedZone === zone.id 
                  ? "bg-white/10 border border-white/20" 
                  : "bg-safesphere-dark-hover border border-white/5"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <MapPin size={12} style={{ color: zone.color }} />
                <span>{zone.name}</span>
              </div>
              <span className="text-safesphere-white-muted/60">{zone.radius}m</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add new safe zone dialog */}
      {isAddingZone && (
        <div className="mt-4 p-3 border border-dashed border-white/10 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Add New Safe Zone</h3>
          <p className="text-xs text-safesphere-white-muted/60 mb-3">
            This will create a new safe zone at your current location.
          </p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="bg-safesphere-red hover:bg-safesphere-red/80"
              onClick={addNewSafeZone}
            >
              Confirm
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAddingZone(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </AnimatedTransition>
  );
};

export default GeofencingMap;
