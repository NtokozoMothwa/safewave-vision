import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/health", (_req, res) => {
  res.json({ message: "🧠 SafeSphere API healthy!" });
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/safesphere")
  .then(() => {
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
