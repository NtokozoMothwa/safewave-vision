// src/components/alerts/SmartAlertDisplay.tsx
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

export const SmartAlertDisplay = () => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    socket.on('alert:dashboard', (data) => {
      setAlerts((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div className="p-4 rounded-lg bg-yellow-100 shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">🚨 Smart Alerts</h2>
      <ul className="space-y-2">
        {alerts.map((alert, index) => (
          <li key={index} className="bg-white p-2 rounded shadow">
            <strong>Type:</strong> {alert.type} | <strong>Status:</strong> {alert.userStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};
