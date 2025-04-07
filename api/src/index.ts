// /api/src/index.ts
import express from "express";
import http from "http";
import cors from "cors";
import { setupSocket } from "./socket";

const app = express();
const server = http.createServer(app);
const io = setupSocket(server); // Attach socket to HTTP server

app.use(cors());
app.use(express.json());

// Example REST endpoint
app.get("/api/status", (req, res) => {
  res.json({ message: "API running ✅" });
});

server.listen(5000, () => {
  console.log("Server with Socket.IO listening on port 5000");
});
