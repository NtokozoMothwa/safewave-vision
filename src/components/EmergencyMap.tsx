import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EmergencyAlert } from '../types';
import { listenToEmergencyAlerts } from '../utils/socket';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Optional custom icon
const emergencyIcon = new L.Icon({
  iconUrl: '/alert-icon.png', // you can replace this with a real icon path later
  iconSize: [30, 30],
});

const EmergencyMap: React.FC = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);

  useEffect(() => {
    listenToEmergencyAlerts((alert) => {
      setAlerts((prev) => [...prev, alert]);
    });
  }, []);

  return (
    <MapContainer center={[-25.7479, 28.2293]} zoom={12} style={{ height: '80vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {alerts.map((alert) => (
        <Marker
          key={alert.id}
          position={[alert.coordinates.lat, alert.coordinates.lng]}
          icon={emergencyIcon}
        >
          <Popup>
            <strong>Type:</strong> {alert.type} <br />
            <strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EmergencyMap;
