import express from "express";
import cors from "cors";
import alertRoutes from "./routes/alert";
import threatRoutes from "./routes/threat";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/alert", alertRoutes);
app.use("/api/threat", threatRoutes);

app.get("/", (req, res) => {
  res.send("SGX SafeSphere API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
