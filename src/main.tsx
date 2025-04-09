// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { socket } from "./lib/socket";

socket.connect(); // 👈 Connect here

socket.on("connect", () => {
  console.log("✅ Connected to socket server");
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
