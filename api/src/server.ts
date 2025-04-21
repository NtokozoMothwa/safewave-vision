
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // allow any frontend
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("SafeSphere WebSocket Server is up.");
});

// Handle Socket Connections
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  // Incoming alert
  socket.on("trigger-alert", (data) => {
    console.log("📢 Broadcasting alert:", data);
    io.emit("new-alert", data); // Send to all
  });

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 SafeSphere WebSocket Server running on port ${PORT}`);
});
