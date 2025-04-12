import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AlertCircle } from "lucide-react";
import AIInsights from "./components/AIInsights";
import "./App.css";

const socket: Socket = io("http://localhost:3001"); // make sure this matches your backend port

function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("alert", (data) => {
      console.log("Received alert:", data);
      setAlerts((prev) => [...prev, data]);
    });

    return () => {
      socket.off("alert");
    };
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-center">SafeWave Dashboard</h1>
      {alerts.length > 0 ? (
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-center space-x-2 bg-red-100 p-4 rounded">
              <AlertCircle className="text-red-500" />
              <p className="text-red-800">{alert.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No threats detected yet.</p>
      )}
      <AIInsights />
    </div>
  );
}

export default App;
