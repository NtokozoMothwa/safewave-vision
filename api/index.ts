import express from "express";
import http from "http";
import { initSocket } from "./socket"; // 👈 import here

const app = express();
const server = http.createServer(app);

// your middleware and routes
// ...

initSocket(server); // 👈 connect socket

server.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on port 5000");
});
