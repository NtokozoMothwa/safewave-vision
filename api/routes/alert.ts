
import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  const { deviceId, location, vitals } = req.body;
  console.log("🚨 Emergency Alert Received:", { deviceId, location, vitals });
  res.status(200).json({ message: "Alert received." });
  return;
});

export default router;
