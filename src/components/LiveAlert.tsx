import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

export default function LiveAlert() {
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    socket.on("newAlert", (data: any) => {
      console.log("⚡ New Alert Received:", data);
      setAlert(data.message);
    });

    return () => {
      socket.off("newAlert");
    };
  }, []);

  if (!alert) return null;

  return (
    <div className="fixed top-0 w-full bg-red-500 text-white text-center py-2 z-50">
      🚨 {alert}
    </div>
  );
}
