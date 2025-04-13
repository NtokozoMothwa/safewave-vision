// src/components/GeofenceMap.tsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { socket } from "@/lib/socket";
import L from "leaflet";

interface Position {
  lat: number;
  lng: number;
  id: string;
}

const ZONE_RADIUS = 300; // meters

export const GeofenceMap = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    socket.on("position:update", (data: Position) => {
      setPositions((prev) => {
        const filtered = prev.filter((p) => p.id !== data.id);
        return [...filtered, data];
      });
    });

    return () => {
      socket.off("position:update");
    };
  }, []);

  return (
    <div className="rounded-2xl p-4 shadow-lg bg-white dark:bg-zinc-900 border dark:border-zinc-700 h-[400px]">
      <h2 className="text-xl font-bold mb-3 text-zinc-800 dark:text-zinc-100">
        Real-Time Geofence Map
      </h2>
      <MapContainer
        center={[-25.7479, 28.2293]} // Pretoria HQ default
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", borderRadius: "1rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={[-25.7479, 28.2293]}
          radius={ZONE_RADIUS}
          pathOptions={{ color: "blue", fillColor: "#00f", fillOpacity: 0.1 }}
        />
        {positions.map((pos) => (
          <Marker
            key={pos.id}
            position={[pos.lat, pos.lng]}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
              iconSize: [25, 25],
            })}
          />
        ))}
      </MapContainer>
    </div>
  );
};
