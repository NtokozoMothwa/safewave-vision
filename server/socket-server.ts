import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

app.use(cors())
app.get("/", (req, res) => res.send("🔌 SGX Socket Server Running"))

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id)

  // Emit a test alert every 10 seconds
  setInterval(() => {
    const alert = {
      id: Date.now(),
      message: "🔴 Motion Detected in Zone 3",
      timestamp: new Date().toISOString(),
    }

    socket.emit("new_alert", alert)
  }, 10000)

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id)
  })
})

const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`))
