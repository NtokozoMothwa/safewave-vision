// src/components/WearableMonitor.tsx
import React, { useEffect, useState } from "react";
import { socket } from "@/utils/socket";
import { MapPin, Activity, HeartPulse } from "lucide-react";

type WearableData = {
  id: string;
  location: { lat: number; lng: number };
  heartRate: number;
  oxygenLevel: number;
  status: "online" | "offline";
};

export const WearableMonitor = () => {
  const [devices, setDevices] = useState<WearableData[]>([]);

  useEffect(() => {
    socket.on("device:update", (data: WearableData) => {
      setDevices((prev) => {
        const existing = prev.find((d) => d.id === data.id);
        if (existing) {
          return prev.map((d) => (d.id === data.id ? data : d));
        } else {
          return [...prev, data];
        }
      });
    });

    return () => {
      socket.off("device:update");
    };
  }, []);

  return (
    <div className="mt-10 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border dark:border-zinc-700">
      <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
        <Activity className="text-green-500" />
        Live Wearable Monitor
      </h2>

      {devices.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-300">Waiting for devices...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 border-l-4 border-green-600"
            >
              <div className="text-zinc-800 dark:text-zinc-100 font-medium">
                Device ID: {device.id}
              </div>
              <div className="text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                <MapPin size={16} /> Lat: {device.location.lat}, Lng: {device.location.lng}
              </div>
              <div className="text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                <HeartPulse size={16} /> HR: {device.heartRate} bpm, O₂: {device.oxygenLevel}%
              </div>
              <div
                className={`text-sm font-semibold mt-2 ${
                  device.status === "online" ? "text-green-600" : "text-red-500"
                }`}
              >
                {device.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
