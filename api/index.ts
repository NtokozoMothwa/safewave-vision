
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import alertRoutes from "./routes/alert";
import authRoutes from "./routes/auth";
import deviceRoutes from "./routes/device";
import threatRoutes from "./routes/threat";
import brainRoutes from "./routes/brain";

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/alerts", alertRoutes);
app.use("/auth", authRoutes);
app.use("/devices", deviceRoutes);
app.use("/threat", threatRoutes);
app.use("/brain", brainRoutes);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("trigger-alert", (data) => {
    console.log("📢 Broadcasting alert:", data);
    io.emit("new-alert", data);
  });

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

// Health check
app.get("/", (_req, res) => {
  res.send("✅ SafeSphere API is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
