// safewave-vision/src/components/RouteMap.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface RouteMapProps {
  from: [number, number]; // responder location
  to: [number, number];   // alert location
}

const RouteMap: React.FC<RouteMapProps> = ({ from, to }) => {
  return (
    <MapContainer
      center={from}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%", marginTop: "1rem" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={from} />
      <Marker position={to} />
      <Polyline positions={[from, to]} color="blue" />
    </MapContainer>
  );
};

export default RouteMap;
