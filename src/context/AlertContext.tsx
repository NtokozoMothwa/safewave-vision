// AlertContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Define the shape of the alert data
interface Alert {
  type: string;
  message: string;
  timestamp: string;
}

// Context shape
interface AlertContextType {
  alerts: Alert[];
  socket: Socket | null;
}

const AlertContext = createContext<AlertContextType>({
  alerts: [],
  socket: null,
});

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3001"); // Update this URL to match your backend

    socketInstance.on("connect", () => {
      console.log("🔌 Connected to Socket.IO server");
    });

    socketInstance.on("alert", (data: Alert) => {
      console.log("🚨 Alert received:", data);
      setAlerts((prev) => [data, ...prev]); // newest alert first
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, socket }}>
      {children}
    </AlertContext.Provider>
  );
};
