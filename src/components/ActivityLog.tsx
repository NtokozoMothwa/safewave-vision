// src/components/ActivityLog.tsx
import React, { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { ListOrdered, Filter } from "lucide-react";

interface LogItem {
  id: string;
  type: "fall" | "panic" | "battery" | "zone";
  message: string;
  timestamp: string;
}

export const ActivityLog = () => {
  const [log, setLog] = useState<LogItem[]>([]);
  const [filter, setFilter] = useState<LogItem["type"] | "all">("all");

  useEffect(() => {
    socket.on("alert:incoming", (data: LogItem) => {
      setLog((prev) => [data, ...prev.slice(0, 29)]); // keep latest 30
    });

    return () => {
      socket.off("alert:incoming");
    };
  }, []);

  const filteredLog =
    filter === "all" ? log : log.filter((item) => item.type === filter);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-lg border dark:border-zinc-700 h-[400px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <ListOrdered className="text-indigo-500" />
          Activity Log
        </h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as LogItem["type"] | "all")}
          className="text-sm border rounded px-2 py-1 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="all">All</option>
          <option value="fall">Fall</option>
          <option value="panic">Panic</option>
          <option value="battery">Battery</option>
          <option value="zone">Zone</option>
        </select>
      </div>

      {filteredLog.length === 0 && (
        <p className="text-zinc-400">No logs to display.</p>
      )}
      <ul className="space-y-2">
        {filteredLog.map((item) => (
          <li
            key={item.id}
            className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded border-l-4 border-indigo-500 text-sm"
          >
            <div className="flex justify-between">
              <span className="capitalize font-medium">{item.type}</span>
              <span className="text-xs text-zinc-500">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p>{item.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
