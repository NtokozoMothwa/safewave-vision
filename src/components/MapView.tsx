import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Alert = {
  id: string;
  latitude: number;
  longitude: number;
  message: string;
};

type MapProps = {
  alerts: Alert[];
};

const MapView = ({ alerts }: MapProps) => {
  return (
    <MapContainer center={[-25.7461, 28.1881]} zoom={12} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />
      {alerts.map((alert) => (
        <Marker key={alert.id} position={[alert.latitude, alert.longitude]}>
          <Popup>
            <strong>Alert:</strong> {alert.message}
            <br />
            <strong>ID:</strong> {alert.id}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
