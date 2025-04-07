// /api/src/socket.ts
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

export function setupSocket(server: HTTPServer) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow frontend to connect
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Send a test alert on connect (optional)
    socket.emit("alert", {
      id: Date.now(),
      message: "Test alert from backend",
      level: "warning",
      timestamp: new Date().toISOString(),
    });

    // Handle marking alerts as resolved
    socket.on("resolveAlert", (id) => {
      console.log(`Alert resolved: ${id}`);
      // TODO: Update database to mark as resolved
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}
