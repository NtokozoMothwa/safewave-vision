import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import alertRoutes from "./routes/alert";
import threatRoutes from "./routes/threat";
import authRoutes from "./routes/auth";
import deviceRoutes from "./routes/device";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/alert", alertRoutes);
app.use("/api/threat", threatRoutes);

app.get("/", (req, res) => {
  res.send("🌐 SGX SafeSphere Backend Running");
});
app.get("/health", (req, res) => {
  res.status(200).json({ message: "🧠 SafeSphere API healthy!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
import alertRoutes from "./routes/alertRoutes";
app.use("/api/alerts", alertRoutes);
