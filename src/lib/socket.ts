// src/lib/socket.ts
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"; // or your deployed backend
export const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
});
