import React, { useState } from "react";
import { useSocket } from "../hooks/useSocket";

const Dashboard = () => {
  const [alerts, setAlerts] = useState<string[]>([]);

  useSocket("alert", (data) => {
    setAlerts((prev) => [data.message, ...prev]);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="space-y-2">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div
              key={index}
              className="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-lg shadow-sm"
            >
              ⚠️ {alert}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No alerts at the moment</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
