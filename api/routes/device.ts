
import { Router } from "express";
import { authenticate } from "../middleware/auth";
const router = Router();

const devices: any[] = [];

router.post("/register", authenticate, (req: any, res) => {
  const { serial, battery, location } = req.body;
  devices.push({ serial, battery, location, owner: req.user });
  res.status(200).json({ message: "Device registered." });
  return;
});

router.post("/heartbeat", authenticate, (req: any, res) => {
  const { serial, battery } = req.body;
  const device = devices.find((d) => d.serial === serial);
  if (device) {
    device.battery = battery;
    device.lastCheckIn = new Date();
    res.status(200).json({ message: "Status updated." });
  } else {
    res.status(404).json({ message: "Device not found." });
  }
  return;
});

export default router;
