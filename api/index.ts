import express from "express";
import http from "http";
import { initSocket } from "./socket"; // 👈 import here
import brainRoutes from "./routes/brain";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// Enable CORS for your frontend
app.use(cors());

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*", // adjust this if deploying later
    methods: ["GET", "POST"]
  }
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("🟢 A user connected");

  // Emit a test alert every 15 seconds
  const interval = setInterval(() => {
    socket.emit("newAlert", { message: "Motion detected near North Gate!" });
  }, 15000);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
    clearInterval(interval);
  });
});

// Health check
app.get("/", (_req, res) => {
  res.send("✅ SafeSphere backend is live!");
});

app.use("/brain", brainRoutes);

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
