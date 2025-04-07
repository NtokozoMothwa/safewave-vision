import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export const socket = io(URL, {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
