import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { defaultZones } from '@/utils/geozones';
import { getZoneStatus } from '@/utils/geoUtils';

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

type Responder = {
  id: string;
  name: string;
  position: [number, number];
};

type MapProps = {
  alerts: Alert[];
  responders: Responder[];
};

const MapView = ({ alerts, responders }: MapProps) => {
  return (
    <MapContainer center={[-25.7461, 28.1881]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />

      {/* Geo Zones */}
      {defaultZones.map((zone) => (
        <Circle
          key={zone.id}
          center={zone.center}
          radius={zone.radius}
          pathOptions={{
            color: zone.type === 'danger' ? 'red' : 'green',
            fillOpacity: 0.2,
          }}
        />
      ))}

      {/* Alerts */}
      {alerts.map((alert) => (
        <Marker key={alert.id} position={[alert.latitude, alert.longitude]}>
          <Popup>
            <strong>ALERT:</strong> {alert.message}
          </Popup>
        </Marker>
      ))}

      {/* Responders */}
      {responders.map((responder) => (
        <Marker key={responder.id} position={responder.position}>
          <Popup>
            <strong>{responder.name}</strong><br />
            ID: {responder.id}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
