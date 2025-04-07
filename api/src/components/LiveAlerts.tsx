import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

type Alert = {
  user: string;
  type: string;
  message?: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  createdAt: string;
};

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("new_alert", (alert: Alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📡 Real-Time Alerts</h2>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="bg-red-100 border border-red-400 p-3 rounded-xl shadow">
            <p><strong>Type:</strong> {alert.type}</p>
            <p><strong>Message:</strong> {alert.message || "None"}</p>
            {alert.location && (
              <p>
                <strong>Location:</strong> Lat: {alert.location.latitude}, Long: {alert.location.longitude}
              </p>
            )}
            <p className="text-sm text-gray-500">🕒 {new Date(alert.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
