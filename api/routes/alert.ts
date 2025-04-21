
import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  const { deviceId, location, vitals } = req.body;
  console.log("🚨 Emergency Alert Received:", { deviceId, location, vitals });
  return res.status(200).json({ message: "Alert received." });
});

export default router;
