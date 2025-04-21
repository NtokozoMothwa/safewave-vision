
import { Server } from "socket.io";
import http from "http";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
    });

    // Custom events can go here
    socket.on("sendAlert", (data) => {
      console.log("📢 Alert received:", data);
      io.emit("newAlert", data); // broadcast to all clients
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};
