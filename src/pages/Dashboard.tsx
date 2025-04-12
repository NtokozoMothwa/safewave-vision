import React, { useEffect } from "react";
import { useAlert } from "../context/AlertContext";

const Dashboard = () => {
  const { alerts, triggerTestAlert } = useAlert();

  useEffect(() => {
    console.log("Active alerts:", alerts);
  }, [alerts]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">SafeWave Dashboard</h1>

      <div className="bg-red-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Live Emergency Feed</h2>
        {alerts.length === 0 ? (
          <p className="text-sm text-gray-600">No active alerts.</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((alert, index) => (
              <li key={index} className="p-2 bg-white rounded shadow">
                <strong>{alert.type}</strong> from {alert.sender} at{" "}
                {new Date(alert.timestamp).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={triggerTestAlert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Trigger Test Alert
      </button>
    </div>
  );
};

export default Dashboard;
