// src/components/LiveAlerts.tsx
import React, { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { AlertTriangle, BellRing } from "lucide-react";

interface Alert {
  id: string;
  type: "fall" | "panic" | "battery" | "zone";
  message: string;
  timestamp: string;
}

export const LiveAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    socket.on("alert:incoming", (data: Alert) => {
      setAlerts((prev) => [data, ...prev.slice(0, 9)]); // limit to 10
    });

    return () => {
      socket.off("alert:incoming");
    };
  }, []);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-lg border dark:border-zinc-700 h-[400px] overflow-y-auto">
      <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <BellRing className="text-yellow-500" />
        Live Safety Alerts
      </h2>
      <ul className="space-y-3">
        {alerts.length === 0 && (
          <p className="text-zinc-400">No active alerts.</p>
        )}
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-sm text-zinc-800 dark:text-zinc-200"
          >
            <div className="flex justify-between">
              <span className="font-semibold capitalize">{alert.type}</span>
              <span className="text-xs text-zinc-500">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p>{alert.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
