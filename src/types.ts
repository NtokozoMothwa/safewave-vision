export interface EmergencyAlert {
  id: string;
  userId: string;
  type: 'panic' | 'fall' | 'geo-breach';
  coordinates: {
    lat: number;
    lng: number;
  };
  timestamp: string;
}
