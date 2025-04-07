import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userRoutes from "./routes/userRoutes";
import alertRoutes from "./routes/alertRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/alerts", alertRoutes);
app.use(notFound);
app.use(errorHandler);

// --- Socket.IO Setup ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update this to your frontend origin
    methods: ["GET", "POST", "PUT"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// Make io accessible everywhere
export { io };

// --- Connect DB and Start Server ---
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
