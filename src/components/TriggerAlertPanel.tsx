import { useState } from "react";
import { socket } from "../lib/socket";

const TriggerAlertPanel = () => {
  const [message, setMessage] = useState("");

  const sendAlert = () => {
    if (message.trim() === "") return;
    socket.emit("trigger-alert", { message });
    setMessage("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg mx-auto my-6">
      <h2 className="text-xl font-semibold mb-4">🚨 Trigger Emergency Alert</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
        rows={3}
        placeholder="Type your alert message here..."
      />
      <button
        onClick={sendAlert}
        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Send Alert
      </button>
    </div>
  );
};

export default TriggerAlertPanel;
