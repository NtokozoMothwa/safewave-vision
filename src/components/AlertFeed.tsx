import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Alert {
  message: string;
  timestamp: string;
}

const socket = io("http://localhost:5000"); // Change this when deploying

export default function AlertFeed() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    socket.on("newAlert", (data: { message: string }) => {
      const alert: Alert = {
        message: data.message,
        timestamp: new Date().toLocaleTimeString(),
      };
      setAlerts((prev) => [alert, ...prev.slice(0, 4)]); // Keep latest 5
    });

    return () => {
      socket.off("newAlert");
    };
  }, []);

  return (
    <div className="p-4 rounded-xl shadow-xl bg-white/80 backdrop-blur-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">🔔 Live Safety Alerts</h2>
      <ul className="space-y-2">
        {alerts.length === 0 && <li className="text-gray-500 text-center">No alerts yet</li>}
        {alerts.map((alert, index) => (
          <li key={index} className="p-3 bg-red-100 rounded-md shadow text-sm">
            <span className="block text-red-800 font-semibold">{alert.message}</span>
            <span className="text-xs text-gray-500">{alert.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
