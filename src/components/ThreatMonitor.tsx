// src/components/ThreatMonitor.tsx
import React, { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

type ThreatLevel = "low" | "medium" | "high" | "critical";

const levelColors: Record<ThreatLevel, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-600",
};

export const ThreatMonitor = () => {
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>("low");
  const [lastAlert, setLastAlert] = useState<string>("No recent activity");

  useEffect(() => {
    socket.on("threat:update", (data: { level: ThreatLevel; message: string }) => {
      setThreatLevel(data.level);
      setLastAlert(data.message);
    });

    return () => {
      socket.off("threat:update");
    };
  }, []);

  return (
    <div className="rounded-2xl p-4 shadow-lg bg-white dark:bg-zinc-900 border dark:border-zinc-700">
      <h2 className="text-xl font-bold mb-2 text-zinc-800 dark:text-zinc-100">Real-Time Threat Monitor</h2>
      <div className="flex items-center justify-between">
        <div className={`w-4 h-4 rounded-full ${levelColors[threatLevel]}`} />
        <span className="text-lg font-semibold capitalize text-zinc-700 dark:text-zinc-200">
          {threatLevel} Threat
        </span>
      </div>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
        Last alert: {lastAlert}
      </p>
    </div>
  );
};
